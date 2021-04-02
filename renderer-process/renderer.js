const {ipcRenderer} = require('electron')
const path = require('path')

const newWindowBtn = document.getElementById('new-window')
console.log('*-- renderer is required success')

newWindowBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../sections/answer.html')
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})
