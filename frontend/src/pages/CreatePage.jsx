import { useProductStore } from '../store/product.js'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'


const CreatePage = () => {
  const { createProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  }) 

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    setNewProduct({
      name: "",
      price: "",
      image: ""
    })
  }

  return (
    <Container maxW={"550px"}>
      <VStack spaceX={8} spaceY={8}>
        {/* Add form here */}
        <Heading as={"h1"}
          textAlign={"center"}
          size={"2xl"}
          mb={"8"}
          bgGradient="to-r" gradientFrom="green.400" gradientTo="purple.600"
          bgClip={"text"}
        >Create new Product</Heading>
        <Box
          w={'full'}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spaceX={4} spaceY={4}>
            <Input placeholder='Product name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input placeholder='Product price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input placeholder='Image Url'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button
              w={'full'}
              bgColor={"blue.500"}
              color={"white"}
              onClick={handleAddProduct}
            >
              Add product
            </Button>
          </VStack>
        </Box>

      </VStack>

    </Container>
  )
}

export default CreatePage