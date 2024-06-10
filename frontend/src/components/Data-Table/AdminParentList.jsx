import { useEffect, useState } from "react";
import { ParentApi } from "../../service/ParentApi";
import { DataTable } from "./DataTable";

import { ArrowDown, ArrowUp, PencilIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ParentForm } from "../Forms/ParentForm";

export function AdminParentList() {

    // hna jbna AdminParentColumns hna hit kona dayrinha f comp bo7edha
    const AdminParentColumns = [
        {
        accessorKey: "id", // hna had accessorKey howa l value li ghatjina mn BD
        //   header: "#ID",     // hna hadi hia smia dial column li ghat afficha f table
        header: ({ column }) => {  // hadi button dial Sorting
            
            // hna kona khdamin b hadi hia lewla aprés l9ina un compen li taydir hadchi kaml w li howa DataTableColumnHeader 
            // const isAsc = column.getIsSorted() === "asc";
            // return (
            //   <Button className="px-1" variant="ghost" onClick={() => column.toggleSorting(isAsc)}>
            //     #ID
            //     {isAsc ? <ArrowUp className="ml-1 h-4 w-4"/> : <ArrowDown className="ml-1 h-4 w-4"/>} 
            //   </Button>
            // )

            return <DataTableColumnHeader column={column} title="#ID" />
        },
        },
        {
        accessorKey: "firstname",
        header: ({ column }) => {
            // const isAsc = column.getIsSorted() === "asc";
            // return (
            //   <Button className="px-1" variant="ghost" onClick={() => column.toggleSorting(isAsc)}>
            //     FirstName
            //     {isAsc ? <ArrowUp className="ml-1 h-4 w-4"/> : <ArrowDown className="ml-1 h-4 w-4"/>} 
            //   </Button>
            // )

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
        accessorKey: "date_of_birth",
        header: "Date Birth",
        cell: ({ row }) => {  
            const date =  row.getValue("date_of_birth");
            const formatted = new Date(date).toLocaleDateString() 
            return <>{formatted}</>
        },
        /* hna had cell tat7awal biha l format dial les données li f database l format li bghiti tban f l'affichage 
        par ex : hna date tayjina twil w fih time hna chdina date w rja3nah d/m/y
        mais had l9adia galik matadarch hna hadchi dial t7awal les données l chkal li bghiti taydar f Resource
        ay ghaydar f StudentParentResource f la methode toarray tema ghatchad les values li jayin mn api 
        w tradhom ki bghiti w tssefthom direct l table mais ta hada tayb9a 7al monasibe 
        */
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
        accessorKey: "email",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Email" />
        },

        },
        {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const phone = parseFloat(row.getValue("phone"))
            return <>+212{phone}</>
        },
        },
        {
        accessorKey: "address",
        header: "Address",
        },
        {
        accessorKey: "updated_at",
        header: ({ column }) => {

            return <DataTableColumnHeader column={column} title="Updated At" />
        },
        cell: ({ row }) => {
            const date =  row.getValue("updated_at");
            const formatted = new Date(date).toDateString() +" "+ new Date(date).toLocaleTimeString()
            return <>{formatted}</>
        }
        },
        {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {   

            // hna had row.original tayjib ga3 les infos dial dak student aprés ghanakhdo ghir id bach ndiro delete
            // const data = row.original;
            // console.log(data);

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
                                <SheetTitle>Update Parent :</SheetTitle>
                            </SheetHeader>
                            <ParentForm values={row.original} 
                                handleSubmitForm={(values) => {
                                    const promise =  ParentApi.update(id,values);
                                    promise.then(() => {
                                    setOpenUpdateForm(false);
                                    getParent();
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

                                const {status} = await ParentApi.delete(id);
                                                        
                                if(status == "200") {
                                    toast.dismiss(deletingLoader);

                                    setData( data.filter((parent) => parent.id !== id));
                                    toast.success("Success ",{
                                        description : <span className="text-white font-medium">
                                            {`Parent " ${firstname} ${lastname} " Deleted Successfully`}
                                        </span>,
                                        duration : 3000,
                                        style : {
                                            backgroundColor: '#15803d',
                                            color: '#ffffff'
                                        }
                                    });
                                }
                                else {
                                    toast("Error ",{
                                        description : <span className="text-white font-medium">Failed To Delete This Parent</span>,
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

    const getParent = () => {
        ParentApi.all().then( ({data}) => {
            // console.log(data.data);
            setData(data.data);
        });
    } 

    useEffect(() => {
        getParent()
    },[])

    return  <>
                <DataTable columns={AdminParentColumns} data={data} />
            </>
}