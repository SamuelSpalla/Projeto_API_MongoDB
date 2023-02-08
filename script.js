const resultado = document.querySelector('#resultado')

const url = 'http://localhost:3000/product'

const newProduct = {
    name: 'pedra',
    price: 10,
    fragile: false,
}

function postApi() {
    axios.post(url, newProduct)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
}

function getApi() {
    axios.get(url)
        .then(response => {
            console.log( response.data[0])
            
            data = response.data

            data.forEach(element => {
                console.log(element)
                const showResultado = document.createElement('p')
                showResultado.innerHTML = element.name
                resultado.appendChild(showResultado)
            });
            

        })
        .catch(error => console.log(error))
}




getApi()