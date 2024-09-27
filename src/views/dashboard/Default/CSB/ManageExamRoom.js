// import React, { useState, useEffect } from 'react';
// import { TextField, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';

// const ManageExamRoom = () => {
//     const [option, setOption] = useState('');
//     const [room, setRoom] = useState('');
//     const [numberOfFields, setNumberOfFields] = useState('');
//     const [numberOfFields2, setNumberOfFields2] = useState('');
//     const [date, setDate] = useState(null);
//     const [teacherValues, setTeacherValues] = useState([]);
//     const [positionValues, setPositionValues] = useState([]);
//     const [projectValues, setProjectValues] = useState([]);
//     const [timeOn1, setTimeOn1] = useState([]);
//     const [invalidTimes, setInvalidTimes] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [TData, setTData] = useState({
//         T_id: ''
//     });
//     const handleSelectChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'S_id1' || name === 'S_id2') {
//             setSData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         } else if (name === 'T_id') {
//             setTData({ T_id: value });
//         }
//     };

//     useEffect(() => {
//         const fetchTeachers = async () => {
//             try {
//                 const response = await fetch('http://localhost:9999/Teacher');
//                 const data = await response.json();
//                 console.log('Fetched teachers:', data); // Add this line
//                 setTeachers(data);
//             } catch (error) {
//                 console.error('Error fetching teacher data:', error);
//             }
//         };

//         fetchTeachers();
//     }, []);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await fetch('http://localhost:9999/Project');
//                 const data = await response.json();
//                 console.log('Fetched projects:', data); // Add this line
//                 setProjects(data);
//             } catch (error) {
//                 console.error('Error fetching project data:', error);
//             }
//         };

//         fetchProjects();
//     }, []);


//     const handleInputChange = (event) => {
//         const value = parseInt(event.target.value) || 0;
//         if (value <= 5) {
//             setNumberOfFields(value);
//             setTeacherValues(Array(value).fill(''));
//             setPositionValues(Array(value).fill(''));
//         } else {
//             alert('จำนวนกรรมการสอบห้ามเกิน 5 คน');
//         }
//     };

//     const handleInputChange2 = (event) => {
//         const value = parseInt(event.target.value) || 0;
//         if (value <= 20) {
//             setNumberOfFields2(value);
//             setProjectValues(Array(value).fill(''));
//             setTimeOn1(Array(value).fill(''));
//         } else {
//             alert('จำนวนโปรเจคที่สอบห้ามเกิน 20');
//         }
//     };

//     const handleSelectTeacher = (index) => (event) => {
//         const newTeacherValues = [...teacherValues];
//         newTeacherValues[index] = event.target.value; // Store the selected teacher ID
//         setTeacherValues(newTeacherValues);
//         console.log(newTeacherValues); // This will show the updated teacher values
//     };


//     const handleSelectPosition = (index) => (event) => {
//         const newPositionValues = [...positionValues];
//         newPositionValues[index] = event.target.value;
//         setPositionValues(newPositionValues);
//     };

//     const handleSelectProject = (index) => (event) => {
//         const newProjectValues = [...projectValues];
//         newProjectValues[index] = event.target.value;
//         setProjectValues(newProjectValues);
//     };

//     const handleSelectTime = (index) => (event) => {
//         const newTime = event.target.value;
//         const newTimeOn1 = [...timeOn1];
//         newTimeOn1[index] = newTime;

//         const timeCounts = newTimeOn1.reduce((acc, time) => {
//             acc[time] = (acc[time] || 0) + 1;
//             return acc;
//         }, {});
//         const newInvalidTimes = newTimeOn1.map((time, i) => timeCounts[time] > 1 && i !== newTimeOn1.indexOf(time));

//         setTimeOn1(newTimeOn1);
//         setInvalidTimes(newInvalidTimes);
//     };

//     const getFilteredTeachers = (index) => {
//         const selectedTeachers = teacherValues.filter((_, i) => i !== index);
//         return teachers.filter((teacher) => !selectedTeachers.includes(teacher.ID));
//     };


//     const getFilteredProjects = (index) => {
//         const selectedProjects = projectValues.filter((_, i) => i !== index);
//         return projects.filter((project) => !selectedProjects.includes(project.ID));
//     }; console.log(teacherValues);


//     const getFilteredPositions = (index) => {
//         const selectedPositions = positionValues.filter((_, i) => i !== index);
//         return positionData.filter((position) => !selectedPositions.includes(position.ID) || position.ID !== 'No1');
//     };

//     const testData = [
//         { ID: 'CSB01', Name: 'สอบหัวข้อ' },
//         { ID: 'CSB02', Name: 'สอบก้าวหน้า' },
//         { ID: 'CSB03', Name: 'สอบป้องกัน' }
//     ];

//     const roomData = [
//         { ID: '78-618' },
//         { ID: '78-618/2' },
//         { ID: '78-619' },
//         { ID: '78-621' },
//         { ID: '78-617' }
//     ];

//     const positionData = [
//         { ID: 'No1', Name: 'ประธาน' },
//         { ID: 'No2', Name: 'กรรมการ' }
//     ];

//     const getFilteredTimes = (index) => {
//         const selectedTimes = timeOn1.filter((_, i) => i !== index);
//         const availableTimes = ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
//             '11:00', '11:15', '11:30', '11:45', '13:00', '13:15', '13:30', '13:45',
//             '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45'];

//         return availableTimes.filter(time => !selectedTimes.includes(time));
//     };


//     return (
//         <MainCard>
//             <Grid container spacing={gridSpacing}>
//                 <Grid item xs={12}>
//                     <Typography variant="h2" align="center" gutterBottom>จัดห้องสอบ</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Grid container spacing={2}>
//                         {/* Select for test type */}
//                         <Grid item xs={12} md={4}>
//                             <FormControl fullWidth>
//                                 <InputLabel>เลือกการสอบ</InputLabel>
//                                 <Select value={option} onChange={(e) => setOption(e.target.value)}>
//                                     {testData.map((test) => (
//                                         <MenuItem key={test.ID} value={test.ID}>
//                                             {test.ID + ' : ' + test.Name}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         {/* Select for exam room */}
//                         <Grid item xs={12} md={4}>
//                             <FormControl fullWidth>
//                                 <InputLabel>ห้องสอบ</InputLabel>
//                                 <Select value={room} onChange={(e) => setRoom(e.target.value)}>
//                                     {roomData.map((room) => (
//                                         <MenuItem key={room.ID} value={room.ID}>
//                                             {room.ID}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         {/* Date picker */}
//                         <Grid item xs={12} md={4}>
//                             <FormControl fullWidth>
//                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                     <DatePicker
//                                         label="วันที่สอบ"
//                                         value={date}
//                                         onChange={(newValue) => setDate(newValue)}
//                                         renderInput={(params) => <TextField {...params} fullWidth />}
//                                     />
//                                 </LocalizationProvider>
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//                     <Grid container spacing={3} mt={3}>
//                         <Grid item xs={12}>
//                             <Typography variant="h6" gutterBottom>
//                                 จำนวนกรรมการสอบ
//                             </Typography>
//                             <TextField
//                                 label="จำนวนกรรมการสอบ"
//                                 type="number"
//                                 value={numberOfFields}
//                                 onChange={handleInputChange}
//                             />
//                         </Grid>
//                         <InputLabel id="teacher-select-label">Teacher</InputLabel>
//                                             <Select
//                                                 labelId="teacher-select-label"
//                                                 id="teacher-select"
//                                                 name="T_id"
//                                                 value={TData.T_id}
//                                                 label="Teacher"
//                                                 onChange={handleSelectChange}
//                                             >
//                                                 {teachers.map((teacher) => (
//                                                     <MenuItem key={teacher.T_id} value={teacher.T_id}>
//                                                         {teacher.T_name}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                         {Array.from({ length: numberOfFields }).map((_, index) => (
//                             <Grid item xs={12} md={6} key={index}>
//                                 <Typography variant="h6" gutterBottom>
//                                     กรรมการคนที่ {index + 1}
//                                 </Typography>
//                                 {/* Teacher selection */}
//                                 <FormControl sx={{ width: '300px' }}>
//                                     <InputLabel>เลือกอาจารย์</InputLabel>
//                                     <Select
//                                         value={teacherValues[index] || ''} 
//                                         onChange={handleSelectTeacher(index)}
//                                     >
//                                         {getFilteredTeachers(index).map((teacher) => (
//                                             <MenuItem key={teacher.ID} value={teacher.ID}>
//                                                 {teacher.T_name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>

//                                 </FormControl>
//                                 {/* Position selection */}
//                                 <FormControl sx={{ width: '150px' }}>
//                                     <InputLabel>ตำแหน่ง</InputLabel>
//                                     <Select
//                                         value={positionValues[index] || ''}
//                                         onChange={handleSelectPosition(index)}
//                                     >
//                                         {getFilteredPositions(index).map((position) => (
//                                             <MenuItem key={position.ID} value={position.ID}>
//                                                 {position.Name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Grid>
//                         ))}
//                         {/* Number of projects */}
//                         <Grid item xs={12}>
//                             <Typography variant="h6" gutterBottom>
//                                 จำนวนโปรเจคที่สอบ
//                             </Typography>
//                             <TextField
//                                 label="จำนวนโปรเจคที่สอบ"
//                                 type="number"
//                                 value={numberOfFields2}
//                                 onChange={handleInputChange2}
//                             />
//                         </Grid>
//                         {Array.from({ length: numberOfFields2 }).map((_, index) => (
//                             <Grid item xs={12} md={6} key={index}>
//                                 <Typography variant="h6" gutterBottom>
//                                     โปรเจคที่ {index + 1}
//                                 </Typography>
//                                 {/* Project selection */}
//                                 <FormControl sx={{ width: '300px' }}>
//                                     <InputLabel>เลือกโปรเจค</InputLabel>
//                                     <Select
//                                         value={projectValues[index] || ''}
//                                         onChange={handleSelectProject(index)}
//                                     >
//                                         {getFilteredProjects(index).map((project) => (
//                                             <MenuItem key={project.ID} value={project.ID}>
//                                                 {project.P_name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                                 {/* Time selection */}
//                                 <FormControl sx={{ width: '150px' }}>
//                                     <InputLabel>เวลาสอบ</InputLabel>
//                                     <Select
//                                         value={timeOn1[index] || ''}
//                                         onChange={handleSelectTime(index)}
//                                         error={invalidTimes[index]}
//                                     >
//                                         {getFilteredTimes(index).map((time) => (
//                                             <MenuItem key={time} value={time}>
//                                                 {time}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>

//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </MainCard>
//     );
// };

// export default ManageExamRoom;


import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';
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
    const [invalidTimes, setInvalidTimes] = useState(Array(numberOfFields2).fill(false));
    const [teachers, setTeachers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [TData, setTData] = useState({
        T_id: ''
    });

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === 'S_id1' || name === 'S_id2') {
            setSData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'T_id') {
            setTData({ T_id: value });
        }
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:9999/Teacher');
                const data = await response.json();
                console.log('Fetched teachers:', data); // Add this line
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
                console.log('Fetched projects:', data); // Add this line
                setProjects(data);
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

    const handleSelectProject = (index) => (event) => {
        const newProjectValues = [...projectValues];
        newProjectValues[index] = event.target.value;
        setProjectValues(newProjectValues);
    };

    const handleSelectTime = (index) => (event) => {
        const newTimeValues = [...timeOn1];
        newTimeValues[index] = event.target.value; // เก็บค่าเวลาที่เลือกใน index ที่ถูกต้อง
        setTimeOn1(newTimeValues); // อัปเดตค่า timeOn1 ใน state

        // ตรวจสอบเวลาซ้ำ
        const newInvalidTimes = [...invalidTimes];
        newInvalidTimes[index] = checkForDuplicateTimes(newTimeValues); // ฟังก์ชันตรวจสอบเวลาซ้ำ
        setInvalidTimes(newInvalidTimes);
    };

    const getFilteredTeachers = (index) => {
        const selectedTeachers = teacherValues.filter((_, i) => i !== index);
        return teachers.filter((teacher) => !selectedTeachers.includes(teacher.T_id));
    };


    const getFilteredProjects = (index) => {
        const selectedProjects = projectValues.filter((_, i) => i !== index); // Filter out selected projects
        return projects.filter((project) => !selectedProjects.includes(project.P_id)); // Return projects that haven't been selected
    };

    const getFilteredPositions = (index) => {
        const selectedPositions = positionValues.filter((_, i) => i !== index);
        return positionData.filter((position) => !selectedPositions.includes(position.ID) || position.ID !== 'No1');
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
                                        labelId="teacher-select-label"
                                        id="teacher-select"
                                        name="T_id"
                                        value={teacherValues[index] || ''}
                                        label="Teacher"
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
                                <FormControl sx={{ width: '150px' }}>
                                    <InputLabel>ตำแหน่ง</InputLabel>
                                    <Select
                                        value={positionValues[index] || ''}
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
                        {/* Number of projects */}
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
                                    โปรเจคที่ {index + 1}
                                </Typography>
                                <FormControl sx={{ width: '300px' }}>
                                    <InputLabel>เลือกโปรเจค</InputLabel>
                                    <Select
                                        value={projectValues[index] || ''}
                                        label="เลือกโปรเจค"
                                        onChange={handleSelectProject(index)}
                                    >
                                        {getFilteredProjects(index).map((project) => (
                                            <MenuItem key={project.P_id} value={project.P_id}>
                                                {project.P_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* Position selection */}
                                <FormControl sx={{ width: '150px' }}>
                                    <InputLabel>เวลาสอบ</InputLabel>
                                    <Select
                                        value={timeOn1[index] || ''}
                                        onChange={handleSelectTime(index)}
                                        error={invalidTimes[index]}
                                    >
                                        {getFilteredTimes(index).map((time) => (
                                            <MenuItem key={time.ID} value={time.ID}>
                                                {time.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ManageExamRoom;