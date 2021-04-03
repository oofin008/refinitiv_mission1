// const {ipcRenderer} = require('electron');
import {ipcRenderer} from 'electron';
const asyncMsgBtn = document.getElementById('new-window');

asyncMsgBtn.addEventListener('click', () => {
  ipcRenderer.send('asynchronous-message', 'ping')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('async-reply').innerHTML = message
})
