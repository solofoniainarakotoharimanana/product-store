
import { Box, Button, Heading, HStack, IconButton, Image, Text, CloseButton, Dialog, Portal, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import { MdModeEditOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useProductStore } from '../../store/product.js'
import { toaster, Toaster } from './../../components/ui/toaster.jsx';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const onOpen = (productId) => {
        navigate(`/create/${productId}`)
     }
    const {deleteProduct} = useProductStore();

    // const {isOpen, onOpen, onClose} = useDisclosure()

    const handleDeleteProduct = async (productId) => {
        const { success, message } = await deleteProduct(productId)
        if (!success) {
            toaster.create({
                 title: "Error",
                description: `${message}`,
                type: "error",
                duration: 3000,
                closable: true,
            })
        } else {
             toaster.create({
                 title: "succes",
                description: `${message}`,
                type: "success",
                duration: 3000,
                closable: true,
            })
        }
    }
    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{
                transform: "translateY(-5px)",
                shadow: "xl"
            }}
            bg={"white"}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} color={"gray.600"} mb={4} >
                    $ {product.price}
                </Text>
                <HStack spaceX={2} spaceY={2}>
                    <Button onClick={() => onOpen(product._id)} bg={"blue.400"} color={"white"}>
                        <MdModeEditOutline size={16} />
                    </Button>
                    {/* <IconButton _icon={<EditIcon />} onClick={onOpen} colorScheme={"blue"} />
                    <IconButton _icon={<DeleteIcon />} onClick={() => handleDelete(product.id)} colorScheme={"red"} /> */}
                    <Button onClick={() => handleDeleteProduct(product._id)} bg={"red.600"} color={"white"}>
                        <FaRegTrashAlt />
                    </Button>
                </HStack>
            </Box>
            <Toaster />
        </Box>
    )
}

export default ProductCard
