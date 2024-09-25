import React, { useState, useEffect } from 'react';
import { Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

function InputScoreCSB03() {
  const [data, setData] = useState([
    { id: 1, name: 'การออกแบบหรือแนวคิด', fullscores: '10', score: '' },
    { id: 2, name: 'วิธีการ/การดำเนินงาน', fullscores: '20', score: '' },
    { id: 3, name: 'ความสมบูรณ์ของผลงาน', fullscores: '20', score: '' },
    { id: 4, name: 'เนื้อหาและรูปแบบของปริญญานิพนธ์', fullscores: '10', score: '' },
    { id: 5, name: 'การนำเสนอโครงงาน', fullscores: '10', score: '' },
    { id: 6, name: 'การนำผลงานไปใช้ประโยชน์', fullscores: '5', score: '' },
    { id: 7, name: 'สรุป/วิจารณ์/การพัฒนาต่อในอนาคต', fullscores: '5', score: '' },
    { id: 8, name: 'คะแนนรวม', fullscores: '80', score: '' },
  ]);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
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
        const response = await axios.get('http://localhost:9999/Project');
        const projectsData = response.data;
  
        const examResultsResponse = await axios.get('http://localhost:9999/Exam_results');
        const examResultsData = examResultsResponse.data;
  
        if (projectsData && examResultsData) {
          const filteredProjects = projectsData.filter(project => {
            const examResult = examResultsData.find(result => result.Er_Pname === project.P_name);
            return examResult &&
              examResult.Er_CSB01_status === 'ผ่าน' &&
              examResult.Er_CSB02_status === 'ผ่าน' &&
              !examResult.Er_CSB03; // Exclude projects where Er_CSB03 has a value
          });
  
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching projects or exam results:', error);
      }
    };
  
    fetchProjects();
  }, [examResults]);

  const handleLinkClick = (index) => {
    setSelectedProject(projects[index]);
    setOpenPopup(true);
  };

  const handleSavePopup = async () => {
    const totalScore = parseInt(data.find(item => item.id === 8)?.score || '0', 10);

    try {
        const existingResult = examResults.find(result => result.Er_Pname === selectedProject?.P_name);

        if (existingResult) {
            // ตรวจสอบข้อมูลที่จะส่งไปใน PUT request
            console.log('Data to be sent:', {
                _id : existingResult._id,
                Er_Pname: selectedProject?.P_name,
                Er_CSB01: existingResult.Er_CSB01,
                Er_CSB02: existingResult.Er_CSB02,
                Er_CSB03: totalScore,
                Er_CSB01_status: existingResult.Er_CSB01_status,
                Er_CSB02_status: existingResult.Er_CSB02_status,
                Er_CSB03_status: totalScore >= 50 ? 'ผ่าน' : 'ไม่ผ่าน',
            });

            const response = await axios.put(`http://localhost:9999/Exam_results/${existingResult._id}`, {
                Er_Pname: selectedProject?.P_name,
                Er_CSB01: existingResult.Er_CSB01,
                Er_CSB02: existingResult.Er_CSB02,
                Er_CSB03: totalScore,
                Er_CSB01_status: existingResult.Er_CSB01_status,
                Er_CSB02_status: existingResult.Er_CSB02_status,
                Er_CSB03_status: '',
            });

            if (response.status === 200) {
                console.log('Score updated successfully!');
                setOpenPopup(false);
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

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleRedRow = (index) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, isRed: true } : project
    );
    setProjects(updatedProjects);
  };

  const handleDisableRow = (index) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, isDisabled: true } : project
    );
    setProjects(updatedProjects);
  };

  const handleChangeScore = (id, value) => {
    const isValidInput = (input) => /^[0-9]*$/.test(input);

    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === id) {
          const numericValue = Number(value);
          if (
            !isValidInput(value) ||
            numericValue < 0 ||
            numericValue > Number(item.fullscores) ||
            isNaN(numericValue)
          ) {
            return item;
          }
          return { ...item, score: value };
        }
        return item;
      });

      const totalScore = updatedData.reduce((acc, item) => {
        if (item.id !== 8) {
          return acc + Number(item.score || 0);
        }
        return acc;
      }, 0);

      return updatedData.map((item) => {
        if (item.id === 8) {
          return { ...item, score: totalScore.toString() };
        }
        return item;
      });
    });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="h1">ประเมินการสอบป้องกันโครงงานพิเศษ</Typography>
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

      {selectedProject && (
        <Dialog open={openPopup} onClose={handleClosePopup} maxWidth="lg" fullWidth>
          <DialogTitle>รายละเอียดโครงงาน</DialogTitle>
          <DialogContent>
            <Typography variant="h3">ชื่อโครงงาน: {selectedProject.P_name}</Typography>
            <Typography>นักเรียนคนที่ 1: {selectedProject.P_S1}</Typography>
            <Typography>นักเรียนคนที่ 2: {selectedProject.P_S2}</Typography>
            <Typography>ที่ปรึกษา: {selectedProject.P_T}</Typography>
            <Typography variant="h2">ตารางลงคะแนนสำหรับกรรมการสอบ</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับที่</TableCell>
                    <TableCell>เกณฑ์พิจารณา</TableCell>
                    <TableCell>คะเเนนเต็ม</TableCell>
                    <TableCell>คะเเนนที่ได้</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.fullscores}</TableCell>
                      <TableCell>
                        <TextField
                          value={item.score}
                          onChange={(e) => handleChangeScore(item.id, e.target.value)}
                          disabled={item.name === 'คะแนนรวม'}
                          type="number"
                          fullWidth
                          margin="none"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSavePopup} color="primary" variant="contained">
              บันทึก
            </Button>
            <Button onClick={handleClosePopup} color="secondary" variant="outlined">
              ปิด
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
}

export default InputScoreCSB03;
