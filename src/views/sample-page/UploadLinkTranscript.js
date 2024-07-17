import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';

function UploadLinkTranscript1() {
  const [linkValue, setLinkValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [Transcript, setTranscript] = useState([]);

  const handleLinkChange = (e) => {
    setLinkValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:9999/Transcript');
        setTranscript(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}></Grid>
              <Container>
                <h1>ตรวจสอบคุณสมบัติยื่นโครงงานพิเศษ 2 (ปริญญานิพนธ์)</h1>
                <h2>เกณฑ์การประเมิน</h2>
                <p>นักศึกษาโครงการพิเศษสองภาษาต้องลงทะเบียนเรียนวิชา 040613141 Special Project I
                  ได้ผลการเรียนรวม ≥ 102 หน่วยกิต และได้ผลการเรียนรายวิชาภาคฯ 0406xxxxx ≥ 57 หน่วยกิต
                  โดยใช้เอกสารใบรับรองผลการศึกษา (Transcript)
                </p>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      marginTop: 1,
                    }}
                    fontSize={'18px'}
                  >
                    อัปโหลดไฟล์ผลการเรียนจากเว็บไซต์ reg kmutnb
                  </Typography>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ maxWidth: 180, m: 2 }}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>

                  <Grid sx={{ textAlign: 'center' }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ maxWidth: 100 }}>ตรวจสอบ</Button>
                  </Grid>
                </Box>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>ตรวจสอบคุณสมบัติยื่นสอบ</DialogTitle>
                  <DialogContent>
                    <p>ผลการตรวจสอบ</p>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                  </DialogActions>
                </Dialog>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default UploadLinkTranscript1;
