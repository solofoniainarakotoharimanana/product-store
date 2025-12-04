
import mongoose from "mongoose";
import Product from "../models/product.js"

export const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products,
            message: "Fetch all products",
            nbProducts: products.length
        })
    } catch (error) {
        console.log("Error to fetch all products: ", error.message);
        res.status(500).json({
            success: false, 
            message: "Server error"
        })
    }
}

export const getProduct = async (req, res) => {
    const { idProduct } = req.params
    try {
        const product = await Product.findById(idProduct);
        res.status(200).json({
            success: true,
            data: product,
            message: "Fetch one product successfully"
        })
    } catch (error) {
        console.log("Error to fetch one product: ", error.message);
        res.status(500).json({
            success: false,
            message: `Error to fetch one product ${error.message}`
        })
    }
}

export const updateProduct = async (req, res) => {
    const { idProduct } = req.params;
    console.log("PRO ID >>> ", req.body)
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
        return res.status(404).json({
            success: false,
            message: "Invalid product Id"
        })
    }

    try {
        
        const updatedproduct = await Product.findByIdAndUpdate(idProduct, product, { new: true });
        
        res.status(201).json({
            success: true,
            data: updatedproduct,
            message: "update product successfully"
        })
        
    } catch (error) {
        console.log("Error in update product ", error.message)
        res.status(500).json({
            success: false,
            message: "Error in update product"+error.message
        })
    }
}

export const saveProduct = async (req, res) => {
  const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(500).json({
            success: false,
            message: "All fields are required "
        });
    }

    const newProduct = Product(product);
    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct,
            message: "Product created successfully !!"
        });
    
    } catch (error) {
        console.error("Error in creating product :", error.message);
        res.status(500).json({success: false, message: "Server error"})
    }  
}

export const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
        return res.status(404).json({
            success: false,
            message: "Invalid product Id"
        })
    }
    
    await Product.findByIdAndDelete(idProduct);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
    
}