import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

function DepartmentHeadScoreCSB02() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectDetails, setProjectDetails] = useState(null);
    const [data, setData] = useState([{ id: 1, name: 'คะแนนรวม', fullscores: '90', score: '' }]);

    const fetchProjects = async () => {
        try {
            const examResponse = await axios.get('http://localhost:9999/Exam_results');
            
            // Filter projects based on Er_CSB02 being greater than 0 and Er_CSB02_status not being 'ผ่าน'
            const filteredProjects = examResponse.data.filter(result => result.Er_CSB02 > 0 && result.Er_CSB02_status !== 'ผ่าน');
            setProjects(filteredProjects);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    

    const fetchProjectDetails = async (projectName) => {
        try {
            const projectResponse = await axios.get('http://localhost:9999/Project');
            const projectDetail = projectResponse.data.find(p => p.P_name === projectName);
            setProjectDetails(projectDetail);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);    
    
    useEffect(() => {
        const fetchExamResults = async () => {
            if (selectedProject) {
                try {
                    const examResponse = await axios.get('http://localhost:9999/Exam_results');
                    const projectExamResult = examResponse.data.find(result => result.Er_Pname === selectedProject.Er_Pname);
                    if (projectExamResult) {
                        setData([{ id: 1, name: 'คะแนนรวม', fullscores: '90', score: projectExamResult.Er_CSB02 }]);
                    } else {
                        setData([{ id: 1, name: 'คะแนนรวม', fullscores: '90', score: '' }]);
                    }

                    // Fetch project details (students and advisor) from Project API
                    fetchProjectDetails(selectedProject.Er_Pname);
                } catch (error) {
                    console.error('Error fetching exam results:', error);
                }
            }
        };

        fetchExamResults();
    }, [selectedProject]);

    const handleChange = (event) => {
        const selectedProject = projects.find(p => p.Er_Pname === event.target.value);
        setSelectedProject(selectedProject);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedProject || !selectedProject.Er_Pname) {
            alert("กรุณาเลือกชื่อโครงงานก่อน");
            return;
        }
    
        try {
            const currentDataResponse = await axios.get(`http://localhost:9999/Exam_results?Er_Pname=${selectedProject.Er_Pname}`);
            const currentData = currentDataResponse.data;
    
            if (!currentData || currentData.length === 0) {
                alert("ไม่พบข้อมูลสำหรับโครงงานนี้");
                return;
            }
    
            const updatedEr_CSB02 = data.find(item => item.name === 'คะแนนรวม')?.score;
    
            if (!updatedEr_CSB02) {
                alert("กรุณากรอกคะแนนให้ครบถ้วน");
                return;
            }
    
            // Find the selected project data
            const selectedProjectData = currentData.find(item => item.Er_Pname === selectedProject.Er_Pname);
            if (!selectedProjectData || !selectedProjectData._id) {
                alert("ไม่พบ ID ของโครงงาน ไม่สามารถอัปเดตได้");
                return;
            }
    
            // Update Exam_results
            const payload = {
                Er_CSB02: updatedEr_CSB02 || '',
                Er_CSB02_status: 'ผ่าน' // Set status to 'ผ่าน'
            };
    
            await axios.put(`http://localhost:9999/Exam_results/${selectedProjectData._id}`, payload);
    
            // Update Project status to 'ผ่าน' based on project name
            const projectUpdatePayload = {
                P_CSB02: 'ผ่าน', // Update status to 'ผ่าน'
                P_name: selectedProject.Er_Pname // Ensure we use the correct project name
            };
    
            // Find the project ID to update
            const projectResponse = await axios.get(`http://localhost:9999/Project`);
            const projectToUpdate = projectResponse.data.find(p => p.P_name === selectedProject.Er_Pname);
    
            if (projectToUpdate) {
                await axios.put(`http://localhost:9999/Project/${projectToUpdate._id}`, projectUpdatePayload);
                alert("อัปเดตข้อมูลสำเร็จ!");
            } else {
                alert("ไม่พบโครงงานที่ต้องการอัปเดต");
            }
    
            setSelectedProject(null);
            setData([{ id: 1, name: 'คะแนนรวม', fullscores: '90', score: '' }]);
            fetchProjects();
        } catch (error) {
            console.error('Error updating data:', error);
            alert("ไม่สามารถอัปเดตข้อมูลได้ กรุณาลองใหม่ภายหลัง");
        }
    };
    
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}>
                                <Box fontSize='18px' sx={{ marginTop: 5 }}>
                                    <h1>แบบประเมินโครงงานพิเศษ 1 (สอบก้าวหน้า)</h1>
                                    <p>เลือกชื่อโครงงาน</p>
                                    <FormControl>
                                        <InputLabel id="ProjectName-select-label">ชื่อโครงงาน</InputLabel>
                                        <Select
                                            labelId="ProjectName-select-label"
                                            value={selectedProject?.Er_Pname || ''}
                                            onChange={handleChange}
                                            margin="normal"
                                            sx={{ minWidth: 150 }}
                                        >
                                            {projects.map((p) => (
                                                <MenuItem key={p._id} value={p.Er_Pname}>
                                                    {p.Er_Pname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <p>โดย</p>
                                    <TextField
                                        label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                        value={projectDetails?.P_S1 || ''}
                                        disabled
                                        sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                    />
                                    <TextField
                                        label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                        value={projectDetails?.P_S2 || ''}
                                        disabled
                                        sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                    />
                                    <p>อาจารย์ที่ปรึกษา</p>
                                    <TextField
                                        label="ชื่ออาจารย์ที่ปรึกษา"
                                        value={projectDetails?.P_T || ''}
                                        disabled
                                        sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '40ch' } }}
                                    />
                                </Box>
                                {selectedProject && (
                                    <>
                                        <h2>ตารางคะแนนสำหรับประธานกรรมการสอบ</h2>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>คะแนนเต็ม</TableCell>
                                                        <TableCell>คะแนนได้</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.fullscores}</TableCell>
                                                            <TableCell>{item.score}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <br />
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                                อนุมัติคะแนน
                                            </Button>
                                            <Button variant="contained">ยกเลิก</Button>
                                        </Stack>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default DepartmentHeadScoreCSB02;
