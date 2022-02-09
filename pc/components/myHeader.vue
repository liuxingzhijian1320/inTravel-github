<template>
  <div class="myHeader" :class="scrollColor()">
    <div class="header layout">
      <div class="logo dc">
        <nuxt-link to="/">
          <img class="logo-img" src="../static/icon.png" alt="">
        </nuxt-link>
      </div>
      <div class="header-content">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
      </div>
      <div class="login" @click="openLogin"><i
          class="iconfont login-icon">&#xe620;</i>
        {{userInfo&&userInfo.nickname ? userInfo.nickname: '登录' }}</div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showNav: false,
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo',
    }),
  },
  methods: {
    openLogin() {
      if (this.userInfo && this.userInfo.nickname) {
        MessageBox.confirm('确认退出吗？ 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            Message.success('退出成功')
            this.$store.commit('user/clearUserInfo')
            this.$store.commit('user/checkUserInfo')
          })
          .catch(() => {})
      } else {
        this.$store.commit('user/setLoginStatus', true)
      }
    },
    scrollColor() {
      return this.showNav ? 'active' : ''
    },
    // 注册scroll事件并监听
    scrollHandler() {
      if (process.browser) {
        window.addEventListener('scroll', () => {
          let scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop

          // console.log(44, scrollTop)

          if (scrollTop >= 400) {
            this.showNav = true
          } else {
            this.showNav = false
          }
          //判断是否滚动到底部
          // if (scrollTop + window.innerHeight + 50 >= document.body.offsetHeight) {
          //   console.log(444)
          // }
        })
      }
    },
  },
  watch: {
    $route(res) {
      console.log(13, res.path)
      this.showNav = res.path === '/detail' ? true : false
      if (process.browser) {
        window.removeEventListener('scroll', {})
      }
    },
  },

  mounted() {
    this.showNav = this.$nuxt.$route.path === '/detail' ? true : false
    if (!this.showNav) {
      this.scrollHandler()
    }
  },
}
</script>

<style lang="scss">
.myHeader {
  height: 70px;
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  transition: all 0.3s ease;
  &.active {
    background: #0185f2;
  }
  .header {
    display: flex;
  }
  .logo {
    width: 50px;
    .logo-img {
      width: 50px;
    }
  }
  .header-content {
    flex: 1;
    padding-left: 100px;
    line-height: 70px;
    a {
      padding: 0 30px;
      opacity: 0.8;
      color: #fff;
      font-size: 18px;
      &.nuxt-link-exact-active {
        opacity: 1;
      }
    }
  }
  .login {
    line-height: 70px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    cursor: pointer;
    .login-icon {
      font-size: 18px;
      margin-right: 5px;
    }
  }
}
</style>
