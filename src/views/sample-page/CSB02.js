import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

const CSB02 = () => {
    const [PData, setPData] = useState({
        P_id: '', // Project ID
        P_name: '',
        P_details: '',
        P_status: '',
        P_CSB01: '',
        P_CSB02: '',
        P_CSB03: '',
        P_CSB04: '',
        P_S1: '',
        P_S2: '',
        P_T: '',
        P_type: '',
        P_tool: ''
    });
    const [isExamOpen, setIsExamOpen] = useState(true); // Track exam status

    const handleRejectClick = async () => {
        if (!isExamOpen) {
            alert('ไม่สามารถปฏิเสธได้ เนื่องจากไม่ได้อยู่ในช่วงการยื่นก้าวหน้า');
            return;
        }
        
        const isConfirmed = window.confirm('คุณปฏิเสธที่จะสอบ CSB02 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    P_CSB02: 'ปฏิเสธ'
                });
                alert('ปฏิเสธการยื่นสอบ CSB02');
            } catch (error) {
                console.error('Error rejecting project:', error);
                alert('ไม่สามารถปฏิเสธโครงงานได้');
            }
        }
    };

    const handleAcceptClick = async () => {
        if (!isExamOpen) {
            alert('ไม่สามารถอนุมัติโครงการได้ เนื่องจากไม่ได้อยู่ในช่วงการยื่นก้าวหน้าข');
            return;
        }

        const isConfirmed = window.confirm('คุณยินยอมที่จะสอบ CSB02 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:9999/Project/${PData.P_id}`, {
                    P_CSB02: 'ยินยอม'
                });
                alert('ยินยอมการยื่นสอบ CSB02');
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

                // Check the status of Exam_o_CSB02
                const examCSB02 = examData.find(exam => exam.Exam_o_CSB02 !== undefined);
                if (examCSB02 && examCSB02.Exam_o_CSB02 === 'เปิด') {
                    setIsExamOpen(true);
                } else {
                    setIsExamOpen(false);
                    alert('ไม่ได้อยู่ในช่วงยื่นสอบก้าวหน้า');
                    return; // Exit if the exam is not open
                }
                
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
                        P_CSB04: project.P_CSB04 || '',
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
                                <Typography variant="h1">การยื่นป้องกัน โครงงานพิเศษ 2
                                    <Typography variant="subtitle1">
                                        แบบฟอร์มยินยอมสอบป้องกันโครงงานพิเศษโครงการพิเศษ (สองภาษา) <br />
                                        ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ <br />
                                        คณะวิทยาศาสตร์ประยุกต์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
                                        ข้าพเจ้ายินยอมสอบป้องกัน {PData.P_name}<br />
                                        นักศึกษาคนที่ 1: {PData.P_S1}<br />
                                        นักศึกษาคนที่ 2: {PData.P_S2}<br />
                                        โดยมีอาจารย์ที่ปรึกษา {PData.P_T}
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

export default CSB02;
