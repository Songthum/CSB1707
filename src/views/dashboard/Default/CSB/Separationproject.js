import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';

function SeparationProject() {
    const [projectData, setProjectData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/Project');
                if (response.data && Array.isArray(response.data)) {
                    const uniqueProjects = Array.from(new Map(response.data.map(item => [item._id, item])).values());
                    setProjectData(uniqueProjects);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const filteredProjectData = projectData.filter(project => 
        project.P_name.toLowerCase().includes(searchTerm.toLowerCase()) || project._id.includes(searchTerm)
    );

    // Filter out projects with P_status set to "ยกเลิกโครงงาน"
    const remain = filteredProjectData
        .filter(item => item.P_status !== "ยกเลิกโครงงาน") // Exclude cancelled projects
        .map(item => ({
            id: uuidv4(),
            ProjectID: item._id,
            name: item.P_name,
            members: `${item.P_S1} `,
            members2: `${item.P_S2}`,
            teacher: item.P_T,
        }));

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOpen = (project) => {
        console.log('Selected project:', project); // Debugging line
        setSelectedProject(project); // Set selected project
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProject(null);
    };

    const handleSavePopup = async () => {
        if (selectedProject) {
            const updatedData = {
                P_status: "ยกเลิกโครงงาน",
                S_match: "แยกคู่โครงงาน" // Update S_match as needed
            };
    
            try {
                await axios.put(`http://localhost:9999/Project/${selectedProject.ProjectID}`, updatedData);
                // Optionally, refresh the project data or show a success message here
                handleClose(); // Close the dialog after saving
                // Consider refetching project data here to update the display
                const response = await axios.get('http://localhost:9999/Project');
                setProjectData(response.data);
            } catch (error) {
                console.error('Error updating project:', error);
                // Handle error (e.g., show a notification)
            }
        }
    };
    
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <div>
                                <h1>รายชื่อโครงงานทั้งหมด</h1>
                                <TextField
                                    label="ค้นหา"
                                    variant="outlined"
                                    style={{ marginBottom: '20px' }}
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับที่</TableCell>
                                                <TableCell>ชื่อโครงงาน</TableCell>
                                                <TableCell>สมาชิกโครงงาน</TableCell>
                                                <TableCell>แก้ไขสมาชิกโครงงาน</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {remain.length > 0 ? (
                                                remain.map((item, index) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{`${item.members}, ${item.members2}`}</TableCell>
                                                        <TableCell>
                                                            <Button 
                                                                variant="contained" 
                                                                color="primary" 
                                                                onClick={() => handleOpen(item)} // Open dialog with the selected project data
                                                            >
                                                                แก้ไขสมาชิกโครงงาน
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4}>No data available</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Modal for displaying project details */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>รายละเอียดโครงงาน</DialogTitle>
                <DialogContent>
                    {selectedProject ? (
                        <div>
                            <Typography variant="h3"><strong>ชื่อโครงงาน:</strong> {selectedProject.name || 'ไม่มีข้อมูล'}</Typography>
                            <Typography><strong>นักเรียนคนที่ 1:</strong> {selectedProject.members || 'ไม่มีข้อมูล'}</Typography>
                            <Typography><strong>นักเรียนคนที่ 2:</strong> {selectedProject.members2 || 'ไม่มีข้อมูล'}</Typography>
                            <Typography><strong>ที่ปรึกษา:</strong> {selectedProject.teacher || 'ไม่มีข้อมูล'}</Typography>
                        </div>
                    ) : (
                        <Typography>ไม่พบข้อมูลโครงงาน</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">ปิด</Button>
                    <Button onClick={handleSavePopup} color="primary">แยกคู่โครงงาน</Button>
                </DialogActions>
            </Dialog>

        </MainCard>
    );
}

export default SeparationProject;
