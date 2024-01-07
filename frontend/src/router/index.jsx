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
                path : '/login',
                element : <Login/>
            },
        ]
    },
    {
        element : <StudentDashboardLayout/>,
        children : [
            {
                path : '/student/dashboard',
                element : <StudentDashboard/>
            },
        ]
    },
]) 
