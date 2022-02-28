<template>
<div class="jc-pb-title-container">
<div class="jc-pb-title">
  <div v-if="t != ''">{{t}}</div>
  <div v-else :class="{'select':s, 'select-ban':!s}" >
    <slot></slot>
  </div>
</div>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: 'jc-pb-title',
  props: {
    text: {
      type:String,
      default: ()=>{return ''}
    },
    select:{
      type: Boolean,
      default: ()=>{return false}
    }
  },
  setup(props){
    const { proxy } = (getCurrentInstance() as any);       // 全局变量代理
    let t = ref((props as any).text);
    let s = ref((props as any).select);
   
  return {
      proxy,
      t,
      s
    }
  },
  
  components:{
  },

  methods:{
  }
});
</script>

<style lang="scss" scoped>
.jc-pb-title-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3px;
  background-color: none;
  
  .jc-pb-title{
    white-space: nowrap;
    display: block;
    border-left: #006B00 7px solid;
    border-right: #006B00 7px solid;
    border-radius: 3px;
    text-shadow: 3px 3px #d6d6d6;
    background-color: #f3f3f3;
    padding-left: 12px;
    padding-right: 16px;
    font-weight: bolder;
    font-size: 32px;
    font-style: italic;
    text-align: center;
  }
}
.select{
  user-select: text;
}
.select-ban{
  user-select: none;
}
</style>