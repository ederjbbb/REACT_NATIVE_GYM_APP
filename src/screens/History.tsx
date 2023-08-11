import {Center, Heading, SectionList, Text, VStack}  from 'native-base'
import React, { useState } from 'react'

import { HistoryCard } from '../components/HistoryCard'
import { ScreenHeader } from '../components/ScreenHeader'

export function History(){

    const [exercises, setExercises] = useState([
        {
            title: '26.08.22',
            data: ["Remada baixa", "Supino reto", "Peck deck"]
        },
        {
            title: '27.08.22',
            data: ["Biceps", " Rosca direta", "Abs"]
        },
        {
            title: '27.08.22',
            data: ["Biceps", " Rosca direta", "Abs"]
        }
    ])
    return(
        
    <VStack flex={1}>
        <ScreenHeader title="Histórico de Exercícios"/>
        <SectionList 
        
        sections={exercises}    
        keyExtractor={item => item} 
        renderSectionHeader={({section}) => (
            <Heading color="gray.200" fontSize={"md"} mt={5} mb={3}>{section.title}</Heading>
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