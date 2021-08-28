import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    height: 720,
    width: 1280,
    frame: false,
    webPreferences: {
      webSecurity: false,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile(join(__dirname, './index.html'));
  win.webContents.toggleDevTools();
};

app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
