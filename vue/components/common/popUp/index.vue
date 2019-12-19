<template>
  <div>
    <transition name="fade">
      <div class="pop-up night" v-show="show" @click="$emit('hide')" :style="{position: stylePosition}" @touchmove.prevent></div>
    </transition>
    <transition :name="position">
      <div ref="pop" v-show="show" :class="position" class="slot-container" :style="{position: stylePosition}">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'popUp',
  data () {
    return {
      onceActivated: true
    }
  },
  props: {
    show: Boolean,
    /**
     * center
     * bottom
     * top
     */
    position: {
      type: String,
      default: 'center' // bottom
    },
    stylePosition: {
      type: String,
      default: 'fixed'
    }
  },
  model: {
    prop: 'show',
    event: 'hide'
  }
}
</script>

<style lang="scss" scoped>
@import 'move';
.location-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.layer {
  position: fixed;
  z-index: 100;
}
.pop-up{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  @extend .layer;
}
.night {
  @extend .layer;
  @extend .location-0;
  background-color: rgba(0,0,0,.8);
}
.slot-container {
  @extend .layer;
}
.bottom {
  bottom: 0;
  left: 0;
}
.top {
  top: 0;
  left: 0;
}
.center {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  // @extend .location-0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // transform: translate(-50%, -50%);
  // top: 50%;
  // left: -50%;
}
</style>
