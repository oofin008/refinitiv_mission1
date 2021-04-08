const { ipcRenderer } = require('electron');

async function getAnswer(id) {
  let data = {};
  const result = await window.fetch(`http://localhost:3000/getanswer/${id}`);
  data = await result.json();
  return data.data;
}

ipcRenderer.on('show-answer', (event, arg) => {
  getAnswer(arg).then(result => {
    const message = `Answer id: ${result.id} data: ${result.answer}`
    document.getElementById('modal-message').innerHTML = message;
  }).catch(() => {
    const message = `Error occured, something went wrong`;
    document.getElementById('modal-message').innerHTML = message;
  })
})
