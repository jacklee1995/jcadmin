<template>
<div class="center">
<slot></slot>
</div>
</template>

<script lang="ts">
import {  defineComponent } from 'vue';
export default defineComponent({ name: 'jc-center'})
</script>

<style lang="scss" scoped>
.center{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>