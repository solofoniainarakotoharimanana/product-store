import express from "express"
import mongoose from "mongoose"
import Product from "../models/product.js"
import {
    fetchProducts,
    getProduct, 
    updateProduct,
    saveProduct,
    deleteProduct
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", fetchProducts)

router.get("/:idProduct", getProduct)

router.put("/:idProduct", updateProduct)

router.post('/', saveProduct); 

router.delete('/:idProduct', deleteProduct)

export default router;
