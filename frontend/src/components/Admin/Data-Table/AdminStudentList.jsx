import { useEffect, useState } from "react";
import { ParentApi } from "../../../service/ParentApi";
import { DataTable } from "./DataTable";

import { ArrowDown, ArrowUp, PencilIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { StudentApi } from "../../../service/StudentApi";
import { StudentForm } from "../Forms/StudentForm";

export function AdminStudentList() {

    const AdminStudentColumns = [
        {
        accessorKey: "id", // hna had accessorKey howa l value li ghatjina mn BD
        //   header: "#ID",     // hna hadi hia smia dial column li ghat afficha f table
        header: ({ column }) => {  // hadi button dial Sorting

            return <DataTableColumnHeader column={column} title="#ID" />
        },
        },
        {
        accessorKey: "firstname",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="First Name" />
        },
        },
        {
        accessorKey: "lastname",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Last Name" />
        },
        },
        {
        accessorKey: "email",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Email" />
        },
        },
        {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const value = row.getValue("gender");
            const gender = value === "m" ? "Male" : "Female"
            return <>{gender}</>
        }
        },    
        {
        accessorKey: "blood_type",
        header: "Blood Type",
        },
        {
        accessorKey: "date_of_birth",
        header: "Date Birth",
        cell: ({ row }) => {  
            const date =  row.getValue("date_of_birth");
            const formatted = new Date(date).toLocaleDateString()
            return <>{formatted}</>
        },
        },
        {
        accessorKey: "updated_at",
        header: ({ column }) => {

            return <DataTableColumnHeader column={column} title="Updated At" />
        },
        cell: ({ row }) => {
            const date =  row.getValue("updated_at");
            // const formatted = new Date(date).toDateString() +" "+ new Date(date).toLocaleTimeString()
            return <>{date}</>
        }
        },
        {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {   

            const {id,firstname,lastname} = row.original
            const [openUpdateForm,setOpenUpdateForm] = useState(false);

            return (
                <div className="flex gap-x-3">
                    <Sheet open={openUpdateForm} onOpenChange={setOpenUpdateForm}>
                        <SheetTrigger asChild>
                            <Button className="bg-blue-600"><PencilIcon size={20}/></Button>
                        </SheetTrigger>
                        <SheetContent className="py-2">
                            <SheetHeader>
                                <SheetTitle>Update Student :</SheetTitle>
                            </SheetHeader>
                            <StudentForm values={row.original} 
                                handleSubmitForm={(values) => {
                                    const promise =  StudentApi.update(id,values);
                                    promise.then((response) => {
                                        const {student} = response.data;
                                        const elements = data.map((s) => {
                                            if(s.id == id) {
                                                return student;
                                            }
                                            return s;
                                        })
                                        setOpenUpdateForm(false);
                                        setData(elements);
                                    });

                                    return promise;
                                }}
                            />
                        </SheetContent>
                    </Sheet>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}> <Trash2Icon size={20}/></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure to delete the student 
                                <span className={'font-bold'}> {firstname} {lastname}</span> ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the student and remove all 
                                associated data.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={ async () => {
                                
                                const deletingLoader = toast.loading("Deleting in progress.");

                                const {status} = await StudentApi.delete(id);
                                                        
                                if(status == "200") {
                                    toast.dismiss(deletingLoader);

                                    setData( data.filter((student) => student.id !== id));
                                    toast.success("Success : Student Deleted Successfully",{
                                        duration : 3000,
                                        style : {
                                            backgroundColor: '#15803d',
                                            color: '#ffffff'
                                        }
                                    });
                                }
                                else {
                                    toast("Error : Failed To Delete This Student",{
                                        icon : <XCircleIcon/>,
                                        duration : 3000,
                                        style : {
                                            backgroundColor: '#b91c1c',
                                            color: '#ffffff'
                                        }
                                    });
                                }
                            }}>
                                Delete
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
        },
    ]

    const [data,setData] = useState([]);

    const getStudent = () => {
        StudentApi.all().then( ({data}) => {
            // console.log(data.data);
            setData(data.data);
        });
    } 

    useEffect(() => {
        getStudent()
    },[])

    return  <>
                <DataTable columns={AdminStudentColumns} data={data} />
            </>
}