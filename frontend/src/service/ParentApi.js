import { axiosClient } from "../api/axios";

export const ParentApi = {
    // getCSRF : async () => {
    //     return await axiosClient.get('/sanctum/csrf-cookie');
    // },

    // hna l payload howa li ghaykon fih ga3 les données li ghansefto
    create : async (payload) => {
        return await axiosClient.post('/api/parents',payload);
    },
    update : async (id,payload) => {
        // const{id, ...props} = payload; // hna props homa les autres values li ghansefto mafihomch id
        // delete payload.id; // hna supprimina id mn payload bach maytsseftch m3a les données
        console.log(payload);
        return await axiosClient.patch('/api/parents/'+id,{...payload,id});
    },
    delete : async (id) => {
        return await axiosClient.delete('/api/parents/'+id);
    },
    all : async () => {
        return await axiosClient.get('/api/parents');
    },
}