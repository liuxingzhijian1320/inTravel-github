<style lang="scss" scoped>
.index {
  background: #f7f7ff;
  min-height: 100vh;
  background-image: url("../../assets/images/2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 7rem;
  box-sizing: border-box;

  .opt-div {
    // box-shadow: 0px 0px 20px #dfdfdf;
    // background: #fff;
    // width: 6.9rem;
    // border-radius: 0.4rem;
    padding: 0.6rem 0.3rem 0.4rem 0.3rem;
    // box-sizing: border-box;
    margin: 0 auto;
    .search {
      position: relative;
      .search-input {
        height: 1rem;
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid #fff;
        box-shadow: 0px 0px 10px #dfdfdf;
        padding-left: 1rem;
        box-sizing: border-box;
        line-height: 1rem;
        color: #ccc;
      }
      .search-icon {
        position: absolute;
        font-size: 30px;
        // color: $theme_default;
        top: 50%;
        transform: translateY(-50%);
        left: 0.3rem;
      }
    }
    .select-box {
      margin-top: 0.5rem;
      display: flex;
      .select-item {
        flex: 1;
        text-align: center;
      }
      .select-item-title {
        font-size: 0.26rem;
        color: #999;
      }
      .select-item-value {
        font-size: 0.26rem;
        color: #404040;
        font-weight: bold;
        margin-top: 0.2rem;
      }
    }
  }
  .btn {
    width: 100%;
    // background: $theme_default;
    letter-spacing: 0.03rem;
    color: #fff;
    margin-top: 0.4rem;
  }
}
.c-title {
  color: #404040;
  font-size: 0.32rem;
  font-weight: bold;
  padding: 0.8rem 0.3rem 0.3rem 0.3rem;
}
.list {
  display: -webkit-box;
  overflow: hidden;
  padding: 0 0 0 0.3rem;
  overflow-x: scroll;
  .list-item {
    width: 2.8rem;
    border-radius: 0.14rem;
    overflow: hidden;
    margin-right: 0.3rem;
    background: #fff;
    box-shadow: 0px 0px 5px #dfdfdf;
  }
  .list-item-img {
    background: #dfdfdf;
    height: 2rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .list-item-info {
    padding: 0.25rem 0.15rem 0.3rem 0.15rem;
  }
  .list-item-title {
    color: #404040;
    font-weight: bold;
    font-size: 0.28rem;
    margin-bottom: 0.2rem;
  }
  .list-item-num {
    color: #bfbfbf;
    font-size: 0.26rem;
    margin-bottom: 0.1rem;
  }
}
.holiday {
  display: -webkit-box;
  overflow: hidden;
  padding: 0 0 0 0.3rem;
  overflow-x: scroll;
  .holiday-item {
    width: 4rem;
    border-radius: 0.14rem 0.14rem 0 0;
    overflow: hidden;
    margin-right: 0.3rem;
    position: relative;
  }
  .holiday-item-img {
    height: 2.5rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .holiday-item-title {
    position: absolute;
    bottom: 0.2rem;
    left: 0.3rem;
    color: #fff;
  }
}
.price {
  padding: 0 0.3rem;
}
</style>
<template>
  <div class="index">
    <div class="opt-div">
      <div class="search">
        <div @click.prevent="goRoomList" class="search-input">伦敦，开普敦</div>
        <i class="iconfont search-icon icon-search" v-theme></i>
      </div>
      <!-- <div class="select-box">
        <div class="select-date select-item">
          <h5 class="select-item-title">选择日期</h5>
          <div class="select-item-value">12.13-12.13</div>
        </div>
        <div class="select-date select-item">
          <h5 class="select-item-title">房间数</h5>
          <div class="select-item-value">1间房间-3人</div>
        </div>
      </div>
      <div class="cbtn btn dc" v-theme-bg>搜索酒店</div> -->
    </div>
    <div class="c-title" v-if="recordList.length > 0 && userId">最近搜索</div>
    <ul class="list" v-if="recordList.length > 0 && userId">
      <li class="list-item" v-for="item in recordList"
        @click="goDetail(item.hotel_id)">
        <template v-if="item && item.hotel">
          <div class="list-item-img">
            <img :src="item.hotel.cover" alt="">
          </div>
          <div class="list-item-info">
            <div class="list-item-title">{{item.hotel.title}}</div>
            <div class="list-item-num">1间 - {{item.hotel.max}}人</div>
            <!-- <div class="list-item-num">12-22 3月</div> -->
          </div>
        </template>
      </li>
    </ul>
    <div class="c-title">最受欢迎的旅游圣地</div>
    <ul class="holiday">
      <li class="holiday-item" v-for="item in hotList"
        @click="goDetail(item.id)">
        <div class="holiday-item-img">
          <img :src="item.cover" alt="">
        </div>
        <div class="holiday-item-title of1">{{item.title}}</div>
      </li>
    </ul>
    <div class="c-title">最实惠的价格</div>
    <div class="price">
      <list v-for="item in lowerList" :item.sync="item"></list>
    </div>
  </div>
</template>
<script>
import star from "../../components/star";
import list from "../../components/list";
import { useRouter } from "vue-router";
import { getHotelList, getRecordList } from "../../assets/api/hotel";
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "index",
  components: {
    star,
    list,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const userId = computed(() => store.getters.userInfo.userId);

    const goRoomList = () => {
      router.push("/search");
    };

    const obj = reactive({
      hotList: [],
      lowerList: [],
      recordList: [],
    });

    // 最欢迎的地方
    const hot = {
      pageIndex: 1,
      pageSize: 6,
      type: "hot",
    };

    getHotelList(hot).then((res) => {
      obj.hotList = res.list;
    });

    // 最便宜地方
    const lower = {
      pageIndex: 1,
      pageSize: 5,
      type: "lower",
    };
    getHotelList(lower).then((res) => {
      obj.lowerList = res.list;
    });

    // 搜素记录
    const getRecordListHandler = () => {
      if (userId.value) {
        getRecordList({ user_id: userId.value }).then((res) => {
          obj.recordList = res;
        });
      }
    };

    getRecordListHandler();

    const goDetail = (id) => {
      router.push(`/hotel/detail?hotel_id=${id}`);
    };

    return {
      userId,
      ...toRefs(obj),
      goRoomList,
      goDetail,
    };
  },
};
</script>
