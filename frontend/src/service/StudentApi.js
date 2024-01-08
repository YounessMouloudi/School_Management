import { axiosClient } from "../api/axios";

export const StudentApi = {
    getCSRF : async () => {
        return await axiosClient.get('/sanctum/csrf-cookie');
    },

    login : async (email,password) => {
        return await axiosClient.post('/login',{email,password});
    },

    logout : async () => {
        return await axiosClient.post('/logout');
    },

    getUser : async () => {
        return await axiosClient.get('/api/user');
    }
}