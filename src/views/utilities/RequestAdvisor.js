import React, { useState } from 'react';
import { Button, TableCell, TableContainer, Table, TableHead, TableBody, TableRow, Select, MenuItem, TextField, Dialog, DialogContent, DialogActions } from '@mui/material';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function RequestAdvisor() {
    const ProjectCSB = [
        {
            "ID": "CSB1-01",
            "Name": "ระบบจัดการการยื่นจบสำหรับโครงการพิเศษสองภาษา",
            "Option": "อำนวยความสะดวกในการยื่นจบ"
        },
        {
            "ID": "CSB1-02",
            "Name": "ระบบจัดการการสอบโครงงานพิเศษสำหรับโครงการพิเศษสองภาษา",
            "Option": "อำนวยความสะดวกในการยื่นสอบจบ"
        },
    ]

    const [tableData, setTableData] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    //const [selectedRowId, setSelectedRowId] = useState(null);

    const handlePopupClick = () => {
        setOpenPopup(true);
        //setSelectedRowId(id);
    };

    const handlePopupClose = () => {
        setOpenPopup(false);
    };

    const handleSaveClick = (id) => {
        const newData = tableData.map(row => {
            if (row.id === id) {
                // Save logic goes here
                console.log(`Save button clicked for row ${id}`);
                return { ...row, isEditable: false };
            }
            return row;
        });
        setTableData(newData);
        setOpenPopup(false);
    };

    const handleOptionChange = (id, event) => {
        const newData = tableData.map(row => {
            if (row.id === id) {
                // Update option logic goes here
                console.log(`Option changed for row ${id}: ${event.target.value}`);
                return { ...row, col4: event.target.value };
            }
            return row;
        });
        setTableData(newData);
    };

    const handleTextChange = (id, event) => {
        const newData = tableData.map(row => {
            if (row.id === id) {
                // Update text logic goes here
                console.log(`Text changed for row ${id}: ${event.target.value}`);
                return { ...row, col5: event.target.value };
            }
            return row;
        });
        setTableData(newData);
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
                                                <TableCell>รายละเอียดโดยย่อ</TableCell>
                                                <TableCell>สถานะอนุมัติเป็นที่ปรึกษา</TableCell>
                                                <TableCell>หมายเหตุ</TableCell>
                                                <TableCell>บันทึก</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData.length > 0 ? (
                                                tableData.map(row => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.col1}</TableCell>
                                                        <TableCell>{row.col2}</TableCell>
                                                        <TableCell>
                                                            {row.col3}
                                                            {/* <Button disabled={!row.isEditable} onClick={() => handlePopupClick(row.id)}>Popup</Button> /}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select value={row.col4} onChange={(e) => handleOptionChange(row.id, e)} disabled={!row.isEditable}>
                                                                <MenuItem value="Option 1">ยินยอม</MenuItem>
                                                                <MenuItem value="Option 2">ไม่ยินยอม</MenuItem>
                                                                {/ Add more options as needed */}
                                                                {/* </Select> */}
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField value={row.col5} onChange={(e) => handleTextChange(row.id, e)} disabled={!row.isEditable} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button disabled={!row.isEditable} onClick={() => handleSaveClick(row.id)}>Save</Button>
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
                                        รายละเอียดโดยย่อของโครงงานที่จะแสดงในนี้จะต้องดึงข้อมุลมาจากรายละเอียดของโครงงานที่จะพัฒนาจากการกรอกข้อมูลยื่นสอบหัวข้อ
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handlePopupClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard >
    );
}

export default RequestAdvisor;
