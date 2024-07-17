import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const CSB02 = () => {
    var Project = 'ชื่อโครงงาน'
    var name_student = 'ชื่อสมาชิก'
    var name_T = 'ชื่ออาจารย์'

    const handleRejectClick = () => {
        // เมื่อคลิกที่ปุ่ม "ปฏิเสธ"
        // ทำสิ่งที่ต้องการเมื่อคลิกที่ปุ่มปฏิเสธที่นี่
    };

    const handleAcceptClick = () => {
        // เมื่อคลิกที่ปุ่ม "ยินยอม"
        // ทำสิ่งที่ต้องการเมื่อคลิกที่ปุ่มยินยอมที่นี่
    };

    const [CSB02, setCSB02] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:9999/CSB02');
                setCSB02(response.data);
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
                                <Typography variant="h1">การยื่นก้าวหน้า โครงงานพิเศษ 1
                                    <Typography variant="subtitle1">แบบฟอร์มยินยอมสอบก้าวหน้าโครงงานพิเศษ (สองภาษา) <br />ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ <br />คณะวิทยาศาสตร์ประยุกต์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
                                        ข้าพเจ้ายินยอมสอบก้าวหน้า {Project}<br />{name_student}<br />โดยมีอาจารย์ที่ปรึกษา {name_T}
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Button variant="contained" color="error" onClick={handleRejectClick}>
                                                    ปฏิเสธ
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="success" onClick={handleAcceptClick}>
                                                    ยินยอม
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CSB02;