import * as yup from 'yup';

import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import {Controller, useForm} from 'react-hook-form'
import React, { useState } from 'react';

import { Alert } from 'react-native';
import { AppError } from '../utils/AppError';
import BackgroundImg from '../../assets/background.png';
import { Button } from '../components/Button';
import {Input} from '../components/Input'
import LogoSvg from '../../assets/logo.svg'
import {api} from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}
const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail').email('E-mail invalido.'),
    password: yup.string().required('Informe a senha').min(6, 'Senha deve conter o minimo de 6 digitos.'),
    password_confirm: yup.string().required('Confirm a senha.').oneOf([yup.ref('password'),null],'Confirmacao deve ser igual a senha')
})
export function SignUp(){

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()
    const navigation = useNavigation()

    const {signIn} = useAuth();

    const { control, handleSubmit, formState:{errors}} = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    async function handleSignUp ({ name,email,password,password_confirm}: FormDataProps) {
        try {
            setIsLoading(true)
            await api.post('/users',{ name,email,password,password_confirm})
            await signIn(email,password)
        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError;
            const title  = isAppError ? error.message : 'Nao foi possivel criar a conta! tente novamente mais tarde'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
                
                

            })
        }
        
    

    }
    function handleBackToLogIn(){
        navigation.goBack()
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false} >
             <VStack flex = {1} px={6} pb={16} mb={10}>
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
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading" >
                Crie sua conta
            </Heading>

            <Controller
                control={control}   
                name="name"
               
                render={({field: {onChange, value}}) => (
                    <Input 
                     placeholder='Nome'
                     onChangeText={onChange}
                     value={value}
                     errorMessage={errors.name?.message}
                    />  
                )}
            />
            
             <Controller
                control={control}
                name="email"
               
                render={({field: {onChange,value}}) => (
                    <Input 
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                     />
                )}
            />
            
             <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                    <Input 
                    placeholder='Senha'
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                    />
                )}
            />
             <Controller
                control={control}
                name="password_confirm"
                render={({field: {onChange, value}}) => (
                    <Input 
                    placeholder='Confirme a senha'
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password_confirm?.message}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="go"
                    />
                )}
            />

            
            <Button title={"Criar e acessar"} onPress={handleSubmit(handleSignUp) } isLoading={isLoading} />
            
            </Center>
           
            <Button title={"Voltar ao LogIn"} variant={"outline"} mt={24} onPress={handleBackToLogIn}/>
           

            
        </VStack>
        </ScrollView>
            
       
    );
}