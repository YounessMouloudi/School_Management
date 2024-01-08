/* hna drna wahd l fichier axios li ghaykon global w li ghanb9aw ghi n3ayto lih f les compo lakhrin w li ghan7etto
fih url dial laravel li ghanssifto fih les données => url drnah f fichier .env w importinah hna 
*/

import axios from "axios"

const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withCredentials : true, /* hadi ila madertihach mnin tbghi tsseft les données (post) matatkhdemch hit hia
                            bach tatjbed mneha les cookies w bzf d l hajat */ 
});

axiosClient.interceptors.request.use( function(config) {

    const token = localStorage.getItem('token');
    
    if(token) {
        config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
});
/* had interceptors homa wahd lhaja aw des variables li tanseftohom 9bel mn request aw response rah dernahom f l cours
reja3 chof char7 dialhom */

export {axiosClient};