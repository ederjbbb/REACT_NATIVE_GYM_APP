import { FormControl, IInputProps, Input as NativeBaseInput } from "native-base"

import React from "react"

type Props = IInputProps &{
    errorMessage?: string | null;
}
export function Input({errorMessage, isInvalid ,...rest}:Props){
    const isDataInvalid = !!errorMessage || isInvalid;

    return(
    <FormControl isInvalid={isDataInvalid}>

        <FormControl.ErrorMessage mt={-3} _text={{color:'red.500'}}>
            {errorMessage}
        </FormControl.ErrorMessage>
        <NativeBaseInput
            
            bg="gray.700"
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily={"body"}
            mb={4}
            placeholderTextColor="gray.300"
            isInvalid={isDataInvalid}
            _invalid={{
                borderColor:'red.500'
            }}
            borderRadius={8}
            _focus={{
                bg: "gray.700",
                borderWidth:1,
                borderColor: "green.500"
            }}
            {...rest}
        />
        
    </FormControl>
       
            
        
    )
}