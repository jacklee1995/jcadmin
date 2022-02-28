<template>
<div class="jc-h1-container">
  <div class="jc-h1" v-if="text != ''">{{text}}</div>
  <div v-else :class="{'jc-h1':true, 'select':select, 'select-ban':!select}" >
    <slot></slot>
  </div>
  <slot name="sub"></slot>
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
  name: 'jc-h1',
  props: {
    text: {
      type: String,
      default: ()=>{return ''}
    },
    select:{
      type: Boolean,
      default: ()=>{return false}
    }
  },
  setup(props){
    let text = (props as any).text;
    let select = (props as any).select;

    return {
      // text,
      // select
    }
  }
});
</script>

<style lang="scss" scoped>
.jc-h1-container{
  width: 100%;
  align-self: flex-start;
  padding: 6px 3px 6px 3px;
  .jc-h1{
    font-weight: bolder;
    white-space: nowrap;
    font-size: 25px;
    border-left: steelblue solid 6px;
    color: #1e496d;
    padding-left: 5px;
    margin-bottom: 6px;
  }
}
.select{
  user-select: text;
}
.select-ban{
  user-select: none;
}
</style>