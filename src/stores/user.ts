import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
        token: "",
        cart: [],
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
  },
  persist: true,
})
