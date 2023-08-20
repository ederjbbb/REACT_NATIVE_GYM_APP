import {Center, Heading, Image, ScrollView, Text, VStack, useToast} from 'native-base'
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';

import { AppError } from '../utils/AppError';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';
import BackgroundImg from '../../assets/background.png';
import { Button } from '../components/Button';
import {Input} from '../components/Input'
import LogoSvg from '../../assets/logo.svg'
import { Spinner } from 'native-base'
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from "@react-navigation/native"

type FormData = {
    email: string;
    password: string;
}
export function SignIn(){

    const {signIn} = useAuth()

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const [isLoading, setIsLoading] = useState(false)

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

    const toast = useToast()
    
    function handleNewAccount(){
        navigation.navigate('signUp')
    }

    async function handleSignIn({email, password}: FormData){

        try {
            setIsLoading(true)
            await signIn(email,password)
        } catch (error) {
            const isAppError = error instanceof AppError ;

           const title = isAppError ? error.message : 'Nao foi possivel entrar, entre novamente';
           setIsLoading(false)
           toast.show({
               title,
               placement: 'top',
               bgColor: 'red.500'
           })
           
        }finally{
            setIsLoading(false)
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
            <Controller
                
                control={control}
                name='email'
                rules={{ required: 'Informe o e-mail'}}
                render={({field: {onChange}}) => (
                    <Input 
                     placeholder='E-mail'
                     keyboardType='email-address'
                     onChangeText={onChange}
                     errorMessage={errors.email?.message}
                     autoCapitalize='none'
                    />
                )}
            />
            <Controller
                control={control}
                name='password'
                rules={{required: 'Informe a senha'}}
                render={({field: {onChange}}) => (
                    <Input 
                    placeholder='Senha'
                    onChangeText={onChange}
                     errorMessage={errors.password?.message}
                     secureTextEntry
                    />
                )}
            />
            <Button title={"Entrar"} onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/> 
            
            
            </Center>
            <Center mt={24}>
            <Text color="gray.100" fontSize={"sm"} mb={3} fontFamily="body">Ainda nao tem conta?</Text>
            <Button 
            title={"Criar conta"} 
            variant={"outline"}
            onPress={handleNewAccount}
            />
            </Center>
           
            
        </VStack>
        </ScrollView>
            
       
    );
}