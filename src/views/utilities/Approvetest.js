import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

const Approvetest = () => {
    const [PData, setPData] = useState({
        P_id: '', // Project ID
        P_name: '',
        P_S1: '',
        P_S2: '',
        P_T: '',
        P_CSB04: '' // Add this field to store the status
    });

    // Fetch project data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Project data
                const projectResponse = await axios.get('http://localhost:9999/Project');
                const projectData = projectResponse.data;

                if (Array.isArray(projectData) && projectData.length > 0) {
                    const project = projectData[0]; // Adjust based on actual API response

                    setPData({
                        P_id: project._id ,
                        P_name: project.P_name ,
                        P_S1: project.P_S1 ,
                        P_S2: project.P_S2 ,
                        P_T: project.P_T ,
                        P_CSB04: project.P_CSB04  // Store the project status
                    });
                } else {
                    console.error('Unexpected API response:', projectData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Add empty dependency array to run once on mount

    const handleRejectClick = async () => {
            try {
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    P_CSB04: 'ไม่ผ่านการอนุมัติจากอาจารย์ที่ปรึกษา' // Marking project as rejected
                });

                alert('ไม่อนุมัติการยื่นทดสอบ CSB04 สำเร็จ');
            } catch (error) {
                console.error('Error rejecting project:', error.response ? error.response.data : error.message);
                alert('ไม่สามารถอนุมัติปฏิเสธการยื่นทดสอบ CSB04 ได้');
            }
    };

    const handleAcceptClick = async () => {
            try {
                // Update P_CSB04 for the project
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    P_CSB04: 'ผ่านการอนุมัติจากอาจารย์ที่ปรึกษา' // Marking project as accepted
                });

                alert('อนุมัติการยื่นทดสอบ CSB04 สำเร็จ');
            } catch (error) {
                console.error('Error accepting project and updating P_CSB04:', error.response ? error.response.data : error.message);
                alert('ไม่สามารถอนุมัติโครงงานและอัปเดตสถานะได้');
            }
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} justifyContent="center">
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                            <Grid container direction="column" spacing={1} alignItems="center">
                                <Typography variant="h1" align="center">
                                    หนังสือรับรองการทดสอบโครงงานพิเศษ
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    ขออนุมัติการทดสอบโครงงานพิเศษ <br />
                                    นักศึกษาโครงการพิเศษ (สองภาษา) <br />
                                    ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ <br />
                                    จัดทําโครงงานพิเศษ เรื่อง {PData.P_name} <br />
                                    นักศึกษาคนที่ 1: {PData.P_S1}<br />
                                    นักศึกษาคนที่ 2: {PData.P_S2}<br />
                                    โดยมีอาจารย์ที่ปรึกษา {PData.P_T}
                                    <Grid container spacing={2} justifyContent="center" marginTop={2}>
                                        <Grid item>
                                            <Button variant="contained" color="error" onClick={handleRejectClick}>
                                                ปฏิเสธการยื่นทดสอบโครงงานพิเศษ
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="success" onClick={handleAcceptClick}>
                                                อนุมัติการยื่นทดสอบโครงงานพิเศษ
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Approvetest;
