/* hna drna wahd l fichier axios li ghaykon global w li ghanb9aw ghi n3ayto lih f les compo lakhrin w li ghan7etto
fih url dial laravel li ghanssifto fih les données => url drnah f fichier .env w importinah hna 
*/

import axios from "axios"

export const axiosStudent = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withCredentials : true, /* hadi ila madertihach mnin tbghi tsseft les données (post) matatkhdemch hit hia
                            bach tatjbed mneha les cookies w bzf d l hajat */ 
});