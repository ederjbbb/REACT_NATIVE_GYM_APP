import { Box, useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";

import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";

export function Routes(){
    const {user} = useAuth();
    console.log(user)
    const nativeBaseTheme = useTheme()
    const theme = DefaultTheme;
    theme.colors.background = nativeBaseTheme.colors.gray[700]
    return(
        <Box flex={1} bg="gray.700">
            <NavigationContainer  >
                <AuthRoutes/>
            </NavigationContainer>
        </Box>
    
    )
}