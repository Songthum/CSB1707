import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
    { id: 1, name: 'จัดการการสอบโครงงานพิเศษ', link: 'path/to/file1.txt', status: 'CSB03', isDisabled: false, isRed: false },
    { id: 2, name: 'จัดการการยื่นจบการศึกษา', link: 'path/to/file2.txt', status: 'CSB03', isDisabled: false, isRed: false },
    { id: 3, name: 'จัดการการใช้บริการฟิตเนส', link: 'path/to/file3.txt', status: 'CSB02', isDisabled: false, isRed: false }
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

  const handleChange = (event) => {
    setProjectSelect(project.find(person => person.ID === event.target.value));
  };
  const handleChange2 = (event) => {
    setProjectSelect2(project.find(person => person.ID === event.target.value));
  };

  // State for text fields
  const [textField1, setTextField1] = useState('');
  const [textField2, setTextField2] = useState('');
  const [textField3, setTextField3] = useState('');


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

  // Sample data for the table
  const data = [
    { id: 1, name: 'วัตถุประสงค์และขอบเขตโครงงาน', fullscores: '10', score: '' },
    { id: 2, name: 'ความเข้าใจระบบงานเดิม/ทฤษฎีหรืองานวิจัย ที่นำมาใช้พัฒนาโครงงาน', fullscores: '20', score: '' },
    { id: 3, name: 'การศึกษาความต้องการของระบบ และการออกแบบ', fullscores: '20', score: '' },
    { id: 4, name: 'การนำเสนอโครงงาน', fullscores: '20', score: '' },
    { id: 5, name: 'รูปแบบรายงาน', fullscores: '10', score: '' },
    { id: 6, name: 'แนวทางการดำเนินงาน', fullscores: '10', score: '' },
    { name: 'คะแนนรวม', fullscores: '90', score: '' }, //ระบบต้องคำนวณคะแนนออกมา
    // Add more data as needed
  ];
  
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

  // Sample data for the table
  const data2 = [
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



  //รอพิจารณา
  // const [state, setState] = useState({ data: initialData, totalScore: 0 });

  // const handleScoreChange = (id, value) => {
  //   const newValue = Math.max(0, Math.min(Number(value), Number(state.data.find(item => item.id === id).fullscores)));
  //   const newData = state.data.map(item => {
  //     if (item.id === id) {
  //       return { ...item, score: newValue.toString() };
  //     }
  //     return item;
  //   });

  //   const newTotalScore = newData.reduce((acc, item) => acc + (Number(item.score) || 0), 0);

  //   setState({ data: newData, totalScore: newTotalScore });
  // };

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
                  <DialogTitle>ประเมินการสอบโครงงานพิเศษ</DialogTitle>
                  <DialogContent sx={{ minWidth: 1000 }}>
                    {selectedRow !== null && (
                      <>
                        {tableData[selectedRow].status === 'CSB01' && (
                          <>
                            <Select label="Select Field" defaultValue="" fullWidth>
                              <MenuItem value="option1">Option 1</MenuItem>
                              <MenuItem value="option2">Option 2</MenuItem>
                            </Select>
                            <TextField label="Text Field" fullWidth />
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
                                    label="ProjectID"
                                    margin="normal"
                                    row
                                    sx={{
                                      minWidth: 150,
                                      //marginRight: 33,
                                    }}
                                    onChange={handleChange}
                                  >
                                    {project.filter(project => project.ID !== ProjectSelect.ID).map((project) => (
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
                                  label="ชื่อโครงงาน"
                                  value={ProjectSelect.Name}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { ml: 5, width: '50ch' },
                                  }}
                                />
                                <br></br>

                                {/* Disabled text fields */}
                                <p>โดย</p>
                                <TextField
                                  label="รหัสนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SID}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 5, ml: 5, width: '25ch' },
                                  }}
                                />
                                <TextField
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                  value={ProjectSelect.SName}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 0, width: '30ch' },
                                  }}
                                /><br></br>
                                <TextField
                                  label="รหัสนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SID2}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mr: 5, ml: 5, mt: 3, width: '25ch' },
                                  }}
                                />
                                <TextField
                                  label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                  value={ProjectSelect.SName2}
                                  disabled
                                  sx={{
                                    '& > :not(style)': { mt: 3, width: '30ch' },
                                  }}
                                />
                                <p>อาจารย์ที่ปีกษา</p>
                                <TextField
                                  label="ชื่ออาจารย์ที่ปรึกษา"
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
                                    {data2.map((item) => (
                                      <TableRow key={item.id || item.name}>
                                      <TableCell>{item.id}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.fullscores}</TableCell>
                                      <TableCell>
                                        {/* <TextField
                                          label={`คะแนน (เต็ม ${item.fullscores})`}
                                          value={item.score}
                                          onChange={(e) => handleChange(item.id, e.target.value)}
                                            disabled={item.name === 'คะแนนรวม'}
                                            type="number"
                                            margin="none"
                                          /> */}

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
