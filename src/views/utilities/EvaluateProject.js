import React, { useState, useEffect } from 'react';
import { Table, Checkbox, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';


function EvaluateProject() {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'จัดการการสอบโครงงานพิเศษ', link: 'path/to/file1.txt', status: 'CSB01', isDisabled: false, isRed: false },
    { id: 2, name: 'จัดการการใช้บริการฟิตเนส', link: 'path/to/file3.txt', status: 'CSB02', isDisabled: false, isRed: false },
    { id: 3, name: 'จัดการการยื่นจบการศึกษา', link: 'path/to/file2.txt', status: 'CSB03', isDisabled: false, isRed: false },

  ]);

  const project = [
    {
      "ID": "001",
      "Name": "ระบบตรวจสอบการวัดพื้นที่",
      "SID": "6304062620061",
      "SName": "ณัชริกา กันทะสอน",
      "SID2": "6304062620062",
      "SName2": "ใจดี ยืมเงิน",
      "TID": "NLP",
      "TName": "ลือพล ไม่น่ารักเลย"
    },
    {
      "ID": "002",
      "Name": "ระบบจำลองโมเดล",
      "SID": "6304062620063",
      "SName": "สบายดี สบายใจ",
      "SID2": "6304062620064",
      "SName2": "สุดสวย สุดหล่อ",
      "TID": "SWK",
      "TName": "สุวัชชัย ตัวตึง"
    },
    {
      "ID": "003",
      "Name": "เว็บไซต์ขายของ",
      "SID": "6304062620065",
      "SName": "ไอ่กล้อง ไอ่อ้วน",
      "SID2": "6304062620066",
      "SName2": "แมวเหมียว น่ารัก",
      "TID": "KAB",
      "TName": "คัณฑารัตน์ สุดละเอียด"
    },
    {
      "ID": "004",
      "Name": "เว็บไซต์ขายที่ดิน",
      "SID": "6304062620067",
      "SName": "มะหมา สุดหล่อ",
      "SID2": "6304062620068",
      "SName2": "หนูน้อย น่ารัก",
      "TID": "CRL",
      "TName": "เฉียบวุฒิ สุดจ้าบ"

    },
    {
      "ID": "005",
      "Name": "เกมส์ปลูกผัก",
      "SID": "6304062620069",
      "SName": "สวัสดีครับ ผมนวย",
      "SID2": "6304062620070",
      "SName2": "ไม่มี ตังค์ค่า",
      "TID": "ARN",
      "TName": "เอิญ ไม่ใจดี"
    }
  ];

  const [Data, setData] = useState([
    { id: 1, name: 'วัตถุประสงค์และขอบเขตโครงงาน', fullscores: '10', score: '' },
    { id: 2, name: 'ความเข้าใจระบบงานเดิม/ทฤษฎีหรืองานวิจัย ที่นำมาใช้พัฒนาโครงงาน', fullscores: '20', score: '' },
    { id: 3, name: 'การศึกษาความต้องการของระบบ และการออกแบบ', fullscores: '20', score: '' },
    { id: 4, name: 'การนำเสนอโครงงาน', fullscores: '20', score: '' },
    { id: 5, name: 'รูปแบบรายงาน', fullscores: '10', score: '' },
    { id: 6, name: 'แนวทางการดำเนินงาน', fullscores: '10', score: '' },
    { id: 7, name: 'คะแนนรวม', fullscores: '90', score: '' }, //ระบบต้องคำนวณคะแนนออกมา
    // Add more data as needed
  ]);

  const [Data2, setData2] = useState([
    { id: 1, name: 'การออกแบบหรือแนวคิด', fullscores: '10', score: '' },
    { id: 2, name: 'วิธีการ/การดำเนินงาน', fullscores: '20', score: '' },
    { id: 3, name: 'ความสมบูรณ์ของผลงาน', fullscores: '20', score: '' },
    { id: 4, name: 'เนื้อหาและรูปแบบของปริญญานิพนธ์', fullscores: '10', score: '' },
    { id: 5, name: 'การนำเสนอโครงงาน', fullscores: '10', score: '' },
    { id: 6, name: 'การนำผลงานไปใช้ประโยชน์', fullscores: '5', score: '' },
    { id: 7, name: 'สรุป/วิจารณ์/การพัฒนาต่อในอนาคต', fullscores: '5', score: '' },
    { id: 8, name: 'คะแนนรวม', fullscores: '80', score: '' }, //ระบบต้องคำนวณคะแนนออกมา
    // Add more data as needed
  ]);

  const [Data3, setData3] = useState([
    {
      id: 1, name: 'การวิเคราะห์ปัญหา(Problem Analysis)', description: [
        '1. มีการระบุที่มาของปัญหา',
        '2. มีการนำเสนอข้อมูลทางสถิติหรือหลักฐานเพื่อสนับสนุนความสำคัญของปัญหา',
        '3. มีอ้างอิงแหล่งข้อมูลที่น่าเชื่อถือ']
      , score: ''
    },
    {
      id: 2, name: 'แนวคิด/ แนวทางของระบบ(Solution)', description: [
        '1. มีความสามารถแก้ปัญหาได้แท้จริง ตรงเป้า',
        '2. มีวิธีการที่นำเสนอที่มีประสิทธิภาพ',]
      , score: ''
    },
    {
      id: 3, name: 'ขอบเขตและปริมาณงาน(Scope)', description: [
        '1. มีลักษณะและปริมาณงานเหมาะสมสำหรับปริญญานิพนธ์',
        '2. มีความเหมาะสมตามกรอบเวลา']
      , score: ''
    },
    {
      id: 4, name: 'ต้นแบบระบบ(System Prototype)', description: [
        'มีการนำเสนอต้นแบบระบบด้วยเครื่องมือที่มีความเหมาะสม เช่น Mockup, wireframe, story board และ system architecture',]
      , score: ''
    },
    {
      id: 5, name: 'ลักษณะของกลุ่มผู้ใช้งาน(Target market)', description: [
        '1. มีการกำหนดเป้าหมายสำหรับการใช้งานระบบอย่างชัดเจน',
        '2. มีการศึกษาลักษณะกลุ่มเป้าหมาย',
        '3. มีการศึกษาผลกระทบที่คาดว่าจะเกิดต่อกลุ่มเป้าหมาย']
      , score: ''
    },
    {
      id: 6, name: 'การวิเคราะห์การตลาด (Market analysis)', description: [
        '1. มีการนำเสนอระบบที่ใกล้เคียง/ที่เกี่ยวข้องอย่างน้อย 2 ระบบ',
        '2. มีการระบุข้อจำกัดของระบบที่ใกล้เคียงหรือเกี่ยวข้อง',
        '3. มีการระบุความแตกต่างหรือจุดเด่นของระบบที่นำเสนอ']
      , score: ''
    },
    {
      id: 7, name: 'การศึกษาความเป็นไปได้ (Feasibility study)'
      , description: [
        '1. มีการนำเสนอการศึกษาเทคนิคที่เกี่ยวข้องเบื้องต้น ',
        '2. มีการศึกษาข้อจำกัดของอุปกรณ์/ระบบที่เกี่ยวข้อง']
      , score: ''
    },
    { id: 8, name: 'ผลการประเมิน', score: '' },
  ]);

  const [checkedState, setCheckedState] = useState(
    Data3.map(() => ({ yes: false, no: false }))
  );

  const handleCheckboxChange = (id, type) => {
    setData3(prevData =>
      prevData.map(item =>
        item.id === id
          ? { ...item, score: type === 'yes' ? 'ผ่าน' : 'ไม่ผ่าน' }
          : item
      )
    );
  };

  const updateFinalScore = () => {
    const countPass = Data3
      .filter(item => item.id >= 1 && item.id <= 7)
      .filter(item => item.score === 'ผ่าน').length;

    const countFail = Data3
      .filter(item => item.id >= 1 && item.id <= 7)
      .filter(item => item.score === 'ไม่ผ่าน').length;

    if (countFail >= 4) {
      setData3(prevData =>
        prevData.map(item =>
          item.id === 8
            ? { ...item, score: 'ไม่ผ่านการประเมินหัวข้อ' }
            : item
        )
      );
    } else if (countPass >= 4) {
      setData3(prevData =>
        prevData.map(item =>
          item.id === 8
            ? { ...item, score: 'ผ่านการประเมินหัวข้อ' }
            : item
        )
      );
    }
  };
  useEffect(() => {
    updateFinalScore();
  }, [Data3]);
  


  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const handleLinkClick = (index) => {
    setOpenPopup(true);
    setSelectedRow(index);
  };

  const handleSavePopup = () => {
    setOpenPopup(false);
    const updatedData = [...tableData];
    updatedData[selectedRow].isRed = false;
    updatedData[selectedRow].isDisabled = true;
    setTableData(updatedData);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleRedRow = (index) => {
    const updatedData = [...tableData];
    updatedData[index].isRed = true;
    updatedData[index].isDisabled = true;
    setTableData(updatedData);
  };

  const handleDisableRow = (index) => {
    const updatedData = [...tableData];
    updatedData[index].isDisabled = true;
    setTableData(updatedData);
  };

  const handleDonNotGoAny = () => {
    const updatedData = tableData.map(row => ({ ...row, isRed: true, isDisabled: true }));
    setTableData(updatedData);
  };


  const [ProjectSelect, setProjectSelect] = useState('');
  const [ProjectSelect2, setProjectSelect2] = useState('');
  // const [Data, setData] = useState(data);
  // const [Data2, setData2] = useState(data2);
  const [FormData, setFormData] = useState('');

  const handleChange = (event) => {
    setProjectSelect(project.find(person => person.ID === event.target.value));
  };

  const handleNameChange = (id, newScore) => {
    setData(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, score: newScore } // Update the specific item's name
          : item                       // Keep other items unchanged
      )
    );
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any action with the linkValue, such as redirecting to the provided link
    // For example: window.location.href = linkValue;
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openDialog2, setOpenDialog2] = useState(false);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // Perform any action with the linkValue, such as redirecting to the provided link
    // For example: window.location.href = linkValue;
    setOpenDialog2(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
  };

  const handleChange4 = (id, field, value) => {
    console.log(value);

    const isValidInput = (input) => {
      // Regular Expression สำหรับการตรวจสอบอักษรพิเศษ
      const regex = /^[0-9]*$/; // อนุญาตเฉพาะตัวเลข 0-9

      return regex.test(input);
    };

    const numericValue = Number(value);

    setData(prevData => {
      // อัปเดตข้อมูลที่ถูกกรอกลงในฟิลด์ score
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          // Convert value to a number
          const numericValue = Number(value);
          // Ensure the value is valid
          if (field === 'score') {
            if (!isValidInput(value) || numericValue < 0 || numericValue > Number(item.fullscores) || isNaN(numericValue)) {
              return item; // If not valid, return the item as is
            }
          }

          // Update the specific field
          return { ...item, [field]: value };
        }

        // Keep other items unchanged
        return item;
      });

      // คำนวณคะแนนรวม
      const totalScore = updatedData.reduce((acc, item) => {
        if (item.id !== 7) {
          return acc + Number(item.score || 0); // รวมคะแนนของรายการที่ไม่ใช่ id 7
        }
        return acc;
      }, 0);

      // อัปเดตคะแนนรวมใน id: 7
      return updatedData.map(item => {
        if (item.id === 7) {
          return { ...item, score: totalScore.toString() };
        }
        return item;
      });
    });
  };


  const handleChange5 = (id, field, value) => {
    console.log(value);

    const isValidInput = (input) => {
      // Regular Expression สำหรับการตรวจสอบอักษรพิเศษ
      const regex = /^[0-9]*$/; // อนุญาตเฉพาะตัวเลข 0-9

      return regex.test(input);
    };

    const numericValue = Number(value);

    setData2(prevData => {
      // อัปเดตข้อมูลที่ถูกกรอกลงในฟิลด์ score
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          // Convert value to a number
          const numericValue = Number(value);
          // Ensure the value is valid
          if (field === 'score') {
            if (!isValidInput(value) || numericValue < 0 || numericValue > Number(item.fullscores) || isNaN(numericValue)) {
              return item; // If not valid, return the item as is
            }
          }

          // Update the specific field
          return { ...item, [field]: value };
        }

        // Keep other items unchanged
        return item;
      });

      // คำนวณคะแนนรวม
      const totalScore = updatedData.reduce((acc, item) => {
        if (item.id !== 8) {
          return acc + Number(item.score || 0); // รวมคะแนนของรายการที่ไม่ใช่ id 8
        }
        return acc;
      }, 0);

      // อัปเดตคะแนนรวมใน id: 8
      return updatedData.map(item => {
        if (item.id === 8) {
          return { ...item, score: totalScore.toString() };
        }
        return item;
      });
    });
  };


  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}></Grid>
              <div>
                <h1>ประเมินการสอบโครงงานพิเศษ</h1>
                <Button onClick={handleDonNotGoAny} variant="contained" color="error">ไม่เข้าร่วมประเมินทั้งหมด</Button>
                <Dialog open={openPopup} onClose={handleClosePopup} maxWidth='xl' fullWidth>
                  <DialogTitle>แบบประเมินการสอบโครงงานพิเศษ</DialogTitle>
                  <DialogContent sx={{ minWidth: 1000 }}>
                    {selectedRow !== null && (
                      <>
                        {tableData[selectedRow]?.status === 'CSB01' && (
                          <>
                            <div>
                              <Box fontSize='18px' sx={{ marginTop: 5 }}>
                                <h1>แบบประเมินหัวข้อโครงงานพิเศษ</h1>
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
                                    value={ProjectSelect.ID}
                                    onChange={handleChange}
                                    label="ProjectID"
                                    margin="normal"
                                    row
                                    sx={{ minWidth: 150 }}
                                  >
                                    {project.filter(project => project.ID !== ProjectSelect2.ID).map((project) => (
                                      <MenuItem key={project.ID} value={project.ID}>
                                        {project.ID}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  disabled
                                  id="Name"
                                  label="ชื่อโครงงาน"
                                  defaultValue="ชื่อโครงงาน"
                                  value={ProjectSelect.Name}
                                  sx={{ '& > :not(style)': { ml: 5, width: '50ch' } }}
                                />
                                <br />

                                {/* Disabled text fields */}
                                <p>โดย</p>
                                <TextField
                                  id="SID1"
                                  label="รหัสนักศึกษาคนที่ 1"
                                  defaultValue="รหัสนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SID}
                                  disabled
                                  sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                />
                                <TextField
                                  id="SName1"
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SName}
                                  disabled
                                  sx={{ '& > :not(style)': { mr: 0, width: '30ch' } }}
                                /><br />
                                <TextField
                                  id="SID2"
                                  label="รหัสนักศึกษาคนที่ 2"
                                  defaultValue="รหัสนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SID2}
                                  disabled
                                  sx={{ '& > :not(style)': { mr: 5, ml: 5, mt: 3, width: '25ch' } }}
                                />
                                <TextField
                                  id="SName2"
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SName2}
                                  disabled
                                  sx={{ '& > :not(style)': { mt: 3, width: '30ch' } }}
                                />
                                <p>อาจารย์ที่ปรึกษา</p>
                                <TextField
                                  id="TName"
                                  label="ชื่ออาจารย์ที่ปรึกษา"
                                  defaultValue="ชื่ออาจารย์ที่ปรึกษา"
                                  value={ProjectSelect.TName}
                                  disabled
                                  sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
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
                                      <TableCell>คำอธิบาย</TableCell>
                                      <TableCell>ผลการประเมิน</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {Data3.map((item, index) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                          <ul>
                                            {(item.description || []).map((desc, idx) => (
                                              <li key={idx}>{desc}</li>
                                            ))}
                                          </ul>
                                        </TableCell>
                                        <TableCell>
                                          {item.id === 8 ? (
                                            <TextField
                                              value={item.score}
                                              disabled
                                              fullWidth
                                              margin="none"
                                            />
                                          ) : (
                                            <div>
                                              <label htmlFor={`pass-${index}`}>
                                                <input
                                                  type="radio"
                                                  id={`pass-${index}`}
                                                  checked={item.score === 'ผ่าน'}
                                                  onChange={() => handleCheckboxChange(item.id, 'yes')}
                                                />
                                                ผ่านการ
                                              </label>
                                              <label htmlFor={`fail-${index}`}>
                                                <input
                                                  type="radio"
                                                  id={`fail-${index}`}
                                                  checked={item.score === 'ไม่ผ่าน'}
                                                  onChange={() => handleCheckboxChange(item.id, 'no')}
                                                />
                                                ไม่ผ่าน
                                              </label>
                                            </div>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                                  <DialogTitle>ทำการบันทึกสำเร็จ !!</DialogTitle>
                                  <DialogContent>
                                    <p>รอการตรวจสอบจากเจ้าหน้าที่</p>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                                  </DialogActions>
                                </Dialog>
                              </TableContainer>
                              <Stack alignItems="center" justifyContent="center" fontSize='18px' sx={{ marginTop: 3 }} />
                            </div>
                          </>
                        )}




                        {tableData[selectedRow].status === 'CSB02' && (
                          <>
                            <div>

                              <Box
                                fontSize='18px'
                                sx={{
                                  marginTop: 5,
                                  //marginLeft: 50,

                                }}
                              >
                                <h1>แบบประเมินโครงงานพิเศษ 1 (สอบก้าวหน้า)</h1>
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
                                    value={ProjectSelect.ID}
                                    onChange={handleChange}
                                    label="ProjectID"
                                    margin="normal"
                                    row
                                    sx={{
                                      minWidth: 150,
                                      //marginRight: 33,
                                    }}
                                  >
                                    {project.filter(project => project.ID !== ProjectSelect2.ID).map((project) => (
                                      <MenuItem
                                        key={project.ID}
                                        value={project.ID}
                                      >
                                        {project.ID}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  disabled
                                  id="Name"
                                  label="ชื่อโครงงาน"
                                  defaultValue="ชื่อโครงงาน"
                                  value={ProjectSelect.Name}
                                  sx={{
                                    '& > :not(style)': { ml: 5, width: '50ch' },
                                  }}
                                />
                                <br></br>

                                {/* Disabled text fields */}
                                <p>โดย</p>
                                <TextField
                                  label="รหัสนักศึกษาคนที่ 1"
                                  defaultValue="รหัสนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SID}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 5, ml: 5, width: '25ch' },
                                  }}
                                />
                                <TextField
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SName}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 0, width: '30ch' },
                                  }}
                                /><br></br>
                                <TextField
                                  label="รหัสนักศึกษาคนที่ 2"
                                  defaultValue="รหัสนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SID2}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 5, ml: 5, mt: 3, width: '25ch' },
                                  }}
                                />
                                <TextField
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SName2}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mt: 3, width: '30ch' },
                                  }}
                                />
                                <p>อาจารย์ที่ปีกษา</p>
                                <TextField
                                  label="ชื่ออาจารย์ที่ปรึกษา"
                                  defaultValue="ชื่ออาจารย์ที่ปรึกษา"
                                  value={ProjectSelect.TName}
                                  disabled
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
                                    {Data.map((item) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.fullscores}</TableCell>
                                        <TableCell>
                                          <TextField
                                            value={item.score}
                                            onChange={(e) => handleChange4(item.id, 'score', e.target.value)}
                                            // onChange={(e) => handleChange2(item.id, e.target.value)}
                                            disabled={item.name === 'คะแนนรวม'}
                                            type="number"
                                            fullWidth
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
                              </Stack>
                            </div>
                          </>
                        )}



                        {tableData[selectedRow].status === 'CSB03' && (
                          <>
                            <div>

                              <Box
                                fontSize='18px'
                                sx={{
                                  marginTop: 5,
                                  //marginLeft: 50,

                                }}
                              >
                                <h1>แบบประเมินโครงงานพิเศษ 2 (ปริญญานิพนธ์)</h1>
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
                                    value={ProjectSelect.ID}
                                    onChange={handleChange}
                                    //fullWidth                                 
                                    label="ProjectID"
                                    margin="normal"
                                    row
                                    sx={{
                                      minWidth: 150,
                                      //marginRight: 33,
                                    }}
                                  >
                                    {project.filter(project => project.ID !== ProjectSelect2.ID).map((project) => (
                                      <MenuItem
                                        key={project.ID}
                                        value={project.ID}
                                      >
                                        {project.ID}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  disabled
                                  id="Name"
                                  label="ชื่อโครงงาน"
                                  defaultValue="ชื่อโครงงาน"
                                  value={ProjectSelect.Name}
                                  sx={{
                                    '& > :not(style)': { ml: 5, width: '50ch' },
                                  }}
                                />
                                <br></br>

                                {/* Disabled text fields */}
                                <p>โดย</p>
                                <TextField
                                  label="รหัสนักศึกษาคนที่ 1"
                                  defaultValue="รหัสนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SID}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 5, ml: 5, width: '25ch' },
                                  }}
                                />
                                <TextField
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SName}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 0, width: '30ch' },
                                  }}
                                /><br></br>
                                <TextField
                                  label="รหัสนักศึกษาคนที่ 2"
                                  defaultValue="รหัสนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SID2}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 5, ml: 5, mt: 3, width: '25ch' },
                                  }}
                                />
                                <TextField
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SName2}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mt: 3, width: '30ch' },
                                  }}
                                />
                                <p>อาจารย์ที่ปีกษา</p>
                                <TextField
                                  label="ชื่ออาจารย์ที่ปรึกษา"
                                  defaultValue="ชื่ออาจารย์ที่ปรึกษา"
                                  value={ProjectSelect.TName}
                                  disabled
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
                                    {Data2.map((item) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.fullscores}</TableCell>
                                        <TableCell>
                                          <TextField
                                            value={item.score}
                                            onChange={(e) => handleChange5(item.id, 'score', e.target.value)}
                                            disabled={item.name === 'คะแนนรวม'}
                                            type="number"
                                            fullWidth
                                            margin="none"
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <Dialog open={openDialog2} onClose={handleCloseDialog2}>
                                  <DialogTitle>ทำการบันทึกสำเร็จ !!</DialogTitle>
                                  <DialogContent>
                                    <p>รอการตรวจสอบจากเจ้าหน้าที่</p>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleCloseDialog2}>Close</Button>
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
                              </Stack>
                            </div>
                          </>
                        )}

                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSavePopup} color="primary">Save</Button>
                    <Button onClick={handleClosePopup} color="secondary">Cancel</Button>
                  </DialogActions>
                </Dialog>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ลำดับที่</TableCell>
                        <TableCell>ชื่อโครงงาน</TableCell>
                        <TableCell>ประเมินการสอบโครงงานพิเศษ</TableCell>
                        <TableCell>ไม่ประสงค์ลงคะแนนสอบ</TableCell>
                        <TableCell>ไม่เข้าประเมินการสอบ</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow key={index} style={{ backgroundColor: row.isRed ? 'lightcoral' : row.isDisabled ? 'lightgrey' : 'inherit' }}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleLinkClick(index)} variant="outlined" disabled={row.isDisabled}>ประเมิน</Button>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleDisableRow(index)} variant="outlined" disabled={row.isDisabled || row.isRed}>ไม่ประสงค์ลงคะแนน</Button>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleRedRow(index)} variant="outlined" disabled={row.isDisabled || row.isRed}>ไม่เข้าร่วมประเมิน</Button>
                          </TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default EvaluateProject;
