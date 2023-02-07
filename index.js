const express = require('express')
const mongoose = require('mongoose')
const app = express()



app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())


const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)




app.get('/', (req, res) => {

    res.json({message: 'Oi espress!'})
})


mongoose
.connect('mongodb+srv://Samuel:Sssilva7191012@apicluster.kygsafc.mongodb.net/MeuBanco?retryWrites=true&w=majority')
.then(()=>{
    console.log('Deu certo')
    app.listen(3000)
})
.catch((err) => console.log(err))




