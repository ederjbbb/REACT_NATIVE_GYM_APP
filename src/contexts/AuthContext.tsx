import { ReactNode, createContext, useEffect, useState } from "react";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/userStorage";

import React from 'react'
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";

export type AuthContextDataProps = {
    user : UserDTO;
    signIn: (email: string,password: string) => Promise<void>;
    isLoadingUserStorage: boolean;
    signOut: () => Promise<void>;
    
}

  type AuthContextProviderProps = {
      children: ReactNode;
      
  }
  
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}:AuthContextProviderProps){
    const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)
    const [user, setUser] = useState<UserDTO>({} as UserDTO)

    async function signIn(email: string, password: string){
        
        try {
            const { data } = await api.post('/sessions', {email, password})

        if(data.user){
            setUser(data.user)
            storageUserSave(data.user)
        }
        } catch (error) {
            throw error;
        }
    }

    async function signOut(){
        
        try {
           
            setIsLoadingUserStorage(true)
            setUser({} as UserDTO)
            await storageUserRemove()
        } catch (error) {
            throw error;
        }finally{
            setIsLoadingUserStorage(false)

        }
    }

    async function loadUserData(){

        try {
            const userLogged = await storageUserGet()

        if(userLogged){
            setUser(userLogged)
        }
        } catch (error) {
            throw error;
        }finally{
            setIsLoadingUserStorage(false)

        }
        
    }
    
    useEffect( () => {
        loadUserData()
    },[])
    return (
        <AuthContext.Provider value={{user, signIn,isLoadingUserStorage, signOut}}>
            {children}
      </AuthContext.Provider>
    )
}

