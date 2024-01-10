import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { StudentApi } from "../service/StudentApi";
import { DropdownMenuBtn } from "./DropDownMenu";
import { GaugeIcon } from 'lucide-react'
import { ModeToggle } from "../components/mode-toggle";
import { Login_Route } from "../router";
import { AdminSidebar } from "./Administration/AdminSideBare";

export function AdminDashboardLayout() {

    const navigate = useNavigate();

    const [isLoading,setIsLoading] = useState(true);
    /* hna drna had loading ghi 3la wahd défault li bssitte w li howa mnin kona f dashboard w tandiro lien dial login
    kant tatban la page d login w mn ba3d tayrja3na l dashboard hit déja authentifié donc drna had loading bach 
    wakha ndiro lien d login matbanch la page tban direct dashboard*/

    const {setUser,authenticated,setAuthenticated,logout} = useStudentContext(); 

    useEffect( () => {

        if(authenticated === true) {
            
            setIsLoading(false);

            StudentApi.getUser().then( ({data}) => {
                setUser(data);
                setAuthenticated(true);
                
            })
            .catch(() => {
                logout();
            }) 
        }
        else {
            navigate(Login_Route);
        }
 
    },[authenticated])

    if(isLoading) {
        return <></>
    }
    return  <>
                <header>
                    <div className="items-center justify-between flex bg-opacity-90 px-12 py-4 mb-4 mx-auto">
                        <div className="text-2xl font-semibold inline-flex items-center">
                            <img src="/school_management.png" alt="logo-img" className="w-14 mr-4"/>
                            <span>School Management</span>
                        </div>
                        <div>
                            <ul className="flex place-items-center">
                                <li className="ml-5 px-2 py-1">
                                    <Link to="/student/dashboard" className="flex place-items-center">
                                        <GaugeIcon className="mr-1"/> Dashboard
                                    </Link>
                                </li>
                                <li className="ml-5 px-2 py-1">
                                    <DropdownMenuBtn/>
                                </li>
                                <li className="ml-5 px-2 py-1">
                                    <ModeToggle/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <hr />
                <main className="container py-4">
                    <div className="flex gap-5">
                        <div className="w-100 md:2/12 border rounded-lg">
                            <AdminSidebar/>
                        </div>
                        <div className="w-100 md:w-10/12 border rounded-lg">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </>
}