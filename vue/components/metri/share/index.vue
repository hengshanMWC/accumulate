<template>
  <popUp :show="showFlag" @hide="hide" position="bottom">
    <div class="share_menu" @touchmove.prevent>
      <div class="share_menu_wrap">
        <div class="share_menu_ul">
          <div class="share_menu_item" @click="handleShare('friend')">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkMzODNERkU1ODJDMTFFNThEMDJFNTE4RDU5MzdCNTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkMzODNERkQ1ODJDMTFFNThEMDJFNTE4RDU5MzdCNTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlEMTEyRDNFMEZDMDExRTVBMDk4QkExOTU3MzlFMDc0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEMTEyRDNGMEZDMDExRTVBMDk4QkExOTU3MzlFMDc0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kGwgQQAABIpJREFUeNrs2Q1MVWUYwPF7b1dsbWblKlYZiN7cNBMR2Vqr2VaWhR8lCk3LuTJnzVIXrVlRWM5VhIRrOi3ndDX86mOyrIUGYSZgMqabWUEfs4SKLNEy00v/B5+7nV3OOfeewzk4Vs/db++9nJdzn3t4z/s+vDfY2dkZ6GsRCvTBCOZ+etN5TWD7zbv/G1c67ODD3YjbkINhuBIDcRq/4Qc0YQ92oM23pIOBoN3xS/E45uIqiz4pSFU52vcsqlCOD7xPOmia9AVYgOf1ajoN+f07VDUewwHPZg+50nGPVOzECgw0Oe70MR77UYRu7+fFlc7ATqT7cO8UYxRm6n3gyZi+HB/5kLAx8iCrWb62LocHVzp4Lt7CMH0d7wRq0WZx3Og4qnHU4vh0LIm9dpV0KBgi89ADuF2fx6vBtbgF6aiz6Cd2Iw23IgOfW/R7DiPludsrLeO62ObKleOYPj+FCpu+pfjd0HerRb9+WOb+SgdCE5EGq8f1ca8jNn3HxL22O+8kpLudPSYl6FOEq1GDMZhn03eJLjLS9wbMT7DK3otSx0kzrsYlsVA8rJJZVOYqY9SjUpf4r9CBqBRsrqq8WfV3H6O9xIfpTaa0Ciw3rIYXIRsjcY3O3yfRiu+wd+O4yuMJk76/Idf1J7aJbzEbtXruu/QvNQEX2vzeP/gEa/HOhuztUdOkZzdMbqe9zMOEpUCeopVfFtZgrIvzHJKaZX32+1Xdkp6zb2ojbaZHCddr+XoCi7EM/Xs4xMpQuG7su2eNi8sem8XCiXZMQwdeQwn69/Cc8liEbQ/tn5ZinD220j7iwVUuxBE8oWWtlyHDbRUe7Boe8xpnyI3S4HLcxeJLnRHEF+hn0udPtGC4xXGJH/VmtFp08ldnbtosy3gnntQ24NIaRPGSLtHxxzuQiVHIwkmTPlXIIKkhtM9YvE/J/KaClFjBtAtlPRh77yGCOy2OH8LX+vwgDpv0+XDV6IrT5wqi0BaL8wxGXthQacmYHIrJDodGm87LC23me1lQ5uBjzNByID4eXXBglvxr9hc5vWLzflONScuUch82IddB0i3aZiWoM9YlOM8Q7Evi/XLCcTWt3Cz34OUEV84Yf2h7RS9te6SGQ933a87owjBBZ4NEMUDbaC8lfcZqCyGSZMISadr+1EtJN4ct/uXJMzzv0E0XKS1H69gdgcG4WJfpQVKhxSZ/n6PGLmmpH1biVbTrz/fanKxSh1bYx4SlFnnTbHik6tQku0O/Ojhhq848M31Metvy4aubzG5EefOnXJ70aZ3nB/iQ8C+6vWa5l+c2vtdi/22P/7GQlbLgxetePxqr8ry+IhU6xEo9SvxvTF8aWbkr2a1et1GmU+AbPRwqP8ukUBwprzXbFvPDZozQNuryHDviE/Y7aXEE+Zp8Cb6x6Ssf7CA+M/xsYnHzwpDTbwK8isNaRRbqeI9tIcjCdEq/+mgsGrqiq45Z2rxovN4TUg3KvkxdMt8E+Bmtqiuezei+wUTy1S+0LJZytkBX4brzcaUdBx8mqlOnaZ3b5yL4/9fMvRT/CjAAzO8AZ/R94m4AAAAASUVORK5CYII=" alt="">
            <span>微信</span>
          </div>
          <div class="share_menu_item" @click="handleShare('timeLine')">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDY0NUM3MjM1ODJEMTFFNTgyRkQ4NUMzRkIzRkEwMjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDY0NUM3MjI1ODJEMTFFNTgyRkQ4NUMzRkIzRkEwMjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlEMTEyRDNFMEZDMDExRTVBMDk4QkExOTU3MzlFMDc0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEMTEyRDNGMEZDMDExRTVBMDk4QkExOTU3MzlFMDc0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H7SY9AAACyhJREFUeNrUmQl0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" alt="">
            <span>朋友圈</span>
          </div>
        </div>
        <div class="share_menu_cancel" @click="hide">取消</div>
      </div>
    </div>
  </popUp>
</template>

<script>
import popUp from '../popUp'
export default {
  name: 'share',
  props: {
    type: Boolean, // false 链接， true 图片
    beforeFn: Function,
    showFlag: {
      type: Boolean,
      default: false
    },
    shareInfo: {
      type: Object
    }
  },
  components: {
    popUp
  },
  methods: {
    async handleShare (name) {
      if (this.beforeFn) {
        const b = await this.beforeFn(name)
        if (!b) return
      }
      switch (name) {
        case 'timeLine': (async () => {
          if (this.type) {
            this.$callTimelineShareImage(this.shareInfo.imgUrl)
          } else {
            await this.$callTimelineShareUrl({
              type: 'url',
              title: this.shareInfo.title,
              text: this.shareInfo.desc,
              thumbUrl: this.shareInfo.imgUrl,
              url: this.shareInfo.link
            })
          }
        })()
          break
        case 'friend': (async () => {
          if (this.type) {
            await this.$callWechatShareImage(this.shareInfo.imgUrl)
          } else {
            await this.$callWechatShareUrl({
              type: 'url',
              title: this.shareInfo.title,
              text: this.shareInfo.desc,
              thumbUrl: this.shareInfo.imgUrl,
              url: this.shareInfo.link
            })
          }
        })()
          break
      }
      this.$emit('share', name)
    },
    hide () {
      this.$emit('update:showFlag', false)
      this.$emit('showFlag', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.share_menu {
    width: 710px;

  .share_menu_wrap {
    width: 100%;
    padding-bottom: 10px;
    margin-left: .28rem;
    .share_menu_ul {
      background: #FFF;
      display: flex;
      width: 710px;
      margin: 0 auto;
      border-radius: 20px;
      padding: 40px;
      justify-content: space-around;

      .share_menu_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 80px;
        }

        span {
          margin-top: 20px;
          font-size: 24px;
          color: #666;
        }
      }
    }

    .share_menu_cancel {
      background: #FFF;
      margin: 0 auto;
      border-radius: 20px;
      padding: 30px;
      font-size: 28px;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
