import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const ManageExamRoom = () => {
    const [option, setOption] = useState('');
    const [room, setRoom] = useState('');
    const [numberOfFields, setNumberOfFields] = useState(0);
    const [numberOfFields2, setNumberOfFields2] = useState(0);
    const [dayOn1, setDayOn1] = useState(null);

    const handleInputChange = (event) => {
        setNumberOfFields(parseInt(event.target.value) || 0);
    };

    const handleInputChange2 = (event) => {
        setNumberOfFields2(parseInt(event.target.value) || 0);
    };


    const [timeOn1, setTimeOn1] = useState([]);

    // const handleSave = () => {
    //     // Save data logic here
    //     // Clear the form
    //     setOption('');
    //     setRoom('');
    //     setDayOn1('');
    //     setTimeOn1('');
    //     setNumberOfFields(0);
    //     setNumberOfFields2(0);
    // };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <Grid container spacing={2}>
                                {/* Line 1: Select fields for option, room, and day */}
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            marginLeft: 110
                                        }}
                                    >
                                        <h1>จัดห้องสอบ</h1>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            marginLeft: 25,
                                            marginTop: 5
                                        }}
                                        fontSize={'20px'}
                                    >
                                        รหัสการสอบ
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;
                                        ห้องสอบ
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        วันที่สอบ
                                    </Typography>
                                    <FormControl
                                        sx={{ mt: 1, ml: 25, minWidth: 120 }}
                                    >
                                        <InputLabel id="option-label">เลือกการสอบ</InputLabel>
                                        <Select
                                            label="รหัสการสอบ"
                                            id="option"
                                            value={option}
                                            onChange={(e) => setOption(e.target.value)}
                                            //fullWidth
                                            sx={{ minWidth: 300 }}
                                        >
                                            <MenuItem value="option1">CSB01 : สอบหัวข้อ</MenuItem>
                                            <MenuItem value="option2">CSB02 : สอบก้าวหน้า</MenuItem>
                                            <MenuItem value="option3">CSB03 : สอบป้องกัน</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        sx={{ mt: 1, ml: 25, minWidth: 120 }}
                                    >
                                        <InputLabel id="room-label">ห้องสอบ</InputLabel>
                                        <Select
                                            label="ห้องสอบ"
                                            id="room"
                                            value={room}
                                            onChange={(e) => setRoom(e.target.value)}
                                            sx={{ minWidth: 300 }}
                                        >
                                            <MenuItem value="room1">618/1</MenuItem>
                                            <MenuItem value="room2">618/2</MenuItem>
                                            <MenuItem value="room3">619</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        sx={{ ml: 25, minWidth: 120 }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DatePicker']}
                                            >
                                                <DatePicker
                                                    label="วันที่สอบ"
                                                    value={dayOn1}
                                                    onChange={(newValue) => setDayOn1(newValue)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                {/* Line 2: Text field for number of fields */}
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            marginLeft: 25,
                                            marginTop: 3
                                        }}
                                        fontSize={'20px'}
                                    >
                                        จำนวนกรรมการสอบ
                                    </Typography>
                                    <TextField
                                        label="จำนวนกรรมการสอบ"
                                        type="number"
                                        value={numberOfFields}
                                        onChange={handleInputChange}
                                        sx={{ minWidth: 300, ml: 25, mt: 1 }}
                                    />
                                </Grid>
                                {/* Line 3: Show select fields based on the input number */}
                                {Array.from({ length: numberOfFields }).map((_, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Typography
                                            sx={{
                                                marginLeft: 25,
                                                marginTop: 3
                                            }}
                                            fontSize={'20px'}
                                        >
                                            รายชื่อกรรมการสอบ
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;
                                            ตำแหน่ง
                                        </Typography>
                                        <FormControl sx={{ mt: 1, ml: 25, minWidth: 120 }}>
                                            <InputLabel id={`id-label-${index}`}>รายชื่อกรรมการสอบ</InputLabel>
                                            <Select
                                                label="รายชื่อกรรมการสอบ"
                                                id={`id-${index}`}
                                                sx={{ minWidth: 300 }}
                                            >
                                                <MenuItem value="id1">อาจารย์ 1</MenuItem>
                                                <MenuItem value="id2">อาจารย์ 2</MenuItem>
                                                <MenuItem value="id3">อาจารย์ 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, ml: 25, minWidth: 120 }}>
                                            <InputLabel id={`name-label-${index}`}>ตำแหน่ง</InputLabel>
                                            <Select
                                                label="ตำแหน่ง"
                                                id={`name-${index}`}
                                                sx={{ minWidth: 300 }}
                                            >
                                                <MenuItem value="name1">ประธานกรรมการ</MenuItem>
                                                <MenuItem value="name2">กรรมการ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                ))}

                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            marginLeft: 25,
                                            marginTop: 3
                                        }}
                                        fontSize={'20px'}
                                    >
                                        จำนวนโครงงานที่จะสอบ
                                    </Typography>
                                    <TextField
                                        label="จำนวนโครงงานที่จะสอบ"
                                        type="number"
                                        value={numberOfFields2}
                                        onChange={handleInputChange2}
                                        sx={{ minWidth: 300, ml: 25, mt: 1 }}
                                    />
                                </Grid>
                                {/* Line 3: Show select fields based on the input number */}
                                {Array.from({ length: numberOfFields2 }).map((_, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Typography
                                            sx={{
                                                marginLeft: 25,
                                                marginTop: 3
                                            }}
                                            fontSize={'20px'}
                                        >
                                            รายชื่อโครงงาน
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            เวลาสอบ
                                        </Typography>
                                        <FormControl sx={{ mt: 1, ml: 25, minWidth: 120 }}>
                                            <InputLabel id={`id-label-${index}`}>รายชื่อโครงงาน</InputLabel>
                                            <Select
                                                label="รายชื่อโครงงาน"
                                                id={`id-${index}`}
                                                sx={{ minWidth: 300 }}
                                            >
                                                <MenuItem value="id1">โครงงาน 1</MenuItem>
                                                <MenuItem value="id2">โครงงาน 2</MenuItem>
                                                <MenuItem value="id3">โครงงาน 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, ml: 25, minWidth: 120 }}>
                                            {/* <InputLabel id={`name-label-${index}`}>เวลาสอบ</InputLabel> */}
                                            <TextField
                                                label="เวลาสอบ"
                                                id={`time-${index}`}
                                                type="time"
                                                value={timeOn1[index]}
                                                onChange={(newValue) => setTimeOn1(newValue)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                sx={{ minWidth: 300 }}
                                            />
                                        </FormControl>
                                    </Grid>
                                ))}
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Button variant="contained" onClick={'#'}>Save</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ManageExamRoom;
