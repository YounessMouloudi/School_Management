import { axiosStudent } from "../api/axios";

export const StudentApi = {
    getCSRF : async () => {
        return await axiosStudent.get('/sanctum/csrf-cookie');
    },

    login : async (email,password) => {
        return await axiosStudent.post('/login',{email,password});
    },

    logout : async () => {
        return await axiosStudent.post('/logout');
    },

    getUser : async () => {
        return await axiosStudent.get('/api/user');
    }
}