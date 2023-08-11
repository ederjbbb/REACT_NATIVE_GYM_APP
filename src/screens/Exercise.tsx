import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack }  from 'native-base'

import { AppNavigatorRoutesProps } from '../routes/app.routes'
import BodySVG from '../../assets/body.svg'
import { Button } from '../components/Button'
import {Feather} from "@expo/vector-icons"
import React from 'react'
import RepetitionsSVG from "../../assets/repetitions.svg"
import SeriesSVG from "../../assets/series.svg"
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export function Exercise(){
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    function handleGoBack(){
        navigation.goBack();
    }
    return(
    <VStack flex={1}>
        
        <VStack px={8} bg='gray.600' pt={12} > 
            <TouchableOpacity onPress={handleGoBack}>
                <Icon as={Feather} name='arrow-left' color='green.500' size={6} />
            </TouchableOpacity>
            <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems='center'>
                <Heading color='gray.100' fontSize='lg' flexShrink={1}>Puxada frontal</Heading>
                <HStack alignItems={'center'}>
                    <BodySVG/>
                <Text color='gray.200' ml={1} textTransform='capitalize'>Costas</Text>
            </HStack>
            </HStack>
            
        </VStack>
        <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p={8}>
            <Image
            w="full"
            h={80}
            source={{uri: "https://tse1.mm.bing.net/th?id=OIP.zTLJDd6LF9ZCc9AZxlW7LAHaE8&pid=Api&P=0&h=180"}}
            alt="exercicio"
            mb={3}
            resizeMode="cover"
            rounded={"lg"}
            
           />
            <Box bg="gray.600" rounded="xl"pb={4} px={4}>
                <HStack alignItems={"center"} justifyContent='space-around' mt={5} mb={6}>
                <HStack>
                   <SeriesSVG/>
                   <Text color='gray.200' ml={2}> 3 Series</Text>
                </HStack>
                <HStack>
                   <RepetitionsSVG/>
                   <Text color='gray.200' ml={2}> 10 repeticoes</Text>
                </HStack>
                </HStack>
                <Button title='Marcar como realizado'/>
            </Box>
            
        </VStack>
        </ScrollView>
        
    </VStack>
    )
   
}