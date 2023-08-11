import { IImageProps, Image } from "native-base";

import React from "react";

type Props = IImageProps & {
    size: number;
}
export function UserPhoto({size, ...rest}: Props){
    return(
        <Image 
        w={size}
        h={size}
        rounded="full"
        borderWidth={2}
        borderColor="green.700"
        {...rest}
        />
    )
}