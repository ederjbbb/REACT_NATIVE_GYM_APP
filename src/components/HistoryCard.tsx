import { HStack, Heading, Text, VStack } from "native-base";

import React from "react";

export function HistoryCard () {
    return(
        <HStack w="full" px={5} py={4} bg="gray.600" rounded="md" mb={3} alignItems="center" justifyContent="space-between">
            <VStack mr={5} flex={1}>
                <Heading color="white" fontSize="md" textTransform="capitalize" numberOfLines={1}>Costas</Heading>
                <Text color="gray.100" fontSize="lg" numberOfLines={1}>Puxada frontal</Text>
            </VStack>
            <Text color="gray.200" fontSize={"md"}>08:50</Text>
        </HStack>
    )
}