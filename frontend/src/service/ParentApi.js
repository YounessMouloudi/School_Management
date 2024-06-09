import { axiosClient } from "../api/axios";

export const ParentApi = {
    // getCSRF : async () => {
    //     return await axiosClient.get('/sanctum/csrf-cookie');
    // },

    // hna l payload howa li ghaykon fih ga3 les données li ghansefto
    create : async (payload) => {
        return await axiosClient.post('/api/parents',payload);
    },
    delete : async (id) => {
        return await axiosClient.delete('/api/parents/'+id);
    },
    all : async () => {
        return await axiosClient.get('/api/parents');
    },
}