<style lang="scss" scoped>
.title {
  color: #101010;
  font-size: 0.28rem;
  text-align: center;
  margin: 0.5rem 0 0.2rem 0;
}
.content {
  border-radius: 0.2rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 10px #999;
  position: relative;
  .fake {
    position: absolute;
    right: 0;
    height: 0.6rem;
    width: 1rem;
    // background: $theme_default;
    color: #fff;
  }
  .img {
    height: 3.8rem;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .info {
    padding: 0.2rem 0.3rem;
    .name {
      color: #404040;
      font-size: 0.36rem;
      font-weight: bold;
    }
    .address {
      font-size: 0.28rem;
      color: #bfbfbf;
      i {
        // color: $theme_default;
      }
    }
    .star {
      margin-top: 0.1rem;
      display: flex;
      .comment {
        margin-top: 0.15rem;
        margin-left: 0.3rem;
        color: #bfbfbf;
      }
    }
  }
}
</style>
<template>
  <div class="t-item" v-if="item && item.start" @click="goDetail(item)">
    <div class="title">{{item.start}} - {{item.end}}, {{item.rooms}}间 -
      {{item.people}}人</div>
    <div class="content">
      <div class="fake dc" v-theme-bg>
        {{item.status == 1 ?'已下单':'已支付'}}</div>
      <div class="img">
        <img :src="item.hotel.cover" alt="">
      </div>
      <div class="info">
        <div class="name">{{item.hotel.title}}</div>
        <!-- <div class="address" v-theme>巴塞罗那,西班牙
          <i
            class="iconfont icon-location"></i>距离2km</div> -->
        <div class="star">
          <star :count="+item.hotel.grade"></star>
          <!-- <div class="comment">80 条评论</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import star from "./star";
import { useRouter } from "vue-router";

export default {
  components: {
    star,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const router = useRouter();

    const goDetail = (item) => {
      router.push(`/order/detail?id=${item.id}`);
    };

    return {
      goDetail,
    };
  },
};
</script>


