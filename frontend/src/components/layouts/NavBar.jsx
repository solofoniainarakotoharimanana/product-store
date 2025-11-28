

import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { IoMoon } from 'react-icons/io5';
import { useProductStore } from '../../store/product.js';

const NavBar = () => {

    const { products } = useProductStore();

    return (
        <Container maxW={'1140px'} px={'4'}>
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{
                    base: 'column',
                    sm: 'row'
                }}
            >
                <Text
                    fontSize={{
                        base: "22",
                        sm: "28"
                    }}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    textAlign={'center'}
                    bgGradient="to-r" gradientFrom="green.400" gradientTo="pink.600"
                    bgClip={'text'}
                    
                >
                    <Link to="/" >
                        <Flex flexDir={{
                            base: "column",
                            sm: "row"
                        }}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            w={"25vh"}
                        >
                            Product Store
                            <FaShoppingCart color='white' />
                        </Flex>
                    </Link>
                </Text>
                <HStack
                    spaceX={'1'} 
                    spaceY={'1'}
                    alignItems={'center'}>
                    <Link to="/create">
                        <Button>
                            <FaPlus />
                        </Button>
                    </Link>
                     <Button>
                        <IoMoon />
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default NavBar
