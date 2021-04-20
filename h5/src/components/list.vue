<style lang="scss" scoped>
.price-item {
  height: 2.5rem;
  width: 100%;
  border-radius: 0.14rem;
  overflow: hidden;
  margin-bottom: 0.3rem;
  position: relative;
  display: flex;
  background: #fff;
}
.price-item-img {
  width: 3rem;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.price-item-info {
  padding: 0.3rem;
  overflow: hidden;
  .price-item-name {
    color: #404040;
    font-size: 0.36rem;
    font-weight: bold;
  }
  .price-item-address {
    color: #bfbfbf;
    font-size: 0.28rem;
    margin-top: 0.1rem;
  }
  .price-item-location {
    color: #bfbfbf;
    font-size: 0.28rem;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
  }
  // .location-icon {
  //   color: $theme_default;
  // }
}
.price-item-price {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
  text-align: right;
  color: #404040;
  font-weight: 500;
}
</style>
<template>
  <div class="price-item" @click="goDetail(item.id)">
    <div class="price-item-img">
      <img :src="item.cover" alt="">
    </div>
    <div class="price-item-info">
      <div class="price-item-name">{{item.title}}</div>
      <div class="price-item-address of1">{{item.address}}</div>
      <div class="price-item-location">
        <!-- <i class="iconfont icon-location location-icon" v-theme></i>
        距离2km -->
      </div>
      <star :count.sync="+item.grade"></star>
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
    const goDetail = (id) => {
      router.push(`/hotel/detail?hotel_id=${id}`);
    };
    return {
      goDetail,
    };
  },
};
</script>


