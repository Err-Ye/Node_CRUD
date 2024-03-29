const express = require('express');
const app = express();
const Product = require('./Models/productModel');
const mongoose = require('mongoose');

//middleware
//to accept json data
app.use(express.json());
//to accept form url encoded
app.use(express.urlencoded({extended:false}))

//route

app.get('/',(req,res) => {
    res.send('Hello Node API');
})

app.get('/blog',(req,res) => {
    res.send('Hello blog');
})

//get all data from mogo db
app.get('/products',async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//get data by id from mogo db
app.get('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//update data by id from mogo db
app.put('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //cannt find any data
        if(!product){
            return res.status(404).json({message: `Cannot find any data with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


//add data to mongo db
app.post('/product',async(req,res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
        const productData = await Product.create(req.body);
        res.status(200).json(productData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})


//delete data from mongo db
app.delete('/products/:id', async (req , res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannnot find any data with ID ${id}`});
        }
        res.status(200).json({message: `Delete data from id : ${id}`});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


mongoose.connect('mongodb+srv://root:root123@cluster0.vr3f3ov.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDb');
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000');
    });
})
.catch((error) => {
    console.log(error);
})