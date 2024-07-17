import { lazy } from 'react';

// project imports
import StudenLayout from 'layout/StudenLayout';
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
const CheckAllStatusPage = Loadable(lazy(() => import('views/sample-page/CheckAllStatus')));
// ==============================|| MAIN ROUTING ||============================== //

const StudenRoutes = {
  path: '/studen',
  element: <StudenLayout />,
  children: [
    {
      path: 'studen/sample-page',
      element: <SamplePage />
    },
    {
      path: 'studen/sample-page/UploadLinkTranscript',
      element: <UploadLinkTranscriptPage />
    },
    {
      path: 'studen/sample-page/CSB01',
      element: <CSB01Page />
    },
    {
      path: 'studen/sample-page/CSB02',
      element: <CSB02Page />
    },
    {
      path: 'studen/sample-page/UploadLinkTranscript2',
      element: <UploadLinkTranscript2Page />
    },
    {
      path: 'studen/sample-page/CSB03',
      element: <CSB03Page />
    },
    {
      path: 'studen/sample-page/CheckAllStatus',
      element: <CheckAllStatusPage />
    },
  ]
};

export default StudenRoutes;
