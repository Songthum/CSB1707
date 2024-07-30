import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const RemainingStudentsName = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const students = [
        { StudentID: '6004062620022', name: 'สาวสวย บ้านนา', status: 'ไม่สำเร็จโปรเจค 1', link: '#' },
        { StudentID: '6104062620032', name: 'หนุ่มหล่อ ชาวสวน', status: 'ไม่สำเร็จโปรเจค 1', link: '#' },
        { StudentID: '6104062620043', name: 'อุดมณ์ สมบูรณ์', status: 'ไม่สำเร็จโปรเจค 1', link: '#' },
        { StudentID: "6204062620061", name: "กมลเนตร สืบสกุล", status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        { StudentID: "6204062620062", name: "สมร สนองใจ", status: 'ไม่สำเร็จโปรเจค 1', link: '#' },
        { StudentID: "6204062620063", name: "สงสัย ใครดี", status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        { StudentID: "6204062620064", name: "ฟ้าสวย สดใส", status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        { StudentID: "6204062620065", name: "นฤมล สุขใจ", status: 'ไม่สำเร็จโปรเจค 1' , link: '#'},
        { StudentID: "6204062620066", name: "ซีซ่า ซี๊ดซ๊าด", status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        { StudentID: "6204062620067", name: "มะหมา สุดหล่อ", status: 'ไม่สำเร็จโปรเจค 1', link: '#' },
        { StudentID: "6204062620068", name: "หนูน้อย น่ารัก", status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        { StudentID: "6204062620069", name: "สวัสดีครับ ผมนวย", status: 'ไม่สำเร็จโปรเจค 2', link: '#' },
        { StudentID: "6204062620070", name: "ไม่มี ตังค์ค่า", status: 'ไม่สำเร็จโปรเจค 1', link: '#' }
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.StudentID.includes(searchTerm)
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
                                                    <TableCell>{student.StudentID}</TableCell>
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