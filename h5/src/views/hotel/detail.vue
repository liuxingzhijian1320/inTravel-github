<style lang="scss" scoped>
.detail {
  .header {
    position: relative;
    .header-bg {
      width: 100%;
    }
    .like {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      width: 1rem;
      height: 1rem;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 0.1rem #dfdfdf;
      .heart-icon {
        font-size: 0.5rem;
        // color: $theme_default;
      }
      .ani {
        animation: scanBig 0.2s ease-in;
      }
      @keyframes scanBig {
        from {
          translate: scale(1);
        }
        to {
          translate: scale(1.2);
        }
      }
    }
  }

  .info {
    padding: 0.3rem;
    position: relative;
    .name {
      color: #404040;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .address {
      color: #bfbfbf;
      font-size: 0.28rem;
      margin-top: 0.1rem;
    }
    .price {
      position: absolute;
      bottom: 0.3rem;
      right: 0.3rem;
      text-align: right;
      .price-val {
        color: #404040;
        font-weight: 500;
      }
      .price-unit {
        color: #bfbfbf;
        display: inline-block;
        margin-top: 0.1rem;
      }
    }
  }
  .title {
    display: flex;
    padding: 0.3rem;
    .title-key {
      color: #bfbfbf;
      font-size: 0.3rem;
      flex: 1;
    }
    .title-opt {
      // color: $theme_default;
    }
  }
  .desc {
    padding: 0 0.3rem;
    color: #404040;
    font-size: 0.28rem;
    letter-spacing: 0.02rem;
    line-height: 1.3;
    text-align: justify;
  }
  .pics {
    padding: 0rem 0.3rem;
    display: -webkit-box;
    overflow-x: scroll;
    .pics-item {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 0.2rem;
      margin-right: 0.2rem;
      overflow: hidden;
      background-size: 90px 90px;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .comment {
    padding: 0rem 0.3rem;
    .comment-no-data {
      padding: 0.5rem 0.5rem 1rem 0.5rem;
      text-align: center;
      color: #999;
    }
  }
  .map {
    height: 4rem;
    width: 100%;
  }
  .submit {
    width: 6.9rem;
    // background: $theme_default;
    color: #fff;
    font-size: 0.32rem;
    margin: 1rem auto;
  }
}
</style>
<template>
  <div class="detail">
    <div class="header">
      <div class="like dc" @click="setLikeHandler" v-if="userId">
        <i class="iconfont heart-icon icon-heart-2 ani" v-theme
          v-if="like && like.collect==1"></i>
        <i class="iconfont heart-icon icon-heart" v-theme v-else></i>
      </div>
      <img :src="detail.cover" class="header-bg" alt="">
    </div>
    <div class="info">
      <div class="name">{{detail.title}}</div>
      <div class="address">{{detail.address}}</div>
    </div>
    <div class="title">
      <div class="title-key">介绍</div>
      <!-- <div class="title-opt" v-theme>查看全部</div> -->
    </div>

    <div class="desc">
      {{detail.desc}}
    </div>

    <div class="title">
      <div class="title-key">照片</div>
      <!-- <div class="title-opt" v-theme>查看全部</div> -->
    </div>

    <div class="pics">
      <div class="pics-item" v-for="item in detail.picsList"
        :style="`background-image: url(${item})`"></div>
    </div>

    <div class="title">
      <div class="title-key">评论</div>
      <div class="title-opt" v-if="list.length > 0" v-theme @click="goComment">
        查看全部</div>
    </div>

    <div class="comment">
      <div class="comment-no-data" v-if="list.length === 0" @click="goComment">
        快快留下您的足迹, 立即前往go~
      </div>
      <commentitem v-for="item in list" :item.sync="item"></commentitem>
    </div>

    <div class="map">
      <tmap v-if="detail.lat && detail.lng" :lat="detail.lat" :lng="detail.lng">
      </tmap>
    </div>

    <div class="submit dc cbtn" v-theme-bg @click="bookHandler">立即预定
    </div>

  </div>
</template>

<script>
import commentitem from "../../components/commentitem.vue";
import star from "../../components/star";
import { useRouter, useRoute } from "vue-router";
import { reactive, toRefs, computed } from "vue";
import {
  getHotelDetail,
  setHotelLike,
  getHotelLike,
} from "../../assets/api/hotel";

import { getCommentList } from "../../assets/api/comment";

import tmap from "../../components/tmap";
import { useStore } from "vuex";
import { showToast } from "../../assets/scripts/tools";

export default {
  name: "index",
  components: { star, commentitem, tmap },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const userId = computed(() => store.getters.userInfo.userId);

    const goComment = (item) => {
      router.push(`/hotel/comment?hotel_id=${route.query.hotel_id}`);
    };

    const obj = reactive({ list: [], detail: {}, like: {} });

    const getList = () => {
      const fetchParams = {
        hotel_id: route.query.hotel_id,
        pageIndex: 1,
        pageSize: 6,
      };
      getCommentList(fetchParams).then((res) => {
        obj.list = res.list;
      });
    };

    const getDetail = async () => {
      const detailParams = {
        id: route.query.hotel_id,
      };
      await getHotelDetail(detailParams).then((res) => {
        res.picsList = [];
        res.picsList = res.pics && res.pics.split(",");
        obj.detail = res;
        document.title = obj.detail.title;
        getLikeDetail();
      });
    };

    const bookHandler = () => {
      router.push(`/hotel/roomlist?hotel_id=${route.query.hotel_id}`);
    };

    const setLikeHandler = async () => {
      const params = {
        user_id: userId.value,
        hotel_id: obj.detail.id,
        collect: obj?.like?.collect ? 0 : 1,
      };
      await setHotelLike(params)
        .then(async (res) => {
          showToast({ title: res.message });
          await getDetail();
        })
        .catch(() => {});
    };

    const getLikeDetail = async () => {
      if (userId.value) {
        const params = {
          user_id: userId.value,
          hotel_id: obj.detail.id,
        };
        await getHotelLike(params)
          .then(async (res) => {
            obj.like = res;
          })
          .catch(() => {});
      }
    };

    getDetail();
    getList();

    return {
      userId,
      ...toRefs(obj),
      goComment,
      bookHandler,
      setLikeHandler,
    };
  },
};
</script>
