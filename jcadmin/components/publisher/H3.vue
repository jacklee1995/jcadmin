<template>
<div class="jc-h3-container">
  <div class="jc-h3" v-if="text != ''">{{text}}</div>
  <div v-else :class="{'jc-h3':true, 'select':select, 'select-ban':!select}">
    <slot></slot>
  </div>
  <slot name="sub"></slot>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: 'jc-h3',
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
    let text = ref((props as any).text);
    let select = ref((props as any).select);
    

  return {
      // text,
      // select
    }
  }
});
</script>

<style lang="scss" scoped>
.jc-h3-container{
  width: 100%;
  align-self: flex-start;
  padding: 6px 3px 6px 3px;
  margin-left: 36px;
  .jc-h3{
    font-weight: bolder;
    white-space: nowrap;
    font-size: 19px;
    border-left: rgb(6, 100, 34) solid 6px;
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