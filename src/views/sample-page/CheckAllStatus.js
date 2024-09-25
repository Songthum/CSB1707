import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

function CheckAllStatus() {
  const initialData = [
    { id: 1, name: 'ตรวจสอบคุณสมบัติการยื่นสอบโครงงานพิเศษ 1', status: '', remark: '' },
    { id: 2, name: 'คำร้องขอเป็นอาจารย์ที่ปรึกษาโครงงาน', status: '', remark: '' },
    { id: 3, name: 'การสอบหัวข้อ', status: '', remark: '' },
    { id: 4, name: 'การสอบก้าวหน้า', status: '', remark: '' },
    { id: 5, name: 'ตรวจสอบคุณสมบัติการยื่นสอบโครงงานพิเศษ 2', status: '', remark: '' },
    { id: 6, name: 'การสอบป้องกัน', status: '', remark: '' },
  ];

  const [checkAllStatus, setCheckAllStatus] = useState(initialData);
  const studentId = '12345'; // เปลี่ยนเป็น ID ของนักเรียนที่ต้องการดึงข้อมูล

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลนักเรียนเฉพาะคน
        const studentResponse = await axios.get(`http://localhost:9999/Student/${studentId}`);
        const studentData = studentResponse.data;

        // ดึงข้อมูลโปรเจกต์
        const projectResponse = await axios.get('http://localhost:9999/Project');
        const updatedData = checkAllStatus.map((item) => {
          if (item.name === 'คำร้องขอเป็นอาจารย์ที่ปรึกษาโครงงาน') {
            const project = projectResponse.data.find(proj => 
              proj.P_S1 === studentData.name || proj.P_S2 === studentData.name
            );
            if (project) {
              return {
                ...item,
                status: project.P_status === 'กำลังดำเนินการ' ? 'ผ่าน' : 'ไม่ผ่าน',
                remark: `โปรเจกต์ ID: ${project._id}`
              };
            }
          }
          return item;
        });

        setCheckAllStatus(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div>
      <h1>ตรวจสอบสถานะต่างๆ</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับที่</TableCell>
              <TableCell>รายการ</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>หมายเหตุ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkAllStatus.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.remark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CheckAllStatus;
