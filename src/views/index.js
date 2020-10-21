const {ipcRenderer} = require('electron')

const product = document.querySelector('#root');

ipcRenderer.on('product:new', (e, newProduct) => {
    const templateProduct = `<div> 
        <header>
            <h5>${newProduct.name}</h5>
        </header>
        <section>
            ${newProduct.description}
            <hr/>
            ${newProduct.price}
        </section>
        <button id='button'>
            Delete
        </button>
    </div>`

    product.innerHTML += templateProduct
    const btn = document.querySelectorAll('button');
    btn.forEach(element => {
       element.addEventListener('click', e => {
           e.target.parentElement.remove()
       }) 
    });
})

ipcRenderer.on('product:remove-all', (e) => {
    product.innerHTML = ''
})
