<template>
<div class="jc-note">
 Tip: iA Writer provides templates for previewing, printing, and exporting Markdown-formatted documents. For example, the "Academic – MLA Style" template indents paragraphs and adds double sentence spacing.
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
  name: 'jc-note',
  // 注册你的组件
  components:{  },
  props: {
    text: {
      type:String,
      default: ''
    },
    is_right: Boolean,
    obj: {
      type: Object,
      default: ()=>{ return {xx:''} }
    }

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
@import "../_variables.scss";
// @import url(xxx);
.jc-note{

}
</style>