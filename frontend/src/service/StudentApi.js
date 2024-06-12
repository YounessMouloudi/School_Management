import { axiosClient } from "../api/axios";

export const StudentApi = {

    all : async () => {
        return await axiosClient.get('/api/students');
    },
    
    create : async (payload) => {
        return await axiosClient.post('/api/students',payload);
    },
    
    update : async (id,payload) => {
        return await axiosClient.patch('/api/students/'+id,{...payload,id});
    },
    
    delete : async (id) => {
        return await axiosClient.delete('/api/students/'+id);
    },
}