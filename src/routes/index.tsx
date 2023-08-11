import { Box, useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import React from "react";

export function Routes(){
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