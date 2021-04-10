// const { ipcRenderer } = require('electron');
import { ipcRenderer } from 'electron';

const questionContainer = document.getElementById("question-container");

async function loadQuestion () {
  let data = [];
  const result = await window.fetch('http://localhost:3000/getquestion');
  data = await result.json();
  return data.data;

}

loadQuestion().then(result => {
  for(let i =0; i < result.length; i++) {
    const btn = document.createElement("button");
    btn.id = result[i].id;
    btn.innerText = result[i].question;
    btn.setAttribute("answerid", result[i].answerId);
    questionContainer!.appendChild(btn);
  }
})

// @ts-ignore: Unreachable code error
questionContainer!.addEventListener("click", (e) => {
  // @ts-ignore: Unreachable code error
  if (e.target && e.target.nodeName === "BUTTON") {
    // @ts-ignore: Unreachable code error
    ipcRenderer.send("open-answer", e.target.getAttribute('answerid'));
  }
});

