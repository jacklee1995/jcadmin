<template>
<div class="jc-h2-container">
  <div class="jc-h2" v-if="text != ''">{{text}}</div>
  <div v-else :class="{'jc-h2':true, 'select':select, 'select-ban':!select}">
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
  name: 'jc-h2',
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
  },
  
  components:{
  },

  methods:{
  }
});
</script>

<style lang="scss" scoped>
.jc-h2-container{
  width: 100%;
  align-self: flex-start;
  margin-left: 18px;
  padding: 6px 3px 6px 3px;
  .jc-h2{
    font-weight: bolder;
    white-space: nowrap;
    font-size: 22px;
    border-left: #761C79 solid 6px;
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