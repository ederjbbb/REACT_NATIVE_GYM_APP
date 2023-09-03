import {FlatList, HStack, Heading, Text, VStack, useToast}  from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AppError } from '../utils/AppError';
import { AppNavigatorRoutesProps } from '../routes/app.routes';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseDTO } from '../dtos/ExerciseDTO';
import { ExerciseGroup } from '../components/ExerciseGroup'
import { HomeHeader } from '../components/HomeHeader'
import { Loading } from '../components/Loading';
import { api } from '../services/api';

export function Home(){
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groupSelected, setGroupSelected] = useState('antebraço');


    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const toast = useToast()
    
    function handleOpenExerciseDetails (exerciseId: string) {
        navigation.navigate('exercise',{exerciseId})
    }

    async function fetchGroups(){

        try {
            const {data} = await api.get('/groups')
            setGroups(data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title =  isAppError ? error.message : 'Nao foi possivel carregar os grupos musciulares';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function fetchExerciseByGroup(){
        
        try {
            setIsLoading(true)

            const {data} = await api.get(`/exercises/bygroup/${groupSelected}`)
            setExercises(data)
             
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title =  isAppError ? error.message : 'Nao foi possivel carregar os exercicios';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
            setIsLoading(false)
        }
        
    }
   useEffect(() => {
       fetchGroups()
       
    },[])

    useFocusEffect(useCallback(() => {
        fetchExerciseByGroup()
    },[groupSelected]))

    return(
        <VStack flex={1} >
            <HomeHeader/>

            <FlatList 
                data={groups}
                keyExtractor={(item: string) => item} 
                renderItem={({item}) => (
                <ExerciseGroup name={item} isActive={ groupSelected.toUpperCase() === item.toUpperCase()} onPress={() => setGroupSelected(item)}/>
                )} 
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{px:8}}
                my={4}
                maxH={10}
                minH={10}
            />
            {
                isLoading ? <Loading/> : 
                <VStack flex={1} px={8} mb={5}>
                <HStack justifyContent={"space-between"} mb={5}>
                    <Heading color="gray.200" fontSize={"md"} >
                        Exercicios
                    </Heading>
                    <Text color="gray.200" fontSize={"sm"}>
                        {exercises.length}
                    </Text>
                </HStack>
                <FlatList
                    data={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)} />) }
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom:20}}
                />
                
                
            </VStack>
            }
           
            
            
        </VStack>
    )
}
    
   