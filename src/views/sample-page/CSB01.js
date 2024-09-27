import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

function CSB01() {
   
    const [selectedValues, setSelectedValues] = useState({
        networks: false,
        graphics: false,
        database: false,
        ai: false,
        games: false,
    });

    const getFilteredOptions = (selectedStudentIds) => {
        // สมมติว่า projectStudents เป็น array ที่เก็บรหัสนักเรียนที่มีอยู่ในโครงการ
        const projectStudents = []; // ดึงข้อมูลจาก API หรือสถานะที่เก็บไว้
    
        return studentData.filter(student => 
            !selectedStudentIds.includes(student.S_id) && 
            !projectStudents.includes(student.S_id)
        );
    };
    

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => setOpenDialog(false);

    const [selectedValue, setSelectedValue] = useState('');

    const handleProjectNameChange = (e) => {
        const regex = /^[A-Za-z\s]*$/;
        if (regex.test(e.target.value)) {
            setPData({ ...PData, P_name: e.target.value });
        }
    };

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

    const [studentData, setStudentData] = useState([]);
    const [studentNames, setStudentNames] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [PData, setPData] = useState({
        P_name: '',
        P_details: '',
        P_status: '',
        P_CSB01: '',
        P_CSB02: '',
        P_CSB03: '',
        P_S1: '',
        P_S2: '',
        P_T: '',
        P_type: '',
        P_tool: '',
    });

    const [SData, setSData] = useState({
        S_id1: '',
        S_id2: ''
    });

    const [TData, setTData] = useState({
        T_id: ''
    });

    const validateForm = () => {
        const errors = {
            projectName: !PData.P_name,
            projectDetails: !PData.P_details,
            student1: !SData.S_id1,
            student2: !SData.S_id2
        };

        setErrors(errors);
        return !Object.values(errors).includes(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
            return;
        }

        const student1Name = studentData.find(student => student.S_id === SData.S_id1)?.S_name || '';
        const student2Name = studentData.find(student => student.S_id === SData.S_id2)?.S_name || '';
        const teacherName = teachers.find(teacher => teacher.T_id === TData.T_id)?.T_name || '';

        const projectData = {
            ...PData,
            P_S1: student1Name,
            P_S2: student2Name,
            P_T: teacherName
        };

        try {
            console.log('Submitting data:', projectData);
            const response = await axios.post('http://localhost:9999/Project', projectData);
            console.log('Project added:', response.data);
            alert("บันทึกโครงงานสำเร็จ!");

            setPData({
                P_name: '',
                P_details: '',
                P_status: '',
                P_CSB01: '',
                P_CSB02: '',
                P_CSB03: '',
                P_S1: '',
                P_S2: '',
                P_T: '',
                P_type: '',
                P_tool: ''
            });
            setSData({
                S_id1: '',
                S_id2: ''
            });
            setTData({
                T_id: ''
            });
        } catch (error) {
            console.error('Error adding project:', error);
            alert("ไม่สามารถบันทึกโครงงานได้ กรุณาลองอีกครั้ง");
        }

        setOpenDialog(true);
    };

    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === "No") {
            setPData(prevData => ({
                ...prevData,
                P_status: "ไม่มีที่ปรึกษา",
                P_T: ''
            }));

            fetch('http://localhost:9999/Project', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    P_status: "ไม่มีที่ปรึกษา",
                    P_T: null
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else if (selectedValue === "Yes") {
            setPData(prevData => ({
                ...prevData,
                P_status: ''
            }));
        }

        setSelectedValue(selectedValue);
    };

    const [errors, setErrors] = useState({
        projectName: false,
        projectDetails: false,
        student1: false,
        student2: false
    });

    const selectedIds = [SData.S_id1, SData.S_id2].filter(id => id);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get('http://localhost:9999/students');
                if (response.data && Array.isArray(response.data)) {
                    const uniqueStudents = Array.from(new Map(response.data.map(item => [item.S_id, item])).values());
                    setStudentData(uniqueStudents);
                    setStudentNames(uniqueStudents.map(item => ({ S_id: item.S_id, S_name: item.S_name })));
                }
            } catch (error) {
                console.error('Error fetching Student names:', error);
            }
        };
        fetchStudent();
    }, []);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:9999/Teacher');
                if (response.data && Array.isArray(response.data)) {
                    setTeachers(response.data);
                }
            } catch (error) {
                console.error('Error fetching Teacher names:', error);
            }
        };
        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Exam status data
                const examResponse = await axios.get('http://localhost:9999/Exam');
                const examData = examResponse.data;
    
                // Check the status of Exam_o_CSB01
                const examCSB01 = examData.find(exam => exam.Exam_o_CSB01 !== undefined);
                if (examCSB01 && examCSB01.Exam_o_CSB01 === 'เปิด') {
                    setIsExamOpen(true);
                } else {
                    setIsExamOpen(false);
                    alert('ไม่ได้อยู่ในช่วงยื่นสอบหัวข้อ');
                    return; // Exit if the exam is not open
                }

                // Fetch Project data
                const projectResponse = await axios.get('http://localhost:9999/Project');
                const projectData = projectResponse.data;
    
                // Fetch Exam results data
                const examResultsResponse = await axios.get('http://localhost:9999/Exam_results');
                const examResultsData = examResultsResponse.data;
    
                if (Array.isArray(projectData) && projectData.length > 0) {
                    const project = projectData[0]; // Adjust based on actual API response
    
                    // Find the corresponding exam result by P_id
                    const examResult = examResultsData.find(
                        (result) => result.P_id === project._id
                    );
    
                    setPData({
                        P_id: project._id || '',
                        P_name: project.P_name || '',
                        P_S1: project.P_S1 || '',
                        P_S2: project.P_S2 || '',
                        P_T: project.P_T || '',
                        ExamStatus: examResult ? examResult.Exam_CSB01_status : ''
                    });
                } else {
                    console.error('Unexpected API response:', projectData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    // Additional code (related to form handling and submission) remains unchanged
    const handleChangeSelectObject = (event) => {
        const { name, checked } = event.target;
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: checked,
        }));
        console.log(`${name} is now ${checked ? 'selected' : 'deselected'}`);
    };

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
                                        <Typography fontSize='18px'>
                                            รหัสนักศึกษา คนที่ 1
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
                                                        id="StudentID-select1"
                                                        name="S_id1"
                                                        value={SData.S_id1}
                                                        label="รหัสนักศึกษา"
                                                        onChange={handleSelectChange}
                                                    >
                                                        {getFilteredOptions([SData.S_id2]).map((student, index) => (
                                                            <MenuItem key={index} value={student.S_id}>
                                                                {student.S_id}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    disabled
                                                    id="Name1"
                                                    label="ชื่อ - สกุล"
                                                    value={studentData.find(student => student.S_id === SData.S_id1)?.S_name || ''}
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
                                                        name="S_id2"
                                                        value={SData.S_id2}
                                                        label="รหัสนักศึกษา"
                                                        onChange={handleSelectChange}
                                                    >
                                                        {getFilteredOptions([SData.S_id1]).map((student, index) => (
                                                            <MenuItem key={index} value={student.S_id}>
                                                                {student.S_id}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    disabled
                                                    id="Name2"
                                                    label="ชื่อ - สกุล"
                                                    value={studentData.find(student => student.S_id === SData.S_id2)?.S_name || ''}
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
                                                label="ชื่อโครงงานภาษาอังกฤษ"
                                                id="P_name"
                                                value={PData.P_name}
                                                onChange={handleProjectNameChange}
                                                error={errors.projectName}
                                                helperText={errors.projectName ? 'ชื่อโครงงานภาษาอังกฤษจำเป็นต้องกรอก' : ''}
                                                inputProps={{ pattern: "[A-Za-z ]*" }}
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
                                    </FormControl>

                                    {selectedValue === 'Yes' && (
                                        <FormControl
                                            sx={{
                                                marginTop: 2,
                                                marginLeft: 55,
                                                minWidth: 180,
                                                marginRight: 33,
                                            }}>
                                            <InputLabel id="teacher-select-label">Teacher</InputLabel>
                                            <Select
                                                labelId="teacher-select-label"
                                                id="teacher-select"
                                                name="T_id"
                                                value={TData.T_id}
                                                label="Teacher"
                                                onChange={handleSelectChange}
                                            >
                                                {teachers.map((teacher) => (
                                                    <MenuItem key={teacher.T_id} value={teacher.T_id}>
                                                        {teacher.T_name}
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
                                        {['networks', 'graphics', 'database', 'ai', 'games'].map((category) => (
                                            <FormControlLabel
                                                key={category}
                                                control={
                                                    <Checkbox
                                                        checked={selectedValues[category]}
                                                        onChange={handleChangeSelectObject}
                                                        name={category}
                                                    />
                                                }
                                                label={category} 
                                            />
                                        ))}
                                        {errors.atLeastOneCategory && (
                                            <Typography color="error" sx={{ marginLeft: 55, marginTop: 1 }}>
                                                ต้องเลือกประเภทของโครงงานอย่างน้อยหนึ่งรายการ
                                            </Typography>
                                        )}
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
                                            error={errors.projectDetails}
                                            helperText={errors.projectDetails ? 'รายละเอียดของโครงงานต้องกรอก' : ''}
                                            onChange={(e) => setPData({ ...PData, P_details: e.target.value })}
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
                                            id="P_tool"
                                            label=""
                                            multiline
                                            maxRows={8}
                                            value={PData.P_tool}
                                            onChange={(e) => setPData({ ...PData, P_tool: e.target.value })}
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
