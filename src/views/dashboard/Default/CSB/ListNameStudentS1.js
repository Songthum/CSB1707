import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ListNameStudentS1() {
    const listStudentS1 = [
        { StudentID: '6304062620022', name: 'สาวสวย บ้านนา', StatusProject: 'กำลังดำเนินการ' },
        { StudentID: '6304062620032', name: 'หนุ่มหล่อ ชาวสวน', StatusProject: 'สำเร็จ' },
        { StudentID: '6304062620043', name: 'ใจดี ใจงาม', StatusProject: 'ไม่สำเร็จ' },
        { StudentID: "6304062620061", name: "ณัชริกา กันทะสอน", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620062", name: "ใจดี ยืมเงิน", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620063", name: "สบายดี สบายใจ", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620064", name: "สุดสวย สุดหล่อ", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620065", name: "ไอ่กล้อง ไอ่อ้วน", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620066", name: "แมวเหมียว น่ารัก", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620067", name: "มะหมา สุดหล่อ", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620068", name: "หนูน้อย น่ารัก", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620069", name: "สวัสดีครับ ผมนวย", StatusProject: 'กำลังดำเนินการ' },
        { StudentID: "6304062620070", name: "ไม่มี ตังค์ค่า", StatusProject: 'กำลังดำเนินการ' }
    ];

    const checklistData = listStudentS1.map(item => ({
        id: uuidv4(),
        ...item
    }));

    const handleButtonClick = (id) => {
        console.log(`Button clicked for item with id ${id}`);
    };

    // const [NAMES2, setNameS2] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9999/NAMES2');
    //             setNameS2(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <div>
                                <Typography sx={{ marginLeft: 80 }}>
                                    <h1>รายชื่อนักศึกษาโครงการพิเศษสองภาษา</h1>
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
                                            {checklistData.map((item, index) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{item.StudentID}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.StatusProject}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleButtonClick(item.id)}>Link</Button>
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
}

export default ListNameStudentS1;
