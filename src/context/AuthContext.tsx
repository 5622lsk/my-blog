import React, { useEffect, createContext, useState, ReactNode } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from 'firebaseApp';

//타입지정
interface AuthProps{
    children: ReactNode;
}
const AuthContext = createContext({
    user: null as User | null, //타입지정
});  

export const AuthContextProvider = ({ children } : AuthProps ) => {
    const auth = getAuth(app)
    const [currentUser, setCurrentUser] = useState<User | null>(null);
     

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if(user) {
            setCurrentUser(user);
          }else {
            setCurrentUser(user);
          }
        });
      },[auth]);


    return (
    <AuthContext.Provider value={{user:currentUser}}>
        {children}
    </AuthContext.Provider>
    )
} 
export default AuthContext;