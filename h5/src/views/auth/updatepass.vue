<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.updatepass {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 1rem 0.3rem;
  box-sizing: border-box;
  .title {
    font-size: 0.36rem;
    color: #404040;
    text-align: center;
    margin-bottom: 1rem;
  }
  .input-div {
    position: relative;
    margin-bottom: 0.3rem;
    .input {
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      outline: none;
      -webkit-appearance: none;
      border: 0;
      padding: 0 0.5rem;
      color: #404040;
      font-size: 0.3rem;
      @include hbPlaceholder {
        color: #d9d9d9;
      }
    }
    .send {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: 100%;
      background: rgab(#36cfc9, 0.7);
      color: #999;
    }
    .eye-info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 0.8rem;
      height: 100%;
      .eye {
        font-size: 30px;
        color: #d9d9d9;
        transition: all 0.2s ease-in-out;
        &.active {
          color: #36cfc9;
        }
      }
    }
  }

  .forget {
    color: #d9d9d9;
    font-size: 0.24rem;
    padding-left: auto;
    margin-top: 0.1rem;
    margin-bottom: 0.9rem;
    text-align: right;
  }
  .btn {
    margin-top: 1rem;
    height: 1.2rem;
    width: 100%;
    border-radius: 0.6rem;
    letter-spacing: 0.06rem;
    // background: #36cfc9;
    color: #fff;
    font-size: 0.32rem;
  }
}

.forget {
  color: #d9d9d9;
  font-size: 0.24rem;
  padding-left: auto;
  margin-top: 0.1rem;
  margin-bottom: 0.9rem;
  text-align: right;
}
</style>

<template>
  <div class="updatepass">
    <h3 class="title">修改密码</h3>
    <div class="input-div">
      <input class="input cbtn" :type="isShow_1 ? 'text': 'password'"
        v-model.trim="formData.password" placeholder="旧密码" />
      <div class="eye-info dc" @click="showHandler(1)">
        <i class="iconfont eye icon-eye" v-theme="isShow_1"></i>
      </div>
    </div>
    <div class="input-div">
      <input class="input cbtn" :type="isShow_2 ? 'text': 'password'"
        v-model.trim="formData.newPassword" placeholder="新密码" />
      <div class="eye-info dc" @click="showHandler(2)">
        <i class="iconfont eye icon-eye" v-theme="isShow_2"></i>
      </div>
    </div>
    <div class="input-div">
      <input class="input cbtn" :type="isShow_3 ? 'text': 'password'"
        v-model.trim="formData.newPasswordAgain" placeholder="再输入一次新密码" />
      <div class="eye-info dc" @click="showHandler(3)">
        <i class="iconfont eye icon-eye" v-theme="isShow_3"></i>
      </div>
    </div>

    <div class="forget" @click="forgetPassHandler">忘记密码？</div>

    <div class="btn dc" v-theme-bg @click="saveHandler">发送</div>
  </div>
</template>

<script>
import md5 from "md5";
import { showToast } from "../../assets/scripts/tools";
import { reactive, ref, toRefs, computed } from "vue";
import { userPassUpdate } from "../../assets/api/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "forget",
  components: {},
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const userId = computed(() => store.getters.userInfo.userId);

    const obj = reactive({
      formData: {
        password: "",
        newPassword: "",
        newPasswordAgain: "",
      },
      isShow_1: false,
      isShow_2: false,
      isShow_3: false,
    });

    const showHandler = (index) => {
      const t = `isShow_${index}`;
      obj[t] = !obj[t];
    };

    const forgetPassHandler = () => {
      router.push("/auth/forget");
    };

    const sendCodeHandler = () => {
      if (!obj.formData.email) {
        showToast({ title: "请填写邮箱" });
      } else {
        alert("发送成功");
      }
    };

    const saveHandler = async () => {
      const { password, newPassword, newPasswordAgain } = obj.formData;
      if (!password) {
        showToast({ title: "请填写旧密码" });
      } else if (!newPassword) {
        showToast({ title: "请填写新密码" });
      } else if (!newPasswordAgain) {
        showToast({ title: "请再一次填写新密码" });
      } else if (newPassword != newPasswordAgain) {
        showToast({ title: "两次新密码不一致" });
      } else {
        await userPassUpdate({
          password: md5(password),
          newPassword: md5(newPassword),
          id: userId.value,
        }).then(() => {
          showToast({ title: "密码修改成功" });
          store.commit("clearUserInfo");
          router.push("/auth/login");
        });
      }
    };

    return {
      ...toRefs(obj),
      saveHandler,
      showHandler,
      sendCodeHandler,
      forgetPassHandler,
    };
  },
};
</script>
