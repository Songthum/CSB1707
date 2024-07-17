import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const RemainingStudentsName = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const students = [
        { id: 1, code: '001', name: 'John Doe', status: 'ไม่สำเร็จโปรเจค 1', link: '#' },
        { id: 2, code: '002', name: 'Jane Smith', status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        // สามารถเพิ่มข้อมูลนักศึกษาเพิ่มเติมที่นี่
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.code.includes(searchTerm)
    );

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                <h2>รายชื่อนักศึกษา CSB ที่ตกค้าง</h2>
                                <TextField
                                    label="ค้นหา"
                                    variant="outlined"
                                    style={{ marginBottom: '20px' }}
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับ</TableCell>
                                                <TableCell>รหัสนักศึกษา</TableCell>
                                                <TableCell>ชื่อ นามสกุล</TableCell>
                                                <TableCell>สถานะโครงงาน</TableCell>
                                                <TableCell>ลิงค์</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredStudents.map((student, index) => (
                                                <TableRow key={student.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{student.code}</TableCell>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell>{student.status}</TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color="primary" href={student.link} target="_blank">ดูรายละเอียด</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
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
};

export default RemainingStudentsName;