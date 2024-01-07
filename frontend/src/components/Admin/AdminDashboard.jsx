import { useStudentContext } from "../../context/StudentContext"

export function AdminDashboard() {

    const {user} = useStudentContext();
    
    return  <> 
                <table className="relative overflow-x-auto w-full p-5">
                    <thead className="text-sm text-left dark:text-gray-400">
                        <tr className="text-xs uppercase bg-gray-100 rounded dark:bg-gray-800 ">
                            <th className="px-6 py-3">id</th>
                            <th className="px-6 py-3">fullName</th>
                            <th className="px-6 py-3">email</th>
                            <th className="px-6 py-3">date</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr className="bg-white text-left font-medium dark:bg-gray-800">
                            <th className="px-6 py-4 font-semibold whitespace">{user.id}</th>
                            <td className="px-6 py-4">{user.firstname} {user.lastname}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.created_at}</td>
                        </tr>
                    </tbody>
                </table>
            </>
}