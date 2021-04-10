// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow:BrowserWindow | undefined = undefined;
let childWindow:BrowserWindow | undefined = undefined;
let isAppQuitting:boolean = false;

function initialize() {
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
    // mainWindow.webContents.openDevTools();

    createChildwindow(mainWindow);
    // childWindow!.webContents.openDevTools();

    // Attach IPC event
    ipcMain.on("open-answer", (event :Event, arg :any) => {
      if (childWindow === null || childWindow === undefined) {
        console.log("child");
        createChildwindow(mainWindow);
      }
      childWindow!.show();
      childWindow!.webContents.send("show-answer", arg);
    });

    mainWindow.on('close', () => {
      console.log('mainWindow closing...')
      isAppQuitting = true;
    });
    mainWindow.on("closed", () => {
      console.log('mainWindow closed...')
      mainWindow = undefined;
    });

    childWindow!.on('close', (event:Event) => {
      if(!isAppQuitting){
        console.log('childWindow hiding...')
        event.preventDefault();
        childWindow!.hide();
      } else {
        console.log('childWindow closing...')
      }
    });
    childWindow!.on('closed', () => {
      console.log('childWindow closed...')
      childWindow = undefined;
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
    console.log("== App quit ==");
  });

  app.on("before-quit", function () {
    isAppQuitting = true;
    console.log('quitting...')
  });
}

function createChildwindow(parentWindow:BrowserWindow | undefined) {
  isAppQuitting = false;
  childWindow = new BrowserWindow({
    width: 400,
    height: 320,
    parent: parentWindow,
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
