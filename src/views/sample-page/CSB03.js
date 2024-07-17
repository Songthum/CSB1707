import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

const CSB03 = () => {
    var Project = 'ชื่อโครงงาน';
    var name_student = 'ชื่อสมาชิก';
    var name_T = 'ชื่ออาจารย์';

    const handleRejectClick = () => {
        // Perform actions when the "Reject" button is clicked
    };

    const handleAcceptClick = () => {
        // Perform actions when the "Accept" button is clicked
    };

    const [CSB03, setCSB03] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:9999/CSB03');
                setCSB03(response.data);
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
                            <Grid container direction="column" spacing={1}>
                                <Typography variant="h1">การยื่นป้องกัน โครงงานพิเศษ 2
                                    <Typography variant="subtitle1">แบบฟอร์มยินยอมสอบป้องกันโครงงานพิเศษโครงการพิเศษ (สองภาษา) <br />ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ <br />คณะวิทยาศาสตร์ประยุกต์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
                                        ข้าพเจ้ายินยอมสอบป้องกัน {Project}<br />{name_student}<br />โดยมีอาจารย์ที่ปรึกษา {name_T}
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CSB03;
