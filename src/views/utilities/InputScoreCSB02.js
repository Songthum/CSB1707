import React, { useState, useEffect } from 'react';
import {
  Button, Paper, Grid, Table, TextField,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, Typography
} from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

function InputScoreCSB02() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: 'วัตถุประสงค์และขอบเขตโครงงาน', fullscores: '10', score: '' },
    { id: 2, name: 'ความเข้าใจระบบงานเดิม/ทฤษฎีหรืองานวิจัย ที่นำมาใช้พัฒนาโครงงาน', fullscores: '20', score: '' },
    { id: 3, name: 'การศึกษาความต้องการของระบบ และการออกแบบ', fullscores: '20', score: '' },
    { id: 4, name: 'การนำเสนอโครงงาน', fullscores: '20', score: '' },
    { id: 5, name: 'รูปแบบรายงาน', fullscores: '10', score: '' },
    { id: 6, name: 'แนวทางการดำเนินงาน', fullscores: '10', score: '' },
    { id: 7, name: 'คะแนนรวม', fullscores: '90', score: '' },
  ]);

  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        const response = await axios.get('http://localhost:9999/Exam_results');
        if (response.data && Array.isArray(response.data)) {
          setExamResults(response.data);
        }
      } catch (error) {
        console.error('Error fetching exam results:', error);
      }
    };

    fetchExamResults();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch projects
        const response = await axios.get('http://localhost:9999/Project');
        const projectsData = response.data;
  
        // Fetch exam results
        const examResultsResponse = await axios.get('http://localhost:9999/Exam_results');
        const examResultsData = examResultsResponse.data;
  
        if (projectsData && examResultsData) {
          // Filter projects: ที่ปรึกษาต้องไม่เป็นค่าว่างและเงื่อนไขการประเมิน
          const filteredProjects = projectsData.filter(project => {
            const examResult = examResultsData.find(result => result.Er_Pname === project.P_name);
            return project.P_T && // ตรวจสอบว่ามีที่ปรึกษา
              examResult &&
              examResult.Er_CSB01_status === 'ผ่าน' &&
              !examResult.Er_CSB03_status &&
              examResult.Er_CSB02_status !== 'ผ่าน';
          });
  
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching projects or exam results:', error);
      }
    };
  
    fetchProjects();
  }, []);
  

  const handleChange4 = (id, field, value) => {
    const isValidInput = (input) => /^[0-9]*$/.test(input);

    setData(prevData => {
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          const numericValue = Number(value);
          if (field === 'score') {
            if (!isValidInput(value) || numericValue < 0 || numericValue > Number(item.fullscores) || isNaN(numericValue)) {
              return item;
            }
          }
          return { ...item, [field]: value };
        }
        return item;
      });

      const totalScore = updatedData.reduce((acc, item) => item.id !== 7 ? acc + Number(item.score || 0) : acc, 0);

      return updatedData.map(item => item.id === 7 ? { ...item, score: totalScore.toString() } : item);
    });
  };

  const handleDonNotGoAny = () => {
    const updatedProjects = projects.map(project => ({ ...project, isRed: true, isDisabled: true }));
    setProjects(updatedProjects);
  };

  const handleLinkClick = (index) => {
    setSelectedProject(projects[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisableRow = (index) => {
    const updatedProjects = projects.map((project, i) => i === index ? { ...project, isDisabled: true } : project);
    setProjects(updatedProjects);
  };

  const handleRedRow = (index) => {
    const updatedProjects = projects.map((project, i) => i === index ? { ...project, isRed: true } : project);
    setProjects(updatedProjects);
  };

  const handleSavePopup = async (e) => {
    if (e) {
      e.preventDefault();

      const allScoresFilled = data.slice(0, -1).every(item => item.score !== '');
      if (!allScoresFilled) {
        alert('กรุณาตรวจสอบให้ครบทุกหัวข้อก่อนทำการบันทึก');
        return;
      }

      await saveScore();
      setProjects(prevProjects => prevProjects.filter(project => project.P_id !== selectedProject.P_id));
      setOpen(false);
    }
  };

  const saveScore = async () => {
    const totalScore = Number(data.find(item => item.id === 7)?.score || '0');
    try {
      const existingResult = examResults.find(result => result.Er_Pname === selectedProject?.P_name);
  
      if (existingResult) {
        const response = await axios.put(`http://localhost:9999/Exam_results/${existingResult._id}`, {
          Er_Pname: selectedProject?.P_name,
          Er_CSB01: existingResult.Er_CSB01,
          Er_CSB02: totalScore,
          Er_CSB03: '',
          Er_CSB01_status: existingResult.Er_CSB01_status,
          Er_CSB02_status: '',
          Er_CSB03_status: '',
        });
  
        if (response.status === 200) {
          console.log('Score updated successfully!');
          setOpenDialog(true);
        } else {
          console.error('Failed to update score:', response);
        }
      } else {
        console.error('No existing result found for the project');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };  

  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={1}>
            <h1>ประเมินการสอบก้าวหน้าโครงงานพิเศษ</h1>
            <Button onClick={handleDonNotGoAny} variant="contained" color="error">
              ไม่เข้าร่วมประเมินทั้งหมด
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับที่</TableCell>
                    <TableCell>ชื่อโครงงาน</TableCell>
                    <TableCell>ประเมินการสอบโครงงานพิเศษ</TableCell>
                    <TableCell>ไม่ประสงค์ลงคะแนนสอบ</TableCell>
                    <TableCell>ไม่เข้าประเมินการสอบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project, index) => (
                    <TableRow key={project.P_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{project.P_name}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleLinkClick(index)}
                          variant="outlined"
                          disabled={project.isDisabled}
                        >
                          ประเมิน
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDisableRow(index)}
                          variant="outlined"
                          disabled={project.isDisabled || project.isRed}
                        >
                          ไม่ประสงค์ลงคะแนน
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRedRow(index)}
                          variant="outlined"
                          disabled={project.isDisabled || project.isRed}
                        >
                          ไม่เข้าประเมิน
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

      {selectedProject && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            style: {
              minHeight: '80vh',
              maxHeight: '90vh',
            }
          }}
        >
          <DialogTitle>ประเมินคะแนนโครงงาน</DialogTitle>
          <DialogContent>
            <Typography variant="h3">ชื่อโครงงาน: {selectedProject.P_name}</Typography>
            <Typography>นักเรียนคนที่ 1: {selectedProject.P_S1}</Typography>
            <Typography>นักเรียนคนที่ 2: {selectedProject.P_S2}</Typography>
            <Typography>ที่ปรึกษา: {selectedProject.P_T}</Typography>
            <h2>ตารางลงคะแนนสำหรับกรรมการสอบ</h2>
            <Grid container spacing={2} style={{ padding: '0 16px' }}>
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>หัวข้อการประเมิน</TableCell>
                      <TableCell>คะแนนเต็ม</TableCell>
                      <TableCell>คะแนนที่ได้</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.fullscores}</TableCell>
                        <TableCell>
                          <TextField
                            value={item.score}
                            onChange={(e) => handleChange4(item.id, 'score', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              ปิด
            </Button>
            <Button onClick={handleSavePopup} color="primary">
              บันทึก
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>บันทึกข้อมูลสำเร็จ</DialogTitle>
        <DialogContent>
          <Typography>การบันทึกข้อมูลเสร็จสิ้น</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default InputScoreCSB02;
