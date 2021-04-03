// Modules to control application life and create native browser window
const {app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')

let mainWindow = null;

function initialize () {

  loadMainProcess();

  function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration:true,
        webSecurity: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
  }

  app.whenReady().then(() => {
    createWindow()
    console.log('== App ready ==');
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    console.log('app quit');
  })
}

function loadMainProcess() {
  const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach((file) => { require(file) })
}

initialize();
