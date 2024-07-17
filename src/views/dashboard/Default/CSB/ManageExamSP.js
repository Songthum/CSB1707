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

function ManageExamSP() {
    // State for select fields
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');

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

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}></Grid>
                            <Box sx={{ marginLeft: 65 }}>
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
                                        <InputLabel id="selectedOption1">Select Option 1</InputLabel>
                                        <Select
                                            labelId="selectedOption1"
                                            value={selectedOption1}
                                            onChange={(e) => setSelectedOption1(e.target.value)}
                                            // fullWidth
                                            label="Select Option 1"
                                            margin="normal"
                                            sx={{
                                                minWidth: 250,
                                                marginRight: 10,
                                            }}
                                        >
                                            <MenuItem value="">Select Option 1</MenuItem>
                                            <MenuItem value="Option 1-1">Option 1-1</MenuItem>
                                            <MenuItem value="Option 1-2">Option 1-2</MenuItem>
                                        </Select>
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
                                        <InputLabel id="selectedOption1">Select Option 1</InputLabel>
                                        <Select
                                            labelId="selectedOption1"
                                            value={selectedOption2}
                                            onChange={(e) => setSelectedOption2(e.target.value)}
                                            // fullWidth
                                            label="Select Option 2"
                                            margin="normal"
                                            sx={{
                                                minWidth: 250,
                                                marginRight: 10,
                                            }}
                                        >
                                            <MenuItem value="">Select Option 2</MenuItem>
                                            <MenuItem value="Option 2-1">Option 2-1</MenuItem>
                                            <MenuItem value="Option 2-2">Option 2-2</MenuItem>
                                        </Select>
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
                                        <InputLabel id="selectedOption1">Select Option 1</InputLabel>
                                        <Select
                                            labelId="selectedOption1"
                                            value={selectedOption3}
                                            onChange={(e) => setSelectedOption3(e.target.value)}
                                            // fullWidth
                                            label="Select Option 3"
                                            margin="normal"
                                            sx={{
                                                minWidth: 250,
                                                marginRight: 10,
                                            }}
                                        >
                                            <MenuItem value="">Select Option 3</MenuItem>
                                            <MenuItem value="Option 3-1">Option 3-1</MenuItem>
                                            <MenuItem value="Option 3-2">Option 3-2</MenuItem>
                                        </Select>
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
