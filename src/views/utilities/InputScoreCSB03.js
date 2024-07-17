import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Stack } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function InputScoreCSB03() {
    // State for select field
    const [selectedOption, setSelectedOption] = useState('');

    // State for text fields
    const [textField1, setTextField1] = useState('');
    const [textField2, setTextField2] = useState('');
    const [textField3, setTextField3] = useState('');


    const [openDialog, setOpenDialog] = useState(false);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform any action with the linkValue, such as redirecting to the provided link
    //     // For example: window.location.href = linkValue;
    //     setOpenDialog(true);
    // };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Sample data for the table
    const data = [
        { id: 1, name: 'การออกแบบหรือแนวคิด', fullscores: '10', score: '' },
        { id: 2, name: 'วิธีการ/การดำเนินงาน', fullscores: '20', score: '' },
        { id: 3, name: 'ความสมบูรณ์ของผลงาน', fullscores: '20', score: '' },
        { id: 4, name: 'เนื้อหาและรูปแบบของปริญญานิพนธ์', fullscores: '10', score: '' },
        { id: 5, name: 'การนำเสนอโครงงาน', fullscores: '10', score: '' },
        { id: 6, name: 'การนำผลงานไปใช้ประโยชน์', fullscores: '5', score: '' },
        { id: 7, name: 'สรุป/วิจารณ์/การพัฒนาต่อในอนาคต', fullscores: '5', score: '' },
        { name: 'คะแนนรวม', fullscores: '80', score: '' }, //ระบบต้องคำนวณคะแนนออกมา
        // Add more data as needed
    ];

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <div>
                                <Box
                                    fontSize='18px'
                                    sx={{
                                        marginTop: 5,
                                        //marginLeft: 50,

                                    }}
                                >
                                    <h1>แบบประเมินโครงงานพิเศษ 2 (ปริญญานืพนธ์)</h1>
                                    {/* Select field */}
                                    <p>
                                        รหัสโครงงาน
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        ชื่อโครงงาน
                                    </p>
                                    <FormControl>
                                        <InputLabel id="ProjectID-select-label">ProjectID</InputLabel>
                                        <Select
                                            labelId="ProjectID-select-label"
                                            value={selectedOption}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            //fullWidth
                                            label="ProjectID"
                                            margin="normal"
                                            row
                                            sx={{
                                                minWidth: 150,
                                                //marginRight: 33,
                                            }}
                                        >
                                            <MenuItem value="SP1-01">SP1-01</MenuItem>
                                            <MenuItem value="SP1-02">SP1-02</MenuItem>
                                            <MenuItem value="SP1-03">SP1-03</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="ชื่อโครงงาน"
                                        value={textField3}
                                        onChange={(e) => setTextField3(e.target.value)}
                                        disabled
                                        //fullWidth
                                        //margin="normal"
                                        sx={{
                                            '& > :not(style)': { ml: 5, width: '50ch' },
                                        }}
                                    />
                                    <br></br>

                                    {/* Disabled text fields */}
                                    <p>โดย</p>
                                    <TextField
                                        label="รหัสนักศึกษาคนที่ 1"
                                        value={textField1}
                                        onChange={(e) => setTextField1(e.target.value)}
                                        disabled
                                        //fullWidth
                                        //margin="normal"
                                        sx={{
                                            '& > :not(style)': { mr: 5, ml: 5, width: '25ch' },
                                        }}
                                    />
                                    <TextField
                                        label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                        value={textField2}
                                        onChange={(e) => setTextField2(e.target.value)}
                                        disabled
                                        //fullWidth
                                        //margin="normal"
                                        sx={{
                                            '& > :not(style)': { mr: 0, width: '30ch' },
                                        }}
                                    /><br></br>
                                    <TextField
                                        label="รหัสนักศึกษาคนที่ 2"
                                        value={textField1}
                                        onChange={(e) => setTextField1(e.target.value)}
                                        disabled
                                        //fullWidth
                                        //margin="normal"
                                        sx={{
                                            '& > :not(style)': { mr: 5, ml: 5, mt: 3, width: '25ch' },
                                        }}
                                    />
                                    <TextField
                                        label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                        value={textField2}
                                        onChange={(e) => setTextField2(e.target.value)}
                                        disabled
                                        //fullWidth
                                        //margin="normal"
                                        sx={{
                                            '& > :not(style)': { mt: 3, width: '30ch' },
                                        }}
                                    />
                                    <p>อาจารย์ที่ปีกษา</p>
                                    <TextField
                                        label="ชื่ออาจารย์ที่ปรึกษา"
                                        value={textField1}
                                        onChange={(e) => setTextField1(e.target.value)}
                                        disabled
                                        //fullWidth
                                        //margin="normal"
                                        sx={{
                                            '& > :not(style)': { mr: 5, ml: 5, width: '25ch' },
                                        }}
                                    />
                                </Box>
                                {/* Table for entering scores */}
                                <h2>ตารางลงคะแนนสำหรับกรรมการสอบ</h2>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับที่</TableCell>
                                                <TableCell>เกณฑ์พิจารณา</TableCell>
                                                <TableCell>คะแนนเต็ม</TableCell>
                                                <TableCell>ลงคะแนน</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Map through data to render table rows */}
                                            {data.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.id}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.fullscores}</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            onChange={(e) => {
                                                                const newData = [...data];
                                                                newData[item.id - 1].score = e.target.value;
                                                            }}
                                                            //fullWidth
                                                            margin="none"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                                        <DialogTitle>ทำการบันทึกสำเร็จ !!</DialogTitle>
                                        <DialogContent>
                                            <p>รอการตรวจสอบจากเจ้าหน้าที่</p>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseDialog}>Close</Button>
                                        </DialogActions>
                                    </Dialog>
                                </TableContainer>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize='18px'
                                    sx={{
                                        marginTop: 3,
                                    }}
                                >
                                    {/* <Button variant="contained" onClick={handleSubmit}>
                                        บันทึกคะแนน
                                    </Button> */}
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default InputScoreCSB03;
