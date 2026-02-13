const { contextBridge, ipcRenderer } = require('electron')
const { electronAPI } = require('@electron-toolkit/preload')

// API personnalisée pour le store
const api = {
  store: {
    getPrompts: () => ipcRenderer.invoke('store:getPrompts'),
    addPrompt: (promptData) => ipcRenderer.invoke('store:addPrompt', promptData),
    updatePrompt: (id, promptData) => ipcRenderer.invoke('store:updatePrompt', id, promptData),
    deletePrompt: (id) => ipcRenderer.invoke('store:deletePrompt', id),
    getTheme: () => ipcRenderer.invoke('store:getTheme'),
    setTheme: (theme) => ipcRenderer.invoke('store:setTheme', theme)
  }
}

// Exposer les APIs au renderer process
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}