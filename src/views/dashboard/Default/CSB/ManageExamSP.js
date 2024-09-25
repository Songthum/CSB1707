import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function ManageExamSP() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    useEffect(() => {
        // Load the state from localStorage
        const savedOpen1 = localStorage.getItem('open1') === 'true';
        const savedOpen2 = localStorage.getItem('open2') === 'true';
        const savedOpen3 = localStorage.getItem('open3') === 'true';

        setOpen1(savedOpen1);
        setOpen2(savedOpen2);
        setOpen3(savedOpen3);
    }, []);

    useEffect(() => {
        // Save the state to localStorage
        localStorage.setItem('open1', open1);
        localStorage.setItem('open2', open2);
        localStorage.setItem('open3', open3);
    }, [open1, open2, open3]);

    const handleConfirm = async () => {
        const examData = {
            Exam_o_CSB01: open1 ? 'เปิด' : 'ปิด',
            Exam_o_CSB02: open2 ? 'เปิด' : 'ปิด',
            Exam_o_CSB03: open3 ? 'เปิด' : 'ปิด',
        };

        try {
            // Make PUT request to the API
            const response = await fetch('http://localhost:9999/Exam', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Construct the message to display
            let message = "";
            message += `การสอบหัวข้อ: ${examData.Exam_o_CSB01}\n`;
            message += `การสอบก้าวหน้า: ${examData.Exam_o_CSB02}\n`;
            message += `การสอบป้องกัน: ${examData.Exam_o_CSB03}`;

            // Show dialog with the response message
            setDialogMessage(message);
            setDialogOpen(true);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setDialogMessage('An error occurred while updating the exam status.');
            setDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <Box sx={{ marginLeft: 40 }}>
                                <Typography sx={{ marginLeft: 30 }}>
                                    <h1>จัดการการยื่นสอบ</h1>
                                </Typography>

                                <Box sx={{ marginTop: 2 }}>
                                    <FormControlLabel
                                        control={<Switch checked={open1} onChange={() => setOpen1(!open1)} />}
                                        label=" การสอบหัวข้อ"
                                    />
                                </Box>

                                <Box sx={{ marginTop: 2 }}>
                                    <FormControlLabel
                                        control={<Switch checked={open2} onChange={() => setOpen2(!open2)} />}
                                        label=" การสอบก้าวหน้า"
                                    />
                                </Box>

                                <Box sx={{ marginTop: 2 }}>
                                    <FormControlLabel
                                        control={<Switch checked={open3} onChange={() => setOpen3(!open3)} />}
                                        label=" การสอบป้องกัน"
                                    />
                                </Box>

                                <Box>
                                    <Button sx={{ marginTop: 5, marginLeft: 30, marginRight: 10 }} variant="contained" onClick={handleConfirm}>
                                        Confirm
                                    </Button>
                                </Box>

                                <Dialog
                                    open={dialogOpen}
                                    onClose={handleCloseDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">Exam Status Notification</DialogTitle>
                                    <DialogContent>
                                        <Typography id="alert-dialog-description">
                                            {dialogMessage}
                                        </Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ManageExamSP;
