<template>
<iframe 
  id="jc-iframe" 
  title=""
  
  allow="payment"
  allowfullscreen="true"
  :src="iframeSrc" 
  class="jcadminiframe" 
  sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
>
<p>你的浏览器不支持 iframes, 请更新到chrome、firefox等现代浏览器的最新版本后再进行访问。</p>
</iframe>

</template>



<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance,
  ref, 
} from 'vue';
import { storeToRefs } from 'pinia'
import { iframeStore } from '../../store';

import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'jcadminiframe',
  props: {
    url: {
      type:String,
      default:'Undefined Page URL!'
    },
    nodeId:{
      type:String,
    }
  },
  setup(props){
      let iframeSrc = ref(props.url as string);
      const { proxy } = getCurrentInstance() as any;
      const router = useRouter()
      const route = useRoute()
      const iframeDist = iframeStore()
      const { iframDict } = storeToRefs(iframeDist)

      
    return {
      iframeSrc,
      proxy,
      router,route,
      iframDict
    }
  },
  watch:{
    $route(to){
      this.iframeSrc=this.iframDict[to.fullPath]
    }
  }
});
</script>

<style lang="scss" scoped>
.jcadminiframe{
  height: 100%;
  width: 100%;
  
}
</style>