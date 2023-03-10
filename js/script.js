
const updateButton = document.querySelector('.update')


const listaEstoque = document.querySelector('.s-storage'),
    produto = document.querySelector('.s-product'),
    alerta = document.querySelector('.alert'),
    dataactual = new Date(),
    url = 'http://ec2-18-230-76-165.sa-east-1.compute.amazonaws.com:3000/product'

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
    listaEstoque.innerHTML = ''
    axios.get(url)
        .then(response => {
            
            data = response.data

            data.forEach(element => {
                const item = document.createElement('li')
                item.textContent = element.name
                item.classList.add('s-item')
                item.addEventListener('click', () =>{
                    alerta.classList.remove('show')
                    this.renderProduct(element._id) 
                })
                listaEstoque.appendChild(item)
            });
            

        })
        .catch(error => console.log(error))
}


function renderProduct(id) {
    produto.innerHTML = ''
    produto.classList.remove('rotate')
    console.log(id)
    axios.get(url + '/' + id)
    .then(response => {
        const product = response.data
        const pName = document.createElement('h2')
        pName.classList.add('name')
        pName.textContent = product.name
        produto.appendChild(pName)
        const pPrice = document.createElement('p')
        pPrice.classList.add('price')
        pPrice.textContent = 'R$ ' + product.price
        produto.appendChild(pPrice)
        const pCode = document.createElement('p')
        pCode.classList.add('code')
        pCode.textContent = 'Código: ' + product.code
        produto.appendChild(pCode)
        const pQuantity = document.createElement('p')
        pQuantity.classList.add('quantity')
        pQuantity.textContent = 'Quantidade: ' + product.quantity
        produto.appendChild(pQuantity)
        if(product.minimum_stock !== undefined){
            const pMinQuantity = document.createElement('p')
            pMinQuantity.classList.add('minStock')
            pMinQuantity.textContent = 'Quantidade mínima:'+ product.minimum_stock
            produto.appendChild(pMinQuantity)
            console.log(product.quantity, product.minimum_stock)
        }
        const pQuality = document.createElement('p')
        pQuality.classList.add('quality')
        pQuality.textContent = 'Qualidade: ' + product.quality
        produto.appendChild(pQuality)
        if(product.validate!== undefined){
            const pValidate = document.createElement('p')
            pValidate.classList.add('validate')
            pValidate.textContent = 'Validade: '+ product.validate
            produto.appendChild(pValidate)
        }
        produto.classList.add('rotate')
        const divBtn = document.createElement('div')
        divBtn.classList.add('divBtn')
        const pAtt = document.createElement('button')
        pAtt.classList.add('update')
        divBtn.appendChild(pAtt)
        pAtt.innerText = 'UPDATE'

        checkage(product.quantity, product.minimum_stock, dataactual, product.validate)
        
        const pDelete = document.createElement('button')
        pDelete.classList.add('remove')
        divBtn.appendChild(pDelete)
        pDelete.innerText = 'DELETE'
        
        pDelete.addEventListener('click', ()=>{
            deleteProduct(id)
            produto.innerHTML = ''
            listaEstoque.innerHTML = ''
            setTimeout(()=>{
                getApi()
            }, 500)
           
        })
        produto.appendChild(divBtn)



    })
}

function deleteProduct(id) {
    axios.delete(url + '/' + id)
    .then(res => console.log('deleted', res))
    .catch(err => console.log(err))
}



function checkStock(actualStock, minStock){
    alerta.innerHTML = ''
    if(minStock <= actualStock){
        if(alerta.classList.contains('show')){
            console.log('waiting')
            setTimeout(()=>{
                const aTitle = document.createElement('p')
                aTitle.classList.add('title')
                aTitle.textContent = 'Estoque acabando'
                alerta.appendChild(aTitle)
                const aDesc = document.createElement('p')
                aDesc.classList.add('description')
                aDesc.textContent = 'Reponha urgentemente'
                alerta.appendChild(aDesc)
                alerta.classList.add('show')
                setTimeout(() => {
                    alerta.classList.remove('show')
                }, "5000")
            }, '6000')
        }
        else {
            const aTitle = document.createElement('p')
            aTitle.classList.add('title')
            aTitle.textContent = 'Estoque acabando'
            alerta.appendChild(aTitle)
            const aDesc = document.createElement('p')
            aDesc.classList.add('description')
            aDesc.textContent = 'Reponha urgentemente'
            alerta.appendChild(aDesc)
            alerta.classList.add('show')
            setTimeout(() => {
                alerta.classList.remove('show')
            }, "5000")
        }
    }
}

function checkValidity(actualValidity, expectedValidity){
    alerta.innerHTML = ''
    const eV = expectedValidity.split('/')
    expectedValidity = new Date(eV[1]+'-'+eV[0]+'-'+eV[2])
    if(actualValidity >= expectedValidity){
        const aTitle = document.createElement('p')
        aTitle.classList.add('title')
        aTitle.textContent = 'O produto está vencido'
        alerta.appendChild(aTitle)
        const aDesc = document.createElement('p')
        aDesc.classList.add('description')
        aDesc.textContent = 'Por favor, remova do estoque'
        alerta.appendChild(aDesc)
        alerta.classList.add('show')
        setTimeout(() => {
            alerta.classList.remove('show')
          }, "5000")
    }
}

function checkage(actualStock, minStock, actualValidity, expectedValidity){
    checkStock(actualStock, minStock)
    setTimeout(()=> {
        checkValidity(actualValidity, expectedValidity)
    }, "6000")
}


const inputProduct = document.querySelectorAll('.inputProduct')
const btnSubmit = document.querySelector('#submit')

function addProduct(produto) {
    axios.post(url, produto)
    .then(res => {})
    .catch(err => console.log(err))
    getApi()
}

btnSubmit.addEventListener('click', () =>{
    let newProduct = {
        
        name: inputProduct[0].value,
        price: +inputProduct[1].value,
        code: +inputProduct[2].value,
        quantity: +inputProduct[3].value ,
        minimum_stock: +inputProduct[4].value ,
        quality: inputProduct[5].value,
        validate: inputProduct[6].value
    }

    console.log(newProduct)
    
    addProduct(newProduct)
})


getApi()