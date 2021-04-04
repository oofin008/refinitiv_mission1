const { ipcRenderer } = require('electron');

ipcRenderer.on('show-answer', (event, arg) => {
  const message = `Answer data: ${arg}`
  document.getElementById('modal-message').innerHTML = message;
})
