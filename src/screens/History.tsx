import {Center, Heading, SectionList, Text, VStack, useToast}  from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'

import { AppError } from '../utils/AppError'
import { HistoryByDayDTO } from '../dtos/HistoryByDayDTO'
import { HistoryCard } from '../components/HistoryCard'
import { ScreenHeader } from '../components/ScreenHeader'
import { api } from '../services/api'
import { useFocusEffect } from '@react-navigation/native'

export function History(){

    const toast = useToast()
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function fetchHistory(){
        try {
            setIsLoading(true)
            const response = await api.get('/history')
            setExercises(response.data)
            console.log(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title =  isAppError ? error.message : 'foi possivel carregar o historico';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory()
    },[]))
    return(
        
    <VStack flex={1}>
        <ScreenHeader title="Histórico de Exercícios"/>
        <SectionList 
        
        sections={exercises}    
        keyExtractor={item => item.id} 
        renderSectionHeader={({section}) => (
            <Heading color="gray.200" fontSize={"md"} mt={5} mb={3}>
                {section.title}
            </Heading>
        )} 

        renderItem={({item}) => (<HistoryCard/>)}  
        px={5}  
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent:"center" }}
        ListEmptyComponent={() => (
                <Text fontSize="lg" color="white" textAlign="center" >Nenhum exercicio foi feito ainda</Text>
            
        )}
            showsVerticalScrollIndicator={false}
        />
    </VStack>
    )
  
}