const { ipcRenderer } = require("electron");

console.info("preload - async-msg load success");

window.addEventListener("DOMContentLoaded", () => {
  const asyncMsgBtn = document.getElementById("new-window");
  asyncMsgBtn.addEventListener("click", () => {
    console.log('*-- clicked');
    ipcRenderer.send('asynchronous-message', "ping");
  });

  ipcRenderer.on('asynchronous-reply', (event, arg) => {
    const message = `Asynchronous message reply: ${arg}`;
    document.getElementById("async-reply").innerHTML = message;
    console.log('*-- async reply => ', message);
  });
});
