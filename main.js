// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;
let childWindow = null;
let isAppQuitting = false;

function initialize() {
  // require('./main-process/ipc-message');

  function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });
    mainWindow.loadFile("index.html");
    mainWindow.webContents.openDevTools();

    createChildwindow();
    childWindow.webContents.openDevTools();

    ipcMain.on("open-answer", (event, arg) => {
      if (childWindow === null) {
        console.log("child");
        createChildwindow();
      }
      childWindow.show();
      childWindow.webContents.send("show-answer", arg);
    });

    mainWindow.on("closed", () => {
      console.log('mainWindow closed...')
      mainWindow = null;
      isAppQuitting = true;
      childWindow.close();
      childWindow = null;
    });

    childWindow.on('close', (event) => {
      if(!isAppQuitting){
        console.log('childWindow hiding...')
        event.preventDefault();
        childWindow.hide();
      }
    })
  }

  app.whenReady().then(() => {
    createWindow();
    console.log("== App ready ==");
    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
    console.log("app quit");
  });

  app.on("before-quit", function () {
    console.log('quitting...')
    isAppQuitting = true;
  });
}

function createChildwindow() {
  childWindow = new BrowserWindow({
    width: 400,
    height: 320,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    show: false,
  });
  childWindow.loadFile("modal.html");
}

initialize();
