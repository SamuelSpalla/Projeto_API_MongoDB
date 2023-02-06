const express = require('express')

const app = express()

//forma de ler json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get('/', (req, res) =>{

    // mostrar req

    res.json({message: 'Oi Express!'})

})

app.listen(3000)