import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function ChairmanScoreCSB02() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectDetails, setProjectDetails] = useState(null);
    const [data, setData] = useState([{ id: 1, name: 'คะแนนรวม', fullscores: '90', score: '' }]);
    const [editingRowId, setEditingRowId] = useState(null);

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

    const handleNameChange = (value) => {
        if (/^\d*$/.test(value) && Number(value) <= Number(data[0].fullscores)) {
            setData(prevData => prevData.map(item =>
                item.id === 1 ? { ...item, score: value } : item
            ));
        }
    };    

    const handleEditClick = () => {
        setEditingRowId(1);
    };

    const handleSaveClick = () => {
        setEditingRowId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedProject || !selectedProject.Er_Pname) {
            alert("กรุณาเลือกชื่อโครงงานก่อน");
            return;
        }
    
        try {
            // Fetch current data of the selected project from the database
            const currentDataResponse = await axios.get(`http://localhost:9999/Exam_results?Er_Pname=${selectedProject.Er_Pname}`);
            const currentData = currentDataResponse.data;
    
            if (!currentData || currentData.length === 0) {
                alert("ไม่พบข้อมูลสำหรับโครงงานนี้");
                return;
            }
    
            // Get the score entered by the user
            const updatedEr_CSB02 = data.find(item => item.name === 'คะแนนรวม')?.score;
    
            // Check if the score is valid
            if (!updatedEr_CSB02) {
                alert("กรุณากรอกคะแนนให้ครบถ้วน");
                return;
            }
    
            // Check if the project ID exists
            const selectedProjectData = currentData.find(item => item.Er_Pname === selectedProject.Er_Pname);
            if (!selectedProjectData || !selectedProjectData._id) {
                alert("ไม่พบ ID ของโครงงาน ไม่สามารถอัปเดตได้");
                return;
            }
    
            // Prepare the payload to update the score
            const payload = {
                Er_CSB02: updatedEr_CSB02 || ''
            };
    
            // Send PUT request to update only the Er_CSB02 field for the selected project
            const response = await axios.put(`http://localhost:9999/Exam_results/${selectedProjectData._id}`, payload);
    
            if (response.status === 200) {
                alert("อัปเดตข้อมูลสำเร็จ!");
    
                // Remove the saved project from the list of available projects
                setProjects((prevProjects) => prevProjects.filter(project => project.Er_Pname !== selectedProject.Er_Pname));
    
                // Reset selected project and data
                setSelectedProject(null);
                setData([{ id: 1, name: 'คะแนนรวม', fullscores: '90', score: '' }]);
            } else {
                alert("การอัปเดตไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
            }
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
                                                        <TableCell>แก้ไข</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.fullscores}</TableCell>
                                                            <TableCell>
                                                                {editingRowId === item.id ? (
                                                                    <TextField
                                                                        value={item.score}
                                                                        onChange={(e) => handleNameChange(e.target.value)}
                                                                        inputProps={{
                                                                            inputMode: 'numeric',
                                                                            pattern: '[0-9]*'
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    item.score
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {editingRowId === item.id ? (
                                                                    <Button variant="contained" onClick={handleSaveClick}>
                                                                        บันทึก
                                                                    </Button>
                                                                ) : (
                                                                    <Button variant="contained" onClick={handleEditClick}>
                                                                        แก้ไข
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <br />
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                                บันทึก
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

export default ChairmanScoreCSB02;

