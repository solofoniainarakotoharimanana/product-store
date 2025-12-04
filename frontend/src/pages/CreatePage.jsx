
import { toaster, Toaster } from './../components/ui/toaster'
import { useProductStore } from '../store/product.js'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const CreatePage = () => {
  const navigate = useNavigate()
  const { idProduct } = useParams();
  //const [product, setProduct] = useState();
  const { createProduct, getProduct, updateProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  }) 

  if (idProduct) {
    useEffect(() => {
      const getOneProduct = async () => {
        const res = await getProduct(idProduct);
        // console.log("RES >>> ", res)
        setNewProduct({
          name: res.data.name,
          price: res.data.price,
          image: res.data.image,
        })
      }
      getOneProduct();
    }, [idProduct])
    
  }

  const handleUpdate = async (idProduct) => {
    console.log(" ID PRODUCT >>> ", idProduct)
    // console.log("NEW PRODUCT >>> ", newProduct)
    const { success, message} = await updateProduct(idProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: `${message}`,
        type: "error",
        duration: 3000,
        closable: true,
      })
    }
    else {
      toaster.create({
        title: "Success",
        description: `${message}`,
        type: "success",
        duration: 3000,
        closable: true,
      })
      setNewProduct({
        name: "",
        price: "",
        image: ""
      })
    }
    navigate("/")
  }

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: `${message}`,
        type: "error",
        duration: 3000,
        closable: true,
      })
    }
    else {
      toaster.create({
        title: "Success",
        description: `${message}`,
        type: "success",
        duration: 3000,
        closable: true,
      })
      setNewProduct({
        name: "",
        price: "",
        image: ""
      })
    }
    
    
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
            {
              idProduct ? (
                <Button
                  w={'full'}
                  bgColor={"blue.500"}
                  color={"white"}
                  onClick={() => handleUpdate(idProduct)}
                >
                  Update product
                </Button>) : (
                <Button
                  w={'full'}
                  bgColor={"blue.500"}
                  color={"white"}
                  onClick={handleAddProduct}
                >
                  Add product
                </Button>
            )
            }
            
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  )
}

export default CreatePage