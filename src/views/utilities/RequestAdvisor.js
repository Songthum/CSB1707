import React, { useState, useEffect } from 'react';
import { Button, TableCell, TableContainer, Table, TableHead, TableBody, TableRow, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function RequestAdvisor() {
    const [tableData, setTableData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [openAcceptedAdvisorDialog, setOpenAcceptedAdvisorDialog] = useState(false); 
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentAction, setCurrentAction] = useState(null); // 'accept' or 'reject'

    useEffect(() => {
        fetch('http://localhost:9999/Project')
            .then(response => response.json())
            .then(data => {
                // Filter out projects where P_status is 'กำลังดำเนินการ' or 'ไม่มีที่ปรึกษา'
                const filteredData = data.filter(project => project.P_status !== 'กำลังดำเนินการ' && project.P_status !== 'ไม่มีที่ปรึกษา');
                console.log('Fetched and filtered project data:', filteredData); 
                setTableData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePopupClick = (project) => {
        setSelectedProject(project);
        setOpenPopup(true);
    };

    const handlePopupClose = () => {
        setOpenPopup(false);
        setSelectedProject(null);
    };

    const handleOpenAcceptDialog = (project) => {
        console.log('Opening accept dialog with project:', project);
        setSelectedProject(project);
        setCurrentAction('accept');
        setOpenAcceptDialog(true);
    };
    
    const handleOpenRejectDialog = (project) => {
        console.log('Opening reject dialog with project:', project);
        setSelectedProject(project);
        setCurrentAction('reject');
        setOpenRejectDialog(true);
    };
    
    const handleCloseAcceptDialog = () => {
        setOpenAcceptDialog(false);
        setSelectedProject(null);
    };

    const handleCloseRejectDialog = () => {
        setOpenRejectDialog(false);
        setSelectedProject(null);
    };

    const handleConfirmAccept = () => {
        if (selectedProject && selectedProject._id) {
            console.log(`Accept advisor for project ID: ${selectedProject._id}`);
            
            const url = `http://localhost:9999/Project/${selectedProject._id}`;
            fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    P_status: 'กำลังดำเนินการ',
                    P_T: selectedProject.P_T, 
                }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(() => {
                setTableData(prevData => prevData.filter(project => project._id !== selectedProject._id));
                handleCloseAcceptDialog();
                setOpenAcceptedAdvisorDialog(true);
            })
            .catch(error => {
                console.error('Error updating project status:', error);
            });
        } else {
            console.error('Selected project or project ID is missing');
        }
    };
    
    const handleConfirmReject = () => {
        if (selectedProject && selectedProject._id) {
            console.log(`Reject advisor for project ID: ${selectedProject._id}`);
            
            const url = `http://localhost:9999/Project/${selectedProject._id}`;
            fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    P_T: '', 
                    P_status: 'ไม่มีที่ปรึกษา', // Set status to 'ไม่มีที่ปรึกษา'
                }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(() => {
                setTableData(prevData => prevData.filter(project => project._id !== selectedProject._id));
                handleCloseRejectDialog();
            })
            .catch(error => {
                console.error('Error updating project:', error);
            });
        } else {
            console.error('Selected project or project ID is missing');
        }
    };

    const handleCloseAcceptedAdvisorDialog = () => {
        setOpenAcceptedAdvisorDialog(false);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <div>
                                <h1>สถานะคำร้องขอเป็นอาจารย์ที่ปรึกษา</h1>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับที่</TableCell>
                                                <TableCell>ชื่อโครงงาน</TableCell>
                                                <TableCell>นักศึกษาคนที่ 1</TableCell>
                                                <TableCell>นักศึกษาคนที่ 2</TableCell>
                                                <TableCell>รายละเอียดโครงงาน</TableCell>
                                                <TableCell>การตอบสนอง</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData.length > 0 ? (
                                                tableData.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.P_name}</TableCell>
                                                        <TableCell>{row.P_S1}</TableCell>
                                                        <TableCell>{row.P_S2}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => handlePopupClick(row)}>ดูรายละเอียด</Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => handleOpenAcceptDialog(row)}>รับเป็นที่ปรึกษา</Button>
                                                            <Button onClick={() => handleOpenRejectDialog(row)}>ไม่รับเป็นที่ปรึกษา</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center">
                                                        No data available
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Dialog open={openPopup} onClose={handlePopupClose}>
                                    <DialogContent>
                                        {selectedProject ? (
                                            <div>
                                                <h2>ชื่อโครงงาน <br /><br />{selectedProject.P_name}</h2><br />
                                                <h3>รายละเอียดโครงงาน<br /><br />{selectedProject.P_details}</h3><br />
                                                <p>{selectedProject.P_type}</p>
                                                <h3>เครื่องมือที่ใช้<br /><br />{selectedProject.P_tool}</h3>
                                            </div>
                                        ) : (
                                            'No project details available'
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handlePopupClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={openAcceptDialog} onClose={handleCloseAcceptDialog}>
                                    <DialogTitle>ยืนยันการรับเป็นที่ปรึกษา</DialogTitle>
                                    <DialogContent>
                                        คุณยินยอมเป็นที่ปรึกษาโครงการนี้ใช่หรือไม่?
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseAcceptDialog}>ยกเลิก</Button>
                                        <Button onClick={handleConfirmAccept}>ยืนยัน</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}>
                                    <DialogTitle>ยืนยันการไม่รับเป็นที่ปรึกษา</DialogTitle>
                                    <DialogContent>
                                        คุณไม่ยินยอมเป็นที่ปรึกษาโครงการนี้ใช่หรือไม่?
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseRejectDialog}>ยกเลิก</Button>
                                        <Button onClick={handleConfirmReject}>ยืนยัน</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={openAcceptedAdvisorDialog} onClose={handleCloseAcceptedAdvisorDialog}>
                                    <DialogTitle>การรับเป็นที่ปรึกษาสำเร็จ</DialogTitle>
                                    <DialogContent>
                                        คุณได้ตกลงรับเป็นที่ปรึกษาโครงการนี้เรียบร้อยแล้ว
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseAcceptedAdvisorDialog}>ปิด</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default RequestAdvisor;
