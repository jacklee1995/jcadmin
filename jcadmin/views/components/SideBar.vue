<template>
<div :class="{
    'nav':true, 
    'nav-expand':!mini,
    'sidebar-mini':mini,
    'nav-dark':isDark,
    'nav-light':!isDark,
  }"
>
  <ul>
      <!-- 一级目录 -->
      <li 
        :class="{
          'sidemenu1': true,
          'sidemenu1-dark':isDark,
          'sidemenu1-light':!isDark,
        }" 
        v-for="(menu1, i1) in navTree" 
        :key="i1" 
      >

        <!-- 一级目录的标签们 -->
        <!-- 无子目录，自身就是导航按钮 -->
        <router-link 
            v-if="Object.keys(menu1.child).length===0" 
            :to="{
              path:i1.toString(),
              
            }" 
            @click="pushRouterRecode(menu1)"
          >
          <!-- 一级目录图标（如果有） -->
          <jc-icon 
            v-if="menu1.icon"
            :class="{
              'sidemenu1-icon':true,
              'sidemenu1-icon-dark':isDark,
              'sidemenu1-icon-light':!isDark
            }" 
            :name="menu1.icon"
          ></jc-icon>
          <!-- 一级目录标题文字 -->
          <span
            :class="{
              'sidemenu1-text':true,
              'sidemenu1-text-dark':isDark,
              'sidemenu1-text-light':!isDark,
              'hide':mini
            }"
          >{{menu1.title}}
          </span>
        </router-link>

        <!-- 有子目录，自身不是导航按钮 -->
        <a v-else  >
          <!-- 一级目录图标（如果有） -->
          <jc-icon
            v-if="menu1.icon"
            :class="{
              'sidemenu1-icon':true,
              'sidemenu1-icon-dark':isDark,
              'sidemenu1-icon-light':!isDark
            }" 
            :name="menu1.icon"  
          ></jc-icon>
          <!-- 一级目录标题文字 -->
          <span 
            :class="{
              'sidemenu1-text':true,
              'sidemenu1-text-dark':isDark,
              'sidemenu1-text-light':!isDark,
            }"
          >{{menu1.title}}
          </span>
          <!-- 一级目录的展开箭头，有两个可切换方向 -->
          
          <jc-icon 
            v-if="(menu1).child!={}" 
            :class="{
              'sidemenu1-open-button': true,
              'sidemenu1-open-button-dark': isDark,
              'sidemenu1-open-button-light': !isDark,
              'hide':mini
            }" 
            name="jcicon-down-bold" 
            size=10
          ></jc-icon>
        </a>
        
  
        <ul :class="{
            'sidemenu1-subs':true,
            'sidemenu1-subs-dark': isDark,
            'sidemenu1-subs-light': !isDark,
            'hide':mini
          }"
        >

          <!-- 二级目录 -->
          <li 
            :class="{
              'sidemenu2':true,
              'sidemenu2-dark':isDark,
              'sidemenu2-light':!isDark,
              'hide':mini
            }" 
            v-for="(menu2, i2) in menu1.child" 
            :key="i2" 
          >
            <!-- 无子目录，自身就是导航按钮 -->
            <router-link 
                v-if="Object.keys(menu2.child).length===0" 
                :to="{
                  path:i2.toString(),
                  
                }"
                @click="pushRouterRecode(menu2)"
              >
              <span
                :class="{
                  'sidemenu2-text':true,
                  'sidemenu2-text-dark':isDark,
                  'sidemenu2-text-light':!isDark,
                }"
              >{{menu2.title}}</span>
            </router-link>
            <!-- 有子目录，自身不是导航按钮 -->
            <a v-else ><span
              :class="{
                'sidemenu2-text':true,
                'sidemenu2-text-dark':isDark,
                'sidemenu2-text-light':!isDark,
              }"
            >{{menu2.title}}</span>
              <!-- 二级目录的展开箭头 -->
              <jc-icon 
                name="jcicon-down-bold" 
                v-if="menu2.child!={}" 
                size=10
                :class="{
                  'sidemenu2-open-button': true,
                  'sidemenu2-open-button-dark': isDark,
                  'sidemenu2-open-button-light': !isDark,
                }"
              ></jc-icon>
            </a>

            <ul :class="{
              'sidemenu2-subs-dark':isDark,
              'sidemenu2-subs-light':!isDark
            }">
              <!-- 三级目录 -->
              <li 
                :class="{
                  'sidemenu3':true,
                  'sidemenu3-dark':true,
                  'sidemenu3-light':true,
                  'hide':mini
                }" 
                v-for="(menu3, i3) in menu2.child" 
                :key="i3"
              >
                <router-link 
                  :to="{
                    path:i3.toString(),
                    
                  }"
                  @click="pushRouterRecode(menu3)"
                >
                  <span
                    :class="{
                      'sidemenu3-text':true,
                      'sidemenu3-text-dark':isDark,
                      'sidemenu3-text-light':!isDark,
                    }"
                  >{{menu3.title}}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
  </ul>
</div>


</template>

<script lang="ts">
import {  defineComponent, ref, toRefs } from 'vue';
import $ from 'jquery'
import { viewStore } from '../../store';

export default defineComponent({
  name: 'SideBar',
  props: {
    urlPatterns: Object,
    refDark: Boolean,
    adminPath:{
      type:String,
      default:"admin"
    },
    
  },
  
  setup(props){
    /**视图控制器存储 */
    const urlPatterns = (props as any).urlPatterns
    

    // 建立导航树
    let navTree:any = {};
    for(let i of urlPatterns){
      const nodeIdList = i['path'].split('-');
      
      // 一级目录路由
      if(nodeIdList.length===1){
        navTree[i['path']] = { 
          path:i.path,
          title:i.title, 
          icon:i.icon, 
          child:{} 
        } 
      }
      // 二级目录路由
      else if(nodeIdList.length===2){
        // 先找到其一级目录路由，在一级下插入该二级路由
        (navTree[nodeIdList[0]] as any)['child'][i['path']] = {
          path:i.path,
          title:i.title, 
          icon:i.icon, 
          type:i.type,
          value:i.value, 
          child:{}
        };
        
      }
      // 三级目录路由
      else if(nodeIdList.length===3){
        (navTree[nodeIdList[0]] as any)['child'][nodeIdList[0]+'-'+nodeIdList[1]]['child'][i['path']] =  {
          path:i.path,
          title:i.title, 
          icon:i.icon, 
          type:i.type,
          value:i.value
        };
      }
      else{
        throw Error("AdminRouterLengthError: The length of nodeIdList must be one of {1,2,3}")
      }
    }

    let mini = ref(false);
    let propss = toRefs(props);
    let isDark = propss.refDark;
    return {
      navTree,
      isDark,
      mini,
    }
  },

  methods:{
    // 切换迷你模式
    miniClick(){
      // 不是 mini 模式，则变为 mini 模式，由父组件调用
      this.mini = !this.mini;
      localStorage.setItem('JCADMIN-isMini',JSON.stringify({mini:this.mini}));
    },
    // 点击后增加一条历史路由，主要用作标签
    pushRouterRecode(menu:any){
      viewStore().pushPage({
        'path':menu.path,
        'title':menu.title,
        'icon':menu.icon,
      })
    }
  },

  mounted(){
    // 一级目录（sidemenu1） 收缩-展开
    $('.sidemenu1>a').on('click',function(){
      // 不是 mini 模式时，才需要执行收缩与展开
      if (!$('.nav').hasClass('sidebar-mini')){
        // 展开未展开
        if ($(this).next().css('display') == "none"){
          $('.sidemenu1').children('ul').slideUp(300); // 通过滑动隐藏匹配的元素。
          $(this).next('ul').slideDown(300); // 以滑动方式显示匹配的元素。
          $(this).parent('li').addClass('sidemenu1-show').siblings('li').removeClass('sidemenu1-show');
        }
        // 收缩已展开
        else{
          $(this).next('ul').slideUp(300);
          $('.sidemenu1.sidemenu1-show').removeClass('sidemenu1-show');
        }
      }
    });
    
    // 二级目录（sidemenu2） 收缩展开
    $('.sidemenu2>a').on('click',function(){
        if (!$('.nav').hasClass('sidebar-mini')){
          if ($(this).next().css('display') == "none"){
            // 展开未展开
            $('.sidemenu2').children('ul').slideUp(220);
            $(this).next('ul').slideDown(220);
            $(this).parent('li').addClass('sidemenu2-show').siblings('li').removeClass('sidemenu2-show');
          }else{
            // 收缩已展开
            $(this).next('ul').slideUp(220);
            $('.sidemenu2.sidemenu2-show').removeClass('sidemenu2-show');
          }
        }
    });
  }
});
</script>

<style lang="scss" scoped>

// nav 背景色
$nav-background-color-dark: #1c1c1c;
$nav-background-color-light: #F3F3F3;

// 鼠标移至事件背景色
$sidemenu1-items-hover-Bgcolor-dark: #2A2D2E;
$sidemenu1-items-hover-Bgcolor-light: #B8EDFE;

$sidemenu2-items-hover-Bgcolor-dark: #2A2D2E;
$sidemenu2-items-hover-Bgcolor-light: #B8EDFE;

$sidemenu3-items-hover-Bgcolor-dark: #2A2D2E;
$sidemenu3-items-hover-Bgcolor-light: #B8EDFE;

// 鼠标移至事件文字背景色
$sidemenu1-items-hover-color-dark: #ffffff;
$sidemenu1-items-hover-color-light: #0096ed;

$sidemenu2-items-hover-color-dark: #ffffff;
$sidemenu2-items-hover-color-light: #0096ed;

$sidemenu3-items-hover-color-dark: #ffffff;
$sidemenu3-items-hover-color-light: #0096ed;


// 展开区域背景色
$sidemenu1-backgroung-color-dark: $nav-background-color-dark;
$sidemenu1-backgroung-color-light: $nav-background-color-light;
$sidemenu2-backgroung-color-dark: #1F1F1F;
$sidemenu2-backgroung-color-light:#e4e4e4;
$sidemenu3-backgroung-color-dark: #54545e;
$sidemenu3-backgroung-color-light:#c7c7c7;



// 目录的图片与文字颜色
$sidemenu1-text-dark-iconcolor:#ABB1B7;
$sidemenu1-text-light-iconcolor:#000000;

$sidemenu1-text-dark-fontcolor:#ABB1B7;
$sidemenu1-text-light-fontcolor:#000000;

$sidemenu2-text-dark-fontcolor:#ABB1B7;
$sidemenu2-text-light-fontcolor:#000000;

$sidemenu3-text-dark-fontcolor:#ABB1B7;
$sidemenu3-text-light-fontcolor:#000000;

$sidemenu3-text-dark-color:#ABB1B7;
$sidemenu3-text-light-color:#000000;

// 目录打开标志颜色
$sidemenu1-open-button-color-dark:#ffffff;
$sidemenu1-open-button-color-light:#000000;

$sidemenu2-open-button-color-dark:#ffffff;
$sidemenu2-open-button-color-light:#000000;

ul{margin:0;padding:0}
li{list-style:none} 
a{text-decoration:none;}

/* nav */
.nav{
  // width: 300px;
  transition: all .3s;
  user-select: none;
  overflow: auto;
  // position: fixed;
  height: 100%;
  &.nav-expand{ 
    min-width: 270px; 
  }
  // 用于控制 sidebar 是迷你米模式还是展开模式
  &.sidebar-mini{
    height: 100%;
    &.nav{
      min-width: 50px;
      width: 50px;
      
      .sidemenu1{
        position: relative;
        display: inline-block;
        ul{
          position: absolute;
          top:0px;
          left:60px;
          width: 180px;
          z-index: 99;
          overflow: hidden;
        }

        &:hover{
          background:rgba(255,255,255,.1);
          .sidemenu1 a{
            color:#FFF;
          }
          a:before{
            opacity:1;
          }
          ul{
            display: block;
          }
        }
      }
    }
  }
  &.nav-dark{
    background-color: $nav-background-color-dark;
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
  &.nav-light{
    background-color: $nav-background-color-light;
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
  
  a{
    display: block;
    overflow: hidden;
    padding-left: 20px;
    line-height: 46px;
    max-height: 46px;
    color: #ABB1B7;
    transition: height .3s;
    span{
      margin-left: 30px;
    }
  }
}


// 一级目录（可展开）
.sidemenu1 {
  position: relative;
  cursor: pointer;
  font-size: medium;
  transition-property: height;
  -moz-transition-property: height;   /* Firefox 4 */
  -webkit-transition-property: height; /* Safari 和 Chrome */
  -o-transition-property: height;      /* Opera */
  transition-duration: .3s;
  -moz-transition-duration: .3s; /* Firefox 4 */
  -webkit-transition-duration: .3s; /* Safari 和 Chrome */
  -o-transition-duration: .3s; /* Opera */
  transition-timing-function: linear;
  -moz-transition-timing-function: linear; /* Firefox 4 */
  -webkit-transition-timing-function: linear; /* Safari 和 Chrome */
  -o-transition-timing-function: linear; /* Opera */

  .sidemenu1-text{
    font-weight: bold;
    font-size:16px;
    &.sidemenu1-text-dark{
      color: $sidemenu1-text-dark-fontcolor;
    }
    &.sidemenu1-text-light{
      color: $sidemenu1-text-light-fontcolor;
    }
    &.hide{display: none;}
  }

  .sidemenu1-icon{
    font-size: 19px;
    margin-left:-4px;
    margin-top:12px;
    &.sidemenu1-icon-dark{
      color:$sidemenu1-text-dark-iconcolor;
    }
    &.sidemenu1-icon-light{
      color:$sidemenu1-text-light-iconcolor;
    }
  }

  &.sidemenu1-dark{
    &>a:hover{      

      color: $sidemenu1-items-hover-color-dark;
      background-color: $sidemenu1-items-hover-Bgcolor-dark;
    }
    &:hover{
      border-left: #0096ed solid 3px;
    }
  }

  &.sidemenu1-light{
    &>a:hover{
      color: $sidemenu1-items-hover-color-light;
      background-color: $sidemenu1-items-hover-Bgcolor-light;
    }
    &:hover{
      border-left: #0a27ff solid 3px;
    }
  }

  &.sidemenu1-show{
    .sidemenu1-open-button{
      transform:rotate(180deg);
    }
    border-bottom: none;
    &>a:before{opacity:1;}
    
  }
  .sidemenu1-open-button{
    position: absolute;
    font-size: 10px;
    right:10px;
    top: 18px;
    &.sidemenu1-open-button-dark{
      color: $sidemenu1-open-button-color-dark;
    }
    &.sidemenu1-open-button-light{
      color: $sidemenu1-open-button-color-light;
    }
    &.hide{display: none;}
  }
  

  &>ul{
    display: none;      // 初始进入页面时先为隐藏状态，则其父目录折叠

    &.show-ul1 {
      display: block !important;
    }
    &.sidemenu1-subs{
      &.hide{display: none;}
      &.sidemenu1-subs-dark {
        background-color: $sidemenu2-backgroung-color-dark;
      }
      &.sidemenu1-subs-light{
        background-color: $sidemenu2-backgroung-color-light;
      }
    }
  }

  &>a:before{
    content: "";
    position: absolute;
    left: 0px;
    width: 2px;
    height: 46px;
    opacity:0;
    transition: height .3s;
  }

  &>a{
    display: block;
    text-align: left;
    margin: 0;
  }

  &>a:hover:before{
    opacity:1;
  }
}

// 二级目录（可展开）
.sidemenu2{
  position: relative;
  cursor: pointer;
  &.hide{
    display: none;
  }
  .sidemenu2-text{
    &.sidemenu2-text-dark{
      color:$sidemenu2-text-dark-fontcolor;
    }
    &.sidemenu2-text-light{
      color:$sidemenu2-text-light-fontcolor;
    }
  }
  .sidemenu2-open-button{
    position: absolute;
    font-size: 10px;
    right:10px;
    top: 18px;
    &.sidemenu2-open-button-dark{
      color: $sidemenu2-open-button-color-dark;
    }
    &.sidemenu2-open-button-light{
      color: $sidemenu2-open-button-color-light;
    }
  }
  &.sidemenu2-show{
    border-bottom: none;
    .sidemenu2-open-button{
      transform:rotate(180deg);
    }
    
    &>a:before{
      opacity:1;
    }
    &>ul{
      display: block;
    }
  }
  &.sidemenu2-dark{
    &>a:hover{
      color: $sidemenu2-items-hover-color-dark;
      background-color: $sidemenu2-items-hover-Bgcolor-dark;
    }
    
  }
  &.sidemenu2-light{
    &>a:hover{
      color: $sidemenu2-items-hover-color-light;
      background-color: $sidemenu2-items-hover-Bgcolor-light;
    }
  }


  &>ul{
    display: none;
    &.sidemenu2-subs-dark{
      background-color: $sidemenu3-backgroung-color-dark;
    }
    &.sidemenu2-subs-light{
      background-color: $sidemenu3-backgroung-color-light;
    }
  }
  &>a{
    display: block;
    text-align: left;
    margin: 0;
  }

}

// 三级目录（不可展开）
.sidemenu3{
  position: relative;
  cursor: pointer;
  &.hide{display: none;}
  .sidemenu3-text{
    &.sidemenu3-text-dark{
      color:$sidemenu3-text-dark-fontcolor;
    }
    &.sidemenu3-text-light{
      color:$sidemenu3-text-light-fontcolor;
    }
  }

  &.sidemenu3-dark{
    &:hover{
      color: $sidemenu3-items-hover-color-dark;
      background-color: $sidemenu3-items-hover-Bgcolor-dark;
    }
  }
  &.sidemenu3-light{
    &:hover{
      color: $sidemenu3-items-hover-color-light;
      background-color: $sidemenu3-items-hover-Bgcolor-light;
    }
  }
  
  &>a{
    display: block;
    text-align: left;
    padding-left: 36px;
    font-size: small;
    margin: 0;
  }

}

// 迷你模式下的菜单
.sidemenu1-subs-mini{
    /* 定位 */
    position: absolute;
    // left: 100px;
    z-index: 1;

    &:hover{
      
    }

    .sidemenu2-mini{
      background-color: #0aff68;
    }
  }

</style>