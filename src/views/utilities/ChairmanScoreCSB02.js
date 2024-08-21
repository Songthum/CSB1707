import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Stack } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

function ChairmanScoreCSB02() {
    const [selectedOption, setSelectedOption] = useState('');
    const [textField1, setTextField1] = useState('');
    const [textField2, setTextField2] = useState('');
    const [textField3, setTextField3] = useState('');
    const [editingRowId, setEditingRowId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

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

    const [ProjectSelect, setProjectSelect] = useState('');
    const [ProjectSelect2, setProjectSelect2] = useState('');

    const handleChange = (event) => {
        setProjectSelect(project.find(person => person.ID === event.target.value))
    };

    const handleNameChange = (id, value) => {
        // ค้นหารายการที่ผู้ใช้กำลังแก้ไข
        const item = data.find(item => item.id === id);
        
        // ตรวจสอบว่าเป็นตัวเลขและไม่เกินคะแนนเต็ม
        if (/^\d*$/.test(value) && Number(value) <= Number(item.fullscores)) {
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? { ...item, score: value } : item
                )
            );
        }
    };

    const calculateTotalScore = () => {
        const totalScore = data
            .filter(item => item.id >= 1 && item.id <= 6)
            .reduce((acc, curr) => acc + Number(curr.score), 0);

        setData(prevData =>
            prevData.map(item =>
                item.name === 'คะแนนรวม' ? { ...item, score: totalScore } : item
            )
        );
    };
    

    const handleEditClick = (id) => {
        setEditingRowId(id);
    };

    const handleSaveClick = () => {
        setEditingRowId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const [data, setData] = useState([
        { id: 1, name: 'วัตถุประสงค์และขอบเขตโครงงาน', fullscores: '10', score: '9' },
        { id: 2, name: 'ความเข้าใจระบบงานเดิม/ทฤษฎีหรืองานวิจัย ที่นำมาใช้พัฒนาโครงงาน', fullscores: '20', score: '18' },
        { id: 3, name: 'การศึกษาความต้องการของระบบ และการออกแบบ', fullscores: '20', score: '19' },
        { id: 4, name: 'การนำเสนอโครงงาน', fullscores: '20', score: '15' },
        { id: 5, name: 'รูปแบบรายงาน', fullscores: '10', score: '8' },
        { id: 6, name: 'แนวทางการดำเนินงาน', fullscores: '10', score: '8' },
        { name: 'คะแนนรวม', fullscores: '90', score: '77' },
    ]);
    useEffect(() => {
        calculateTotalScore();
    }, [data]);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}>
                                <div>
                                    <Box fontSize='18px' sx={{ marginTop: 5 }}>
                                        <h1>แบบประเมินโครงงานพิเศษ 1 (สอบก้าวหน้า)</h1>
                                        <p>รหัสโครงงาน</p>
                                        <FormControl>
                                            <InputLabel id="ProjectID-select-label">ProjectID</InputLabel>
                                            <Select
                                                labelId="ProjectID-select-label"
                                                value={ProjectSelect.ID}
                                                onChange={handleChange}
                                                margin="normal"
                                                sx={{ minWidth: 150 }}
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
                                            label="ชื่อโครงงาน"
                                            defaultValue="ชื่อโครงงาน"
                                            value={ProjectSelect.Name}
                                            onChange={(e) => setTextField3(e.target.value)}
                                            disabled
                                            sx={{ '& > :not(style)': { ml: 5, width: '50ch' } }}
                                        />
                                        <br />
                                        <p>โดย</p>
                                        <TextField
                                            label="รหัสนักศึกษาคนที่ 1"
                                            defaultValue="รหัสนักศึกษาคนที่ 1"
                                            value={ProjectSelect.SID}
                                            disabled
                                            sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                        />
                                        <TextField
                                            label="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                            defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 1"
                                            value={ProjectSelect.SName}
                                            disabled
                                            sx={{ '& > :not(style)': { mr: 0, width: '30ch' } }}
                                        /><br />
                                        <TextField
                                            label="รหัสนักศึกษาคนที่ 2"
                                            defaultValue="รหัสนักศึกษาคนที่ 2"
                                            value={ProjectSelect.SID2}
                                            disabled
                                            sx={{ '& > :not(style)': { mr: 5, ml: 5, mt: 3, width: '25ch' } }}
                                        />
                                        <TextField
                                            label="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                            defaultValue="ชื่อ-สกุลนักศึกษาคนที่ 2"
                                            value={ProjectSelect.SName2}
                                            disabled
                                            sx={{ '& > :not(style)': { mt: 3, width: '30ch' } }}
                                        />
                                        <p>อาจารย์ที่ปีกษา</p>
                                        <TextField
                                            label="ชื่ออาจารย์ที่ปรึกษา"
                                            defaultValue="ชื่ออาจารย์ที่ปรึกษา"
                                            value={ProjectSelect.TName}
                                            disabled
                                            sx={{ '& > :not(style)': { mr: 5, ml: 5, width: '25ch' } }}
                                        />
                                    </Box>
                                    {ProjectSelect && (
                                        <>
                                            <h2>ตารางลงคะแนนสำหรับกรรมการสอบ</h2>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>ลำดับที่</TableCell>
                                                            <TableCell>เกณฑ์พิจารณา</TableCell>
                                                            <TableCell>คะแนนเต็ม</TableCell>
                                                            <TableCell>ลงคะแนน</TableCell>
                                                            <TableCell>แก้ไข</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {data.map((item) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell>{item.id}</TableCell>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell>{item.fullscores}</TableCell>
                                                                <TableCell>
                                                                    {editingRowId === item.id ? (
                                                                        <TextField
                                                                            value={item.score}
                                                                            onChange={(e) => handleNameChange(item.id, e.target.value)}
                                                                            inputProps={{
                                                                                inputMode: 'numeric',
                                                                                pattern: '[0-9]*',
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        item.score
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.name !== 'คะแนนรวม' && (
                                                                        editingRowId === item.id ? (
                                                                            <Button variant="outlined" onClick={handleSaveClick}>บันทึก</Button>
                                                                        ) : (
                                                                            <Button variant="outlined" onClick={() => handleEditClick(item.id)}>แก้ไข</Button>
                                                                        )
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                                <DialogTitle>ทำการบันทึกสำเร็จ !!</DialogTitle>
                                                <DialogContent>
                                                    <p>รอการตรวจสอบจากเจ้าหน้าที่</p>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDialog}>ปิด</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                                                <Button variant="contained" onClick={handleSubmit}>บันทึก</Button>
                                                <Button variant="outlined">ยกเลิก</Button>
                                            </Stack>
                                        </>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ChairmanScoreCSB02;
