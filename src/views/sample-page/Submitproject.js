import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

const Submitproject = () => {
    const [PData, setPData] = useState({
        P_id: '', // Project ID
        P_name: '',
        P_details: '',
        P_status: '',
        P_CSB01: '',
        P_CSB02: '',
        P_CSB03: '',
        P_S1: '',
        P_S2: '',
        P_T: '',
        P_type: '',
        P_tool: ''
    });
    const [isExamOpen, setIsExamOpen] = useState(true); // Track exam status

    const handleRejectClick = async () => {
        const isConfirmed = window.confirm('คุณปฏิเสธที่จะสอบ CSB03 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    Exam_CSB03_status: 'ปฏิเสธ'
                });
                alert('ปฏิเสธการยื่นสอบ CSB03');
            } catch (error) {
                console.error('Error rejecting project:', error);
                alert('ไม่สามารถปฏิเสธโครงงานได้');
            }
        }
    };

    const handleAcceptClick = async () => {

        const isConfirmed = window.confirm('คุณยินยอมที่จะสอบ CSB03 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    Exam_CSB03_status: 'ยินยอม'
                });
                alert('ยินยอมการยื่นสอบ CSB03');
            } catch (error) {
                console.error('Error accepting project:', error);
                alert('ไม่สามารถอนุมัติโครงงานได้');
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const examResponse = await axios.get('http://localhost:9999/Exam');
                const examData = examResponse.data;

                
                // Fetch project data
                const projectResponse = await axios.get('http://localhost:9999/Project');
                const projectData = projectResponse.data;
                if (Array.isArray(projectData) && projectData.length > 0) {
                    const project = projectData[0]; // Adjust based on actual API response
                    setPData({
                        P_id: project._id || '',
                        P_name: project.P_name || '',
                        P_details: project.P_details || '',
                        P_status: project.P_status || '',
                        P_CSB01: project.P_CSB01 || '',
                        P_CSB02: project.P_CSB02 || '',
                        P_CSB03: project.P_CSB03 || '',
                        P_S1: project.P_S1 || '',
                        P_S2: project.P_S2 || '',
                        P_T: project.P_T || '',
                        P_type: project.P_type || '',
                        P_tool: project.P_tool || '',
                    });
                }

                // Fetch exam status

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
                                <Typography variant="h1">หนังสือรับรองการทดสอบโครงงานพิเศษ
                                    <Typography variant="subtitle1">
                                        ขออนุมัติการทดสอบโครงงานพิเศษ <br />
                                        นักศึกษาโครงการพิเศษ (สองภาษา) ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ 
                                        คณะวิทยาศาสตร์ประยุกต์ได้จัดทําโครงงานพิเศษ <br />
                                        เรื่อง {PData.P_name} <br />
                                        นักศึกษาคนที่ 1: {PData.P_S1}<br />
                                        นักศึกษาคนที่ 2: {PData.P_S2}<br />
                                        โดยมีอาจารย์ที่ปรึกษา {PData.P_T}
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Button variant="contained" color="error" onClick={handleRejectClick}>
                                                    ปฏิเสธการยื่นทดสอบโครงงานพิเศษ
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="success" onClick={handleAcceptClick}>
                                                    ยื่นทดสอบโครงงานพิเศษ
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

export default Submitproject;
