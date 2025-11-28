import express from "express"
import dotenv from "dotenv"

import {connectDB} from "./config/db.js"
import Product from "./models/product.js";

import productsRoutes  from "./routes/product.route.js"



const app = express();
app.use(express.json());//Allows us to accept json data in the body

dotenv.config();

app.use('/api/products', productsRoutes);

app.get('/', (req, res) => {
    res.send('hello world')
})



app.listen(5000, () => {
    connectDB();
    console.log("Server is running on 5000 port test")
})



