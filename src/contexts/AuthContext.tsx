import { ReactNode, createContext, useEffect, useState } from "react";
import { getStorageAuthTokenSave, storageAuthTokenRemove, storageAuthTokenSave } from "../storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/userStorage";

import React from 'react'
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { err } from "react-native-svg/lib/typescript/xml";

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
    
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

    async function UserAndTokenUpdate(userData: UserDTO, token: string){

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(userData)
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string){

        try {
            setIsLoadingUserStorage(true)
            await storageUserSave(userData)
            await storageAuthTokenSave(token)
        } catch (error) {
            throw error;
        }finally{
            setIsLoadingUserStorage(false)

        }
            
    }

    async function signIn(email: string, password: string){
        
        try {
            
            const { data } = await api.post('/sessions', {email, password})

        if(data.user && data.token){

           await  storageUserAndTokenSave(data.user,data.token)

            UserAndTokenUpdate(data.user,data.token)
            
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
            await storageAuthTokenRemove()
        } catch (error) {
            throw error;
        }finally{
            setIsLoadingUserStorage(false)

        }
    }

    async function loadUserData(){

        try {
            setIsLoadingUserStorage(true)
            const userLogged = await storageUserGet()
            const token = await getStorageAuthTokenSave();

        if(token && userLogged){
            UserAndTokenUpdate(userLogged, token)
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

