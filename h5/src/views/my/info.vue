<style lang="scss" scoped>
.myinfo {
  padding-top: 0.6rem;
}
.input-div {
  display: flex;
  padding: 0 0.3rem;
  box-sizing: border-box;
  height: 1rem;
  .label {
    width: 1.5rem;
    color: #404040;
    font-size: 0.32rem;
  }
  .info-center {
    line-height: 1rem;
  }
  .info {
    flex: 1;
    text-align: right;
    .input {
      margin-top: 0.1rem;
      height: 60%;
      text-align: right;
      border: 0;
    }
  }
}

.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  .btn {
    flex: 1;
    height: 1rem;
    font-size: 0.36rem;
  }
  .submit {
    color: #fff;
  }

  .logout {
    border: 1px solid #ccc;
    color: #ccc;
  }
}
</style>
<template>
  <div class="myinfo">
    <div class="input-div px1">
      <div class="label info-center">昵称</div>
      <div class="info">
        <input type="text" class="input" v-model.trim="detail.nickname">
      </div>
    </div>
    <div class="input-div px1">
      <div class="label info-center">邮箱</div>
      <div class="info info-center">{{detail.email}}</div>
    </div>
    <div class="input-div px1">
      <div class="label info-center">手机号</div>
      <div class="info">
        <input type="text" class="input" v-model.trim="detail.phone">
      </div>
    </div>
    <!-- <div class="input-div px1">
      <div class="label info-center">生日</div>
      <div class="info">{{detail.born}}</div>
    </div> -->
    <div class="input-div px1">
      <div class="label info-center">所在城市</div>
      <div class="info">
        <input type="text" class="input" v-model.trim="detail.city">
      </div>
    </div>
    <div class="footer">
      <div class="dc btn logout" @click="logout">退出</div>
      <div class="submit dc btn" v-theme-bg @click="saveInfo">保存</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { userDetail, userUpdate } from "../../assets/api/user";
import { showMessage, showToast } from "../../assets/scripts/tools";

export default {
  name: "blank",
  components: {},
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const obj = reactive({
      detail: {},
    });

    const userId = computed(() => store.getters.userInfo.userId);

    const getDetail = async () => {
      await userDetail({ id: userId.value })
        .then((res) => {
          obj.detail = res;
        })
        .catch(() => {});
    };

    getDetail();

    const saveInfo = async () => {
      await userUpdate({ id: userId.value, ...obj.detail })
        .then(async (res) => {
          showToast({ title: "编辑用户信息成功" });
          await getDetail();
        })
        .catch(() => {});
    };

    const logout = () => {
      showMessage({
        content: "确认退出登录吗？",
        okText: "退出",
        cancleText: "取消",
      }).then(() => {
        store.commit("clearUserInfo");
        router.push("/my");
      });
    };

    return { ...toRefs(obj), saveInfo, logout };
  },
};
</script>
