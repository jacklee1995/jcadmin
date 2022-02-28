<template>
<div class="math"></div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance, 
  reactive, 
  ref 
} from 'vue';

const mathjax     = require('mathjax-full/js/mathjax.js').mathjax;      // MathJax core
const TeX         = require('mathjax-full/js/input/tex.js').TeX;        // TeX input
const MathML      = require('mathjax-full/js/input/mathml.js').MathML;  // MathML input
const browser     = require('mathjax-full/js/adaptors/browserAdaptor.js').browserAdaptor; // browser DOM
const Enrich      = require('mathjax-full/js/a11y/semantic-enrich.js').EnrichHandler;     // semantic enrichment
const Register    = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;      // the HTML handler
const AllPackages = require('mathjax-full/js/input/tex/AllPackages').AllPackages;         // all TeX packages
const STATE       = require('mathjax-full/js/core/MathItem.js').STATE;

const sreReady    = require('mathjax-full/js/a11y/sre.js').sreReady();    // SRE promise;

export default defineComponent({
  name: 'math',
  // 注册你的组件
  components:{  },
  props: {
    text: {
      type:String,
      default: ''
    }
  },
  
  // 定义一个组件的 emitted 事件，当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
  emits: {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
  },
  setup(props, {attrs, slots, emit, expose }){
    const { proxy } = (getCurrentInstance() as any);       // 全局变量代理，用于使用 app.config.globalProperties.xxx 挂载的参数
    let datas = (props as any).datas;                      // 父组件数据

    return {
      proxy,
      attrs,    // Attribute (非响应式对象，等同于 attrs)，有状态，会随组件本身的更新而更新
      slots,    // 插槽 (非响应式对象，等同于 slots)，有状态，会随组件本身的更新而更新
      emit,     // 触发事件 (方法，等同于 emit)
      expose,   // 暴露公共 property (函数)
    }
  },
  

  methods:{
  
  }
});
</script>

<style lang="scss" scoped>
.math{
  
}
</style>