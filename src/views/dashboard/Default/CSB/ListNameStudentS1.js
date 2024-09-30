import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ListNameStudentS1() {
    const [projects, setProjects] = useState([]);
    const [examResults, setExamResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch both Project and Exam results data
        const fetchProjects = axios.get('http://localhost:9999/Project');
        const fetchExamResults = axios.get('http://localhost:9999/Exam_results');

        Promise.all([fetchProjects, fetchExamResults])
            .then(([projectResponse, examResultsResponse]) => {
                setProjects(projectResponse.data); // Assuming the data is an array of projects
                setExamResults(examResultsResponse.data); // Assuming the data is an array of exam results
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Filter projects based on matching P_name with Er_Pname and Er_CSB01_status being "ผ่าน"
    const filteredProjects = projects.filter(project => {
        // Find matching exam result where P_name matches Er_Pname
        const matchingExamResult = examResults.find(result => result.Er_Pname === project.P_name);
        // Return the project only if the matching exam result has Er_CSB01_status === "ผ่าน"
        return matchingExamResult && matchingExamResult.Er_CSB01_status === "ผ่าน";
    });

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography variant="h1" sx={{ textAlign: 'center' }}>
                        รายชื่อนักศึกษาโครงการพิเศษสองภาษา
                    </Typography><br/>

                    {loading ? (
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading...</Typography>
                    ) : error ? (
                        <Typography variant="h6" color="error">{error}</Typography>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ลำดับที่</TableCell>
                                        <TableCell>โครงงาน</TableCell>
                                        <TableCell>นักศึกษาคนที่ 1</TableCell>
                                        <TableCell>นักศึกษาคนที่ 2</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredProjects.map((project, index) => (
                                        <TableRow key={uuidv4()}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{project.P_name}</TableCell>
                                            <TableCell>{project.P_S1}</TableCell>
                                            <TableCell>{project.P_S2}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ListNameStudentS1;
