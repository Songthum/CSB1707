import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ListNameStudentS2() {
    const [studentData, setStudentData] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsResponse, projectsResponse] = await Promise.all([
                    axios.get('http://localhost:9999/students'),
                    axios.get('http://localhost:9999/Project')
                ]);

                if (studentsResponse.data && Array.isArray(studentsResponse.data)) {
                    const uniqueStudents = Array.from(new Map(studentsResponse.data.map(item => [item.S_id, item])).values());
                    setStudentData(uniqueStudents); // Store all student data
                }

                if (projectsResponse.data && Array.isArray(projectsResponse.data)) {
                    setProjects(projectsResponse.data); // Store project data
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Find the project status for each student
    const findProjectStatus = (studentId) => {
        const project = projects.find(project => project.P_S1 === studentId || project.P_S2 === studentId);
        return project ? project.P_status : '';
    };

    // Filter students based on the absence of P_CSB03 value in projects and S_T_SP1 status being 'ผ่าน'
    const filteredStudentData = studentData.filter(student => {
        const studentInProject = projects.find(project => project.P_S1 === student.S_id || project.P_S2 === student.S_id);
        return (
            (!studentInProject || !studentInProject.P_CSB03) && student.S_T_SP2 === 'ผ่าน' && student.S_T_SP1 === 'ผ่าน'
        );
    });

    const checklistData = filteredStudentData.map(item => ({
        id: uuidv4(),
        StudentID: item.S_id,
        name: item.S_name,
        StatusProject: findProjectStatus(item.S_id)
    }));

    const handleButtonClick = (id) => {
        console.log(`Button clicked for item with id ${id}`);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <div>
                                <Typography variant="h1" sx={{ marginLeft: "center" }}>
                                    รายชื่อนักศึกษาโครงการพิเศษสองภาษา
                                </Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับที่</TableCell>
                                                <TableCell>รหัสนักศึกษา</TableCell>
                                                <TableCell>ชื่อ-สกุล</TableCell>
                                                <TableCell>สถานะโครงงาน</TableCell>
                                                <TableCell>รายละเอียดเพิ่มเติม</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {checklistData.length > 0 ? (
                                                checklistData.map((item, index) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{item.StudentID}</TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.StatusProject}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => handleButtonClick(item.id)}>Link</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5}>No data available</TableCell>
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
        </MainCard>
    );
}

export default ListNameStudentS2;
