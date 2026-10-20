const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true }
  });

  win.on('ready-to-show', () => {
    win.maximize();
    win.show();
  });

  if (app.isPackaged) {
    win.loadFile('./dist/index.html');
  } else {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow);
