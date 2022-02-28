<template>
<span 
  :class="[name,{
    base:true,
    bold:bold,
    bolder:bolder,
    lighter:lighter,
    italic:italic,
  }]" 
  
  v-if="colorVal && sizeVal"

  :style="{'color': colorVal}" 
></span>
<span 
  :class="[name,{
    base:true,
    bold:bold,
    bolder:bolder,
    lighter:lighter,
    italic:italic,
  }]" 
  
  v-else-if="colorVal"

  :style="{'color': colorVal}" 
></span>

<span 
  :class="[name,{
    base:true,
    bold:bold,
    bolder:bolder,
    lighter:lighter,
    italic:italic,
  }]" 
  v-else-if="sizeVal"
  
  :style="{'font-size': sizeVal}" 
></span>

<span 
  :class="[name,{
    base:true,
    bold:bold,
    bolder:bolder,
    lighter:lighter,
    italic:italic,
  }]" 
  v-else
></span>
</template>

<script lang="ts">
import { 
  defineComponent, ref, 
} from 'vue';

export default defineComponent({
  name: 'jc-icon',
  props:{
    name:{
      type:String,
      default:'icon-image'
    },
    size:String,
    color: String,
    bold: Boolean,
    bolder: Boolean,
    lighter: Boolean,
    italic: Boolean,
  },

  setup(props){
    let colorVal = undefined;
    if(props.size){
      colorVal = ref(props.color)
    }
    
    let sizeVal = undefined;
    if(props.size){
      sizeVal = ref(props.size.toString()+'px');
    }
    return {
      colorVal,
      sizeVal
    }
  }
  
  
});
</script>

<style lang="scss" scoped>
@import "./style.css";
.base{
 margin: 0;
 padding: 0;
}
.lighter{font-weight:lighter;}
.bold{font-weight: bold;}
.bolder{ font-weight: bolder;}
.italic{ font:italic;}

</style>