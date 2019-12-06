<template>
  <pop-up
    @hide="$emit('hide')"
    :show="show"
    :position="position">
      <div class="pop-box">
        <div class="img-box" :class="closePosition" :style="{top: closeTop, right: closeRight}">
          <img :style="{width: closeSize}" @click="$emit('close')" src="./close.png" alt="图片没了">
        </div>
        <slot></slot>
      </div>
    </pop-up>
</template>

<script>
import popUp from '@/components/popUp'
export default {
  name: 'popBox',
  data () {
    return {
    }
  },
  props: {
    show: Boolean,
    position: {
      type: String,
      default: 'center'
    },
    closePosition: {
      type: String,
      default: 'top'
    },
    closeTop: String,
    closeRight: String,
    closeSize: {
      type: String,
      default: '5.5vw'
    }
  },
  model: {
    prop: 'show',
    event: 'hide'
  },
  components: {
    popUp
  }
}
</script>

<style lang="scss" scoped>
$size: 38px;
.pop-box {
  position: relative;
  .img-box {
    &.top {
      position: absolute;
      top: -60px;
      right: -40px;
    }
    &.bottom {
      position: absolute;
      transform: translate(-50%, 200%);
      left: 50%;
      bottom: 0;
    }
  }
}
</style>
