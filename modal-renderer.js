const { ipcRenderer } = require('electron');


ipcRenderer.on('asynchronous-reply', (event, arg) => {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('modal-message').innerHTML = message
})

ipcRenderer.on('answer-data', (event, arg) => {
  const message = `Answer data: ${arg}`
  document.getElementById('modal-message').innerHTML = message
})
