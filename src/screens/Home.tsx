import {FlatList, HStack, Heading, Text, VStack}  from 'native-base'
import React, { useState } from 'react'

import { AppNavigatorRoutesProps } from '../routes/app.routes';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseGroup } from '../components/ExerciseGroup'
import { HomeHeader } from '../components/HomeHeader'
import { useNavigation } from '@react-navigation/native';

export function Home(){
    const [groups, setGroups] = useState(["costas", "ombro", "peito", "perna"]);
    const [exercises, setExercises] = useState(["Remada Baixa", "Supino reto ", "Leg press",  "agachamento"]);
    const [groupSelected, setGroupSelected] = useState("peito");

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails () {
        navigation.navigate('exercise')
    }
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
                    keyExtractor={item => item}
                    renderItem={({item}) => (<ExerciseCard onPress={handleOpenExerciseDetails} />) }
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom:20}}
                />
                
                
            </VStack>
            
            
        </VStack>
    )
}
    
   