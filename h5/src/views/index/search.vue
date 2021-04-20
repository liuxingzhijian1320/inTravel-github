<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.search {
  .header {
    margin-top: 0.4rem;
    height: 1.4rem;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    position: relative;
    .search {
      height: 1rem;
      width: 100%;
      border-radius: 0.5rem;
      outline: none;
      border: 0;
      box-shadow: 0rem 0.1rem 0.2rem #dfdfdd;
      padding: 0 1rem;
      box-sizing: border-box;
      @include hbPlaceholder {
        color: #bfbfbf;
      }
    }
    .search-icon {
      position: absolute;
      font-size: 30px;
      // color: $theme_default;
      top: 50%;
      transform: translateY(-50%);
      left: 0.6rem;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 0.3rem 0.15rem;

    .list {
      position: relative;
      width: 50%;
      padding: 0.15rem;
      box-sizing: border-box;
      .list-radius {
        padding-bottom: 0.4rem;
        border-radius: 0.2rem;
        overflow: hidden;
        box-shadow: 0 0 0.2rem #dfdfdf;
      }
      .img {
        height: 2rem;
        background-size: 100%;
      }
      .name {
        padding: 0.2rem 0.15rem 0rem 0.15rem;
        color: #404040;
        font-size: 0.32rem;
      }
    }
  }
}
</style>
<template>
  <div class="search">
    <header class="header">
      <input type="text" v-model.trim="keyword" placeholder="你想去哪儿？"
        class="search" @input="getValue">
      <i class="iconfont search-icon icon-search" v-theme></i>
    </header>

    <loadingtext v-if="loading"></loadingtext>
    <empty v-if="!loading && list.length === 0"></empty>

    <div class="content">
      <div class="list" v-for="item in list">
        <div class="list-radius">
          <div class="img" @click="goDetail(item)"
            :style="`background-image: url(${item.cover})`"></div>
          <div class="name of1">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { getHotelList, postRecordList } from "../../assets/api/hotel";
import { throttle } from "../../assets/scripts/utils.js";

export default {
  name: "search",
  components: {},
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const userId = computed(() => store.getters.userInfo.userId);

    const goDetail = (item) => {
      router.push(`/hotel/detail?hotel_id=${item.id}`);
    };

    const obj = reactive({
      list: [],
    });

    const keyword = ref("");
    const loading = ref(false);
    const pageIndex = ref(1);
    const totalCount = ref(0);

    // 注册scroll事件并监听
    const scrollHandler = () => {
      window.addEventListener("scroll", () => {
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;

        //判断是否滚动到底部
        if (scrollTop + window.innerHeight + 50 >= document.body.offsetHeight) {
          if (!loading.value && totalCount.value > obj.list.length) {
            pageIndex.value++;
            getList();
          }
        }
      });
    };

    const getList = (isReload = false) => {
      let params = {
        title: keyword.value,
        pageSize: 12,
      };
      if (isReload) {
        obj.list = [];
        params = {
          ...params,
          pageIndex: 1,
        };
      } else {
        params = {
          ...params,
          pageIndex: pageIndex.value,
        };
      }
      loading.value = true;
      getHotelList(params)
        .then((res) => {
          loading.value = false;
          if (isReload) {
            obj.list = res.list;
            // 保存搜索记录
            if (keyword.value && obj.list.length > 0) {
              let ids = obj.list.map((code) => code.id);
              postRecord(ids);
            }
          } else {
            obj.list = [...obj.list, ...res.list];
          }
          totalCount.value = res.total;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const postRecord = async (ids) => {
      const params = {
        hotel_id: ids.join(","),
        user_id: userId.value,
      };
      await postRecordList(params);
    };

    //节流函数
    const delay = (function () {
      var timer = null;
      return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();

    const getValue = () => {
      delay(() => {
        getList(true);
      }, 300);
    };

    getList();
    scrollHandler();

    return {
      keyword,
      loading,
      ...toRefs(obj),
      goDetail,
      getValue,
    };
  },
};
</script>
