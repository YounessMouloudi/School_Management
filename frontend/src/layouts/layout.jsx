import { Link, Outlet } from "react-router-dom";

export function Layout() {

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
                                    <Link to="/">Home Page</Link>
                                </li>
                                <li className="ml-5 px-2 py-1">
                                    <Link to="/login">Login</Link>
                                </li>
                                {/* <li className="ml-5 px-2 py-1">
                                    <Link to="/register">Register</Link>
                                </li> */}
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
                {/* <footer>footer</footer> */}
            </>
}