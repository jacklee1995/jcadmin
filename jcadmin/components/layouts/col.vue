<template>
<div class="jc-col"></div>
</template>

<script lang="ts">
import { 
  computed,
  defineComponent, 
  h, 
  inject, 
  renderSlot
} from 'vue';
import type { CSSProperties } from 'vue'

import { buildProps, definePropType, mutable } from '../props';

type SizeObject = {
  span?: number
  offset?: number
}
type Size = number | SizeObject

export default defineComponent({
  name: 'ElCol',
  props: buildProps({
  tag: {
    type: String,
    default: 'div',
  },
  span: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  xs: {
    type: definePropType<Size>([Number, Object]),
    default: () => mutable({} as const),
  },
  sm: {
    type: definePropType<Size>([Number, Object]),
    default: () => mutable({} as const),
  },
  md: {
    type: definePropType<Size>([Number, Object]),
    default: () => mutable({} as const),
  },
  lg: {
    type: definePropType<Size>([Number, Object]),
    default: () => mutable({} as const),
  },
  xl: {
    type: definePropType<Size>([Number, Object]),
    default: () => mutable({} as const),
  },
} as const),

  setup(props, { slots }) {
    const { gutter } = inject('ElRow', { gutter: { value: 0 } })

    const style = computed<CSSProperties>(() => {
      if (gutter.value) {
        return {
          paddingLeft: `${gutter.value / 2}px`,
          paddingRight: `${gutter.value / 2}px`,
        }
      }
      return {}
    })

    const classList = computed(() => {
      const classes: string[] = []

      const pos = ['span', 'offset', 'pull', 'push'] as const
      pos.forEach((prop) => {
        const size = props[prop]
        if (typeof size === 'number') {
          if (prop === 'span') classes.push(`el-col-${props[prop]}`)
          else if (size > 0) classes.push(`el-col-${prop}-${props[prop]}`)
        }
      })

      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      sizes.forEach((size) => {
        if (typeof props[size] === 'number') {
          classes.push(`el-col-${size}-${props[size]}`)
        } else if (typeof props[size] === 'object') {
          const sizeProps = props[size]
          Object.keys(sizeProps).forEach((prop) => {
            classes.push(
              prop !== 'span'
                ? `el-col-${size}-${prop}-${(sizeProps as any)[prop]}`
                : `el-col-${size}-${(sizeProps as any)[prop]}`
            )
          })
        }
      })
      // this is for the fix
      if (gutter.value) {
        classes.push('is-guttered')
      }

      return classes
    })

    return () =>
      h(
        props.tag,
        {
          class: ['el-col', classList.value],
          style: style.value,
        },
        [renderSlot(slots, 'default')]
      )
  },
})
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);

</style>