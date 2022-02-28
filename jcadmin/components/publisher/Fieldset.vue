<template>
<div class="fieldset-container">
<div class="tool">
  <div class="box">
    <div class="item" v-if="use_copy" @click="copy">复制</div>
    <div v-if="use_edit" class="blok"> | </div>
    <div class="item" v-if="use_edit" >
      <div @click="edit"> {{ edit_text }} </div>
    </div>
  </div>
  
</div>
<fieldset  :class="{'edit-area':editable,'edit-area-ban':!editable}" >
  <legend> {{ legend }} </legend>
  <div :contenteditable="editable"><slot></slot></div>
</fieldset>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: 'jc-fieldset',
  props: {
    atrib:{
      type:Object,
      default:()=>{
        return {
          legend:'tips',
          editable:false,
          use:{copy:true,edit:true}
        }
      }
    }
  },
  setup(props){
    let atrib = (props as any).atrib;
    let legend = ref(atrib.legend);
    let editable = ref(atrib.editable);
    let edit_text = ref('编辑')
    let use_copy = ref(atrib.use.copy);
    let use_edit = ref(atrib.use.edit);
    return {
      legend,
      use_copy,
      use_edit,
      editable,
      edit_text
    }
  },
  methods:{
    copy(){
      alert('文本已复制！')
    },
    edit(){
      if(this.editable){this.editable=false;this.edit_text='编辑'}
      else {this.editable = true;this.edit_text='保存'}
    }
  }
});
</script>

<style lang="scss" scoped>
$border-color:#5f4d69;
.fieldset-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .tool{
    background-color: aquamarine;
    position: relative;
    .box{
      position: absolute;
      top: 16px;
      right: 46px;
      user-select: none;
      color: #bdbdbd;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .item{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
         &:hover{
           color: #387ab8;
           font-weight: bold;
         }
      }
      .blok{
        width: 4px;
        padding-left: 2px;
        padding-right: 2px;
      }
    }
  }
  fieldset{
    width: 95%;
    padding-top: 20px;
    border: #a5a5a5 solid 3px;
    border-radius: 6px;
    
    legend{
      border-left: solid 3px $border-color;
      border-right: solid 3px $border-color;
      border-radius: 4px;
      font-weight: bolder;
      background-color: none;
      user-select: none;
    }
    div[contenteditable='true']{
      caret-color: #000000;
      outline: medium;
    }
    
  }
}
.edit-area{
  background-color: #cecece;
}
.edit-area-ban{
  background-color: #ebebeb;
}
</style>