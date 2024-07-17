// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'เจ้าหน้าที่',
  type: 'group',
  children: [
    {
      id: 'authentication', //สร้างไอดีใหม่ด้วยนะ
      title: 'Special Project 1',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3', //สร้างไอดีใหม่ด้วยนะ
          title: 'รายชื่อนักศึกษา CSB',
          type: 'item',
          url: '/dashboard/CSB/ListNameStudentS1',
          target: false
        }
      ]
    },
    {
      id: 'authentication', //สร้างไอดีใหม่ด้วยนะ
      title: 'Special Project 2',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3', //สร้างไอดีใหม่ด้วยนะ
          title: 'รายชื่อนักศึกษา CSB',
          type: 'item',
          url: '/dashboard/CSB/ListNameStudentS2',
          target: false
        }
      ]
    },
    {
      id: 'default11',
      title: 'เอกสารที่ยังไม่ได้ตรวจสอบ',
      type: 'item',
      url: '/dashboard/CSB/ListOfDoc',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default12',
      title: 'รายชื่อนักศึกษาตกค้าง',
      type: 'item',
      url: '/dashboard/CSB/RemainingStudentsName',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default13',
      title: 'จัดการการยื่นสอบ',
      type: 'item',
      url: '/dashboard/CSB/ManageExamSP',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default14',
      title: 'จัดห้องสอบ',
      type: 'item',
      url: '/dashboard/CSB/ManageExamRoom',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default15',
      title: 'พิมพ์เอกสาร',
      type: 'item',
      url: '/dashboard/CSB/ListOfDoc',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
