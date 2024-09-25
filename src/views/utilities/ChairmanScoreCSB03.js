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
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Stack } from '@mui/system';

function ChairmanScoreCSB03() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [editingRowId, setEditingRowId] = useState(null);
    const [data, setData] = useState([{ id: 1, name: 'คะแนนรวม', fullscores: '80', score: '' }]);
    const [projects, setProjects] = useState([]); // State for storing project data
    const [openDialog, setOpenDialog] = useState(false);

    const fetchProjects = async () => {
        try {
            const projectResponse = await axios.get('http://localhost:9999/Project');
            const examResponse = await axios.get('http://localhost:9999/Exam_results');
    
            // Filter projects based on their exam results and status
            const filteredProjects = projectResponse.data.filter(project => {
                const result = examResponse.data.find(result => result.Er_Pname === project.P_name);
                return result && result.Er_CSB03_status !== 'ผ่าน' && !isNaN(Number(result.Er_CSB03)) && Number(result.Er_CSB03) > 0; 
            });
    
            setProjects(filteredProjects);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                    const projectExamResult = examResponse.data.find(result => result.Er_Pname === selectedProject.P_name);
                    if (projectExamResult) {
                        setData([{ id: 1, name: 'คะแนนรวม', fullscores: '80', score: projectExamResult.Er_CSB03 }]);
                    } else {
                        setData([{ id: 1, name: 'คะแนนรวม', fullscores: '80', score: '' }]);
                    }
                } catch (error) {
                    console.error('Error fetching exam results:', error);
                }
            }
        };

        fetchExamResults();
    }, [selectedProject]); 

    const handleNameChange = (id, value) => {
        const item = data.find(item => item.id === id);

        if (/^\d*$/.test(value) && Number(value) <= Number(item.fullscores)) {
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? { ...item, score: value } : item
                )
            );
        }
    };

    const calculateTotalScore = () => {
        const totalScore = data
            .filter(item => item.id >= 1 && item.id <= 7)
            .reduce((acc, curr) => acc + Number(curr.score), 0);

        setData(prevData =>
            prevData.map(item =>
                item.name === '' ? { ...item, score: totalScore } : item
            )
        );
    };

    const handleChange = (event) => {
        const selectedProject = projects.find(p => p.P_name === event.target.value);
        setSelectedProject(selectedProject);
    }; 

    const handleEditClick = (id) => {
        setEditingRowId(id);
    };

    const handleSaveClick = () => {
        setEditingRowId(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        calculateTotalScore();
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedProject || !selectedProject.P_name) {
            alert("Project name is missing. Please select a project.");
            return;
        }
    
        try {
            // Fetch the current record based on project name
            const currentDataResponse = await axios.get(`http://localhost:9999/Exam_results?Er_Pname=${selectedProject.P_name}`);
            const currentData = currentDataResponse.data;
    
            if (!currentData || currentData.length === 0) {
                alert("No data found for this project. Please check the project details.");
                return;
            }
    
            // Update only Er_CSB03
            const updatedEr_CSB03 = data.find(item => item.name === 'คะแนนรวม')?.score;
    
            const payload = {
                ...currentData[0],  // Assuming the response is an array
                Er_CSB03: updatedEr_CSB03 || '' // Only update this field
            };
    
            // Ensure _id exists in the payload for updating
            if (!currentData[0]._id) {
                alert("No valid ID found for the project. Cannot update.");
                return;
            }
    
            const response = await axios.put(`http://localhost:9999/Exam_results/${currentData[0]._id}`, payload);
    
            if (response.status === 200) {
                alert("Subject updated successfully!");
    
                // Clear the selected project and data after successful update
                setSelectedProject(null);
                setData([{ id: 1, name: 'คะแนนรวม', fullscores: '80', score: '' }]);
    
                // Refresh the project list and remove the updated project
                fetchProjects().then(() => {
                    setProjects(prevProjects => prevProjects.filter(project => project.P_name !== selectedProject.P_name));
                });
    
                setOpenDialog(true); // Open dialog on successful submission
            } else {
                alert("Update failed. Please check the server response.");
            }
        } catch (error) {
            console.error('Error updating subject:', error);
            alert("Failed to update subject. Please try again later.");
        }
    };
    

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Box fontSize='18px' sx={{ marginTop: 5 }}>
                                <h1>แบบประเมินโครงงานพิเศษ 2 (ปริญญานิพนธ์)</h1>
                                <p>เลือกชื่อโครงงาน</p>
                                <FormControl sx={{ minWidth: 150 }}>
                                    <InputLabel id="project-name-select-label">ชื่อโครงงาน</InputLabel>
                                    <Select
                                            labelId="ProjectName-select-label"
                                            value={selectedProject?.P_name || ''}
                                            onChange={handleChange}
                                            margin="normal"
                                            sx={{ minWidth: 150 }}
                                        >
                                            {projects.map((p) => (
                                                <MenuItem key={p._id} value={p.P_name}>
                                                    {p.P_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                </FormControl>
                                <br />
                                <p>โดย</p>
                                <TextField
                                        label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                        value={selectedProject?.P_S1 || ''}
                                        disabled
                                        sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                    />
                                    <TextField
                                        label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                        value={selectedProject?.P_S2 || ''}
                                        disabled
                                        sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                    />
                                    <p>อาจารย์ที่ปรึกษา</p>
                                    <TextField
                                        label="ชื่ออาจารย์ที่ปรึกษา"
                                        value={selectedProject?.P_T || ''}
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
                                                                    onChange={(e) => handleNameChange(item.id, e.target.value)}
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
                                                                <Button variant="contained" onClick={() => handleEditClick(item.id)}>
                                                                    แก้ไข
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                        <Button variant="contained" color="primary" type="submit">
                                            บันทึก
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => setSelectedProject(null)}>
                                            ยกเลิก
                                        </Button>
                                    </Stack>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ChairmanScoreCSB03;
