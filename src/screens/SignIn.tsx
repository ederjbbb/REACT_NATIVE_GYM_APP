import {Center, Heading, Image, ScrollView, Text, VStack} from 'native-base'

import { AuthNavigatorRoutesProps } from '../routes/auth.routes';
import BackgroundImg from '../../assets/background.png';
import { Button } from '../components/Button';
import {Input} from '../components/Input'
import LogoSvg from '../../assets/logo.svg'
import React from 'react';
import { useNavigation } from "@react-navigation/native"

export function SignIn(){

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleCreateAccount(){
        try {
            navigation.navigate("signUp")
        } catch (error) {
            
        }
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
             <VStack flex = {1}  px={6} pb={16} >
            <Image
                source={BackgroundImg}
                defaultSource={BackgroundImg}
                alt={"foto de fundo pessoas treinando"}
                resizeMode='contain'
                position={'absolute'}
            />
            <Center my={24}>
            <LogoSvg/>
            <Text color="gray.100" fontSize='sm'>Treine sua mente e o seu corpo</Text>
            </Center>
            <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                Acesse sua conta
            </Heading>
            <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            />
            <Input 
            placeholder='Senha'
            secureTextEntry
            />
            <Button title={"Entrar"}/>
            
            </Center>
            <Center mt={24}>
            <Text color="gray.100" fontSize={"sm"} mb={3} fontFamily="body">Ainda nao tem conta?</Text>
            <Button 
            title={"Criar conta"} 
            variant={"outline"}
            onPress={handleCreateAccount}
            />
            </Center>
           
            
        </VStack>
        </ScrollView>
            
       
    );
}