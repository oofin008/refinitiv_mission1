import { ipcRenderer } from 'electron';

const getAnswer = async (id: string):Promise<answerDataType> => {
  const result = await window.fetch(`http://localhost:3000/getanswer/${id}`);
  const data = await result.json();
  return data.data;
}

ipcRenderer.on('show-answer', (event:Electron.IpcRendererEvent, arg:any):void => {
  getAnswer(arg).then( (result:answerDataType) => {
    const message = `Answer id: ${result.id} data: ${result.answer}`
    document.getElementById('modal-message')!.innerHTML = message;
  }).catch(() => {
    const message = `Error occured, something went wrong`;
    document.getElementById('modal-message')!.innerHTML = message;
  })
})

interface answerDataType {
  id: string;
  answer: string;
}