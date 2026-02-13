// Wrapper pour utiliser electron-store via IPC
export const promptStore = {
  
  async getAll() {
    return await window.api.store.getPrompts()
  },

  async add(promptData) {
    return await window.api.store.addPrompt(promptData)
  },

  async update(id, promptData) {
    return await window.api.store.updatePrompt(id, promptData)
  },

  async delete(id) {
    return await window.api.store.deletePrompt(id)
  }
}

export const settingsStore = {
  
  async getTheme() {
    return await window.api.store.getTheme()
  },

  async setTheme(theme) {
    return await window.api.store.setTheme(theme)
  }
}