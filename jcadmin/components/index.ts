import type { App, Component } from 'vue';
import IconVue from './icons/Icon.vue';
import ToggleVue from './Base/Toggle.vue';

import Publisher_Center from './publisher/Center.vue';
import Publisher_Title from './publisher/Title.vue';
import Publisher_H1 from './publisher/H1.vue';
import Publisher_H2 from './publisher/H2.vue';
import Publisher_H3 from './publisher/H3.vue';
import Publisher_H4 from './publisher/H4.vue';
import Publisher_H5 from './publisher/H5.vue';
import Publisher_H6 from './publisher/H6.vue';
import BaseCodeVue from './publisher/code/base_Code.vue';
import Publisher_Fieldset from './publisher/Fieldset.vue';
import Publisher_Page from './publisher/Page.vue';
import Publisher_Notes from './publisher/Notes.vue';
import Publisher_InfoBox from './publisher/InfoBox.vue'; 
import Base_Switch from './Base/Switch.vue'; 



const components: Component[] = [
  IconVue,
  ToggleVue,
  
  Publisher_Center,
  Publisher_Title,
  Publisher_H1,Publisher_H2,Publisher_H3,Publisher_H4,Publisher_H5,Publisher_H6,
  Publisher_Fieldset,
  BaseCodeVue,
  Publisher_Page,
  Publisher_Notes,
  Publisher_InfoBox,
  Base_Switch
    
]

export const JCComponents = {
  install:(app: App<Element>)=>{
    components.forEach(component =>{
      app.component((component as any).name, component)
    })
  }
}
