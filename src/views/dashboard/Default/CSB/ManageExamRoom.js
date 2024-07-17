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

    const testData = [
        {
            "ID": "CSB01",
            "Name": "สอบหัวข้อ"
        },
        {
            "ID": "CSB02",
            "Name": "สอบก้าวหน้า"
        },
        {
            "ID": "CSB03",
            "Name": "สอบป้องกัน"
        }
    ];

    const roomData = [
        {
            "ID": "78-618",
        },
        {
            "ID": "78-618/2",
        },
        {
            "ID": "78-619",
        },
        {
            "ID": "78-621",
        },
        {
            "ID": "78-617",
        }
    ];

    const Teacher = [
        {
            "ID": "NLP",
            "Name": "ลือพล ไม่น่ารักเลย"
        },
        {
            "ID": "SWK",
            "Name": "สุวัชชัย ตัวตึง"
        },
        {
            "ID": "KAB",
            "Name": "คัณฑารัตน์ สุดละเอียด"
        },
        {
            "ID": "CRL",
            "Name": "เฉียบวุฒิ สุดจ้าบ"
        },
        {
            "ID": "ARN",
            "Name": "เอิญ ไม่ใจดี"
        },
        {
            "ID": "TNA",
            "Name": "ธณาภัทร ใจร้าย"
        },
        {
            "ID": "BLP",
            "Name": "เบญจพร ร้ายกาจ"
        },
        {
            "ID": "NAT",
            "Name": "ณัฐวุฒิ ช่วยด้วย"
        },
        {
            "ID": "KOB",
            "Name": "กอบเกียรติ อิหยังวะ"
        },
        {
            "ID": "ANW",
            "Name": "อนุสรณ์ หนีไป"
        }
    ]

    const positionData = [
        {
            "ID": "No1",
            "Name": "ประธาน"
        },
        {
            "ID": "No2",
            "Name": "กรรมการ"
        }
    ];

    const ProjectData = [
        {
            "ID": "SP1-01",
            "Name": "การตรวจสอบจบ"
        },
        {
            "ID": "SP1-02",
            "Name": "การยื่นสอบปริญญานิพนจ์"
        },
        {
            "ID": "SP1-03",
            "Name": "โมเดลจำลองอะตอม"
        },
        {
            "ID": "SP1-04",
            "Name": "AIจับมนุษย์"
        },
        {
            "ID": "SP1-05",
            "Name": "โปรแกรมปลูกต้นไม้"
        },
        {
            "ID": "SP1-06",
            "Name": "โปรแกรมออกแบบการนำเสนอ"
        },
        {
            "ID": "SP1-07",
            "Name": "โปรแกรมคำนวณพื้นที่"
        },
        {
            "ID": "SP1-08",
            "Name": "การจัดการการสอบสำหรับ CSB"
        },
        {
            "ID": "SP1-09",
            "Name": "โปรแกรมจองตั๋วรถไฟ"
        },
        {
            "ID": "SP1-10",
            "Name": "เกมเอาตัวรอดในCS"
        }
    ]

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
                                            {/* <MenuItem value="option1">CSB01 : สอบหัวข้อ</MenuItem>
                                            <MenuItem value="option2">CSB02 : สอบก้าวหน้า</MenuItem>
                                            <MenuItem value="option3">CSB03 : สอบป้องกัน</MenuItem> */}
                                            {testData.map((testData) => (
                                                    <MenuItem
                                                        key={testData.ID}
                                                        value={testData.ID}
                                                    >
                                                        {testData.ID+" : "+testData.Name}
                                                    </MenuItem>
                                                ))}
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
                                            {roomData.map((roomData) => (
                                                    <MenuItem
                                                        key={roomData.ID}
                                                        value={roomData.ID}
                                                    >
                                                        {roomData.ID}
                                                    </MenuItem>
                                                ))}
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
                                                {Teacher.map((Teacher) => (
                                                    <MenuItem
                                                        key={Teacher.ID}
                                                        value={Teacher.ID}
                                                    >
                                                        {Teacher.ID+" "+Teacher.Name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, ml: 25, minWidth: 120 }}>
                                            <InputLabel id={`name-label-${index}`}>ตำแหน่ง</InputLabel>
                                            <Select
                                                label="ตำแหน่ง"
                                                id={`name-${index}`}
                                                sx={{ minWidth: 300 }}
                                            >
                                                {positionData.map((positionData) => (
                                                    <MenuItem
                                                        key={positionData.Name}
                                                        value={positionData.Name}
                                                    >
                                                        {positionData.Name}
                                                    </MenuItem>
                                                ))}
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
                                                {ProjectData.map((ProjectData) => (
                                                    <MenuItem
                                                        key={ProjectData.ID}
                                                        value={ProjectData.ID}
                                                    >
                                                        {ProjectData.ID+" : "+ProjectData.Name}
                                                    </MenuItem>
                                                ))}
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
