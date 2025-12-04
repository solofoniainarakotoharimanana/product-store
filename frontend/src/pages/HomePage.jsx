import ProductCard from '../components/layouts/ProductCard'
import { useProductStore } from '../store/product.js'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  // console.log("PRODUCTS >>> ", useProductStore())

  return (
    <Container maxW={"container.lg"} p={12}>
      <VStack spaceX={8} spaceY={8}>
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          bgGradient="to-r" gradientFrom="green.400" gradientTo="purple.600"
          bgClip={"text"}
        >
          Current Product
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spaceX={10}
          spaceY={10}
          w={'-moz-fit-content'}//Utilise l'espace disponible
        >
          {products.length > 0 ? (
           products.map(product => (
              <ProductCard key={product._id} product={product} />
            )) 
          ) : (
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                color={'white'}
              >
                No Products found 😓 {" "}
                <Text
                  fontSize={'md'}
                  color={'blue.300'} _hover={{ textDecoration: "underline" }}>
                  <Link to="/create">
                    Create a product
                  </Link>
                </Text>
              </Text>
          )}
          
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default HomePage