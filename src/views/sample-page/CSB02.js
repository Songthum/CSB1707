// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, Button, Grid } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';

// const CSB02 = () => {
//     const [PData, setPData] = useState({
//         P_id: '', // Project ID
//         P_name: '',
//         P_details: '',
//         P_status: '',
//         P_CSB01: '',
//         P_CSB02: '',
//         P_CSB03: '',
//         P_S1: '',
//         P_S2: '',
//         P_T: '',
//         P_type: '',
//         P_tool: ''
//     });

//     const handleRejectClick = async () => {
//         const isConfirmed = window.confirm('คุณปฏิเสธที่จะสอบ CSB02 ใช่หรือไม่?');
//         if (isConfirmed) {
//             try {
//                 await axios.put(`http://localhost:9999/Exam/${PData.P_id}`, {
//                     Exam_CSB02_status: 'ปฏิเสธ'
//                 });
//                 alert('ปฏิเสธการยื่นสอบ CSB02');
//             } catch (error) {
//                 console.error('Error rejecting project:', error.response ? error.response.data : error.message);
//                 alert('ไม่สามารถปฏิเสธการสอบ CSB02 ได้');
//             }
//         }
//     };
    
//     const handleAcceptClick = async () => {
//         const isConfirmed = window.confirm('คุณยินยอมที่จะสอบ CSB02 ใช่หรือไม่?');
//         if (isConfirmed) {
//             try {
//                 await axios.put(`http://localhost:9999/Exam/${PData.P_id}`, {
//                     Exam_CSB02_status: 'ยินยอม'
//                 });
//                 alert('ยินยอมการยื่นสอบ CSB02');
//             } catch (error) {
//                 console.error('Error accepting project:', error.response ? error.response.data : error.message);
//                 alert('ไม่สามารถอนุมัติโครงงานได้');
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:9999/Project');
//                 const data = response.data;

//                 // Assuming the API returns an array of projects and we want the first project
//                 if (Array.isArray(data) && data.length > 0) {
//                     const project = data[0]; // Adjust based on actual API response
//                     setPData({
//                         P_id: project._id || '', // Set the ID here (adjust field name as needed)
//                         P_name: project.P_name || '',
//                         P_details: project.P_details || '',
//                         P_status: project.P_status || '',
//                         P_CSB01: project.P_CSB01 || '',
//                         P_CSB02: project.P_CSB02 || '',
//                         P_CSB03: project.P_CSB03 || '',
//                         P_S1: project.P_S1 || '',
//                         P_S2: project.P_S2 || '',
//                         P_T: project.P_T || '',
//                         P_type:  project.P_type || '',
//                         P_tool:  project.P_tool || '',
//                     });
//                 } else {
//                     console.error('Unexpected API response:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <MainCard>
//             <Grid container spacing={gridSpacing}>
//                 <Grid item xs={12}>
//                     <Grid container alignItems="center" justifyContent="space-between">
//                         <Grid item>
//                             <Grid container direction="column" spacing={1}></Grid>
//                             <div>
//                                 <Typography variant="h1">
//                                     การยื่นก้าวหน้า โครงงานพิเศษ 1
//                                     <Typography variant="subtitle1">
//                                         แบบฟอร์มยินยอมสอบก้าวหน้าโครงงานพิเศษ (สองภาษา) <br />
//                                         ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ <br />
//                                         คณะวิทยาศาสตร์ประยุกต์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ<br />
//                                         ข้าพเจ้ายินยอมสอบก้าวหน้า {PData.P_name}<br />
//                                         นักศึกษาคนที่ 1: {PData.P_S1}<br />
//                                         นักศึกษาคนที่ 2: {PData.P_S2}<br />
//                                         โดยมีอาจารย์ที่ปรึกษา {PData.P_T}
//                                         <Grid container spacing={2}>
//                                             <Grid item>
//                                                 <Button variant="contained" color="error" onClick={handleRejectClick}>
//                                                     ปฏิเสธ
//                                                 </Button>
//                                             </Grid>
//                                             <Grid item>
//                                                 <Button variant="contained" color="success" onClick={handleAcceptClick}>
//                                                     ยินยอม
//                                                 </Button>
//                                             </Grid>
//                                         </Grid>
//                                     </Typography>
//                                 </Typography>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </MainCard>
//     );
// };

// export default CSB02;

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
        ExamStatus: '' // Status from Exam_results
    });
    const [isExamOpen, setIsExamOpen] = useState(false); // State to track if Exam_o_CSB02 is open

    // Function to handle rejection
    const handleRejectClick = async () => {
        const isConfirmed = window.confirm('คุณปฏิเสธที่จะสอบ CSB02 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                await axios.post(`http://localhost:9999/Exam`, {
                    P_id: PData.P_id,
                    Exam_id: '',
                    Exam_name: '',
                    Exam_room: '',
                    Exam_o_CSB01: '',
                    Exam_o_CSB02: '',
                    Exam_o_CSB03: '',
                    Exam_CSB01_status: '',
                    Exam_CSB02_status: 'ปฏิเสธ',
                    Exam_CSB03_status: ''
                });
                alert('ปฏิเสธการยื่นสอบ CSB02');
            } catch (error) {
                console.error('Error rejecting project:', error.response ? error.response.data : error.message);
                alert('ไม่สามารถปฏิเสธการสอบ CSB02 ได้');
            }
        }
    };

    // Function to handle acceptance
    const handleAcceptClick = async () => {
        const isConfirmed = window.confirm('คุณยินยอมที่จะสอบ CSB02 ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                await axios.post(`http://localhost:9999/Exam`, {
                    P_id: PData.P_id,
                    Exam_id: '',
                    Exam_name: '',
                    Exam_room: '',
                    Exam_o_CSB01: '',
                    Exam_o_CSB02: '',
                    Exam_o_CSB03: '',
                    Exam_CSB01_status: '',
                    Exam_CSB02_status: 'ยินยอม',
                    Exam_CSB03_status: ''
                });
                alert('ยินยอมการยื่นสอบ CSB02');
            } catch (error) {
                console.error('Error accepting project:', error.response ? error.response.data : error.message);
                alert('ไม่สามารถอนุมัติโครงงานได้');
            }
        }
    };

    // Fetch data from the Project and Exam_results APIs
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Exam status data
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

                // Fetch Project data
                const projectResponse = await axios.get('http://localhost:9999/Project');
                const projectData = projectResponse.data;

                // Fetch Exam results data
                const examResultsResponse = await axios.get('http://localhost:9999/Exam_results');
                const examResultsData = examResultsResponse.data;

                if (Array.isArray(projectData) && projectData.length > 0) {
                    const project = projectData[0]; // Adjust based on actual API response

                    // Find the corresponding exam result by P_id
                    const examResult = examResultsData.find(
                        (result) => result.P_id === project._id
                    );

                    setPData({
                        P_id: project._id || '',
                        P_name: project.P_name || '',
                        P_S1: project.P_S1 || '',
                        P_S2: project.P_S2 || '',
                        P_T: project.P_T || '',
                        ExamStatus: examResult ? examResult.Exam_CSB02_status : ''
                    });
                } else {
                    console.error('Unexpected API response:', projectData);
                }
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
                                            {isExamOpen && (
                                                <>
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
                                                </>
                                            )}
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
