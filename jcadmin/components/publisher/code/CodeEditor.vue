<template>
<jc-center class="box" >
<div class="tool"></div>
<div class="jc-coditor">
 <div class="edt" spellcheck="false" contenteditable="true"  >{{code}}</div>
 <Code class="theCode" :lang="lang" :code="code" />
</div>
</jc-center>
</template>

<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance, 
  reactive, 
  ref 
} from 'vue';

import Code from './base_Code.vue'

export default defineComponent({
  name: 'jc-coditor',
  // 注册你的组件
  components:{ Code },
  props: {
    lang: {
      type:String,
      default: ''
    },
    code: {
      type:String,
      default: ''
    }

  },
  
  setup(props, {attrs, slots, emit, expose }){
    const { proxy } = (getCurrentInstance() as any);       // 全局变量代理，用于使用 app.config.globalProperties.xxx 挂载的参数
    let lang = (props as any).lang;
    let code = (props as any).code;

    return {
      lang,
      code
    }
  }
});
</script>




<style lang="scss" scoped>
$sub-width: 50%;
$border:rgb(189, 189, 189) solid 3px;
.box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  .tool{
    width: 80%;
    height: 20px;
    background-color: #c2c2c2;
  }
  .jc-coditor{
    width: 80%;
    padding: 0px;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    .edt{
      // border-top: $border;
      // border-left: $border;
      // border-bottom: $border;
      padding: 13px;
      width: $sub-width;
      height: 100%;
      font-family: monospace;
      border-right: #575757 solid 2px;
      background-color: #e4e4e4;
      outline: none;
    }
    .theCode{
      width: $sub-width;
      height: 100%;
      // border-top: $border;
      // border-right: $border;
      // border-bottom: $border;
    }
  }
}
</style>