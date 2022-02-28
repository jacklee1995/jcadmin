<template>
<div class="jcadmin-pdf">这是PDF阅读器,待实现</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: 'jcadmin-pdf',
  // 注册你的组件
  components:{  },
  props: {

  },
  
  // 定义一个组件的 emitted 事件，当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。

  setup(props){


    return {

    }
  },
});
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
.jcadmin-pdf{

}
</style>