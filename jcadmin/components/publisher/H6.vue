<template>
<div class="jc-h6-container">
  <div class="jc-h6" v-if="text != ''">{{text}}</div>
  <div v-else :class="{'jc-h6':true, 'select':select, 'select-ban':!select}">
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
  name: 'jc-h6',
  props: {
    text: {
      type: String,
      default: ()=>{return ''}
    },
    select:{
      type: Boolean,
      default: ()=>{return true}
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
.jc-h6-container{
  width: 100%;
  align-self: flex-start;
  padding: 6px 3px 6px 3px;
  margin-left: 72px;
  .jc-h6{
    font-weight: bolder;
    white-space: nowrap;
    font-size: 17px;
    color: #000000;
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