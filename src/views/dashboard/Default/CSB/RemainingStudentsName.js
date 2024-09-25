import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';

function RemainingStudentsName() {
    const [studentData, setStudentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/students');
                if (response.data && Array.isArray(response.data)) {
                    const uniqueStudents = Array.from(new Map(response.data.map(item => [item.S_id, item])).values());
                    setStudentData(uniqueStudents);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Filter students based on S_match being 'แยกคู่โครงงาน' or S_match being undefined
    const filteredStudentData = studentData.filter(student => 
        (student.S_match === 'แยกคู่โครงงาน' || !student.S_match) &&
        (student.S_name.toLowerCase().includes(searchTerm.toLowerCase()) || student.S_id.includes(searchTerm))
    );

    const remain = filteredStudentData.map(item => ({
        id: uuidv4(),
        StudentID: item.S_id,
        name: item.S_name,
    }));

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <div>
                                <h1>รายชื่อนักศึกษา CSB ที่ตกค้าง</h1>
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
                                                <TableCell>รหัสนักศึกษา</TableCell>
                                                <TableCell>ชื่อ-สกุล</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {remain.length > 0 ? (
                                                remain.map((item, index) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{item.StudentID}</TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3}>No data available</TableCell>
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

export default RemainingStudentsName;
