import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Value } from 'sass';

function CSB01() {
    const [StudentSelect, setStudentSelect] = useState('');
    const [StudentSelect2, setStudentSelect2] = useState('');

    const [selectTeacher, setSelectTeacher] = useState('');

    const [selectedValues, setSelectedValues] = useState({
        networks: false,
        graphics: false,
        database: false,
        ai: false,
        games: false,
    });

    const handleChange = (event) => {
        setStudentSelect(Students.find(person => person.ID === event.target.value));
    };

    const handleChange2 = (event) => {
        setStudentSelect2(Students.find(person => person.ID === event.target.value));
    };

    const handleSelectTeacherChange = (event) => {
        // const value = event.target.value;
        setSelectTeacher(Teachers.find(person => person.ID === event.target.value));
        console.log(Teachers.find(person => person.ID === event.target.value)); // Log the selected teacher ID
    };

    const handleChangeSelectObject = (event) => {
        const { name, checked } = event.target;

        // Update the state of the corresponding checkbox
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: checked,
        }));

        // Log the updated state
        console.log(`${name} is now ${checked ? 'selected' : 'deselected'}`);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const Students = [
        {
            "ID": "6304062620061",
            "Name": "ณัชริกา กันทะสอน"
        },
        {
            "ID": "6304062620062",
            "Name": "ใจดี ยืมเงิน"
        },
        {
            "ID": "6304062620063",
            "Name": "สบายดี สบายใจ"
        },
        {
            "ID": "6304062620064",
            "Name": "สุดสวย สุดหล่อ"
        },
        {
            "ID": "6304062620065",
            "Name": "ไอ่กล้อง ไอ่อ้วน"
        },
        {
            "ID": "6304062620066",
            "Name": "แมวเหมียว น่ารัก"
        },
        {
            "ID": "6304062620067",
            "Name": "มะหมา สุดหล่อ"
        },
        {
            "ID": "6304062620068",
            "Name": "หนูน้อย น่ารัก"
        },
        {
            "ID": "6304062620069",
            "Name": "สวัสดีครับ ผมนวย"
        },
        {
            "ID": "6304062620070",
            "Name": "ไม่มี ตังค์ค่า"
        }
    ];

    const Teachers = [
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

    // const [selectedValueName, setSelectedValueName] = useState('');

    // const handleSelectStudentID = (e) => {
    //     e.preventDefault();
    //     setOpenDialog(true);
    // };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <Box
                                component="form"
                                sx={{
                                    marginTop: 8,
                                    display: 'block',
                                    flexDirection: 'column',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container alignItems="center" justifyContent="center" sx={{ ml: 20 }}>
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography fontSize='18px'>
                                                <b>แบบฟอร์มเสนอหัวข้อโครงงานพิเศษ</b><br></br>
                                            </Typography>
                                            <Typography fontSize='18px'>
                                                <b>โครงการพิเศษ (สองภาษา) ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ</b><br></br>
                                            </Typography>
                                            <Typography fontSize='18px'>
                                                <b>คณะวิทยาศาสตร์ประยุกต์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</b>
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Stack alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 5, ml: 35 }}>
                                        <Typography
                                            fontSize='18px'
                                        >
                                            รหัสนักศึกษา คนที่ 1
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            ชื่อ - สกุล คนที่ 1
                                            <Box
                                                sx={{
                                                    minWidth: 180,
                                                    marginTop: 1,
                                                    marginLeft: 3,
                                                    display: "flex",
                                                }}
                                            >
                                                <FormControl
                                                    sx={{
                                                        minWidth: 180,
                                                        marginRight: 33,
                                                    }}>
                                                    <InputLabel id="StudentID-select-label-1">รหัสนักศึกษา</InputLabel>
                                                    <Select
                                                        labelId="StudentID-select-label-1"
                                                        id="StudentID-select"
                                                        value={StudentSelect.ID}
                                                        label="รหัสนักศึกษา"
                                                        onChange={handleChange}
                                                    >
                                                        {/* <MenuItem value={15}>6304062620061</MenuItem>
                                                        <MenuItem value={14}>6304062620077</MenuItem>
                                                        <MenuItem value={13}>6304062620023</MenuItem> */}
                                                        {Students.filter(student => student.ID !== StudentSelect2.ID).map((student) => (
                                                            <MenuItem
                                                                key={student.ID}
                                                                value={student.ID}
                                                            >
                                                                {student.ID}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    disabled
                                                    id="Name1"
                                                    label="ชื่อ - สกุล"
                                                    defaultValue="ชื่อ - สกุล"
                                                    value={StudentSelect.Name}
                                                />
                                            </Box>
                                        </Typography>
                                        <Typography
                                            fontSize='18px'
                                            sx={{
                                                marginTop: 5,
                                                marginLeft: 50,

                                            }}>
                                            รหัสนักศึกษา คนที่ 2
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            ชื่อ - สกุล คนที่ 2
                                            <Box
                                                sx={{
                                                    minWidth: 180,
                                                    marginTop: 1,
                                                    marginLeft: 3,
                                                    display: "flex",
                                                }}
                                            >
                                                <FormControl
                                                    sx={{
                                                        minWidth: 180,
                                                        marginRight: 33,
                                                    }}>
                                                    <InputLabel id="StudentID-select-label-2">รหัสนักศึกษา</InputLabel>
                                                    <Select
                                                        labelId="StudentID-select-label-2"
                                                        id="StudentID-select2"
                                                        value={StudentSelect2.ID}
                                                        label="รหัสนักศึกษา"
                                                        onChange={handleChange2}
                                                    >
                                                        {Students.filter(student => student.ID !== StudentSelect.ID).map((student) => (
                                                            <MenuItem
                                                                key={student.ID}
                                                                value={student.ID}
                                                            >
                                                                {student.ID}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    disabled
                                                    id="Name2"
                                                    label="ชื่อ - สกุล"
                                                    defaultValue="ชื่อ - สกุล"
                                                    value={StudentSelect2.Name}
                                                />
                                            </Box>
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <div>
                                    <Typography
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 5,
                                            marginLeft: 50,

                                        }}>
                                        ชื่อโครงงานภาษาอังกฤษ
                                        <Box
                                            sx={{
                                                '& .MuiTextField-root': { width: '75ch' },
                                                marginTop: 1,
                                                marginLeft: 3,
                                                display: "flex",
                                            }}
                                        >
                                            <TextField
                                                required
                                                id="Project-name"
                                                label="ชิ่อโครงงานภาษาอังกฤษ"
                                            // defaultValue="Project name"
                                            />
                                        </Box>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 5,
                                            marginLeft: 50,
                                        }}
                                    >
                                        มีอาจารย์ที่ปรึกษาหรือไม่ ?
                                    </Typography>
                                    <FormControl
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 0,
                                            marginLeft: 55,
                                        }}
                                    >
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            id="selectHaveOrDon't"
                                            value={selectedValue}
                                            onChange={handleRadioChange}
                                        >
                                            <FormControlLabel value="Yes" control={<Radio />} label="มี" />
                                            <FormControlLabel value="No" control={<Radio />} label="ไม่มี" sx={{ marginLeft: 10 }} />
                                        </RadioGroup>
                                    </FormControl><br></br>

                                    {selectedValue === 'Yes' && (
                                        <FormControl
                                            sx={{
                                                marginTop: 2,
                                                marginLeft: 55,
                                            }}
                                        >
                                            <Select
                                                id="teacher-select"
                                                value={selectTeacher.ID}
                                                defaultValue=""
                                                displayEmpty
                                                onChange={handleSelectTeacherChange}
                                            >
                                                <MenuItem value="" disabled>
                                                    รายชื่ออาจารย์ที่ปรึกษา
                                                </MenuItem>
                                                {Teachers.map((Teacher) => (
                                                    <MenuItem
                                                        key={Teacher.ID}
                                                        value={Teacher.ID}
                                                    >
                                                        {Teacher.ID + " " + Teacher.Name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                                <div>
                                    <Typography
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 5,
                                            marginLeft: 50,
                                        }}
                                    >
                                        โครงงานนี้จัดอยู่ในประเภท
                                    </Typography>
                                    <FormGroup
                                        id="object-select"
                                        fontSize="18px"
                                        sx={{
                                            marginTop: 0,
                                            marginLeft: 55,
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedValues.networks}
                                                    onChange={handleChangeSelectObject}
                                                    name="networks"
                                                />
                                            }
                                            label="Networks & Data Communications"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedValues.graphics}
                                                    onChange={handleChangeSelectObject}
                                                    name="graphics"
                                                />
                                            }
                                            label="Graphics & Animation"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedValues.database}
                                                    onChange={handleChangeSelectObject}
                                                    name="database"
                                                />
                                            }
                                            label="Database & Web"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedValues.ai}
                                                    onChange={handleChangeSelectObject}
                                                    name="ai"
                                                />
                                            }
                                            label="Artificial Intelligence"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedValues.games}
                                                    onChange={handleChangeSelectObject}
                                                    name="games"
                                                />
                                            }
                                            label="Games"
                                        />
                                    </FormGroup>
                                </div>
                                <div>
                                    <Typography
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 5,
                                            marginLeft: 50,
                                        }}
                                    >
                                        รายละเอียดของโครงงานที่จะพัฒนา
                                    </Typography>
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': { width: '85ch' },
                                        }}
                                    >
                                        <TextField
                                            fontSize='18px'
                                            sx={{
                                                marginTop: 0,
                                                marginLeft: 55,
                                            }}
                                            id="details"
                                            label=""
                                            multiline
                                            maxRows={8}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <Typography
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 5,
                                            marginLeft: 50,
                                        }}
                                    >
                                        เครื่องมือและอุปกรณ์ที่ใช้ในการทำโครงงานนี้
                                    </Typography>
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': { width: '85ch' },
                                        }}
                                    >
                                        <TextField
                                            fontSize='18px'
                                            sx={{
                                                marginTop: 0,
                                                marginLeft: 55,
                                            }}
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            maxRows={8}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        fontSize='18px'
                                        sx={{
                                            marginTop: 5,
                                            marginLeft: 45
                                        }}
                                    >
                                        <Button variant="contained" onClick={handleSubmit}>
                                            ยืนยัน
                                        </Button>
                                    </Stack>
                                </div>
                                <Dialog open={openDialog} onClose={handleCloseDialog}>
                                    <DialogTitle>ทำการบันทึกสำเร็จ !!</DialogTitle>
                                    <DialogContent>
                                        <p>รอการตรวจสอบจากเจ้าหน้าที่</p>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}>Close</Button>
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

export default CSB01;
