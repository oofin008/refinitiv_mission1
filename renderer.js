const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');

const asyncMsgBtn = document.getElementById('send-message')

asyncMsgBtn.addEventListener('click', () => {
  ipcRenderer.send('asynchronous-message', 'ping');
  const modalPath = path.join('file://', __dirname, '/modal.html')
  let win = new BrowserWindow({ width: 400, height: 320 })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
  win.webContents.send('answer-data', 'answer is A')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('reply-message').innerHTML = message
})
