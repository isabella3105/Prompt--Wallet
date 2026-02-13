const { app, shell, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')
const { electronApp, optimizer, is } = require('@electron-toolkit/utils')
const Store = require('electron-store').default || require('electron-store')
// Initialiser electron-store
const store = new Store({
  name: 'prompt-wallet-data',
  defaults: {
    prompts: [],
    settings: {
      theme: 'dark'
    }
  }
})

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // ========== IPC Handlers pour le store ==========
  
  ipcMain.handle('store:getPrompts', () => {
    return store.get('prompts', [])
  })

  ipcMain.handle('store:addPrompt', (_, promptData) => {
    const prompts = store.get('prompts', [])
    const newPrompt = {
      ...promptData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    prompts.push(newPrompt)
    store.set('prompts', prompts)
    return newPrompt
  })

  ipcMain.handle('store:updatePrompt', (_, id, promptData) => {
    const prompts = store.get('prompts', [])
    const index = prompts.findIndex(p => p.id === id)
    
    if (index !== -1) {
      prompts[index] = {
        ...prompts[index],
        ...promptData,
        updatedAt: new Date().toISOString()
      }
      store.set('prompts', prompts)
      return prompts[index]
    }
    return null
  })

  ipcMain.handle('store:deletePrompt', (_, id) => {
    const prompts = store.get('prompts', [])
    const filtered = prompts.filter(p => p.id !== id)
    store.set('prompts', filtered)
    return true
  })

  ipcMain.handle('store:getTheme', () => {
    return store.get('settings.theme', 'dark')
  })

  ipcMain.handle('store:setTheme', (_, theme) => {
    store.set('settings.theme', theme)
    return theme
  })

  // ========== Fin IPC Handlers ==========

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})