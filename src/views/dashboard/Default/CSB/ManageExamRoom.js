import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const ManageExamRoom = () => {
    const [option, setOption] = useState('');
    const [room, setRoom] = useState('');
    const [numberOfFields, setNumberOfFields] = useState('');
    const [numberOfFields2, setNumberOfFields2] = useState('');
    const [date, setDate] = useState(null);
    const [teacherValues, setTeacherValues] = useState([]);
    const [positionValues, setPositionValues] = useState([]);
    const [projectValues, setProjectValues] = useState(Array(numberOfFields2).fill(''));
    const [timeOn1, setTimeOn1] = useState(Array(numberOfFields2).fill(''));
    const [teachers, setTeachers] = useState([]);
    const [projects, setProjects] = useState([]);

    const handleSelectChange = (index) => (event) => {
        const newProjectValues = [...projectValues];
        newProjectValues[index] = event.target.value;
        setProjectValues(newProjectValues);
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:9999/Teacher');
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:9999/Project');
                const data = await response.json();
                setProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value) || 0;
        if (value <= 5) {
            setNumberOfFields(value);
            setTeacherValues(Array(value).fill(''));
            setPositionValues(Array(value).fill(''));
        } else {
            alert('จำนวนกรรมการสอบห้ามเกิน 5 คน');
        }
    };

    const handleInputChange2 = (event) => {
        const value = parseInt(event.target.value) || 0;
        if (value <= 20) {
            setNumberOfFields2(value);
            setProjectValues(Array(value).fill(''));
            setTimeOn1(Array(value).fill(''));
        } else {
            alert('จำนวนโปรเจคที่สอบห้ามเกิน 20');
        }
    };

    const handleSelectTeacher = (index) => (event) => {
        const newTeacherValues = [...teacherValues];
        newTeacherValues[index] = event.target.value;
        setTeacherValues(newTeacherValues);
    };

    const handleSelectPosition = (index) => (event) => {
        const newPositionValues = [...positionValues];
        newPositionValues[index] = event.target.value;
        setPositionValues(newPositionValues);
    };

    const getFilteredTeachers = (index) => {
        const selectedTeachers = teacherValues.filter((_, i) => i !== index);
        return teachers.filter((teacher) => !selectedTeachers.includes(teacher.T_id));
    };

    const getFilteredPositions = (index) => {
        const selectedPositions = positionValues.filter((_, i) => i !== index);
        return positionData.filter((position) => !selectedPositions.includes(position.ID) || position.ID !== 'No1');
    };

    const getAvailableProjects = (index) => {
        const selectedProjects = projectValues.filter((_, i) => i !== index);
        
        const filteredProjects = projects.filter((project) => {
            if (option === 'CSB01') return project.P_CSB01 === 'ยินยอม'&& !project.P_CSB02; 
            if (option === 'CSB02') return project.P_CSB02 === 'ยินยอม' && !project.P_CSB03; // For CSB02 and P_CSB03 is empty
            if (option === 'CSB03') return project.P_CSB03 === 'ยินยอม'; // For CSB03
            return true; // If no specific option is selected, show all
        });
    
        return filteredProjects.filter((project) => !selectedProjects.includes(project.P_name));
    };
    

    const testData = [
        { ID: 'CSB01', Name: 'สอบหัวข้อ' },
        { ID: 'CSB02', Name: 'สอบก้าวหน้า' },
        { ID: 'CSB03', Name: 'สอบป้องกัน' }
    ];

    const roomData = [
        { ID: '78-618' },
        { ID: '78-618/2' },
        { ID: '78-619' },
        { ID: '78-621' },
        { ID: '78-617' }
    ];

    const positionData = [
        { ID: 'No1', Name: 'ประธาน' },
        { ID: 'No2', Name: 'กรรมการ' }
    ];

    const getFilteredTimes = (index) => {
        const selectedTimes = timeOn1.filter((_, i) => i !== index);
        const availableTimes = ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
            '11:00', '11:15', '11:30', '11:45', '13:00', '13:15', '13:30', '13:45',
            '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45'];

        return availableTimes.filter(time => !selectedTimes.includes(time));
    };

    const handleSave = async () => {
        const headTeacher = teacherValues[positionValues.findIndex(pos => pos === 'No1')]; // Find the head teacher's T_id
        const otherTeachers = teacherValues.filter((_, index) => positionValues[index] !== 'No1'); // Get other teachers' T_id
        const examData = {
            R_id: room,
            R_name: option,
            R_Date: date,
            R_C: headTeacher, // If headTeacher is not found, set to empty string
            R_T: otherTeachers, // This will be an array of other teachers
            R_P: projectValues,
            R_Time: timeOn1,
        };
    
        console.log('Exam Data:', examData);
    
        // Send data to the backend
        try {
            const response = await fetch('http://localhost:9999/Room', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            // Handle success (e.g., show a notification or reset the form)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };
    
    const isFormValid = () => {
        return option && room && date && numberOfFields && numberOfFields2 &&
            teacherValues.every(teacher => teacher) &&
            positionValues.every(position => position) &&
            projectValues.every(project => project) &&
            timeOn1.every(time => time);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center" gutterBottom>จัดห้องสอบ</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {/* Select for test type */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>เลือกการสอบ</InputLabel>
                                <Select value={option} onChange={(e) => setOption(e.target.value)}>
                                    {testData.map((test) => (
                                        <MenuItem key={test.ID} value={test.ID}>
                                            {test.ID + ' : ' + test.Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Select for exam room */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>ห้องสอบ</InputLabel>
                                <Select value={room} onChange={(e) => setRoom(e.target.value)}>
                                    {roomData.map((room) => (
                                        <MenuItem key={room.ID} value={room.ID}>
                                            {room.ID}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Date picker */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="วันที่สอบ"
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} mt={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                จำนวนกรรมการสอบ
                            </Typography>
                            <TextField
                                label="จำนวนกรรมการสอบ"
                                type="number"
                                value={numberOfFields}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {Array.from({ length: numberOfFields }).map((_, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Typography variant="h6" gutterBottom>
                                    กรรมการคนที่ {index + 1}
                                </Typography>

                                {/* Teacher selection */}
                                <FormControl sx={{ width: '300px' }}>
                                    <InputLabel>เลือกอาจารย์</InputLabel>
                                    <Select
                                        value={teacherValues[index]}
                                        onChange={handleSelectTeacher(index)}
                                    >
                                        {getFilteredTeachers(index).map((teacher) => (
                                            <MenuItem key={teacher.T_id} value={teacher.T_id}>
                                                {teacher.T_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Position selection */}
                                <FormControl sx={{ width: '200px' }}>
                                    <InputLabel>เลือกตำแหน่ง</InputLabel>
                                    <Select
                                        value={positionValues[index]}
                                        onChange={handleSelectPosition(index)}
                                    >
                                        {getFilteredPositions(index).map((position) => (
                                            <MenuItem key={position.ID} value={position.ID}>
                                                {position.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={3} mt={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                จำนวนโปรเจคที่สอบ
                            </Typography>
                            <TextField
                                label="จำนวนโปรเจคที่สอบ"
                                type="number"
                                value={numberOfFields2}
                                onChange={handleInputChange2}
                            />
                        </Grid>
                        {Array.from({ length: numberOfFields2 }).map((_, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Typography variant="h6" gutterBottom>
                                    โปรเจคที่สอบที่ {index + 1}
                                </Typography>

                                {/* Project selection */}
                                <FormControl sx={{ width: '300px' }}>
                                    <InputLabel>เลือกโปรเจค</InputLabel>
                                    <Select
                                        value={projectValues[index]}
                                        onChange={handleSelectChange(index)}
                                    >
                                        {getAvailableProjects(index).map((project) => (
                                            <MenuItem key={project.P_id} value={project.P_name}>
                                                {project.P_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Time selection */}
                                <FormControl sx={{ width: '200px' }}>
                                    <InputLabel>เลือกเวลา</InputLabel>
                                    <Select
                                        value={timeOn1[index]}
                                        onChange={(event) => {
                                            const newTimeOn1 = [...timeOn1];
                                            newTimeOn1[index] = event.target.value;
                                            setTimeOn1(newTimeOn1);
                                        }}
                                    >
                                        {getFilteredTimes(index).map((time) => (
                                            <MenuItem key={time} value={time}>
                                                {time}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={3}>
                <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!isFormValid()} // Disable if the form is invalid
                    >
                        บันทึก
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ManageExamRoom;

//เลือกสอบหัวข้อได้เฉพาะโครงงานที่สถานะ CSB01 นักศึกษากดยินยอมสอบ
//เลือกสอบก้าวหน้าได้เฉพาะโครงงานที่สถานะ CSB02 นักศึกษากดยินยอมสอบ
//เลือกสอบป้องกันได้เฉพาะโครงงานที่สถานะ CSB03 นักศึกษากดยินยอมสอบ