import { Box, useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

export function Routes(){
    const {user, isLoadingUserStorage} = useAuth();
    const nativeBaseTheme = useTheme()
    const theme = DefaultTheme;

    theme.colors.background = nativeBaseTheme.colors.gray[700]

    if(isLoadingUserStorage){
        return <Loading/>
    }
    return(
        <Box flex={1} bg="gray.700">
            <NavigationContainer  >
                {user.id ? <AppRoutes/> : <AuthRoutes/>  }
            </NavigationContainer>
        </Box>
    
    )
}