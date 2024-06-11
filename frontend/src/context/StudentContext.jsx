import { createContext, useContext, useState } from "react";
import { UserApi } from "../service/UserApi";

/* hna ayi state zdnaha aw fonction khass darori n3arfoha hna w mnin nbghiw nseftoha tandiroha f return Provider */ 
export const StateStudentContext = createContext({
    user : {},
    setUser : () => {},
    
    authenticated : false,
    setAuthenticated : () => {},

    login : (email,password) => {},
    logout : () => {},

    setToken : () => {}
})

export function StudentContext({children}) {

    const [user,setUser] = useState({});

    const [authenticated,_setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'));

    const login = async (email,password) => {
        await UserApi.getCSRF();
        return UserApi.login(email,password);
    }
    const logout = () => {
        setUser({});
        setAuthenticated(false);
    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem('AUTHENTICATED',isAuthenticated);
    }

    const setToken = (token) => {
        window.localStorage.setItem('token',token);
    }
    
    return  <>
                <StateStudentContext.Provider value={{
                    user,
                    setUser,

                    login, // hna t9der ila kant 3andi l valeur b nafss smiyet l prop tandiro ghi wehda   
                    logout,
                    
                    authenticated,
                    setAuthenticated,

                    setToken,
                }}>
                    {children}
                </StateStudentContext.Provider>
            </>
}

// hna transformina had context l une funct li tatweli b7al chi hook w hia li tanwliw n3ayto liha w njbdo mnha kolchi
export const useStudentContext = () => useContext(StateStudentContext);