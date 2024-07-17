// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'นักศึกษา',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    // {
    //   id: 'authentication',
    //   title: 'Authentication',
    //   type: 'collapse',
    //   icon: icons.IconKey,

    //   children: [
    //     {
    //       id: 'login3',
    //       title: 'Login',
    //       type: 'item',
    //       url: '/pages/login/login3',
    //       target: true
    //     },
    //     {
    //       id: 'register3',
    //       title: 'Register',
    //       type: 'item',
    //       url: '/pages/register/register3',
    //       target: true
    //     }
    //   ]
    // },
    {
      id: 'authentication', //สร้างไอดีใหม่ด้วยนะ
      title: 'Special Project 1',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3', //สร้างไอดีใหม่ด้วยนะ
          title: 'ตรวจสอบคุณสมบัติยื่นสอบ Special Project 1',
          type: 'item',
          url: '/sample-page/UploadLinkTranscript',
          target: false,
        },
        {
          id: 'register3', //สร้างไอดีใหม่ด้วยนะ
          title: 'ยื่นสอบหัวข้อ(CSB01)',
          type: 'item',
          url: '/sample-page/CSB01',
          target: false
        },
        {
          id: 'register32', //สร้างไอดีใหม่ด้วยนะ
          title: 'ยื่นสอบก้าวหน้า(CSB02)',
          type: 'item',
          url: '/sample-page/CSB02',
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
          id: 'login31', //สร้างไอดีใหม่ด้วยนะ
          title: 'ตรวจสอบคุณสมบัติยื่นสอบ Special Project 2',
          type: 'item',
          url: '/sample-page/UploadLinkTranscript2',
          target: false
        },
        {
          id: 'register33', //สร้างไอดีใหม่ด้วยนะ
          title: 'ยื่นสอบป้องกัน(CSB03)',
          type: 'item',
          url: '/sample-page/CSB03',
          target: false
        }
      ]
    },
    {
      id: 'sample-page',
      title: 'ตรวจสอบสถานะต่างๆ',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'sample-page56',
      title: 'ประวัติส่วนตัว',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    }
  ],

};



export default pages;
