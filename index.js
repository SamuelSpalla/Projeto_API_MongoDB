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
app.options('*', cors())
//cors
app.use((req, res, next) => {
	res.header("access-control-allow-origin", "*",
        'Access-Control-Allow-Headers', 'Content-Type, Authorization',
        'Access-Control-Allow-Methods', '*',
      )
    app.use(cors());
    next();
});

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
