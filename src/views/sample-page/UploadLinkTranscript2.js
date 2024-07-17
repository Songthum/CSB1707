// import React, { useState , useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import { Typography } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';
// import { Grid } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';

// function UploadLinkTranscript2() {
//   // State to hold the value of the link
//   const [linkValue, setLinkValue] = useState('');
//   // State to manage the dialog open/close state
//   const [openDialog, setOpenDialog] = useState(false);

//   // Function to handle changes in the text field
//   const handleLinkChange = (e) => {
//     setLinkValue(e.target.value);
//   };

//   // Function to handle submission of the form (you can customize this according to your needs)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform any action with the linkValue, such as redirecting to the provided link
//     // For example: window.location.href = linkValue;
//     setOpenDialog(true);
//   };

//   // Function to handle closing the dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });

//   const [Transcript2, setTranscript2] = useState([]);

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const response = await axios.post('http://localhost:9999/Transcript2');
//               setTranscript2(response.data);
//           } catch (error) {
//               console.error('Error fetching data:', error);
//           }
//       };

//       fetchData();
//   }, []);

//   return (
//     <MainCard>
//       <Grid container spacing={gridSpacing}>
//         <Grid item xs={12}>
//           <Grid container alignItems="center" justifyContent="space-between">
//             <Grid item>
//               <Grid container direction="column" spacing={1}></Grid>
//               <Container>
//                 <h1>ตรวจสอบคุณสมบัติยื่นโครงงานพิเศษ 2 (ปริญญานิพนธ์)</h1>
//                 <h3>เกณฑ์การประเมิน</h3>
//                 <p>กรณีที่ 1 : นักศึกษาโครงการพิเศษสองภาษาที่ยังไม่เคยลงทะเบียนในรายวิชา Special Project II ต้องแนบลิงค์ไฟล์ &quot;ผลลงทะเบียนเรียน&quot;</p>
//                 <p>กรณีที่ 2 : นักศึกษาโครงการพิเศษสองภาษาที่เคยลงทะเบียนเรียน 040613142 Special Project II แล้ว ต้องแนบลิงค์ไฟล์ &quot;เอกสารใบรับรองผลการศึกษา (Transcript)&quot;</p>
//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                   <Typography
//                     sx={{
//                       marginTop: 1,
//                       //marginLeft: 50,
//                     }}
//                     fontSize={'18px'}
//                   >
//                     อัปโหลดไฟล์ผลการเรียนจากเว็บไซต์ reg kmutnb
//                   </Typography>
//                   {/* Text Field for Link */}
//                   <Button
//                     component="label"
//                     role={undefined}
//                     variant="contained"
//                     tabIndex={-1}
//                     startIcon={<CloudUploadIcon />}
//                     sx={{ maxWidth: 180, m: 2 }}
//                   >
//                     Upload file
//                     <VisuallyHiddenInput type="file" />
//                   </Button>

//                   <Grid sx={{ textAlign: 'center' }}>
//                     {/* Button to Show Popup */}
//                     <Button variant="contained" onClick={handleSubmit} sx={{ maxWidth: 100 }}>ตรวจสอบ</Button>
//                   </Grid>
//                 </Box>

//                 {/* Dialog Popup */}
//                 <Dialog open={openDialog} onClose={handleCloseDialog}>
//                   <DialogTitle>ทำการบันทึกลิงค์เรียบร้อยแล้ว !!</DialogTitle>
//                   <DialogContent>
//                     <p>คุณได้ทำการบันทึกลิงค์นี้:</p>
//                     <p>{linkValue}</p>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleCloseDialog}>Close</Button>
//                   </DialogActions>
//                 </Dialog>
//               </Container>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </MainCard>
//   );
// }

// export default UploadLinkTranscript2;

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

function UploadLinkTranscript2() {
  const [linkValue, setLinkValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [Transcript2, setTranscript2] = useState([]);

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
        const response = await axios.post('http://localhost:9999/Transcript2');
        setTranscript2(response.data);
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
                <h3>เกณฑ์การประเมิน</h3>
                <p>กรณีที่ 1 : นักศึกษาโครงการพิเศษสองภาษาที่ยังไม่เคยลงทะเบียนในรายวิชา Special Project II ต้องแนบลิงค์ไฟล์ &quot;ผลลงทะเบียนเรียน&quot;</p>
                <p>กรณีที่ 2 : นักศึกษาโครงการพิเศษสองภาษาที่เคยลงทะเบียนเรียน 040613142 Special Project II แล้ว ต้องแนบลิงค์ไฟล์ &quot;เอกสารใบรับรองผลการศึกษา (Transcript)&quot;</p>
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
                  <DialogTitle>ทำการบันทึกลิงค์เรียบร้อยแล้ว !!</DialogTitle>
                  <DialogContent>
                    <p>คุณได้ทำการบันทึกลิงค์นี้:</p>
                    <p>{linkValue}</p>
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

export default UploadLinkTranscript2;
