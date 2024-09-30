// import { useState, useRef, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   Chip,
//   ClickAwayListener,
//   Divider,
//   Grid,
//   InputAdornment,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   OutlinedInput,
//   Paper,
//   Popper,
//   Stack,
//   Switch,
//   Typography
// } from '@mui/material';

// // third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import Transitions from 'ui-component/extended/Transitions';
// import UpgradePlanCard from './UpgradePlanCard';
// import User1 from 'assets/images/users/user-round.svg';

// // assets
// import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';

// // ==============================|| PROFILE MENU ||============================== //

// const ProfileSection = () => {
//   const theme = useTheme();
//   const customization = useSelector((state) => state.customization);
//   const navigate = useNavigate();

//   const [sdm, setSdm] = useState(true);
//   const [value, setValue] = useState('');
//   const [notification, setNotification] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [open, setOpen] = useState(false);
//   /**
//    * anchorRef is used on different componets and specifying one type leads to other components throwing an error
//    * */
//   const anchorRef = useRef(null);
//   const handleLogout = async () => {
//     window.location.href = '/free';
//     console.log('Logout');
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleListItemClick = (event, index, route = '') => {
//     setSelectedIndex(index);
//     handleClose(event);

//     if (route && route !== '') {
//       navigate(route);
//     }
//   };
//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <>
//       <Chip
//         sx={{
//           height: '48px',
//           alignItems: 'center',
//           borderRadius: '27px',
//           transition: 'all .2s ease-in-out',
//           borderColor: theme.palette.primary.light,
//           backgroundColor: theme.palette.primary.light,
//           '&[aria-controls="menu-list-grow"], &:hover': {
//             borderColor: theme.palette.primary.main,
//             background: `${theme.palette.primary.main}!important`,
//             color: theme.palette.primary.light,
//             '& svg': {
//               stroke: theme.palette.primary.light
//             }
//           },
//           '& .MuiChip-label': {
//             lineHeight: 0
//           }
//         }}
//         icon={
//           <Avatar
//             src={User1}
//             sx={{
//               ...theme.typography.mediumAvatar,
//               margin: '8px 0 8px 8px !important',
//               cursor: 'pointer'
//             }}
//             ref={anchorRef}
//             aria-controls={open ? 'menu-list-grow' : undefined}
//             aria-haspopup="true"
//             color="inherit"
//           />
//         }
//         label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
//         variant="outlined"
//         ref={anchorRef}
//         aria-controls={open ? 'menu-list-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//         color="primary"
//       />
//       <Popper
//         placement="bottom-end"
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         popperOptions={{
//           modifiers: [
//             {
//               name: 'offset',
//               options: {
//                 offset: [0, 14]
//               }
//             }
//           ]
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions in={open} {...TransitionProps}>
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
//                   <Box sx={{ p: 2 }}>
//                     <Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Typography variant="h4">Good Morning,</Typography>
//                         <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
//                           Johne Doe
//                         </Typography>
//                       </Stack>
//                       {/* <Typography variant="subtitle2">Project Admin</Typography> */}
//                     </Stack>
//                     {/* <OutlinedInput
//                       sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
//                       id="input-search-profile"
//                       value={value}
//                       onChange={(e) => setValue(e.target.value)}
//                       placeholder="Search profile options"
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
//                         </InputAdornment>
//                       }
//                       aria-describedby="search-helper-text"
//                       inputProps={{
//                         'aria-label': 'weight'
//                       }}
//                     /> */}
//                     {/* <Divider /> */}
//                   </Box>
//                   <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
//                     <Box sx={{ p: 2 }}>
//                       {/* <UpgradePlanCard /> */}
//                       <Divider />
//                       {/* <Card
//                         sx={{
//                           bgcolor: theme.palette.primary.light,
//                           my: 2
//                         }}
//                       >
//                         <CardContent>
//                           <Grid container spacing={3} direction="column">
//                             <Grid item>
//                               <Grid item container alignItems="center" justifyContent="space-between">
//                                 <Grid item>
//                                   <Typography variant="subtitle1">Start DND Mode</Typography>
//                                 </Grid>
//                                 <Grid item>
//                                   <Switch
//                                     color="primary"
//                                     checked={sdm}
//                                     onChange={(e) => setSdm(e.target.checked)}
//                                     name="sdm"
//                                     size="small"
//                                   />
//                                 </Grid>
//                               </Grid>
//                             </Grid>
//                             <Grid item>
//                               <Grid item container alignItems="center" justifyContent="space-between">
//                                 <Grid item>
//                                   <Typography variant="subtitle1">Allow Notifications</Typography>
//                                 </Grid>
//                                 <Grid item>
//                                   <Switch
//                                     checked={notification}
//                                     onChange={(e) => setNotification(e.target.checked)}
//                                     name="sdm"
//                                     size="small"
//                                   />
//                                 </Grid>
//                               </Grid>
//                             </Grid>
//                           </Grid>
//                         </CardContent>
//                       </Card>
//                       <Divider /> */}
//                       <List
//                         component="nav"
//                         sx={{
//                           width: '100%',
//                           maxWidth: 350,
//                           minWidth: 300,
//                           backgroundColor: theme.palette.background.paper,
//                           borderRadius: '10px',
//                           [theme.breakpoints.down('md')]: {
//                             minWidth: '100%'
//                           },
//                           '& .MuiListItemButton-root': {
//                             mt: 0.5
//                           }
//                         }}
//                       >
//                         <ListItemButton
//                           sx={{ borderRadius: `${customization.borderRadius}px` }}
//                           selected={selectedIndex === 0}
//                           onClick={(event) => handleListItemClick(event, 0, '#')}
//                         >
//                           <ListItemIcon>
//                             <IconSettings stroke={1.5} size="1.3rem" />
//                           </ListItemIcon>
//                           <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
//                         </ListItemButton>
//                         {/* <ListItemButton
//                           sx={{ borderRadius: `${customization.borderRadius}px` }}
//                           selected={selectedIndex === 1}
//                           onClick={(event) => handleListItemClick(event, 1, '#')}
//                         >
//                           <ListItemIcon>
//                             <IconUser stroke={1.5} size="1.3rem" />
//                           </ListItemIcon>
//                           <ListItemText
//                             primary={
//                               <Grid container spacing={1} justifyContent="space-between">
//                                 <Grid item>
//                                   <Typography variant="body2">Social Profile</Typography>
//                                 </Grid>
//                                 <Grid item>
//                                   <Chip
//                                     label="02"
//                                     size="small"
//                                     sx={{
//                                       bgcolor: theme.palette.warning.dark,
//                                       color: theme.palette.background.default
//                                     }}
//                                   />
//                                 </Grid>
//                               </Grid>
//                             }
//                           />
//                         </ListItemButton> */}
//                         <ListItemButton
//                           sx={{ borderRadius: `${customization.borderRadius}px` }}
//                           selected={selectedIndex === 4}
//                           onClick={handleLogout}
//                         >
//                           <ListItemIcon>
//                             <IconLogout stroke={1.5} size="1.3rem" />
//                           </ListItemIcon>
//                           <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
//                         </ListItemButton>
//                       </List>
//                     </Box>
//                   </PerfectScrollbar>
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </>
//   );
// };

// export default ProfileSection;


// import { useState, useRef, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// import {
//   Avatar,
//   Box,
//   Chip,
//   Paper,
//   Popper,
//   Stack,
//   Typography
// } from '@mui/material';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import User1 from 'assets/images/users/user-round.svg';
// import { IconSettings } from '@tabler/icons-react';
// import Transitions from 'ui-component/extended/Transitions';
// import MainCard from 'ui-component/cards/MainCard';

// const ProfileSection = () => {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);
//   const anchorRef = useRef(null);

//   // ดึงข้อมูล username จาก Local Storage
//   const username = localStorage.getItem("username");

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <>
//       <Chip
//         sx={{
//           height: '48px',
//           alignItems: 'center',
//           borderRadius: '27px',
//           transition: 'all .2s ease-in-out',
//           borderColor: theme.palette.primary.light,
//           backgroundColor: theme.palette.primary.light,
//           '&[aria-controls="menu-list-grow"], &:hover': {
//             borderColor: theme.palette.primary.main,
//             background: `${theme.palette.primary.main}!important`,
//             color: theme.palette.primary.light,
//             '& svg': {
//               stroke: theme.palette.primary.light
//             }
//           },
//           '& .MuiChip-label': {
//             lineHeight: 0
//           }
//         }}
//         icon={
//           <Avatar
//             src={User1}
//             sx={{
//               ...theme.typography.mediumAvatar,
//               margin: '8px 0 8px 8px !important',
//               cursor: 'pointer'
//             }}
//             ref={anchorRef}
//             aria-controls={open ? 'menu-list-grow' : undefined}
//             aria-haspopup="true"
//             color="inherit"
//           />
//         }
//         label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
//         variant="outlined"
//         ref={anchorRef}
//         aria-controls={open ? 'menu-list-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//         color="primary"
//       />
//       <Popper
//         placement="bottom-end"
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         popperOptions={{
//           modifiers: [
//             {
//               name: 'offset',
//               options: {
//                 offset: [0, 14]
//               }
//             }
//           ]
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions in={open} {...TransitionProps}>
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
//                   <Box sx={{ p: 2 }}>
//                     <Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Typography variant="h4">Good Morning,</Typography>
//                         <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
//                           {username ? username : "Guest"}
//                         </Typography>
//                       </Stack>
//                     </Stack>
//                   </Box>
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </>
//   );
// };

// export default ProfileSection;


// import { useState, useRef, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// import axios from 'axios'; // ใช้ axios ในการเรียก API
// import {
//   Avatar,
//   Box,
//   Chip,
//   Paper,
//   Popper,
//   Stack,
//   Typography
// } from '@mui/material';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import User1 from 'assets/images/users/user-round.svg';
// import { IconSettings } from '@tabler/icons-react';
// import Transitions from 'ui-component/extended/Transitions';
// import MainCard from 'ui-component/cards/MainCard';

// const ProfileSection = () => {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);
//   const [studentName, setStudentName] = useState('Guest'); // เก็บชื่อที่จะมาแสดง
//   const anchorRef = useRef(null);

//   // ดึงข้อมูล username จาก Local Storage
//   const username = localStorage.getItem("username");

//   // ฟังก์ชันในการดึงข้อมูล S_name จาก API
//   const fetchStudentName = async (username) => {
//     try {
//       if (username && username.startsWith('s')) {
//         // ตัด 's' ข้างหน้าออก
//         const studentUsername = username.slice(1);

//         // เรียก API เพื่อดึงข้อมูล S_name
//         const response = await axios.get(`http://localhost:9999/students/${studentUsername}`);

//         if (response.data && response.data.S_name) {
//           setStudentName(response.data.S_name); // ตั้งค่า studentName เป็น S_name ที่ได้จาก API
//         } else {
//           console.error('Student name not found in response');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching student name:', error);
//     }
//   };

//   // เรียกฟังก์ชัน fetchStudentName เมื่อ component โหลด
//   useEffect(() => {
//     if (username) {
//       fetchStudentName(username);
//     }
//   }, [username]);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <>
//       <Chip
//         sx={{
//           height: '48px',
//           alignItems: 'center',
//           borderRadius: '27px',
//           transition: 'all .2s ease-in-out',
//           borderColor: theme.palette.primary.light,
//           backgroundColor: theme.palette.primary.light,
//           '&[aria-controls="menu-list-grow"], &:hover': {
//             borderColor: theme.palette.primary.main,
//             background: `${theme.palette.primary.main}!important`,
//             color: theme.palette.primary.light,
//             '& svg': {
//               stroke: theme.palette.primary.light
//             }
//           },
//           '& .MuiChip-label': {
//             lineHeight: 0
//           }
//         }}
//         icon={
//           <Avatar
//             src={User1}
//             sx={{
//               ...theme.typography.mediumAvatar,
//               margin: '8px 0 8px 8px !important',
//               cursor: 'pointer'
//             }}
//             ref={anchorRef}
//             aria-controls={open ? 'menu-list-grow' : undefined}
//             aria-haspopup="true"
//             color="inherit"
//           />
//         }
//         label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
//         variant="outlined"
//         ref={anchorRef}
//         aria-controls={open ? 'menu-list-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//         color="primary"
//       />
//       <Popper
//         placement="bottom-end"
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         popperOptions={{
//           modifiers: [
//             {
//               name: 'offset',
//               options: {
//                 offset: [0, 14]
//               }
//             }
//           ]
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions in={open} {...TransitionProps}>
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
//                   <Box sx={{ p: 2 }}>
//                     <Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Typography variant="h4">Good Morning,</Typography>
//                         <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
//                           {studentName} {/* แสดงชื่อของนักเรียนที่ดึงมาจาก API */}
//                         </Typography>
//                       </Stack>
//                     </Stack>
//                   </Box>
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </>
//   );
// };

// export default ProfileSection;


import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'; // ใช้ axios ในการเรียก API
import {
  Avatar,
  Box,
  Chip,
  Paper,
  Popper,
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   Chip,
//   ClickAwayListener,
//   Divider,
//   Grid,
//   InputAdornment,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   OutlinedInput,
//   Paper,
//   Popper,
//   Stack,
//   Switch,
//   Typography
// } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import User1 from 'assets/images/users/user-round.svg';
import { IconSettings, IconLogout } from '@tabler/icons-react';
import Transitions from 'ui-component/extended/Transitions';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector } from 'react-redux';

const ProfileSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [studentName, setStudentName] = useState('Guest'); // เก็บชื่อที่จะมาแสดง
  const anchorRef = useRef(null);
  const customization = useSelector((state) => state.customization);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // ดึงข้อมูล username จาก Local Storage
  const username = localStorage.getItem("username");

  // ฟังก์ชันในการดึงข้อมูล S_name จาก API หลังจากเทียบกับ S_id
  const fetchStudentName = async (username) => {
    try {
      if (username && username.startsWith('s')) {
        // ตัด 's' ข้างหน้าออก
        const studentUsername = username.slice(1);

        // เรียก API เพื่อดึงข้อมูลนักเรียนทั้งหมด
        const response = await axios.get(`http://localhost:9999/students`);

        if (response.data && Array.isArray(response.data)) {
          // หา student ที่มี S_id ตรงกับ studentUsername
          const student = response.data.find(s => s.S_id === studentUsername);

          if (student) {
            setStudentName(student.S_name); // ตั้งค่า studentName เป็น S_name ที่ได้จาก API
          } else {
            console.error('Student with matching S_id not found');
          }
        } else {
          console.error('Invalid response data format');
        }
      }
    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };

  // เรียกฟังก์ชัน fetchStudentName เมื่อ component โหลด
  useEffect(() => {
    if (username) {
      fetchStudentName(username);
    }
  }, [username]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = async () => {
    window.location.href = '/free';
    console.log('Logout');
  };

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Good Morning,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {studentName} {/* แสดงชื่อของนักเรียนที่ดึงมาจาก API */}
                        </Typography>
                      </Stack>
                    </Stack>
                    <ListItemButton
                      sx={{ borderRadius: `${customization.borderRadius}px` }}
                      selected={selectedIndex === 4}
                      onClick={handleLogout}
                    >
                      <ListItemIcon>
                        <IconLogout stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                    </ListItemButton>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions >
        )}
      </Popper >
    </>
  );
};

export default ProfileSection;
