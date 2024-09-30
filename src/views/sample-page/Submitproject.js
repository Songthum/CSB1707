import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const CSB02 = () => {
   
    const [PData, setPData] = useState({
        P_id: '', // Project ID
        P_name: '',
        P_S1: '',
        P_S2: '',
        P_T: '',
        P_CSB04: '' // Add this field to store the status
    });

    // Function to handle rejection
    const handleRejectClick = async () => {
        const isConfirmed = window.confirm('คุณปฏิเสธที่จะยื่นทดสอบ CSB04 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    P_CSB04: 'ปฏิเสธโดยนักศึกษา' // Marking project as rejected
                });

                alert('ปฏิเสธการยื่นทดสอบ CSB04 สำเร็จ');
            } catch (error) {
                console.error('Error rejecting project:', error.response ? error.response.data : error.message);
                alert('ไม่สามารถปฏิเสธยื่นทดสอบ CSB04 ได้');
            }
        }
    };

    // Function to handle acceptance and update P_CSB02
    const handleAcceptClick = async () => {
        const isConfirmed = window.confirm('คุณยินยอมที่จะยื่นทดสอบ ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                // Update P_CSB02 for the project
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    P_CSB04: 'ยินยอมโดยนักศึกษา' // Marking project as accepted
                });

                alert('ยินยอมการยื่นทดสอบ CSB04 สำเร็จ');
               
            } catch (error) {
                console.error('Error accepting project and updating P_CSB04:', error.response ? error.response.data : error.message);
                alert('ไม่สามารถอนุมัติโครงงานและอัปเดตสถานะได้');
            }
        }
    };

    // Fetch data from the Project API
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

                    // Check project status and redirect if already accepted or rejected
                } else {
                    console.error('Unexpected API response:', projectData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    });

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <div>
                                <Typography variant="h1">
                                    การยื่นก้าวหน้า โครงงานพิเศษ 1
                                    <Typography variant="subtitle1">
                                        แบบฟอร์มยินยอมสอบก้าวหน้าโครงงานพิเศษ (สองภาษา) <br />
                                        ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ <br />
                                        คณะวิทยาศาสตร์ประยุกต์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
                                        ข้าพเจ้ายินยอมสอบก้าวหน้า {PData.P_name}<br />
                                        นักศึกษาคนที่ 1: {PData.P_S1}<br />
                                        นักศึกษาคนที่ 2: {PData.P_S2}<br />
                                        โดยมีอาจารย์ที่ปรึกษา {PData.P_T} <br />
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
