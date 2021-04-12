import { ipcRenderer } from 'electron';
import { AnswerType } from './objTypes';

const getAnswer = async (id: string):Promise<AnswerType> => {
  try{
    const result = await window.fetch(`http://localhost:3000/getanswer/${id}`);
    const data = await result.json();
    return data.data;
  } catch (error) {
    throw new Error("Error, cannot fetch answer from server");
  }
};

ipcRenderer.on('show-answer', (event:Electron.IpcRendererEvent, arg:any):void => {
  getAnswer(arg).then( (result:AnswerType) => {
    const message = `Answer id: ${result.id} data: ${result.answer}`;
    document.getElementById('modal-message')!.innerHTML = message;
  }).catch(() => {
    const message = `Error occured, something went wrong`;
    document.getElementById('modal-message')!.innerHTML = message;
  });
});
