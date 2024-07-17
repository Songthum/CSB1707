import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import InputScoreCSB02 from './InputScoreCSB02'
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function AppTest() {
    const [tableData, setTableData] = useState([
        { id: 1, name: 'จัดการการสอบโครงงานพิเศษ', link: 'path/to/file1.txt', isDisabled: false, isRed: false },
        { id: 2, name: 'จัดการการยื่นจบการศึกษา', link: 'path/to/file2.txt', isDisabled: false, isRed: false },
        { id: 3, name: 'จัดการการใช้บริการฟิตเนส', link: 'path/to/file3.txt', isDisabled: false, isRed: false }
    ]);

    const [openPopup, setOpenPopup] = useState(false);
    //   const [popupText, setPopupText] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const handleLinkClick = (index) => {
        setOpenPopup(true);
        setSelectedRow(index);
    };

    const handleSavePopup = () => {
        setOpenPopup(false);
        // Perform save action here, for now just changing row color
        const updatedData = [...tableData];
        updatedData[selectedRow].isRed = false;
        updatedData[selectedRow].isDisabled = true;
        setTableData(updatedData);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleRedRow = (index) => {
        const updatedData = [...tableData];
        updatedData[index].isRed = true;
        updatedData[index].isDisabled = true;
        setTableData(updatedData);
    };

    const handleDisableRow = (index) => {
        const updatedData = [...tableData];
        updatedData[index].isDisabled = true;
        setTableData(updatedData);
    };

    const handleDonNotGoAny = () => {
        const updatedData = tableData.map(row => ({ ...row, isRed: true, isDisabled: true }));
        setTableData(updatedData);
    };


    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <div>
                                <h1>ประเมินการสอบโครงงานพิเศษ</h1>
                                <Button onClick={handleDonNotGoAny} variant="contained" color="error">ไม่เข้าร่วมประเมินทั้งหมด</Button>
                                <Dialog
                                    open={openPopup}
                                    onClose={handleClosePopup}
                                    maxWidth='xl'
                                    fullWidth
                                >
                                    <DialogTitle>ประเมินการสอบโครงงานพิเศษ</DialogTitle>
                                    <DialogContent sx={{ minWidth: 1000 }}>
                                        <InputScoreCSB02 />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleSavePopup} color="primary">Save</Button>
                                        <Button onClick={handleClosePopup} color="secondary">Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับที่</TableCell>
                                                <TableCell>ชื่อโครงงาน</TableCell>
                                                <TableCell>ประเมินการสอบโครงงานพิเศษ</TableCell>
                                                <TableCell>ไม่ประสงค์ลงคะแนนสอบ</TableCell>
                                                <TableCell>ไม่เข้าประเมินการสอบ</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData.map((row, index) => (
                                                <TableRow key={index} style={{ backgroundColor: row.isRed ? 'lightcoral' : row.isDisabled ? 'lightgrey' : 'inherit' }}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleLinkClick(index)} variant="outlined" disabled={row.isDisabled}>ประเมิน</Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleDisableRow(index)} variant="outlined" disabled={row.isDisabled || row.isRed}>ไม่ประสงค์ลงคะแนน</Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleRedRow(index)} variant="outlined" disabled={row.isDisabled || row.isRed}>ไม่เข้าร่วมประเมิน</Button>
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

export default AppTest;
