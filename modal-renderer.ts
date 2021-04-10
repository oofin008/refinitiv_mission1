// const { ipcRenderer } = require('electron');
import { ipcRenderer } from 'electron';

async function getAnswer(id: string) {
  const result = await window.fetch(`http://localhost:3000/getanswer/${id}`);
  const data = await result.json();
  return data.data;
}

ipcRenderer.on('show-answer', (event:any, arg:any) => {
  getAnswer(arg).then((result:any) => {
    const message = `Answer id: ${result.id} data: ${result.answer}`
    document.getElementById('modal-message')!.innerHTML = message;
  }).catch(() => {
    const message = `Error occured, something went wrong`;
    document.getElementById('modal-message')!.innerHTML = message;
  })
})

