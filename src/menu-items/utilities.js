// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'อาจาย์',
  type: 'group',
  children: [
    // {
    //   id: 'util-typography',
    //   title: 'Typography',
    //   type: 'item',
    //   url: '/utils/util-typography',
    //   icon: icons.IconTypography,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-color',
    //   title: 'Color',
    //   type: 'item',
    //   url: '/utils/util-color',
    //   icon: icons.IconPalette,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
    {
      id: 'sample-page01',
      title: 'ตรวจสอบคำร้องขอเป็นที่ปรึกษา',
      type: 'item',
      url: '/utilities/RequestAdvisor',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'sample-page0111',
      title: 'ประเมินการสอบ',
      type: 'item',
      url: '/utilities/EvaluateProject',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    // {
    //   id: 'authentication', //สร้างไอดีใหม่ด้วยนะ
    //   title: 'กรอกคะแนนการสอบ',
    //   type: 'collapse',
    //   icon: icons.IconKey,

    //   children: [
    //     {
    //       id: 'login3', //สร้างไอดีใหม่ด้วยนะ
    //       title: 'สอบหัวข้อ (CSB01)',
    //       type: 'item',
    //       url: '#',
    //       target: false
    //     },
    //     {
    //       id: 'register3', //สร้างไอดีใหม่ด้วยนะ
    //       title: 'สอบก้าวหน้า (CSB02)',
    //       type: 'item',
    //       url: '/utilities/InputScoreCSB02',
    //       target: false
    //     },
    //     {
    //       id: 'register4', //สร้างไอดีใหม่ด้วยนะ
    //       title: 'สอบป้องกัน (CSB03)',
    //       type: 'item',
    //       url: '/utilities/InputScoreCSB03',
    //       target: false
    //     }
    //   ]
    // },
    {
      id: 'sample-page1',
      title: 'อนุมัติคะแนนสอบก้าวหน้า โดยประธานกรรมการสอบ',
      type: 'item',
      url: '/utilities/ChairmanScoreCSB02',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'sample-page2',
      title: 'อนุมัติคะแนนสอบป้องกัน โดยประธานกรรมการสอบ',
      type: 'item',
      url: '/utilities/ChairmanScoreCSB03',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'sample-page3',
      title: 'อนุมัติคะแนนสอบก้าวหน้า โดยหัวหน้าภาควิชา',
      type: 'item',
      url: '/utilities/DepartmentHeadScoreCSB02',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'sample-page4',
      title: 'อนุมัติคะแนนสอบป้องกัน โดยหัวหน้าภาควิชา',
      type: 'item',
      url: '/utilities/DepartmentHeadScoreCSB03',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
  ]
};

export default utilities;
