
    const { ipcRenderer } = require('electron');

    const form = document.querySelector('form')
    form.addEventListener('submit', (e)=> {
        let name = document.querySelector('#name').value
        let priceProduct = document.querySelector('#price').value
        let descriptionProduct = document.querySelector('#description').value
        
        const newProduct = {
            name: name,
            price: priceProduct,
            description: descriptionProduct
        }
        
        //La manera de enviar informacion a la ventana o archivo principal
        ipcRenderer.send('product:new', newProduct )
 
        // console.log(name, priceProduct, descriptionProduct)
 
        e.preventDefault()
 
    })