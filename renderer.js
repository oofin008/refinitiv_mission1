const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;
const path = require("path");

const questionContainer = document.getElementById('question-container');

for(let i =0; i<10; i++) {
  const btn = document.createElement('button');
  btn.id = i;
  btn.textContent = i;
  questionContainer.appendChild(btn);
}
questionContainer.addEventListener('click', (e) => {
  if(e.target && e.target.nodeName === "BUTTON"){
    ipcRenderer.send('open-answer', e.target.id);
  }
})
