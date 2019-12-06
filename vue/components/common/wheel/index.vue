.<template>
  <div class="wheel" :style="{height}" ref="wheel">
    <div class="wheel-ul" ref="box" style="top: 0">
      <slot :list="list"></slot>
    </div>
  </div>
</template>

<script>
// 上下轮播
export default {
  name: 'wheel',
  props: {
    dataList: Array,
    interval: {
      type: Number,
      default: 1500
    },
    transit: {
      type: Number,
      default: 200
    },
    transitInterval: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      height: '',
      $time: null,
      $timeTransit: null,
      index: 0,
      $reslove: null
    }
  },
  computed: {
    list () {
      if (this.dataList && this.dataList.length) {
        return this.dataList.concat([this.dataList[0]])
      } else {
        return []
      }
    }
  },
  mounted () {
    this.$watch('dataList', data => {
      if (!(data && data.length)) return
      this.setHeight()
      this.rollStart()
    }, {
      immediate: true
    })
  },
  beforeDestroy () {
    clearTimeout(this.$time)
  },
  methods: {
    setHeight () {
      this.height = getComputedStyle(this.$refs.box.children[0]).height
    },
    rollStart () {
      clearTimeout(this.$time)
      this.$time = setTimeout(() => {
        if (this.dataList.length) {
          const num = this.transit / this.transitInterval
          this.transitRoll(-this.$refs.box.children[0].getBoundingClientRect().height / num, num)
        }
      }, this.interval)
    },
    transitRoll (interval, num) {
      clearTimeout(this.$timeTransit)
      this.$timeTransit = setTimeout(() => {
        const box = this.$refs.box
        box.style.top = parseFloat(box.style.top) + interval + 'px'
        if (--num <= 0) {
          if (this.index === this.dataList.length - 1) {
            this.index = 0
            box.style.top = 0
          } else {
            this.index++
          }
          this.rollStart()
        } else {
          this.transitRoll(interval, num)
        }
      }, this.transitInterval)
    }
  }
}
</script>

<style lang="scss" scoped>
.wheel {
  overflow-y: hidden;
  .wheel-ul {
    position: relative;
  }
}
</style>
