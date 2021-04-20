<style lang="scss" scoped>
.roomlist {
  .list {
    position: relative;
    margin-bottom: 0.4rem;
  }
  .img {
    height: 4rem;
    background-size: 100% 100%;
  }
  .info {
    padding: 0.3rem;
  }
  .name {
    color: #404040;
    font-size: 0.32rem;
    span {
      color: #919191;
      font-size: 0.26rem;
    }
  }
  .price {
    margin-top: 0.1rem;
    color: #404040;
    font-size: 0.3rem;
    span {
      color: #919191;
      font-size: 0.26rem;
    }
  }
  .btn {
    width: 2rem;
    color: #fff;
    // background: $theme_default;
    position: absolute;
    right: 0.3rem;
    bottom: 0.2rem;
  }
}
</style>
<template>
  <div class="roomlist">
    <loadingtext v-if="loading"></loadingtext>
    <empty v-if="!loading && list.length === 0"></empty>
    <div class="list" v-for="item in list">
      <div class="img" :style="`background-image: url(${item.cover})`"></div>
      <div class="info">
        <div class="name">{{item.title}} <span>/{{item.max}}人</span></div>
        <div class="price">￥{{item.price}} <span>/每晚</span></div>
        <h4 class="btn cbtn dc" v-theme-bg @click="bookHandler(item)">立即预定
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getRoomList, getHotelDetail } from "../../assets/api/hotel";

export default {
  name: "index",
  components: {},
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const hotel_id = route.query.hotel_id;
    const loading = ref(false);
    const obj = reactive({
      detail: {},
      list: [],
    });

    const getList = () => {
      const params = {
        hotel_id,
      };
      loading.value = true;
      getRoomList(params)
        .then((res) => {
          loading.value = false;
          obj.list = res.list;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const getDetail = () => {
      const params = {
        id: hotel_id,
      };
      loading.value = true;
      getHotelDetail(params)
        .then((res) => {
          obj.detail = res;
          document.title = obj.detail.title;
          getList();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const bookHandler = (item) => {
      router.push(`/hotel/set?hotel_id=${hotel_id}&room_id=${item.id}`);
    };

    getDetail();

    return {
      loading,
      ...toRefs(obj),
      bookHandler,
    };
  },
};
</script>
