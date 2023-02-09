const router = require('express').Router()

const Product = require('../models/Product')



router.post('/', async (req, res) =>{
     
    const { name, price, code, quantity, minimum_stock, quality, validate} = req.body

    if(!name) {
        res.status(422).json({error:'dado obrigatório'})
        return
    }

    const productObj = {
        name,
        price,
        code,
        quantity,
        minimum_stock,
        quality,
        validate,
        
    }

    try{

        await Product.create(productObj)

        res.status(201).json({ message: 'Produto inserido'})

    }catch(error){
        res.status(500).json({error: error})
    }

})



router.get('/', async (req,res) =>{

    try{

        const products = await Product.find() 
        
        res.status(200).json(products)
        console.log(products)

    }catch(error){
        res.status(500).json({error: error})
        
    }


})

router.get('/:id', async (req, res)=>{

    
    const id = req.params.id
   
    try{
        
        const product = await Product.findOne({_id: id})
        
        if(!product){
            res.status(422).json({message: 'O produto não foi encontrado!'})
            return
        }

        res.status(200).json(product) 

    }catch(error){
        res.status(500).json({error: error})
    }

    
})



router.patch('/:id', async (req, res) =>{

    const id = req.params.id

    const { name, price, code, quantity, minimum_stock, quality, validate} = req.body

    
    const productObj = {
        name,
        price,
        code,
        quantity,
        minimum_stock,
        quality,
        validate,

    }
    try{

        const updatedProduct = await Product.updateOne({_id: id}, productObj)

        if(updatedProduct.matchedCount === 0){ 
            res.status(422).json({message: 'O produto não foi encontrado!'})
            return
        }

        res.status(200).json(productObj)

    }catch(error){

        res.status(500).json({error: error})
    }

})



router.delete('/:id', async (req, res) =>{
    
    const id = req.params.id

    const product = await Product.findOne({_id: id})
 
    if(!product){
        res.status(422).json({message: 'O produto não foi encontrado!'})
        return
    }
    
    try{

        await Product.deleteOne({_id: id})

        res.status(200).json({message: 'Produto Deletado'})

    }catch(error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router 