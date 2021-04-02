// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
  console.log('app quit');
})

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do actions on behalf of the Renderer
})
