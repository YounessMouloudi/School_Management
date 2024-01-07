import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { Home, LogIn } from 'lucide-react'
import { Student_Dashboard_Route } from "../router";

export function GuestLayout() {

    const navigate = useNavigate();

    const context = useStudentContext();

    useEffect(() => {
        if(context.authenticated) {
            navigate(Student_Dashboard_Route);
        }

    },[])

    return  <>
                <header>
                    <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4
                        mx-auto shadow-2xl">
                        <div className="text-2xl text-white font-semibold inline-flex items-center">
                            <img src="/school_management.png" alt="logo-img" className="w-14 mr-4"/>
                            <span> School Management</span>
                        </div>
                        <div>
                            <ul className="flex text-white">
                                <li className="ml-5 px-2 py-1">
                                    <Link to="/" className="flex place-items-center">
                                        <Home className="mr-1 h-4 w-4"/> Home
                                    </Link>
                                </li>
                                <li className="ml-5 px-2 py-1">
                                    <Link to="/login" className="flex place-items-center">
                                        <LogIn className="mr-1 h-4 w-4"/>
                                        <span>Login</span>
                                    </Link>
                                </li>
                                {/* <li className="ml-5 px-3 py-1 rounded font-semibold bg-gray-100 text-gray-800">
                                    <a href="#">Dark Mode</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </header>
                <main className="container w-2/4">
                    <Outlet/>
                </main>
            </>
}