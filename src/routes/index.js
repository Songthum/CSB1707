import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import StudenRoutes from './StudenRoutes';
import TeacherRoutes from './TeacherRoutes';


// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, StudenRoutes, TeacherRoutes, AuthenticationRoutes]);
}
