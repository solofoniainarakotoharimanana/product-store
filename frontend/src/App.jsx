import './App.css'
import NavBar from './components/layouts/NavBar'

import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import { Box } from '@chakra-ui/react'
import { useProductStore } from './store/product'



function App() {
  const { products } = useProductStore();

  return (
    <Box h={'100vh'}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
