import React, { useState, useEffect } from 'react';
import { Button, Paper, Grid, Table, TextField, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

function InputScoreCSB01() {
  const [projects, setProjects] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const initialData = [
    { id: 1, name: 'การวิเคราะห์ปัญหา(Problem Analysis)', description: ['1. มีการระบุที่มาของปัญหา', '2. มีการนำเสนอข้อมูลทางสถิติหรือหลักฐานเพื่อสนับสนุนความสำคัญของปัญหา', '3. มีอ้างอิงแหล่งข้อมูลที่น่าเชื่อถือ'], score: '' },
    { id: 2, name: 'แนวคิด/ แนวทางของระบบ(Solution)', description: ['1. มีความสามารถแก้ปัญหาได้แท้จริง ตรงเป้า', '2. มีวิธีการที่นำเสนอที่มีประสิทธิภาพ'], score: '' },
    { id: 3, name: 'ขอบเขตและปริมาณงาน(Scope)', description: ['1. มีลักษณะและปริมาณงานเหมาะสมสำหรับปริญญานิพนธ์', '2. มีความเหมาะสมตามกรอบเวลา'], score: '' },
    { id: 4, name: 'ต้นแบบระบบ(System Prototype)', description: ['มีการนำเสนอต้นแบบระบบด้วยเครื่องมือที่มีความเหมาะสม เช่น Mockup, wireframe, story board และ system architecture'], score: '' },
    { id: 5, name: 'ลักษณะของกลุ่มผู้ใช้งาน(Target market)', description: ['1. มีการกำหนดเป้าหมายสำหรับการใช้งานระบบอย่างชัดเจน', '2. มีการศึกษาลักษณะกลุ่มเป้าหมาย', '3. มีการศึกษาผลกระทบที่คาดว่าจะเกิดต่อกลุ่มเป้าหมาย'], score: '' },
    { id: 6, name: 'การวิเคราะห์การตลาด (Market analysis)', description: ['1. มีการนำเสนอระบบที่ใกล้เคียง/ที่เกี่ยวข้องอย่างน้อย 2 ระบบ', '2. มีการระบุข้อจำกัดของระบบที่ใกล้เคียงหรือเกี่ยวข้อง', '3. มีการระบุความแตกต่างหรือจุดเด่นของระบบที่นำเสนอ'], score: '' },
    { id: 7, name: 'การศึกษาความเป็นไปได้ (Feasibility study)', description: ['1. มีการนำเสนอการศึกษาเทคนิคที่เกี่ยวข้องเบื้องต้น ', '2. มีการศึกษาข้อจำกัดของอุปกรณ์/ระบบที่เกี่ยวข้อง'], score: '' },
    { id: 8, name: 'ผลการประเมิน', score: '' },
  ];
  const [Data, setData] = useState(initialData);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9999/Project');
        const allProjects = response.data; // Assuming response.data is the list of projects
        
        // Fetch exam results to filter out projects
        const examResultsResponse = await axios.get('http://localhost:9999/Exam_results');
        const examResultsData = examResultsResponse.data;
  
        // Filter projects based on exam results
        const filteredProjects = allProjects.filter(project => {
          const examResult = examResultsData.find(result => result.Er_Pname === project.P_name);
          return !(examResult && examResult.Er_CSB01 === 'ผ่านการประเมินหัวข้อ' && examResult.Er_CSB01_status === 'ผ่าน');
        });
  
        setProjects(filteredProjects); // Set the filtered projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, []);
  

  useEffect(() => {
    updateFinalScore();
    checkAllChecked();
  }, [Data]);

  const handleDonNotGoAny = () => {
    const updatedData = projects.map(project => ({ ...project, isRed: true, isDisabled: true }));
    setProjects(updatedData);
  };

  const handleLinkClick = (index) => {
    setSelectedProject(projects[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetCheckboxData(); // Reset checkbox values when closing the dialog
  };

  const handleDisableRow = (index) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, isDisabled: true } : project
    );
    setProjects(updatedProjects);
  };

  const handleRedRow = (index) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, isRed: true } : project
    );
    setProjects(updatedProjects);
  };

  const handleCheckboxChange = (id, type) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id
          ? { ...item, score: type === 'yes' ? 'ผ่าน' : 'ไม่ผ่าน' }
          : item
      )
    );
  };

  const updateFinalScore = () => {
    const countPass = Data
      .filter(item => item.id >= 1 && item.id <= 7)
      .filter(item => item.score === 'ผ่าน').length;

    const countFail = Data
      .filter(item => item.id >= 1 && item.id <= 7)
      .filter(item => item.score === 'ไม่ผ่าน').length;

    if (countFail >= 4) {
      setData(prevData =>
        prevData.map(item =>
          item.id === 8
            ? { ...item, score: 'ไม่ผ่านการประเมินหัวข้อ' }
            : item
        )
      );
    } else if (countPass >= 4) {
      setData(prevData =>
        prevData.map(item =>
          item.id === 8
            ? { ...item, score: 'ผ่านการประเมินหัวข้อ' }
            : item
        )
      );
    }
  };

  const checkAllChecked = () => {
    const allChecked = Data
      .filter(item => item.id >= 1 && item.id <= 7)
      .every(item => item.score === 'ผ่าน' || item.score === 'ไม่ผ่าน');
    setAllChecked(allChecked);
  };

  const handleSavePopup = async (e) => {
    if (allChecked) {
      e.preventDefault();
      try {
        await saveScore(); // Save the score
        // Remove only the selected project from the list
        setProjects(prevProjects => prevProjects.filter(project => project.P_id !== selectedProject.P_id));
        resetCheckboxData(); // Reset the form data
        setOpen(false); // Close the popup
      } catch (error) {
        console.error('Error saving score:', error);
      }
    } else {
      alert('กรุณาตรวจสอบให้ครบทุกหัวข้อก่อนทำการบันทึก');
    }
  };

  const resetCheckboxData = () => {
    setData(initialData); 
    setAllChecked(false); 
  };

  const saveScore = async () => {
    try {
 
      const payload = {
        Er_Pname: selectedProject.P_name, 
        Er_CSB01: Data.find(item => item.id === 8)?.score || 'ไม่มีการประเมิน', 
        Er_CSB02: 0, 
        Er_CSB03: 0, 
        Er_CSB01_status: Data.find(item => item.id === 8)?.score === 'ผ่านการประเมินหัวข้อ' ? 'ผ่าน' : 'ไม่ผ่าน', 
        Er_CSB02_status: '', 
        Er_CSB03_status: '', 
        Er_CSB01_Ch: '',
        Er_CSB02_Ch: '',
        Er_CSB03_Ch: '',
        Er_CSB01_De: '',
        Er_CSB02_De: '',
        Er_CSB03_De: '',
        Er_score: 0, 
      };
  
      await axios.post('http://localhost:9999/Exam_results', payload);
      
      // Optionally handle any additional logic here
      console.log('Score saved successfully!');
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };
  
  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={1}>
            <h1>ประเมินการสอบหัวข้อโครงงานพิเศษ</h1>
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
          <DialogTitle>รายละเอียดโครงงาน</DialogTitle>
          <DialogContent>
            <Typography variant="h3">ชื่อโครงงาน: {selectedProject.P_name}</Typography>
            <Typography>นักเรียนคนที่ 1: {selectedProject.P_S1}</Typography>
            <Typography>นักเรียนคนที่ 2: {selectedProject.P_S2}</Typography>
            <Typography>ที่ปรึกษา: {selectedProject.P_T}</Typography>
            <h2>ตารางลงคะแนนสำหรับกรรมการสอบ</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับที่</TableCell>
                    <TableCell>เกณฑ์พิจารณา</TableCell>
                    <TableCell>คำอธิบาย</TableCell>
                    <TableCell>ผลการประเมิน</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Data.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <ul>
                          {(item.description || []).map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        {item.id === 8 ? (
                          <TextField value={item.score} disabled fullWidth margin="none" />
                        ) : (
                          <div>
                            <label htmlFor={`pass-${index}`}>
                              <input
                                type="radio"
                                id={`pass-${index}`}
                                checked={item.score === "ผ่าน"}
                                onChange={() => handleCheckboxChange(item.id, "yes")}
                              />
                              ผ่าน
                            </label>
                            <label htmlFor={`fail-${index}`}>
                              <input
                                type="radio"
                                id={`fail-${index}`}
                                checked={item.score === "ไม่ผ่าน"}
                                onChange={() => handleCheckboxChange(item.id, "no")}
                              />
                              ไม่ผ่าน
                            </label>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSavePopup} color="primary" disabled={!allChecked}>บันทึก</Button>
            <Button onClick={handleClose} color="secondary">ปิด</Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
}

export default InputScoreCSB01;
