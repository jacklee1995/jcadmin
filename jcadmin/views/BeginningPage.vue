<template>
<div 
  :class="{
    'jc-beginning-page':true,
    'page-dark':isDark,
    'page-light':!isDark
    }"
>
  <div class="title">JCStdio Admin FrameWork</div>
  <div class="contents">
      <div class="left">
        <div class="breafs">Breaf</div>
        <div class="breaf">A simple out-of-the-box to use administration framework.</div>
        
        <div class="auth">
            <p>Auth: <a href="https://blog.csdn.net/qq_28550263?spm=1010.2135.3001.5343">JCLee95</a></p>
            <p>Email: <a href="mailto:291148484@163.com">291148484@163.com</a></p>
            
        </div>
        
        <div class="msg">
          <jc-icon name="jcicon-left-arrow"></jc-icon>
          No tabs are currently open. Please try the tab bar on the left to open a tab!
        </div>
    </div>
    <div class="right">
        
    </div>
  </div>
  
</div>
</template>

<script lang="ts">
import { 
  defineComponent, toRefs, 
} from 'vue';


export default defineComponent({
  name: 'jc-beginning-page',
  props:{
    refDark:Boolean,
  },
  setup(props){
    let propss = toRefs(props);
    let isDark = propss.refDark;
    return {
      isDark
    }
  },
  

  methods:{
  
  }
});
</script>

<style lang="scss" scoped>
.jc-beginning-page{
  padding: 90px 120px;
  display: flex;
  flex-direction: column;
  
  &.page-dark{
    background-color: #A7A7A7;
    .title{
      color: #CCCCCC;
      font-size: 46px;
      padding-bottom: 20px;
    }
    .contents{
      .left{
        .breafs{
            color: #eeeeee;
            padding-bottom: 16px;
        }
        .breaf{
          color: #1E4DDB;
        }
        .auth{
          color: #CCCCCC;
        }
        .msg{
          font-size: 20px;
          font-weight: bolder; 
          color:#ffffff;
          width: 700px;
          padding-top: 9px;
          border-top: #6d6d6d solid 3px;
        }
      }
      .right{

      }
    }
  }
  &.page-light{
    background-color: #ffffff;
    .title{
      color: #353535;
      font-size: 46px;
      padding-bottom: 20px;
    }
    .contents{
      .left{
        .breafs{
            color: #CCCCCC;
            padding-bottom: 16px;
        }
        .breaf{
          color: #1E4DDB;
        }
        .auth{
          color: #CCCCCC;
        }
        .msg{
          font-size: 20px;
          font-weight: bolder; 
          color:#5a5a5a;
          width: 700px;
          padding-top: 9px;
          border-top: #222222 solid 3px;
        }
      }
      .right{

      }
    }
  }
  

  
}
</style>