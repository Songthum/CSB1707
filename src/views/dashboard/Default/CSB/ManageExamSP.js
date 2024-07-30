import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Container } from '@mui/material';

function ManageExamSP() {
    const options = [
        'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',
        'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'
    ];

    // State for time fields
    const [timeOn1, setTimeOn1] = useState('');
    const [timeOn2, setTimeOn2] = useState('');
    const [timeOn3, setTimeOn3] = useState('');

    const [timeOff1, setTimeOff1] = useState('');
    const [timeOff2, setTimeOff2] = useState('');
    const [timeOff3, setTimeOff3] = useState('');

    // State for day fields
    const [dayOn1, setDayOn1] = useState(null);
    const [dayOn2, setDayOn2] = useState(null);
    const [dayOn3, setDayOn3] = useState(null);

    const [dayOff1, setDayOff1] = useState(null);
    const [dayOff2, setDayOff2] = useState(null);
    const [dayOff3, setDayOff3] = useState(null);

    // Function to handle confirm button click
    const handleConfirm = () => {
        // Perform action when confirm button is clicked
        console.log("Confirm button clicked");
    };

    // Function to handle edit button click
    const handleEdit = () => {
        // Perform action when edit button is clicked
        console.log("Edit button clicked");
    };

    // const testData = [
    //     { ID: 'CSB01', Name: 'สอบหัวข้อ' },
    //     { ID: 'CSB02', Name: 'สอบก้าวหน้า' },
    //     { ID: 'CSB03', Name: 'สอบป้องกัน' }
    // ];

    // const formatTestData = testData.map(item => `${item.ID} : ${item.Name}`);

    const [selectedValues, setSelectedValues] = useState({ first: '', second: '', third: '' });

    // const handleChange = (event, field) => {
    //     setSelectedValues({ ...selectedValues, [field]: event.target.value });
    // };

    // const getFilteredOptions = (currentField) => {
    //     const selectedOptions = Object.values(selectedValues).filter((val, idx) => idx !== currentField);
    //     return options.filter(option => !selectedOptions.includes(option));
    // };


    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <Box sx={{ marginLeft: 40 }}>
                                <Typography sx={{ marginLeft: 30 }}><h1>จัดการการยื่นสอบ</h1></Typography>

                                {/* Select fields */}
                                <Box
                                    sx={{
                                        marginTop: 5,
                                        //marginLeft: 50,
                                    }}
                                >
                                    <Typography
                                        fontSize={18}
                                        sx={{
                                            //marginLeft: 41, 
                                            marginTop: 3,
                                            marginBottom: 1
                                        }}
                                        row
                                    >
                                        การสอบ
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        เวลาที่เปิด
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        เวล่ที่ปิด
                                    </Typography>
                                    <FormControl>
                                        <TextField
                                            disabled
                                            id="CSB01"
                                            label="Disabled"
                                            defaultValue="การสอบหัวข้อ"
                                            sx={{
                                                minWidth: 250,
                                                marginRight: 10,
                                            }}
                                        />
                                    </FormControl>

                                    <TextField
                                        label="Time Field 1"
                                        type="time"
                                        value={timeOn1}
                                        onChange={(e) => setTimeOn1(e.target.value)}
                                        // fullWidth
                                        //margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        label="Time Field 1"
                                        type="time"
                                        value={timeOff1}
                                        onChange={(e) => setTimeOff1(e.target.value)}
                                        // fullWidth
                                        //margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ marginLeft: 17 }}
                                    />
                                    <Typography
                                        fontSize={18}
                                        sx={{ marginLeft: 41, marginTop: 3 }}
                                        row
                                    >
                                        วันที่เปิด
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        วันที่ปิด
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={['DatePicker']}
                                            sx={{
                                                marginLeft: 41,
                                            }}>
                                            <DatePicker
                                                label="Basic date picker"
                                                value={dayOn1}
                                                onChange={(newValue) => setDayOn1(newValue)}
                                            />
                                            <DatePicker
                                                label="Basic date picker"
                                                value={dayOff1}
                                                onChange={(newValue) => setDayOff1(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: 5,
                                        //marginLeft: 50,
                                    }}
                                >
                                    <Typography
                                        fontSize={18}
                                        sx={{
                                            //marginLeft: 41, 
                                            marginTop: 3,
                                            marginBottom: 1
                                        }}
                                        row
                                    >
                                        การสอบ
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        เวลาที่เปิด
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        เวล่ที่ปิด
                                    </Typography>
                                    <FormControl>
                                        <TextField
                                            disabled
                                            id="CSB02"
                                            label="Disabled"
                                            defaultValue="การสอบก้าวหน้า"
                                            sx={{
                                                minWidth: 250,
                                                marginRight: 10,
                                            }}
                                        />
                                    </FormControl>

                                    <TextField
                                        label="Time Field 2"
                                        type="time"
                                        value={timeOn2}
                                        onChange={(e) => setTimeOn2(e.target.value)}
                                        // fullWidth
                                        //margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        label="Time Field 2"
                                        type="time"
                                        value={timeOff2}
                                        onChange={(e) => setTimeOff2(e.target.value)}
                                        // fullWidth
                                        //margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ marginLeft: 17 }}
                                    />
                                    <Typography
                                        fontSize={18}
                                        sx={{ marginLeft: 41, marginTop: 3 }}
                                        row
                                    >
                                        วันที่เปิด
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        วันที่ปิด
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={['DatePicker']}
                                            sx={{
                                                marginLeft: 41,
                                            }}>
                                            <DatePicker
                                                label="Basic date picker"
                                                value={dayOn2}
                                                onChange={(newValue) => setDayOn2(newValue)}
                                            />
                                            <DatePicker
                                                label="Basic date picker"
                                                value={dayOff2}
                                                onChange={(newValue) => setDayOff2(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: 5,
                                        //marginLeft: 50,
                                    }}
                                >
                                    <Typography
                                        fontSize={18}
                                        sx={{
                                            //marginLeft: 41, 
                                            marginTop: 3,
                                            marginBottom: 1
                                        }}
                                        row
                                    >
                                        การสอบ
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        เวลาที่เปิด
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        เวล่ที่ปิด
                                    </Typography>
                                    <FormControl>
                                        <TextField
                                            disabled
                                            id="CSB03"
                                            label="Disabled"
                                            defaultValue="การสอบป้องกัน"
                                            sx={{
                                                minWidth: 250,
                                                marginRight: 10,
                                            }}
                                        />
                                    </FormControl>
                                    <TextField
                                        label="Time Field 1"
                                        type="time"
                                        value={timeOn3}
                                        onChange={(newValue) => setTimeOn3(newValue)}
                                        // fullWidth
                                        //margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        label="Time Field 1"
                                        type="time"
                                        value={timeOff3}
                                        onChange={(e) => setTimeOff3(e.target.value)}
                                        // fullWidth
                                        //margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ marginLeft: 17 }}
                                    />
                                    <Typography
                                        fontSize={18}
                                        sx={{ marginLeft: 41, marginTop: 3 }}
                                        row
                                    >
                                        วันที่เปิด
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        วันที่ปิด
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={['DatePicker']}
                                            sx={{
                                                marginLeft: 41,
                                            }}>
                                            <DatePicker
                                                label="Basic date picker"
                                                value={dayOn3}
                                                onChange={(e) => setDayOn3(e.target.value)}
                                            />
                                            <DatePicker
                                                label="Basic date picker"
                                                value={dayOff3}
                                                onChange={(e) => setDayOff3(e.target.value)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>



                                {/* Confirm and Edit buttons */}
                                <Box>
                                    <Button sx={{ marginTop: 5, marginLeft: 30, marginRight: 10 }} variant="contained" onClick={handleConfirm}>Confirm</Button>
                                    <Button sx={{ marginTop: 5 }} variant="contained" onClick={handleEdit}>Edit</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>

    );
}

export default ManageExamSP;
