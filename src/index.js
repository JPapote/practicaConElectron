const {app, BrowserWindow, Menu, ipcMain } = require('electron')
const url = require('url')
const path = require('path')

let mainWindow
let newProductWindow


if(process.env.NODE_ENV !== 'production'){
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, './node_modules', '.bin', 'electron')
	})
}

app.on('ready', ()=> {
 mainWindow = new BrowserWindow({
	webPreferences: {
		nodeIntegration: true,
		nodeIntegrationInWorker: true
	}
})
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/index.html'),
		protocol: 'file',
		slashes: true
	}))
const mainMenu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(mainMenu)	 
	mainWindow.on('closed',() => {
	app.quit()
	})
})

function createNewProductWindow(){
	newProductWindow = new BrowserWindow({
		width: 400,
		height: 330,
		title: 'Add A New Product',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    })
	// newProductWindow.setMenu(null)
	newProductWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/new-product.html'),
		protocol: 'file',
		slashes: true
	}))
	newProductWindow.on('closed', ()=>{
		newProductWindow = null
	})
}

ipcMain.on('product:new', (e, newProduct) => {
	//console.log(e, newProduct)
	mainWindow.webContents.send('product:new', newProduct)
	newProductWindow.close()
})

const templateMenu = [{
	label: 'File',
	submenu:[{
	   label: 'New Product',
	   accelerator: 'Ctrl+N',
	   click (){createNewProductWindow()}
	},
	{
	   label: 'Remove All Products',
	   click(){
		   mainWindow.webContents.send('product:remove-all')
	   }
		
	},
	{  label: 'Exit',
	   accelerator: process.platform  == 'darwin' ? 'command+Q' : 'Ctrl+Q',
	   click (){
	   app.quit()
	   }
	}]
}]
if(process.env.NODE_ENV !== 'production'){
	templateMenu.push(
		{
			label: 'DevTools',
			submenu:[
				{
					label: 'Show/Hiden Dev Tool',
					accelerator:'Ctrl+D',
					click(item, focusedWindow){
					focusedWindow.toggleDevTools()
					}
				},
				{
					role: 'reload'
				}
			]
	        }
	
	)
}
