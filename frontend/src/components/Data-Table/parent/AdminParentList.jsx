import { useEffect, useState } from "react";
import { ParentApi } from "../../../service/ParentApi";
import { DataTable } from "../DataTable";
import { AdminParentColumns } from "./AdminParentColumns";

export function AdminParentList() {

    const [data,setData] = useState([]);

    useEffect(() => {
        
        ParentApi.all().then( ({data}) => {
            // console.log(data.data);
            setData(data.data);
        });

    },[])

    return  <>
                <DataTable columns={AdminParentColumns} data={data} />
            </>
}