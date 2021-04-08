const { ipcRenderer } = require("electron");

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
    questionContainer.appendChild(btn);
  }
})

questionContainer.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "BUTTON") {
    ipcRenderer.send("open-answer", e.target.getAttribute('answerid'));
  }
});
