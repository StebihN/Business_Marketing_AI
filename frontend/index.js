const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const ipc = ipcMain

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 960,
    minHeight: 540,
    maxWidth: 1920,
    maxHeight: 1080,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL(`${app.getAppPath()}\\build\\index.html`);


  ipc.on('closeApp', () => {
    console.log("closing")
    if (process.platform !== 'darwin') {
      mainWindow.close()
    }
  })

  ipc.on('windowApp', () => {
    console.log("windowing")
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  })

  ipc.on('minimizeApp', () => {
    console.log("minimizing")
    mainWindow.minimize()
  })

  ipc.on('done', () => {
    console.log('fetch complete')
    const noti = new Notification({
      title: 'Generiranje uspešno',
      body: 'Generiranje uspešno'
    })
    noti.show();
  })
});

