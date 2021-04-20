<style lang="scss">
.order_detail {
  padding: 0.3rem;
  .title {
    font-size: 0.32rem;
    color: #404040;
    font-weight: bold;
    padding: 0.6rem 0 0.2rem 0;
  }
  .subtitle {
    font-size: 0.3rem;

    line-height: 1.9;
  }
  .key {
    width: 2rem;
    display: inline-block;
    color: #b1b1b1;
  }
  .val {
    flex: 1;
    color: #404040;
  }
}
.btn {
  font-size: 0.32rem;
  margin: 1rem auto;
  width: 6.9rem;
}
.submit {
  color: #fff;
  // background: $theme_default;
}
.back {
  color: $theme_default;
  // border: 1px solid $theme_default;
}
</style>
<template>
  <div class="order_detail" v-if="detail && detail.hotel">
    <div class="title">预定信息</div>
    <div class="subtitle">
      <span class="key">酒店</span>
      <span class="val">{{detail.hotel.title}}</span>
    </div>
    <div class="subtitle">
      <span class="key">入离日期</span>
      <span class="val">{{detail.start}} 到 {{detail.end}}</span>
    </div>
    <div class="subtitle">
      <span class="key">房间数量</span>
      <span class="val">{{detail.rooms}} 间</span>
    </div>
    <div class="subtitle">
      <span class="key">总人数</span>
      <span class="val">{{detail.people}} 人</span>
    </div>
    <div class="subtitle">
      <span class="key">总价格</span>
      <span class="val">¥{{detail.price}} 元</span>
    </div>
    <div class="title">入住信息</div>
    <div class="subtitle">
      <span class="key">入住人昵称</span>
      <span class="val">{{detail.user.nickname}}</span>
    </div>
    <div class="subtitle">
      <span class="key">邮箱</span>
      <span class="val">{{detail.user.email}}</span>
    </div>

    <div class="submit dc btn cbtn" v-theme-bg v-if="detail.status === 1"
      @click="payHandler">
      支付(模拟支付)
    </div>

    <div class="back dc btn cbtn" v-theme v-theme-border="['1px', 'solid']"
      v-if="detail.status === 2" @click="backHandler">
      返回
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { getOrderDetail, updateOrderStatus } from "../../assets/api/order";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showMessage, showToast } from "../../assets/scripts/tools";

export default {
  name: "order_detail",
  components: {},
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const { id } = route.query;
    const obj = reactive({ detail: {} });

    const getDetail = () => {
      const params = {
        id,
      };
      getOrderDetail(params).then((res) => {
        console.log(1231, res);
        obj.detail = res;
      });
    };

    getDetail();

    const payHandler = () => {
      showMessage({
        content: "当前为模拟支付，确认支付吗？",
        okText: "支付",
        cancleText: "返回",
      }).then(async () => {
        console.log(21);
        await updateOrderStatus({ id }).then(() => {
          showToast({ title: "支付成功" });
          router.push("/travel");
        });
      });
    };

    const backHandler = () => {
      router.back(-1);
    };

    return {
      ...toRefs(obj),
      payHandler,
      backHandler,
    };
  },
};
</script>

