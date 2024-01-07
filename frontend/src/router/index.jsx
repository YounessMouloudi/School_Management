import {createBrowserRouter} from 'react-router-dom'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
// import { Register } from '../pages/register'
// import { Users } from '../pages/users'
import { NotFound } from '../pages/notFound'
import { Layout } from '../layouts/layout'
import { GuestLayout } from '../layouts/GuestLayout'
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout'
import { StudentDashboard } from '../components/Student/StudentDashboard'
import { AdminDashboard } from '../components/Admin/AdminDashboard'
import { AdminDashboardLayout } from '../layouts/AdminDashboardLayout'
import { TeacherDashboardLayout } from '../layouts/TeacherDashboardLayout'
import { TeacherDashboard } from '../components/Teacher/TeacherDashboard'

export const Login_Route = '/login'; 
export const Student_Dashboard_Route = '/student/dashboard'; 
export const Admin_Dashboard_Route = '/admin/dashboard';
export const Teacher_Dashboard_Route = '/teacher/dashboard'; 

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '*',
                element : <NotFound/>
            }        
        ]
    },
    {
        element : <GuestLayout/>,
        children : [
            {
                path : Login_Route,
                element : <Login/>
            },
        ]
    },
    {
        element : <StudentDashboardLayout/>,
        children : [
            {
                path : Student_Dashboard_Route,
                element : <StudentDashboard/>
            },
        ]
    },
    {
        element : <AdminDashboardLayout/>,
        children : [
            {
                path : Admin_Dashboard_Route,
                element : <AdminDashboard/>
            },
        ]
    },
    {
        element : <TeacherDashboardLayout/>,
        children : [
            {
                path : Teacher_Dashboard_Route,
                element : <TeacherDashboard/>
            },
        ]
    },
]) 
