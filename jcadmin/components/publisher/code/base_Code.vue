<template>
<div  class="code-container">
<highlightjs class="codebox" :language="l" :code="c" />
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  ref 
} from 'vue';


// import 'highlight.js/styles/a11y-dark.css'
// import 'highlight.js/styles/a11y-light.css'
// import 'highlight.js/styles/agate.css'
// import 'highlight.js/styles/an-old-hope.css'
// import 'highlight.js/styles/androidstudio.css'
// import 'highlight.js/styles/arduino-light.css'
// import 'highlight.js/styles/arta.css'
// import 'highlight.js/styles/ascetic.css'
// import 'highlight.js/styles/atom-one-dark-reasonable.css'
// import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/atom-one-light.css'
// import 'highlight.js/styles/brown-paper.css'
// import 'highlight.js/styles/brown-papersq.png'
// import 'highlight.js/styles/codepen-embed.css'
// import 'highlight.js/styles/color-brewer.css'
// import 'highlight.js/styles/dark.css'
// import 'highlight.js/styles/default.css'
// import 'highlight.js/styles/devibeans.css'
// import 'highlight.js/styles/docco.css'
// import 'highlight.js/styles/far.css'
// import 'highlight.js/styles/foundation.css'
// import 'highlight.js/styles/github-dark-dimmed.css'
// import 'highlight.js/styles/github-dark.css'
// import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/gml.css'
// import 'highlight.js/styles/googlecode.css'
// import 'highlight.js/styles/gradient-dark.css'
// import 'highlight.js/styles/gradient-light.css'
// import 'highlight.js/styles/grayscale.css'
// import 'highlight.js/styles/hybrid.css'
// import 'highlight.js/styles/idea.css'
// import 'highlight.js/styles/ir-black.css'
// import 'highlight.js/styles/isbl-editor-dark.css'
// import 'highlight.js/styles/isbl-editor-light.css'
// import 'highlight.js/styles/kimbie-dark.css'
// import 'highlight.js/styles/kimbie-light.css'
// import 'highlight.js/styles/lightfair.css'
// import 'highlight.js/styles/lioshi.css'
// import 'highlight.js/styles/magula.css'
// import 'highlight.js/styles/mono-blue.css'
// import 'highlight.js/styles/monokai-sublime.css'
// import 'highlight.js/styles/monokai.css'
// import 'highlight.js/styles/night-owl.css'
// import 'highlight.js/styles/nnfx-dark.css'
// import 'highlight.js/styles/nnfx-light.css'
// import 'highlight.js/styles/nord.css'
// import 'highlight.js/styles/obsidian.css'
// import 'highlight.js/styles/paraiso-dark.css'
// import 'highlight.js/styles/paraiso-light.css'
// import 'highlight.js/styles/pojoaque.css'
// import 'highlight.js/styles/purebasic.css'
// import 'highlight.js/styles/qtcreator-dark.css'
// import 'highlight.js/styles/qtcreator-light.css'
// import 'highlight.js/styles/rainbow.css'
// import 'highlight.js/styles/routeros.css'
// import 'highlight.js/styles/school-book.css'
// import 'highlight.js/styles/shades-of-purple.css'
// import 'highlight.js/styles/srcery.css'
// import 'highlight.js/styles/stackoverflow-dark.css'
// import 'highlight.js/styles/stackoverflow-light.css'
// import 'highlight.js/styles/sunburst.css'
// import 'highlight.js/styles/tomorrow-night-blue.css'
// import 'highlight.js/styles/tomorrow-night-bright.css'
// import 'highlight.js/styles/vs.css'
// import 'highlight.js/styles/vs2015.css'
// import 'highlight.js/styles/xcode.css'
// import 'highlight.js/styles/xt256.css'

import './jcstdio.css'

export default defineComponent({
  name: 'jc-code',
  props: {
    lang: {
      type:String,
      default: 'plain-text'
    },
    code: {
      type: String,
      default:''
    }
  },
  setup(props){
    let lang = (props as any).lang;
    let code = (props as any).code;
    let l = ref(lang);
    let c = ref(code);
    return {
      l,
      c
    }
  },
});
</script>



<style lang="scss" scoped>
.code-container{
  .codebox{
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    // display: inline-block;
  }
  width: 80%;
  margin: 0;
  padding: 0;
  overflow-x: auto;
}

</style>