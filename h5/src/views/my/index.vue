<style lang="scss">
.my {
  padding: 0.3rem;
  background: #fff;
  .header {
    position: relative;
    padding: 0.5rem 0;
    .no-title {
      font-size: 0.36rem;
      color: #404040;
    }
    .no-subtitle {
      font-size: 0.26rem;
      color: #bfbfbf;
      margin-top: 0.1rem;
    }
  }
  .section {
    margin-top: 1rem;
    .section-list {
      display: flex;
      padding: 0.3rem 0;
    }
    .section-key {
      flex: 1;
      color: #101010;
      font-size: 0.32rem;
      font-weight: 500;
    }
    .section-val {
      width: 1rem;
      text-align: right;
      color: #bfbfbf;
      .item-icon {
        font-size: 0.5rem;
      }
    }
  }
}
</style>
<template>
  <div class="my">
    <div class="header">
      <div class="no-login" @click="updateInfo">
        <h3 class="no-title">{{userStatus ? userInfo.nickname: '您好，请登录！'}}</h3>
        <div class="no-subtitle">{{userStatus ? '查看和编辑': '立刻前往'}}</div>
        <avatar :name="userInfo.nickname" :width="1.5" :height="1.5"></avatar>
      </div>
    </div>

    <div class="section">
      <div class="section-list px1" @click="updatePassHandler"
        v-if="userStatus">
        <div class="section-key">
          修改密码</div>
        <div class="section-val">
          <i class="iconfont icon-lock item-icon"></i>
        </div>
      </div>
      <div class="section-list px1">
        <div class="section-key" @click="helpCenter">帮助中心</div>
        <div class="section-val">
          <i class="iconfont icon-question item-icon"></i>
        </div>
      </div>
      <div class="section-list px1">
        <div class="section-key" @click="changeSkin">换肤</div>
        <div class="section-val">
          <i class="iconfont icon-setting item-icon"></i>
        </div>
      </div>
      <div class="section-list px1">
        <div class="section-key" @click="declare">声明</div>
        <div class="section-val">
          <i class="iconfont icon-arrow item-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "my",
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const userStatus = computed(() => store.getters.userStatus);
    const userInfo = computed(() => store.getters.userInfo);

    const updateInfo = () => {
      if (!userStatus.value) {
        router.push("/auth");
      } else {
        router.push("/my/info");
      }
    };

    const updatePassHandler = () => {
      router.push("/auth/updatepass");
    };

    const changeSkin = () => {
      router.push("/my/setting");
    };
    const helpCenter = () => {
      router.push("/my/help");
    };

    const declare = () => {
      router.push("/my/declare");
    };

    return {
      userStatus,
      userInfo,

      updateInfo,
      updatePassHandler,
      changeSkin,
      helpCenter,
      declare,
    };
  },
};
</script>
