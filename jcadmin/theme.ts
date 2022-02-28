import { useDark } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const isDark = useDark(
  {
    selector: 'body',
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light'
  }
)

export const themeStore = defineStore({
  id:'theme-store',
  state:()=>({
    storageID:"jcadmin-color-scheme",
    isDark: ref("auto")
  }),

  getters:{
    value:(state)=>{
      if(state.isDark==="auto") {return false}
      else {return true}
    }
  },

  actions:{
    init(){
      if(!window.localStorage.getItem(this.storageID)){
        localStorage.setItem(this.storageID,this.isDark)
      }else{
        this.isDark = window.localStorage.getItem(this.storageID) as string
      }
    },

    useStorageKey(key:string){
      this.storageID = key
    },
    
    toggle(){
      if(this.isDark==="auto"){
        this.isDark = "dart";
      }else{
        this.isDark = "auto"
      }
      window.localStorage.setItem(this.storageID,this.isDark)
    },
  }
}) 