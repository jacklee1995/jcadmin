<template>
<div class="bc-block-container">
<div :class="[
    color_style,
    size_style,
    {'jc-block':true}
  ]">
  <slot></slot>
</div>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: 'jc-block',
  // 注册你的组件
  components:{  },
  props: {
    text: {
      type:String,
      default: ''
    },
    color:{
      type:String,
      default:'default'
    },
    size:{ // 可以选填1，2，3，4，5，6，对应不同宽度占比
      type:Number,
      default: 6
    }

  },
  
  setup(props, {attrs, slots, emit, expose }){
    let color = (props as any).color;
    let size = (props as any).size;


    let c_style = ''
    let s_style = ''

    if(color!='default'){
      c_style = color
    }else{
      c_style = 'default'
    }

    if(size!=''){
      s_style = 'size'+size.toString()
    }else{
      s_style = 'size6'
    }


    let color_style = ref(c_style)
    let size_style = ref(s_style)
    
    return {
      attrs,    // Attribute (非响应式对象，等同于 attrs)，有状态，会随组件本身的更新而更新
      slots,    // 插槽 (非响应式对象，等同于 slots)，有状态，会随组件本身的更新而更新
      emit,     // 触发事件 (方法，等同于 emit)
      expose,   // 暴露公共 property (函数)
      size_style,
      color_style
    }
  }
});
</script>

<style lang="scss" scoped>
.bc-block-container{
  .jc-block{
    padding-left: 9px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
}
.size6{width: 100%;}
.size5{width: 95%;}
.size4{width: 90%;}
.size3{width: 85%;}
.size2{width: 80%;}
.size1{width: 75%;}
.default{
  border-left: #DFE2E5 solid 7px;
  background-color: #f3f3f3;
}

.gray{
  border-left: #5a5a5a solid 7px;
  background-color: #cdcdcd;
}

.green{
  border-left: #254410 solid 7px;
  background-color: #acbda5;
}

.red{
  border-left: #441010 solid 7px;
  background-color: #bda5a5;
}

.yellow{
  border-left: #7c7c64 solid 7px;
  background-color: #d0d6aa;
}
</style>