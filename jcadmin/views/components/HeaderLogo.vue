<template>
<div @click="toJCStdio()" class="jc-logo-header">
  <img class="piclogo" src="../../images/JCStdio.svg">
  <img class="textlog" src="../../images/jc-stdio.svg">
</div>
</template>

<script lang="ts">
import {  defineComponent } from 'vue';


export default defineComponent({
  name: 'jc-logo-header',
  props: {
    text: {
      type:String,
      default: ''
    },
    is_right: Boolean,
    obj: {
      type: Object,
      default: ()=>{ return {xx:''} }
    }

  },

  methods:{
    toJCStdio(){
      window.location.href = "http://thispage.tech"
    }
  }
  
});
</script>

<style lang="scss" scoped>
.jc-logo-header{
  position: relative;
  img{
    left: 16px;
    &.piclogo{
      position: fixed;
      top: 3px;
      padding-left: 9px;
      height: 29px;
      width: 40px;
    }
    &.textlog{
      position: fixed;
      top: 3px;
      left: 66px;
      padding-left: 6px;
      height: 32px;
      width: 80px;
    }
  }
  &:hover{
    background-color: rgb(94, 94, 94);
    cursor:pointer;
  }
}
</style>