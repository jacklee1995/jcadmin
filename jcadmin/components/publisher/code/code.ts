import hljs from 'highlight.js'  // yarn add highlight.js --save
import { App } from 'Vue'
import hljsVuePlugin from "@highlightjs/vue-plugin";

export function setupHightCode(app: App<Element>){
  app.use(hljsVuePlugin);
  app.directive('highlight', {
    // Directive has a set of lifecycle hooks:
    // called before bound element's parent component is mounted
    beforeMount(el:any) {
      // on first bind, highlight all targets
      const blocks = el.querySelectorAll('pre code');
      for(let i = 0 ;i < blocks.length ; i++){
        const item = blocks[i]
        hljs.highlightBlock(item)
      }
    },
    // 在包含组件的虚拟节点及其子//的虚拟节点更新后调用
    updated(el:any, binding:any) {
      // 更新后，重新填充内容，然后 highlight
      const targets = el.querySelectorAll('code');
      for (let i = 0; i < targets.length; i += 1) {
        const target = targets[i];
        if (typeof binding.value === 'string') {
          target.textContent = binding.value;
        }
      hljs.highlightBlock(target);
      }
    }
  })
}

/*

a11y-dark.css
a11y-light.css
agate.css
an-old-hope.css
androidstudio.css
arduino-light.css
arta.css
ascetic.css
atom-one-dark-reasonable.css
atom-one-dark.css
atom-one-light.css
brown-paper.css
brown-papersq.png
codepen-embed.css
color-brewer.css
dark.css
default.css
devibeans.css
docco.css
far.css
foundation.css
github-dark-dimmed.css
github-dark.css
github.css
gml.css
googlecode.css
gradient-dark.css
gradient-light.css
grayscale.css
hybrid.css
idea.css
ir-black.css
isbl-editor-dark.css
isbl-editor-light.css
kimbie-dark.css
kimbie-light.css
lightfair.css
lioshi.css
magula.css
mono-blue.css
monokai-sublime.css
monokai.css
night-owl.css
nnfx-dark.css
nnfx-light.css
nord.css
obsidian.css
paraiso-dark.css
paraiso-light.css
pojoaque.css
pojoaque.jpg
purebasic.css
qtcreator-dark.css
qtcreator-light.css
rainbow.css
routeros.css
school-book.css
shades-of-purple.css
srcery.css
stackoverflow-dark.css
stackoverflow-light.css
sunburst.css
tomorrow-night-blue.css
tomorrow-night-bright.css
vs.css
vs2015.css
xcode.css
xt256.css

*/