const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()




//forma de ler json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
//cors
app.options('*', cors()) // enable pre-flight request for DELETE request
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
  }));

//rotas da api

const productRoutes = require('./routes/productRoutes')

app.use('/product', productRoutes)

// rota inicial 
app.get('/', (req, res) =>{

    res.json({message: 'Está funcionando'})
    
})

const senha = encodeURIComponent('VerZwC62n5IWWrsr')
const user = 'Nilson'

mongoose.connect(`mongodb+srv://${user}:${senha}@cluster0.mtwp5px.mongodb.net/?retryWrites=true&w=majority`)
.then(() =>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
