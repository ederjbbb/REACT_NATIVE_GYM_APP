import { HStack, Heading, Icon, Text, VStack } from "native-base";

import {MaterialIcons} from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./Userphoto";

export function HomeHeader() {
    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center" >
            <UserPhoto
            size={16}
            mr={4}
            source={{
                uri: 'https://avatars.githubusercontent.com/u/49681084?v=4.png',
                
            }}
            alt='foto do usuario'
             />
            <VStack flex={1}>
            <Text color="gray.100" fontSize={"md"}>Olá,</Text>

            <Heading color="gray.100" fontSize={"md"} fontFamily='heading'>
                Eder Brito
            </Heading >
            </VStack>
            <TouchableOpacity>
            <Icon
                as={MaterialIcons}
                name="logout"
                color="gray.200"
                size={7}
            />
            </TouchableOpacity>
            
           
        </HStack>
    )
}