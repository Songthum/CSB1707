import { lazy } from 'react';

// project imports
import TeacherLayout from 'layout/TeacherLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ListNameStudentS1Page = Loadable(lazy(() => import('views/dashboard/Default/CSB/ListNameStudentS1')));
const ListNameStudentS2Page = Loadable(lazy(() => import('views/dashboard/Default/CSB/ListNameStudentS2')));
const ListOfDocPage = Loadable(lazy(() => import('views/dashboard/Default/CSB/ListOfDoc')));
const RemainingStudentsNamePage = Loadable(lazy(() => import('views/dashboard/Default/CSB/RemainingStudentsName')));
const ManageExamSPPage = Loadable(lazy(() => import('views/dashboard/Default/CSB/ManageExamSP')));
const ManageExamRoomPage = Loadable(lazy(() => import('views/dashboard/Default/CSB/ManageExamRoom')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
//ยูเพิ่ม
const InputScoreCSB02Page = Loadable(lazy(() => import('views/utilities/InputScoreCSB02')));
const InputScoreCSB03Page = Loadable(lazy(() => import('views/utilities/InputScoreCSB03')));
const ChairmanScoreCSB02Page = Loadable(lazy(() => import('views/utilities/ChairmanScoreCSB02')));
const ChairmanScoreCSB03Page = Loadable(lazy(() => import('views/utilities/ChairmanScoreCSB03')));
const DepartmentHeadScoreCSB02Page = Loadable(lazy(() => import('views/utilities/DepartmentHeadScoreCSB02')));
const DepartmentHeadScoreCSB03Page = Loadable(lazy(() => import('views/utilities/DepartmentHeadScoreCSB03')));
const RequestAdvisorPage = Loadable(lazy(() => import('views/utilities/RequestAdvisor')));
const EvaluateProjectPage = Loadable(lazy(() => import('views/utilities/EvaluateProject')));
const AppTestPage = Loadable(lazy(() => import('views/utilities/test')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const UploadLinkTranscriptPage = Loadable(lazy(() => import('views/sample-page/UploadLinkTranscript')));
const UploadLinkTranscript2Page = Loadable(lazy(() => import('views/sample-page/UploadLinkTranscript2')));
const CSB01Page = Loadable(lazy(() => import('views/sample-page/CSB01')));
const CSB02Page = Loadable(lazy(() => import('views/sample-page/CSB02')));
const CSB03Page = Loadable(lazy(() => import('views/sample-page/CSB03')));

// ==============================|| MAIN ROUTING ||============================== //

const TeaherRoutes = {
  path: '/teacher',
  element: <TeacherLayout />,
  children: [
    {
      path: 'teacher/utilities/InputScoreCSB02',
      element: <InputScoreCSB02Page />
    },
    {
      path: 'teacher/utilities/InputScoreCSB03',
      element: <InputScoreCSB03Page />
    },
    {
      path: 'teacher/utilities/ChairmanScoreCSB02',
      element: <ChairmanScoreCSB02Page />
    },
    {
      path: 'teacher/utilities/ChairmanScoreCSB03',
      element: <ChairmanScoreCSB03Page />
    },
    {
      path: 'teacher/utilities/DepartmentHeadScoreCSB02',
      element: <DepartmentHeadScoreCSB02Page />
    },
    {
      path: 'teacher/utilities/DepartmentHeadScoreCSB03',
      element: <DepartmentHeadScoreCSB03Page />
    },
    {
      path: 'teacher/utilities/RequestAdvisor',
      element: <RequestAdvisorPage />
    },
    {
      path: 'teacher/utilities/EvaluateProject',
      element: <EvaluateProjectPage />
    },
    {
      path: 'teacher/utilities/AppTest',
      element: <AppTestPage />
    },

  ]
};

export default TeaherRoutes;
