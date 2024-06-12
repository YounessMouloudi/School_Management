import { axiosClient } from "../api/axios";

export const UserApi = {

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
        return await axiosClient.get('/api/me');
        
        // return await axiosClient.get('/api/admin');
        
        /* hna khedmna ghi 3la admin bach n9ado l form d l parent w n'ajoutiwh l db w nchofo wach kolchi daz mzn
        aprés 3ad ghan9ado hadi getUser bach tweli ta3i l'accées l kol wahd hit db ila tconéctéti ka student
        maghadich ykhlik dekhol khass tkon '/api/student'

        db 9adinaha '/api/me' w rdinaha accessible l kolchi   
        */
    },
}