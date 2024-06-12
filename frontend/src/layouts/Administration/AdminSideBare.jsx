import { cn } from "@/lib/utils"
import { Button } from "../../components/ui/button"
import { Admin_Manage_Parents_Route, Admin_Manage_Students_Route } from "../../router"
import { Link } from "react-router-dom"
import { GraduationCapIcon, UserIcon } from "lucide-react"


export function AdminSidebar({className}) {
  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg text-center font-semibold tracking-tight">
            Administration
          </h2>
          <div>
            <Link to={Admin_Manage_Parents_Route}>
              <Button variant="ghost" className="w-full justify-start text-base">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg> */}
                <UserIcon className="me-2.5 h-5"/>
                Manage Parent
              </Button>            
            </Link>
          </div>
          <div>
            <Link to={Admin_Manage_Students_Route}>
              <Button variant="ghost" className="w-full justify-start text-base">
                <GraduationCapIcon className="me-2.5 h-5"/>
                Manage Student
              </Button>            
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}