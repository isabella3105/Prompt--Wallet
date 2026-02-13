const { app, shell, BrowserWindow, ipcMain, Menu } = require('electron')
const { join } = require('path')
const { electronApp, optimizer, is } = require('@electron-toolkit/utils')
const Store = require('electron-store')

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

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
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

// Créer le menu avec raccourcis
function createMenu() {
  const template = [
    {
      label: 'Prompt',
      submenu: [
        {
          label: 'List',
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate-to', 'dashboard')
            }
          }
        },
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate-to', 'form')
            }
          }
        }
      ]
    },
    {
      label: 'Info',
      submenu: [
        {
          label: 'Terms of Use',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate-to', 'terms')
            }
          }
        },
        {
          label: 'About',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate-to', 'about')
            }
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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

  createMenu()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})