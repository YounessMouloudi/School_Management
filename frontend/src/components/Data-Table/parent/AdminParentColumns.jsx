import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "../../ui/button";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

export const AdminParentColumns = [
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
]
  