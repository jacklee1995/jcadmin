<template>
<label class="switch"  :checked="checked">
  <input type="checkbox">
  <!-- 滑块 -->
  <div 
    class="slider round" 
    ref="slider"  
    style="--base-color:#ffffff; --checked-color:#ffffff;"
    :style="{
      'background-color': baseColor
    }"
    @click="buttonClick()"
  >
  </div>
</label>
</template>

<script lang="ts">
import { 
  defineComponent, ref, 
  // getCurrentInstance, 
} from 'vue';
import { useCssVar } from '@vueuse/core'


export default defineComponent({
  name: 'jc-switch',
  // 注册你的组件
  props: {
    checked: Boolean,
  },

  emits: {
    "click": (evt: MouseEvent) => evt instanceof MouseEvent,
  },
  
  setup(props, {attrs, slots, emit, expose }){
    const slider = ref(null);
    const baseColor = useCssVar('--base-color', slider);
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    
    const buttonClick = () => {
      emit("click",evt)
    }

    return {
      buttonClick,
      baseColor
    }
  },
  
});
</script>

<style lang="scss" scoped>
$base-color: #878787;
$checked-color: #ffffff;
$slider-color: #5bca00;
$switch-size: 23px;
$slider-size: 19px;
$transition-time: .3s;
.switch {
  position: relative;
  display: inline-block;
  width: 2*$switch-size;
  height: $switch-size;
  
  input{
    display:none;
    &:checked + .slider {
      background-color: $checked-color;
    }
    
    &:focus + .slider {
      box-shadow: 0 0 1px $checked-color;
    }
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $base-color;
    -webkit-transition: $transition-time;
    transition: $transition-time;
    &:before {
      position: absolute;
      // font-size: smaller;
      color:#ffffff;
      content: "";
      height: $slider-size;
      width: $slider-size;
      left: 4px;
      bottom: 2px;
      background-color: $slider-color;
      -webkit-transition: $transition-time;
      transition: $transition-time;
    }
    
    &.round {
      border-radius: $slider-size;
      &:before {
        border-radius: 50%;
      }
    }
  }
}



input:checked + .slider:before {
  -webkit-transform: translateX($slider-size);
  -ms-transform: translateX($slider-size);
  transform: translateX($slider-size);
}



</style>