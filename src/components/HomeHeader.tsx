import { HStack, Heading, Icon, Text, VStack } from "native-base";

import {MaterialIcons} from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./Userphoto";
import { useAuth } from "../hooks/useAuth";
import userPhotoDefaultImg from '../../assets/userPhotoDefault.png';

export function HomeHeader() {

    const {user,signOut} = useAuth()
    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center" >
            <UserPhoto
             source={user.avatar ? {uri: user.avatar}: userPhotoDefaultImg}
            size={16}
            mr={4}
           
            alt='foto do usuario'
             />
            <VStack flex={1}>
            <Text color="gray.100" fontSize={"md"}>Olá,</Text>

            <Heading color="gray.100" fontSize={"md"} fontFamily='heading'>
                {user.name}
            </Heading >
            </VStack>
            <TouchableOpacity onPress={signOut}>
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