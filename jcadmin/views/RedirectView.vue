<template>
<div :class="{
    'jc-redirect':true,
    'dark':isDark,
    'light':!isDark,
}">

<div class="box">
  <div class="title">
    <jc-icon class="title-icon" name="jcicon-search"></jc-icon>
    <div class="title-text">您暂时无法通过嵌入访问来浏览该页面！</div>
  </div>
  <div class="msg-box">
    <p>由于浏览器的安全限制策略或者其它原因，您无法直接在嵌入架构内访问该页面，但是您可以点击下方按钮在新的标签中打开它.</p>
    <p>Because of the browser's security restriction policy or other reasons, you can't directly access this page in the embedded architecture, but you can click the button below to open it in a new tab.</p>
    <button @click="openPage" class="bt">在新标签中打开</button>
  </div>
  
  
</div>

</div>

</template>

<script lang="ts">
import { 
  defineComponent, 
  toRefs, 
} from 'vue';



export default defineComponent({
  name: 'jc-redirect',
  props: {
    url: String,
    refDark: Boolean,
  },
  
  setup(props, {attrs, slots, emit, expose }){
    let propss = toRefs(props);
    let isDark = propss.refDark;
    return {
      props,
      isDark,
    }
  },
  methods:{
    openPage(){
      window.open(this.props.url)
    }
  }
});
</script>

<style lang="scss" scoped>
.jc-redirect{
  &.dark{
    background-color: #1E1E1E;
    .box{
      .title{
        color: #ffffff;
      }
      .msg-box>p{
          color: #ffffff;
      }
    }
    
  }
  &.light{
    background-color: #ecfff2;
    .box{
      .title{
        color: #000000;
      }
      .msg-box>p{
          color: #000000;
      }
    }
  }

  .box{
    padding: 90px;
    .title{
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: nowrap;
      .title-icon{
        font-size: 60px;
      }
      .title-text{
        white-space: nowrap;
        padding-left:16px;
        font-size: 36px;
      }
    }
    .msg-box{
      padding-left: 80px;
      white-space: wrap;
      max-width: 769px;
      .bt{
        position: relative;
        width: 146px;
        height: 43px;
        background-color: #0066ff;
        color: #ecfff2;
        border-radius: 6px;
        font-size: large;
        font-weight: bold;
        &:hover{
          background-color: #2a7fff;
        }
        &:active{
          background-color: #4900f2;
        }
      }
    }

    
  }
}
</style>