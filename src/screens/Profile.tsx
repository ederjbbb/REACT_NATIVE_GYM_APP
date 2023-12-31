import * as FileSystem from 'expo-file-system'
import * as ImagePicker from "expo-image-picker"
import * as yup from 'yup'

import {Center, Heading, ScrollView, Skeleton, Text, VStack, useToast}  from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { AppError } from '../utils/AppError'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { ScreenHeader } from '../components/ScreenHeader'
import {UserPhoto} from '../components/Userphoto'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
// import userPhotoDefaultImg from '../assets/userPhotoDefaultImg.png';
import {yupResolver} from '@hookform/resolvers/yup'

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

const profileSchema = yup.object({
    name: yup.string().required('Imforme o nome'),
    old_password: yup.string().min(6,'A deve ter pelo menos 6 difitos').nullable().transform((value) => !!value ? value: null),
    password: yup.string().min(6,'Nova senha deve ter pelo menos 6 difitos').nullable().transform((value) => !!value ? value: null),
    confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value: null))
    .oneOf([yup.ref('password'),null], 'Confirme a senha, por favor ')
    .when('password',{
        is: (Field: any) => Field,
        then: (schema) => schema
        .nullable()
        .required('Informe confirmacao de senha')
        .transform((value) => !!value ? value : null)
    })

})
    
export function Profile(){
    const [isPhotoLoading, setIsPhotoLoading] = useState(false)
    const [isUpdateing, setIsUpdating] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://avatars.githubusercontent.com/u/49681084?v=4.png')
    const toast = useToast()
    const PHOTO_SIZE= 33;
    const {user, updateUserProfile} = useAuth()
    const  {control, handleSubmit, formState:{errors}} = useForm<FormDataProps>({
        defaultValues : {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    })

    

    async function handleUserPhotoSelect () {
        setIsPhotoLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect:[4,4],
                allowsEditing: true,
                
            });
            if(photoSelected.canceled){
                return;
            }
            if(photoSelected.assets[0].uri){
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
                if(photoInfo.size && (photoInfo.size / 1024 / 1024 > 5)){
                    return toast.show({
                        title: 'Esta imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: 'red.500',

                    })                    
                }
                    const fileExtension = photoSelected.assets[0].uri.split('.').pop();
                    const photoFile = {
                        name: `${user.name}.${fileExtension}`.toLowerCase(),
                        uri: photoSelected.assets[0].uri,
                        type: `${photoSelected.assets[0].type}/${fileExtension}`

                        
                    } as any;
                    const userPhotouploadForm   = new FormData();
                    userPhotouploadForm.append('avatar', photoFile)

                    const avatarUpdatedResponse = await api.patch('/users/avatar',userPhotouploadForm, {
                        headers: {
                            'Cotent-Type' : 'multipart/form-data'
                        }
                    });

                    const userUpdated = user;
                    userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                    updateUserProfile(userUpdated)

                    toast.show({
                        title: 'Foto atualizada com sucesso',
                        placement: 'top',
                        bgColor: 'green.500'
                    })
                    
                } 
            
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsPhotoLoading(false)

        }
            
    }

    async function handleProfileUpdate(data: FormDataProps){
        try {
            setIsUpdating(true)

            const userUpdated = user;
            userUpdated.name = data.name;
            await api.put('/users',data)
            updateUserProfile(userUpdated)
            toast.show({
                title: 'Perfil atualizado com sucesso',
                placement: 'top',
                bgColor: 'green.500'

            })
        } catch (error) {
            
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Nao foi possovel atualizaro perfil, tente depois'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }finally{
            setIsUpdating(false)
        }
    }
    return(
    <VStack flex={1}>
        <ScreenHeader title="Perfil"/>
        <ScrollView 
            contentContainerStyle={{paddingBottom:36}}
        >
            <Center mt={4} px={10}>
            { isPhotoLoading ?  <Skeleton 
                    w={PHOTO_SIZE} 
                    h={PHOTO_SIZE} 
                    rounded='full'
                    startColor="gray.400"
                    endColor="gray.200"
                    />
                    : 
                   
                <UserPhoto
               source={
                 user.avatar 
                 ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
                 : userPhotoDefaultImg}
                 
                alt='foto do usuario'
                    size={PHOTO_SIZE}
                    mr={4}
                
                    />
            }
               <TouchableOpacity onPress={handleUserPhotoSelect}>
                   <Text color='green.500' fontWeight="bold" fontSize="md" mt={2} mb={8}>Editar foto</Text>
               </TouchableOpacity>
               <Controller 
                    control={control}
                    name='name' 
                    render={({field: {value, onChange}}) => {
                        return <Input
                            placeholder='Name'
                            bg='gray.600'  
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.name?.message}
                            />
                           
                    }}         
               />
                <Controller 
                    control={control}
                    name='email' 
                    render={({field: {value, onChange}}) => {
                        return <Input
                            // placeholder={user.email}
                            bg='gray.600'  
                            onChangeText={onChange}
                            value={value}
                            isDisabled
                            
                            />
                           
                    }}         
               />
               
            </Center>
       <VStack px={10} mt={12} mb={9}>
            <Heading color='gray.200' fontSize={'md'} mb={2}>Alterar senha</Heading>
            <Controller 
                    control={control}
                    name='old_password' 
                    render={({field: {onChange}}) => {
                        return <Input
                            placeholder='Senha antiga'
                            bg='gray.600'  
                            onChangeText={onChange}
                            secureTextEntry
                            errorMessage={errors.old_password?.message}
                            onSubmitEditing={()=> Keyboard.dismiss()}


                            />
                           
                    }}         
               />
               <Controller 
                    control={control}
                    name='password' 
                    render={({field: {onChange}}) => {
                        return <Input
                            placeholder='Nova senha'
                            bg='gray.600'  
                            onChangeText={onChange}
                            secureTextEntry
                            errorMessage={errors.password?.message}

                            />
                           
                    }}         
               />
               <Controller 
                    control={control}
                    name='confirm_password' 
                    render={({field: {onChange}}) => {
                        return <Input
                            placeholder='Confirme senha'
                            bg='gray.600'  
                            onChangeText={onChange}
                            secureTextEntry
                            errorMessage={errors.confirm_password?.message}

                            />
                           
                    }}         
               />
              
            <Button title='Atualizar' mt={4} onPress={handleSubmit(handleProfileUpdate)} isLoading={isUpdateing}/>
       </VStack>
        </ScrollView>
       
    </VStack>
    )
   
}