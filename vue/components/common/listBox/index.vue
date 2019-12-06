<template>
  <div class="list-box">
    <slot></slot>
    <list-hint :list="list" :hint-text="hintText" :total="total" :total-text="totalText"></list-hint>
  </div>
</template>

<script>
import listHint from '@/components/listHint'
export default {
  name: 'listBox',
  data () {
    return {
      fhandleScroll: null,
      bUp: true
    }
  },
  props: {
    list: Array,
    total: Number,
    floor: {
      type: Number,
      default: 50
    },
    totalText: String,
    hintText: String,
    dom: {
      type: HTMLElement,
      defualt () {
        return document.documentElement
      }
    }
  },
  components: {
    listHint
  },
  watch: {
    dom: {
      handler (newDom, formerDom) {
        if (formerDom instanceof HTMLElement) {
          formerDom.removeEventListener('scroll', this.fhandleScroll)
        }
        if (newDom instanceof HTMLElement) {
          window.dom = newDom
          newDom.addEventListener('scroll', this.fhandleScroll)
        }
      },
      immediate: true
    }
  },
  computed: {
    residue () {
      return this.list.length < this.total
    }
  },
  created () {
    this.fhandleScroll = this.handleScroll.bind(this)
  },
  mounted () {
  },
  beforeDestroy () {
    this.dom.removeEventListener('scroll', this.fhandleScroll)
  },
  methods: {
    handleScroll (e) {
      const dom = this.dom
      const scrollTop = dom.scrollTop
      const scrollHeight = dom.scrollHeight
      const offsetHeight = dom.offsetHeight
      console.log(this.residue)
      if (offsetHeight + scrollTop + this.floor >= scrollHeight && this.bUp && this.residue) {
        this.bUp = false
        this.$emit('pullUp', this.doneUp)
      }
    },
    doneUp () {
      this.bUp = true
    }
  }
}
</script>
