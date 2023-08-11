import * as FileSystem from 'expo-file-system'
import * as ImagePicker from "expo-image-picker"

import { Alert, TouchableOpacity } from 'react-native'
import {Center, Heading, ScrollView, Skeleton, Text, VStack, useToast}  from 'native-base'
import React, { useState } from 'react'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { ScreenHeader } from '../components/ScreenHeader'
import {UserPhoto} from '../components/Userphoto'

export function Profile(){
    const [isPhotoLoading, setIsPhotoLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://avatars.githubusercontent.com/u/49681084?v=4.png')
    
    const toast = useToast()

    const PHOTO_SIZE = 33;

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
                        animationType: "slide-in | zoom-in",

                    })                    
                }
                    setUserPhoto(photoSelected.assets[0].uri)
            }
            
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsPhotoLoading(false)

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
                source={{
                    uri: userPhoto,
                    
                }}
                alt='foto do usuario'
                    size={PHOTO_SIZE}
                    mr={4}
                
                    />
            }
               <TouchableOpacity onPress={handleUserPhotoSelect}>
                   <Text color='green.500' fontWeight="bold" fontSize="md" mt={2} mb={8}>Editar foto</Text>
               </TouchableOpacity>
               <Input placeholder='Nome' bg='gray.600'/>
               <Input placeholder='ederjb@icloud.com'bg='gray.600' isDisabled/>
            </Center>
       <VStack px={10} mt={12} mb={9}>
            <Heading color='gray.200' fontSize={'md'} mb={2}>Alterar senha</Heading>
            <Input bg={'gray.600' } placeholder='Senha antiga' secureTextEntry/>
            <Input bg={'gray.600' } placeholder='Nova senha' secureTextEntry/>
            <Input bg={'gray.600' } placeholder='Confirme nova senha' secureTextEntry/>
            <Button title='Atualizar' mt={4}/>
       </VStack>
        </ScrollView>
       
    </VStack>
    )
   
}