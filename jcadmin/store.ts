
import { defineStore, Pinia } from 'pinia'
import { ref, Ref } from 'vue'
import { useBase64 } from '@vueuse/core'

/**定义content部分视图类型和类型值*/
export const viewStore = defineStore(
{
  id:'view',
  state:() => ({
    currentPage:{},    // 当前的页面路由
    activeIndex:-2,    // 当前页面索引    
    historyPages:[],   // 历史打开的页面
  }),

  getters:{
    history(state){
    const _:any[] = [];
    for(const i in state.historyPages){
      const record = state.historyPages[i];
      
      if(this.activeIndex !== parseInt(i)){
        
        (record as any)['active'] = false;
      }
      else{
        (record as any)['active'] = true;
      }
      (record as any)['index'] = parseInt(i)
      _.push(record)
    }
    return _
    }
  },

  actions:{
    /**打开一个新页面 */
    pushPage(pageRoute: Record<string,any>){
      if(this.historyPages.length!==0){
        let _ = true;
        for(const i in this.historyPages){
          if((this.historyPages[i] as any).path === pageRoute.path){
            _ = false; // 已经存在，无需再次插入
            this.activeIndex = parseInt(i); // 但需要设置当前页面索引为该存在页面的索引
            break;
          }
        }
        if(_){
          (this.historyPages as Record<string,any>[]).push(pageRoute);
          this.activeIndex = this.historyPages.length-1;
        }
      }
      else{
        this.activeIndex = 0;
        (this.historyPages as Record<string, any>[]).push(pageRoute);
      }
      localStorage.setItem('JCADMIN-historyPages',JSON.stringify(this.historyPages));
      localStorage.setItem('JCADMIN-activeIndex',this.activeIndex.toString());
    },

    setActive(index:number){
      this.activeIndex = index;
    },

    /**关闭一个已经打开的页面 */
    closeTab(tab: any,router:any){
      // 只有一条记录
      if(this.historyPages.length===1){
        router.push({path: "beginning", title: "JSCtdio", icon: "jcicon-home"});
        this.historyPages.pop();
        this.activeIndex = -2;
      }
      // 多条记录
      else{
        const _ = [] as any;
        for(const i in this.historyPages){
          if(this.historyPages[i]!==tab){
            _.push(this.historyPages[i]);
          }
        }
        this.activeIndex = this.activeIndex-1; // 指向原活动页面的前一页
        this.historyPages = [..._] as any;
      }

      localStorage.setItem('JCADMIN-historyPages',JSON.stringify(this.historyPages));
      localStorage.setItem('JCADMIN-activeIndex',this.activeIndex.toString());
    },

    /**点击一个标签，跳转标签对应的路由 */
    clickTab(tab: any,router:any){
      this.activeIndex = tab.index;
      localStorage.setItem('JCADMIN-activeIndex',this.activeIndex.toString());
      localStorage.setItem('JCADMIN-historyPages',JSON.stringify(this.historyPages));
      router.push(tab.path);
    },

    /**交换活动页标签 */
    exchangeActiveTab(index1:number,index2:number){
      // 交换活动页索引
      if(this.activeIndex===index1){
        this.activeIndex = index2;
      }
      else{
        this.activeIndex = index1;
      }

      // 最后存储
      localStorage.setItem('JCADMIN-historyPages',JSON.stringify(this.historyPages));
      localStorage.setItem('JCADMIN-activeIndex',this.activeIndex.toString());
    }
  }
})

// 用于iframe页面的更新
export const iframeStore = defineStore({
  id:'ifrmeDict',
  state:()=>({
    iframDict:{} as any
  }),
  actions:{
    setRecord(nodeId:string, record:any){
      this.iframDict[nodeId] = record;
    }
  }
}) 

function initialization(){
  viewStore()
  let historyPages = localStorage.getItem("JCADMIN-historyPages");
  const activeIndex = localStorage.getItem("JCADMIN-activeIndex");
  const isMini = localStorage.getItem("JCADMIN-isMini");
  if(historyPages){
    historyPages = JSON.parse(historyPages);
    viewStore().historyPages = historyPages as any;
  }
  if(activeIndex){
    viewStore().setActive(parseInt(activeIndex))
  }
  if(isMini){
    isMini
  }
  // viewStore().historyPages = 
}


export function setupAdminSrore(pinia: Pinia):void{
  // 需要传入一个pinia实例，该实例由 createPinia 进行创建
  viewStore(pinia);
  iframeStore(pinia);
  
  initialization()
  
}
