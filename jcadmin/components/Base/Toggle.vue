<template>
<label class="jc-toggle"  :checked="ck">
<input type="checkbox" >
<jc-icon v-if="ck" @click="buttonClick()" :name="positive" class="jc-toggle"></jc-icon>
<jc-icon v-else @click="buttonClick()" :name="negative" class="jc-toggle"></jc-icon>
</label>
</template>

<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance, 
  ref
} from 'vue';



export default defineComponent({
  name: 'jc-toggle',
  props: {
    checked: Boolean,
    negative: String,
    positive: String

  },
  
  // 定义一个组件的 emitted 事件，当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
  emits: {
    "click": (evt: MouseEvent) => evt instanceof MouseEvent,
  },
  setup(props, {attrs, slots, emit, expose }){
    const { proxy } = (getCurrentInstance() as any);       // 全局变量代理，用于使用 app.config.globalProperties.xxx 挂载的参数


    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    
    let ck = ref(props.checked)
    return {
      proxy,
      ck,
      emit,
      evt,
      // buttonClick,
    }
  },
  

  methods:{
    buttonClick(){
      this.emit("click",this.evt);
      this.ck = !this.ck;
    }
  }
});
</script>

<style lang="scss" scoped>
$base-color: #878787;
$checked-color: #ffffff;
$slider-color: #5bca00;
$switch-size: 23px;
$slider-size: 19px;
$transition-time: .3s;
.jc-toggle{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: $switch-size;
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
}
</style>