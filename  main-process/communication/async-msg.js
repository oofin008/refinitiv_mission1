const {ipcMain} = require('electron');

console.log('ipcMain async-msg loaded')
ipcMain.on('asynchronous-message', (event, arg) => {
  event.sender.send('asynchronous-reply', 'pong')
})
