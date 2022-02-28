<template>
<div class="jc-paragraph" v-if="text != ''">{{text}}</div>
<div class="jc-paragraph" v-else><slot></slot></div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';


export default defineComponent({
  name: 'jc-paragraph',
  props: {
    text: {
      type: String,
      default: ()=>{return ''}
    },
    select: {
      type:Boolean,
      default: ()=>{return true}
    },
    copy:{
      type:Boolean,
      default: ()=>{return true}
    }
  },
  setup(props){
    let text = (props as any).text;
    let select = (props as any).select;
    let copy = (props as any).copy;
  return {
      text,
      select,
      copy
    }
  },
  
  components:{
  },

  methods:{
  }
});
</script>

<style lang="scss" scoped>

.jc-paragraph{
  width: 100%;
  padding: 16px;
  text-indent:20px;
  font-size: 20px;
  white-space: wrap;
  background-color: #c5c5c5;
}
</style>