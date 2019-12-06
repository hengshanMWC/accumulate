<template>
  <div class="list-hint">
    <p class="hint-text" v-if="!list.length">
      <slot v-if="$slots.default && $slots.default[0]"></slot>
      <span v-else>{{hintText}}</span>
    </p>
    <div class="total-box" v-if="showTotal">
      <div class="cut-off"></div>
      <p class="total-text">
        <span>{{totalText}}</span>
      </p>
      <div class="cut-off"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listHint',
  props: {
    list: Array,
    hintText: {
      type: String,
      default: '暂无数据'
    },
    total: Number,
    totalText: {
      type: String,
      default: '拖到底了~'
    }
  },
  computed: {
    showTotal () {
      const len = this.list.length
      return len && len === this.total
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #888;
.list-hint{
  color: $color;
  width: 95%;
  margin: 0 auto;
  .hint-text {
    font-size: 32px;
    letter-spacing: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .total-box {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .cut-off {
      flex: 1;
      height: 1PX;
      background-color: $color;
    }
    .total-text {
      font-size: 26px;
      text-align: center;
      margin: 0 10px;
      letter-spacing: 2px;
    }
  }
}
</style>
