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
import { AdminDashboard } from '../components/Admin/Pages/AdminDashboard'
import { AdminDashboardLayout } from '../layouts/AdminDashboardLayout'
import { TeacherDashboardLayout } from '../layouts/TeacherDashboardLayout'
import { TeacherDashboard } from '../components/Teacher/TeacherDashboard'
import { ManageParents } from '../components/Admin/Pages/ManageParents'
import { ParentDashboardLayout } from '../layouts/ParentDashboardLayout'
import { ParentDashboard } from '../components/Parent/ParentDashboard'
import { ManageStudents } from '../components/Admin/Pages/ManageStudents'

export const Login_Route = '/login'; 
export const Student_Dashboard_Route = '/student/dashboard'; 
export const Admin_Dashboard_Route = '/admin/dashboard';
export const Admin_Manage_Parents_Route = '/admin/manage-parents';
export const Admin_Manage_Students_Route = '/admin/manage-students';
export const Teacher_Dashboard_Route = '/teacher/dashboard'; 
export const Parent_Dashboard_Route = '/parent/dashboard'; 

export const redirectToDashboard = (roleType) => {

    switch (roleType){
        case 'student':
            return (Student_Dashboard_Route);
        case 'admin':
            return (Admin_Dashboard_Route);
        case 'teacher':
            return (Teacher_Dashboard_Route);
        case 'parent':
            return (Parent_Dashboard_Route);
    } 
}

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
            {
                path : Admin_Manage_Parents_Route,
                element : <ManageParents/>
            },
            {
                path : Admin_Manage_Students_Route,
                element : <ManageStudents/>
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
    {
        element : <ParentDashboardLayout/>,
        children : [
            {
                path : Parent_Dashboard_Route,
                element : <ParentDashboard/>
            },
        ]
    },
]) 
