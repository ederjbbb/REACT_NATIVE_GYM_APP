import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast }  from 'native-base'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppError } from '../utils/AppError';
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import BodySVG from '../../assets/body.svg'
import { Button } from '../components/Button'
import { ExerciseDTO } from '../dtos/ExerciseDTO';
import {Feather} from "@expo/vector-icons"
import RepetitionsSVG from "../../assets/repetitions.svg"
import SeriesSVG from "../../assets/series.svg"
import { TouchableOpacity } from 'react-native'
import { api } from '../services/api';

type RouteParamsProps = {
    exerciseId: string;
}
export function Exercise(){
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const route = useRoute()
    const toast = useToast()
    const {exerciseId} = route.params as RouteParamsProps;
    
    function handleGoBack(){
        navigation.goBack();
    }
    useEffect(() => { fetchExerciseDetails()}, [exerciseId])
    async function fetchExerciseDetails(){
        try {
            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title =  isAppError ? error.message : 'Nao foi possivel carregar detalhes do exercicio';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
        }
    }
    
    return(
    <VStack flex={1}>
        
        <VStack px={8} bg='gray.600' pt={12} > 
            <TouchableOpacity onPress={handleGoBack}>
                <Icon as={Feather} name='arrow-left' color='green.500' size={6} />
            </TouchableOpacity>
            <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems='center'>
                <Heading color='gray.100' fontSize='lg' flexShrink={1}>{exercise.name}</Heading>
                <HStack alignItems={'center'}>
                    <BodySVG/>
                <Text color='gray.200' ml={1} textTransform='capitalize'>{exercise.group}</Text>
            </HStack>
            </HStack>
            
        </VStack>
        <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p={8}>
            <Image
            w="full"
            h={80}
            source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
            alt="exercicio"
            mb={3}
            resizeMode="cover"
            rounded={"lg"}
            
           />
            <Box bg="gray.600" rounded="xl"pb={4} px={4}>
                <HStack alignItems={"center"} justifyContent='space-around' mt={5} mb={6}>
                <HStack>
                   <SeriesSVG/>
                   <Text color='gray.200' ml={2}>{exercise.series}</Text>
                </HStack>
                <HStack>
                   <RepetitionsSVG/>
                   <Text color='gray.200' ml={2}>{exercise.repetitions}</Text>
                </HStack>
                </HStack>
                <Button title='Marcar como realizado'/>
            </Box>
            
        </VStack>
        </ScrollView>
        
    </VStack>
    )
   
}