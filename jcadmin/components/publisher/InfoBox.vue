<template>
<div class="info-contarner"></div>
<div class="jc-infos">
    zdfszkdjh
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
  name: 'jc-infos',
  // 注册你的组件
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
    }
  },
  

});
</script>

<style lang="scss" scoped>
@import "../_variables.scss";
.info-contarner{
  .jc-infos{
    width: 80%;
  }
}

// 主题
.primary {
  background-color: $blue-100;
}
.secondary {

}
.success {

}
.info {

}
.warning {

}
.danger {

}
.light {

}
.dark {}
</style>