import React, { useState, useEffect } from 'react';
import { Button, TableCell, TableContainer, Table, TableHead, TableBody, TableRow, Dialog, DialogContent, DialogActions, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const Detail = () => {
    const [tableData, setTableData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [teachers, setTeachers] = useState([]); // State for storing teacher data
    const [selectedTeacher, setSelectedTeacher] = useState(''); // State for storing selected teacher

    useEffect(() => {
        // Fetch project data from API
        fetch('http://localhost:9999/Project')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched project data:', data); // Log fetched data
                const filteredData = data.filter(project => project.P_status === 'ไม่มีที่ปรึกษา');
                setTableData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching project data:', error);
            });
    }, []);
    
    useEffect(() => {
        if (openAcceptDialog) {
            fetchTeachers(); // Fetch teachers when opening the dialog
        }
    }, [openAcceptDialog]);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:9999/Teacher');
            const data = await response.json();
            console.log('Fetched teachers:', data); // Log fetched teachers
            if (data && Array.isArray(data)) {
                setTeachers(data);
            }
        } catch (error) {
            console.error('Error fetching Teacher names:', error);
        }
    };

    const handlePopupClick = (project) => {
        setSelectedProject(project);
        setOpenPopup(true);
    };

    const handlePopupClose = () => {
        setOpenPopup(false);
        setSelectedProject(null);
    };

    const handleOpenAcceptDialog = (project) => {
        if (!project._id) {
            console.error('Project ID is missing when opening dialog:', project);
            return;
        }
        console.log('Opening accept dialog with project:', project); // Log project data
        setSelectedProject(project);
        setOpenAcceptDialog(true);
    };   

    const handleOpenRejectDialog = (project) => {
        setSelectedProject(project);
        setOpenRejectDialog(true);
    };

    const handleCloseAcceptDialog = () => {
        setOpenAcceptDialog(false);
        setSelectedProject(null);
        setSelectedTeacher(''); // Reset selected teacher
    };

    const handleCloseRejectDialog = () => {
        setOpenRejectDialog(false);
        setSelectedProject(null);
    };

    const handleConfirmAccept = () => {
        if (!selectedProject) {
            console.error('No project selected.');
            return;
        }
    
        // Check if the selected project has an ID
        if (!selectedProject._id) {
            console.error('Selected project does not have an ID:', selectedProject);
            return;
        }
    
        if (!selectedTeacher) {
            console.error('No teacher selected.');
            return;
        }
    
        console.log('Selected Project:', selectedProject); // Log the selected project
        console.log('Selected Teacher ID:', selectedTeacher); // Log the selected teacher
    
        // Find the selected teacher's name
        const teacher = teachers.find(teacher => teacher.T_id === selectedTeacher);
        const teacherName = teacher ? teacher.T_name : '';
    
        // Make the PUT request to update the project
        fetch(`http://localhost:9999/Project/${selectedProject._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                P_status: 'กำลังดำเนินการ', // Update status
                P_T: teacherName // Set the teacher's name
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('API response data:', data);
            // Update the local table data to reflect changes
            setTableData(prevData => prevData.filter(project => project._id !== selectedProject._id));
            handleCloseAcceptDialog();
        })
        .catch(error => {
            console.error('Error updating project status:', error);
        });
    };
    
    const handleTeacherSelect = (event) => {
        setSelectedTeacher(event.target.value); // Set the selected teacher ID
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <div>
                                <h1>รายชื่อโครงงานที่ยังไม่มีอาจารย์ที่ปรึกษา</h1>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับที่</TableCell>
                                                <TableCell>ชื่อโครงงาน</TableCell>
                                                <TableCell>นักศึกษาคนที่ 1</TableCell>
                                                <TableCell>นักศึกษาคนที่ 2</TableCell>
                                                <TableCell>รายละเอียดโครงงาน</TableCell>
                                                <TableCell>จัดการอาจารย์ปรึกษา</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData.length > 0 ? (
                                                tableData.map((row, index) => (
                                                    <TableRow key={row._id}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.P_name}</TableCell>
                                                        <TableCell>{row.P_S1}</TableCell>
                                                        <TableCell>{row.P_S2}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => handlePopupClick(row)}>ดูรายละเอียด</Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => handleOpenAcceptDialog(row)}>เลือกที่ปรึกษา</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center">
                                                        No data available
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Dialog open={openPopup} onClose={handlePopupClose}>
                                    <DialogContent>
                                        {selectedProject ? (
                                            <div>
                                                <h2>{selectedProject.P_name}</h2>
                                                <p>{selectedProject.P_details}</p>
                                                <p>{selectedProject.P_tool}</p>
                                            </div>
                                        ) : (
                                            'No project details available'
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handlePopupClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>

                                {/* Dialog for accepting advisor */}
                                <Dialog open={openAcceptDialog} onClose={handleCloseAcceptDialog}>
                                    <DialogTitle>เลือกอาจารย์ที่ปรึกษา</DialogTitle>
                                    <DialogContent>
                                        <FormControl fullWidth>
                                            <InputLabel>เลือกอาจารย์</InputLabel>
                                            <Select
                                                labelId="teacher-select-label"
                                                id="teacher-select"
                                                value={selectedTeacher}
                                                label="Teacher"
                                                onChange={handleTeacherSelect}
                                            >
                                                {teachers.map((teacher) => (
                                                    <MenuItem key={teacher.T_id} value={teacher.T_id}>
                                                        {teacher.T_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleConfirmAccept}>ยืนยัน</Button>
                                        <Button onClick={handleCloseAcceptDialog}>ยกเลิก</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Detail;
