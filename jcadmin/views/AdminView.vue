
<template>
<UseColorMode v-slot="{ mode }">
<UseDark v-slot="{ isDark, toggleDark }">
<UsePreferredLanguages v-slot="{ languages }">
<div class="viewport">
  <!-- 头 -->
  <div :class="{
    'header':true,
    'header-dark': isDark,
    'header-light':!isDark
  }">
    <!-- 头部-左 -->
    <div class="header-left">
      <!-- 商标 -->
      <div class="logo-box">
        <component 
          :refDark="isDark" 
          :is="logoBox"
        ></component>
      </div>
      
      <!-- 控制按钮 -->
      <div 
        id="mini" 
        :class="{
          'mini': 'true',
          'mini-dark': isDark,
          'mini-light': !isDark,
        }" 
        @click="miniClick()" 
        style="border-bottom:1px solid rgba(255,255,255,.1)"
      >
        <jc-icon v-if="mini" name="jcicon-toggle-left"></jc-icon>
        <jc-icon v-else name="jcicon-toggle-right"></jc-icon>
      </div>

    </div>
    <!-- 头部-右 -->
    <div class="header-right">
      <!-- 面包屑导航 -->
      <div class="header-right-item-3 crumbs-nav">
        <!-- <div :class="{'crumb':true,'crumb-dark':isDark,'crumb-light':!isDark}">
          <div class="crumb-title">
            一级目录
            <div class="crumb-menu"></div>
          </div>
          <jc-icon name="jcicon-down"></jc-icon>
        </div> / 
        <div :class="{'crumb':true,'crumb-dark':isDark,'crumb-light':!isDark}">
          <div class="crumb-title">
            二级目录
            <div class="crumb-menu"></div>
          </div>
          <jc-icon name="jcicon-down"></jc-icon>
        </div> / 
        <div :class="{'crumb':true,'crumb-dark':isDark,'crumb-light':!isDark}">
          <div class="crumb-title">
            三级目录
            <div class="crumb-menu"></div>
          </div>
          <jc-icon name="jcicon-down-bold"></jc-icon>
        </div> -->
      </div>

      <div :class="{
          'header-right-item-3':true, 
          'time-box':true,
          'time-box-dark':isDark,
          'time-box-light':!isDark,
        }">
        <jc-icon :class="{'time-box-icon':true}" name="jcicon-time"></jc-icon>
        <div :class="{'time-box-text':true,}" >{{ time }}</div>
      </div>

      <!-- 主题控制工具 -->
      <div class="header-right-item-3 dark-switch-box">
        <!-- 主题控制开关 -->
        <jc-switch class="dark-switch"  @click="toggleDark()"></jc-switch>
        <div class="them-text dart" v-if="isDark">暗黑主题</div>
        <div class="them-text light" v-else >光亮主题</div>
        <div class="lang">语言：{{languages[0]}}</div>
      </div>
    </div>
  </div>

  <!-- 主体 -->
  <div class="main-box">
    <!-- 边栏 -->
    <SideBar :refDark="isDark" ref="sideBarRef" :adminPath="adminPath" :urlPatterns="urlPatterns" />
    
    <!-- 拖动器 -->
    <div :class="{
      'tuner':true, 
      'tuner-dark': isDark,
      'tuner-light': !isDark,
    }" ></div>
    <!-- 内容区 -->
    <div 
      ref="domFull"  
      id="contents" 
      class="contents">
      <!-- 页面标签栏(TabsBar) -->
      <ul :class="{
          'tab-bar':true,
          'tab-bar-dart':isDark,
          'tab-bar-light':!isDark
          }" 
          @dragover="tabDragOver($event)" 

          id="print"
        >
        <!-- 页面标签们 -->
        <li 
            v-for="(tab, index) of viewStore().history" 
            :key="index" 

            :class="{
              'tab':true,
              'tab-plain-dart':isDark,
              'tab-plain-light':!isDark,
              'tab-active-dart':isDark && tab.active,
              'tab-active-light':!isDark && tab.active
            }" 
            
            draggable="true" 
            @dragstart="tabDragStart(tab,index,$router)" 
            @dragenter="tabDragenter(tab,$event)" 
            @dragover="tabDragOver($event)" 
            @dragend="tabDragEnd()" 

            @click="clickTab(tab,$router)"
          >
          <jc-icon 
            :class="['tab-icon',{'tab-icon-dark':isDark,'tab-icon-light':!isDark}]" 
            v-if="tab.icon" 
            :name="tab.icon" 
          ></jc-icon>

          <div class="tab-title">{{tab.title}}</div>
          <jc-icon 
            :class="{
              'tab-closeBt':true,
              'tab-closeBt-dart':isDark,
              'tab-closeBt-light':!isDark,
            }" 
            name="jcicon-window-close" 
            @click="closeTab(tab,$router)"
            @click.stop="clickTab"
          ></jc-icon>
        </li>

        <!-- 控制工具盒 -->
        <li :class="{
          'tools-box':true,
          'tools-dark':isDark,
          'tools-light':!isDark,
        }">

          <!-- 后退工具 -->
          <!-- <div class="item">
            <jc-icon class="item" name="jcicon-arrow-left2" ></jc-icon>
            <div class="tip" >后退</div>
          </div> -->

          <!-- 前进工具 -->
          <!-- <div class="item">
            <jc-icon class="item" name="jcicon-arrow-right2" ></jc-icon>
            <div class="tip" >前进</div>
          </div> -->

          <!-- 刷新工具 -->
          <!-- <div class="item">
            <jc-icon class="item" name="jcicon-shuaxin" ></jc-icon>
            <div class="tip" >刷新</div>
          </div> -->

          <!-- 截图工具 -->
          <div @click="printScreen()" class="item">
            <jc-icon  name="jcicon-PrtSc"></jc-icon>
            <div class="tip">截图</div>
          </div>
          
          <!-- 打印工具 -->
          <div class="item">
            <jc-icon 
              class="item" 
              name="jcicon-print"
              tip="打印"
              @click="print()"
            ></jc-icon>
            <div class="tip">打印</div>
          </div>

          <!-- 全屏工具 -->
          <div class="item">
            <jc-toggle
              class="item"
              negative="jcicon-fullscreen-expand"
              positive="jcicon-fullscreen-shrink"
              @click="toggleFull()"
            />
            <div class="tip fullSc">全屏切换</div>
          </div>

          <div class="item">
            <jc-icon
              name="jcicon-more" 
            ></jc-icon>
            <div class="tip more">更多操作...</div>
          </div>
          
        </li>
        

      </ul>
      <!-- 子视图 -->
      <router-view 
        v-slot="{ Component }"
        :refDark="isDark"
        :refColorMode="mode"
        :icon=icon
      >
          <transition
            name="jcadminChildPage"
            enter-active-class="animate__animated animate__backInDown"
            leave-active-class="animate__animated animate__backOutDown"
          >
            <component 
              :is="Component" 
              :class="{
                'jcadmin-childPage': true,
                'jcadmin-childPage-dark': isDark,
                'jcadmin-childPage-light':! isDark,
            }" />
          </transition>
      </router-view>
    </div>
  </div>
  <!-- <div class="back-to-top">
    <jc-icon name="jcicon-top"></jc-icon>
  </div> -->
</div>
</UsePreferredLanguages>
</UseDark>
</UseColorMode>
</template>

<script lang="ts">

import 'animate.css'; 
import {getCurrentInstance} from 'vue'
import { defineComponent,  ref } from 'vue'
import { viewStore } from '../store';

import { isDark } from '../theme';
import { 
  UseDark,UseColorMode,
  UsePreferredLanguages
} from '@vueuse/components'

import SideBar from './components/SideBar.vue'

import html2canvas from 'html2canvas'

import { computed, reactive } from 'vue-demi'
import { 
  useColorMode,
  useFullscreen,
  useFavicon,
  useEventListener,
  useElementByPoint, 
  useElementBounding,
  useMouse
  // usePreferredLanguages, 
} from '@vueuse/core'

export default defineComponent({
  components:{ 
    SideBar,
    UseColorMode,
    UseDark,
    UsePreferredLanguages
  },

  props:{
    urlPatterns: Object,
    adminPath:{
      type:String,
      default:'admin'
    },
    LogoBox: Object,
  },

  setup(props) {
    const logoBox = props.LogoBox as any;
    const mode = useColorMode({
      attribute: 'theme',
      modes: {
        // custom colors
        dim: 'dim',
        cafe: 'cafe',
      },
    })
    const type = "component";
    const { proxy } = getCurrentInstance() as any;

    let {historyPages} = viewStore();
    let draggedTab =  null as any;  // 被拖动的节点
    let targetTab = null as any;    // 拖动到的目标节点
    
    let mini = ref(false);

    const domFull = ref<HTMLElement | null>(null);
    const { isFullscreen, enter, exit, toggle } = useFullscreen(domFull);
    let time = ref('');

    
    const source = ref('../images/favicon-64.ico');
    const icon = useFavicon(source);
    return {
      mode,
      proxy,
      mini,
      isDark,
      type,
      logoBox,
      viewStore,
      historyPages,
      draggedTab,
      targetTab,
      domFull, isFullscreen, enter, exit, toggle,
      time,
      icon
    }
  },
  
  methods:{
    miniClick(){
      this.mini = !this.mini;
      this.proxy.$refs.sideBarRef.miniClick();
    },

    // 开始拖拽时 获取被拖拽元素
    tabDragStart(tab: any, index:number,router:any){
      this.draggedTab = tab;
      viewStore().setActive(index);
      viewStore().clickTab(tab,router);
    },

    // 记录移动过程中 信息
    tabDragenter(tab:any, payload: DragEvent){
      this.targetTab = tab;
      payload.preventDefault();
    },
    
    // 移动结束
    tabDragEnd(){
      // 交换页面标签位置
      if(this.draggedTab !== this.targetTab){
        const oldIndex = (this.historyPages as any).indexOf(this.draggedTab);
        const newIndex = (this.historyPages as any).indexOf(this.targetTab);
        const _ = this.historyPages[newIndex]
        this.historyPages[newIndex] = this.historyPages[oldIndex];
        this.historyPages[oldIndex] = _;

      // 如果标签中有当前页（活动页），则交换活动页序号
      viewStore().exchangeActiveTab(newIndex,oldIndex)
      }
    },

    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    tabDragOver(payload: DragEvent){payload.preventDefault();},

    // 打印
    print(){
      window.print();
    },
    
    // 全屏切换
    toggleFull(){this.toggle()},

    // 截图
    printScreen(){
      const { x, y } = useMouse({ type: 'client' })
      const { element } = useElementByPoint({ x, y });
      // const dom = element.value as HTMLElement;
      const dom = document.getElementById('contents') as HTMLElement;

      html2canvas(
        dom,
        {
          backgroundColor:null,//画出来的图片有白色的边框,不要可设置背景为透明色（null）
          useCORS: true,//支持图片跨域
          scale:1,//设置放大的倍数
        }
      )
      .then(canvas => {
        //截图用img元素承装，显示在页面的上
        let img = new Image();
        img.src = canvas.toDataURL('image/jpeg');// toDataURL :图片格式转成 base64
        //  document.getElementById('test').appendChild(img);
    
        //如果你需要下载截图，可以使用a标签进行下载
        const a = document.createElement('a');
        a.href = img.src;
        a.download = this.getTime();
        a.click();
      })
    },

    // 点击页面标签以切换页面
    clickTab( tab: any,router:any){
      viewStore().clickTab(tab,router);
    },

    // 关闭页面标签以关闭页面，需要阻止事件冒泡到父组件的点击事件
    closeTab(tab: any,router:any){
      viewStore().closeTab(tab,router);
    },

    // 获取时间
    getTime(){
      return new Date(new Date().getTime() + 8 * 3600 * 1000).toJSON().substring(0, 19).replace('T', ' ');
    }


  },

  mounted(){
    setInterval(() => {
      this.time = this.getTime().toString();
    }, 1000)



  }
})
</script>

<style lang="scss" scoped>
$header-background-color-dark: #323233;
$header-background-color-light: #E5E5E5;

$tab-bar-color-dart:#252526;
$tab-bar-color-light:#E7EAED;

$tab-plain-color-dart:#2D2D2D;
$tab-plain-color-light:#ffffff;

$tab-active-color-dart:#1E1E1E;
$tab-active-color-light:#0A63C5;

$tools-color-dark:#c9c9c9;
$tools-color-light:#000000;

$tools-background-color-dark:#252526;
$tools-background-color-light:#E7EAED;

$tool-color-hover-dark:#8c8c8c;
$tool-color-hover-light:#65b4df;

$tool-color-active-dark:#1b8800;
$tool-color-active-light:#1b8800;

$tool-icon-size:23px;

$mini-color-dark:#d3d3d3;
$mini-color-light:#000000;

$mini-background-color-dark:#1d1d1d;
$mini-background-color-light:#d8d8d8;


$tab-closeBt-dart-fontColor: #919191;
$tab-closeBt-light-fontColor: #dcdcdc;

$tab-closeBt-dart-bgColor: #e6e6e6;
$tab-closeBt-light-bgColor: #000000;

// contents 背景色
$contents-background-color-dark: #252526;
$contents-background-color-light: #F3F3F3;

.viewport{
  margin: 0;
  padding: 0;
  border: 0;
  height:100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 956px;
  // position:fixed;
  .header{
    // position:fixed;
    display: flex;
    width: 100%;
    height: 37px;
    padding-left:9px;
    &.header-dark{
      background-color: $header-background-color-dark;
    }
    &.header-light{
      background-color: $header-background-color-light;
    }

    // 头部-左
    .header-left{
      // background-color: #ffb4b4;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-around;
      min-width: 260px;
      padding: 0;
      margin: 0;
      .logo-box{
        // background-color: #575757;
        padding: 0;
        margin: 0;
        width: 100%;
        overflow: hidden;
      }
      .mini{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        font-size: 30px;
        margin: auto;
        left: 230px;
        border-bottom: #576164 solid 1px;
        &.mini-dark{
          color: $mini-color-dark;
          &:hover{
            background-color: $mini-background-color-dark;
          }
        }
        &.mini-light{
          color:$mini-color-light;
          &:hover{
            background-color: $mini-background-color-light;
          }
        }
      }
    }
    // 头部-右
    .header-right{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .header-right-item-3{
        min-width: 260px;
        // border-right: #000000 solid 1px;
        overflow: hidden;
        // 面包屑导航
        &.crumbs-nav{
          width: 46%;
          padding-left: 3px;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: nowrap;
          color: #acacac;
            
          .crumb{
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: nowrap;
            user-select: none;
            margin-left: 6px;
            font-size: 13px;
            color: #727272;
            &>span{
              padding: 1px;
              margin-left: 3px;
              margin-right: 3px;
              
            }

            &.crumb-dark{
              &:hover{
                background-color: #444444;
              }
              &>span{
                &:hover{
                  color: #ffffff;
                  border-radius: 2px;
                }
                &:active{
                  display: flex;
                  justify-content: center;
                  background-color: #8c8c8c;
                }
              }
            }

            &.crumb-light{
              color:rgb(28, 28, 28);
              &:hover{
                background-color: #ffffff;
              }
              &>span{
                &:hover{
                  color: #006844;
                  border-radius: 2px;
                }
                &:active{
                  display: flex;
                  justify-content: center;
                  background-color: #8c8c8c;
                }
              }
            }
          }
        }
        // 时间盒子
        &.time-box{
          width: 39%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          &.time-box-dark{
            color: #d1d1d1;
            .time-box-icon{
              padding-right: 6px;
              font-weight: bold;
            }
            .time-box-text{
              font-size: 15px;
              font-weight: bold;
            }
          }
          &.time-box-light{
            color: #2b2b2b;
            .time-box-icon{
              padding-right: 6px;
              font-weight: bold;
            }
            .time-box-text{
              font-weight: bold;
              font-size: 15px;
            }
          }
          
        }
        // 工具区
        &.dark-switch-box{
          width: 17%;
          display: flex;
          flex-direction: row;
          .dark-switch{
            padding: 0;
            margin: 0;
          }
          .them-text{
            width: 90px;
            white-space: nowrap;
            text-align: center;
            &.dart{
              color:#6d6d6d
            }
            &.light{
              color:#000000
            }
          }
          .lang{
            // font-size: smaller;
          }
        }
      }
    }    
  }
  .main-box{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    // position:fixed;
    .tuner{
      height: 100%;
      width: 3px;
      
      cursor: w-resize;
      &.tuner-dark{
        background-color: $tab-bar-color-dart;
      }
      &.tuner-light{
        background-color: $tab-bar-color-light;
      }
      &:hover{
        width: 2px;
        background-color: #006de1;
      }
    }
    .contents{
      height: 100%;
      width: 100%;
      .tab-bar{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        &.tab-bar-dart{
            background-color: $tab-bar-color-dart;
        }
        &.tab-bar-light{
          background-color: $tab-bar-color-light;
        }
        .tab{
          list-style: none;
          font-size: 12px;
          width: auto;
          height: 90%;
          user-select:none;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          padding-left: 9px;
          padding-right: 9px;
          margin-right: 1px;
          // 普通标签样式
          &.tab-plain-dart{background-color: $tab-plain-color-dart;}
          &.tab-plain-light{background-color: $tab-plain-color-light;}
          // 激活标签样式
          &.tab-active-dart{
            background-color: $tab-active-color-dart;
            .tab-closeBt{opacity: 1;}
          }
          &.tab-active-light{
            background-color: $tab-active-color-light;
            .tab-closeBt{opacity: 1;}
          }
          
          &:hover{
            .tab-closeBt{opacity: 1;}
          }
          .tab-icon{
            padding-right: 6px;
            &.tab-icon-dark{
              color:#079cff;
            }
            &.tab-icon-light{
              color:#a4a700;
            }
          }
          .tab-title{
            white-space: nowrap;
            color: #65df8e;
          }
          
          .tab-closeBt{
            opacity: 0;
            margin-top: 1px;
            margin-left: 4px;
            border-radius: 20%;
            
            &.tab-closeBt-dart{
              color: $tab-closeBt-dart-fontColor;
              &:hover{
                opacity: 1;
                background-color: $tab-closeBt-dart-bgColor;
              }
            }
            &.tab-closeBt-light{
              color: $tab-closeBt-light-fontColor;
              &:hover{
                opacity: 1;
                background-color: $tab-closeBt-light-bgColor;
              }
            }
            
          }
        }
        .tools-box{
          display: flex;
          flex-direction: row;
          position: absolute;
          margin: 0;
          right: 0px;
          padding: 0px;
          .item{
            padding: 0;
            margin: 0;
            position: relative;
            display:inline-flex;
            justify-content: center;
            align-items: center;
            height: $tool-icon-size;
            width: $tool-icon-size;
            .tip{
              visibility: hidden;
              position: absolute;
              background-color: #576164;
              color: #ffffff;
              text-align: center;
              border-radius: 6px;
              padding: 3px 5px;
              font-size: 16px;
              white-space: nowrap;
              
              /* 定位 */
              z-index: 1;
              top: 119%;
              left: 50%;
              margin-left: -26px;
              &.fullSc{
                margin-left: -46px;
              }
              &.more{
                margin-left: -77px;
              }
            }
            &:hover .tip {
              visibility: visible;
            }
          }
          
          &.tools-dark{
            color:$tools-color-dark;
            background-color: $tools-background-color-dark;
            .item{
              background-color: $tools-background-color-dark;
              &:hover{
                background-color: $tool-color-hover-dark;
              }
              &:active{
                color: $tool-color-active-dark;
              }
            }
            
          }
          &.tools-light{
            color:$tools-color-light;
            background-color: $tools-background-color-light;
            .item{
              background-color: $tools-background-color-light;
              &:hover{
                background-color: $tool-color-hover-light;
              }
              &:active{
                color: $tool-color-active-light;
              }
            }
          }
          
        }
      }
      .jcadmin-childPage{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        &.jcadmin-childPage-dark{
          background-color: $contents-background-color-dark;
          &::-webkit-scrollbar {
            // 滚动条整体样式
            width: 7px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 3px;
          }
          &::-webkit-scrollbar-thumb {
            // 滚动条里面小方块
            border-radius: 3px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #040404;
          }
          &::-webkit-scrollbar-track {
            // 滚动条里面轨道
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 1px;
            background: #e4e4e4;
          }
        }
        &.jcadmin-childPage-light{
          background-color: $contents-background-color-light;
          &::-webkit-scrollbar {
            // 滚动条整体样式
            width: 7px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 3px;
          }
          &::-webkit-scrollbar-thumb {
            // 滚动条里面小方块
            border-radius: 3px;
            box-shadow: inset 0 0 5px #e2e2e2;
            background: #525252;
          }
          &::-webkit-scrollbar-track {
            // 滚动条里面轨道
            box-shadow: inset 0 0 5px #969696;
            border-radius: 1px;
            background: #ffffff;
          }
        }
      }
    }
  } 
}
.back-to-top{
  position: fixed;
  // top:90px;
  bottom: 30px;
  right: 30px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #1b8800;
  color: #ffffff;
  font-size: 30px;
  font-weight:bolder;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover{
    background-color: #27c400;
    cursor: pointer;
  }
}
</style>