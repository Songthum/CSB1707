import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function ListNameStudentS2() {
    const checklistData = [
        { id: 1, StudentID: '6304062620022', name: 'สาวสวย บ้านนา', StatusProject: 'กำลังดำเนินการ', },
        { id: 2, StudentID: '6304062620032', name: 'หนุ่มหล่อ ชาวสวน', StatusProject: 'สำเร็จ', },
        { id: 3, StudentID: '6304062620043', name: 'ใจดี ใจงาม', StatusProject: 'ไม่สำเร็จ', },
        // Add more checklist items as needed
    ];

    const handleButtonClick = (id) => {
        // Handle button click, e.g., redirect to another page
        console.log(`Button clicked for item with id ${id}`);
        // window.location.href = "https://example.com"; // Uncomment to redirect to a URL
    };

    const [NAMES2, setNameS2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/NAMES2');
                setNameS2(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                                            {checklistData.map(item => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.id}</TableCell>
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

export default ListNameStudentS2;