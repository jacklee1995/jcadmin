<template>
<div :class='[
  "jc-page",
  {
    "eyeshield": eyeshieldd,
  }
]'>
  <div class="content"><slot></slot></div>
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
  name: 'jc-page',
  // 注册你的组件
  components:{  },
  attrs:{ 
  },
  props: {
    eyeshield: Boolean
  },
  emit: {
  },
  // expose:{},
  setup(props, {attrs, slots, emit, expose }){
    const { proxy } = (getCurrentInstance() as any);       // 全局变量代理，用于使用 app.config.globalProperties.xxx 挂载的参数
    let eyeshieldd = ref((props as any).eyeshield);                      // 父组件数据
    // let eyeshield = ref(e)
    return {
      proxy,
      attrs,    // Attribute (非响应式对象，等同于 attrs)，有状态，会随组件本身的更新而更新
      slots,    // 插槽 (非响应式对象，等同于 slots)，有状态，会随组件本身的更新而更新
      emit,     // 触发事件 (方法，等同于 emit)
      expose,   // 暴露公共 property (函数)
      eyeshieldd
    }
  },
  

  methods:{
  
  }
});
</script>

<style lang="scss" scoped>
$width:1199px;
$bgcolor:#c0c2cc;
.jc-page{
  .content{
    padding: 3% 6% 1% 5%;
    background-color: #ffffff;
    width: 80%;
    width: $width;
    margin-top:40px;
    margin-bottom:90px;
  }
  .footer{
    min-height: 30px;
    width: 100%;
    background-color: $bgcolor;
  }
  min-width: 1199px;
  background-color: $bgcolor;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.eyeshield{
  background-color: #aacfaf !important;
  .content{
    background-color:#CFE8CC !important;
  }
}
</style>