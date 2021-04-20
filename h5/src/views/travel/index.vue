<style lang="scss" scoped>
.travel {
  background: #f5f5f5;
  box-sizing: border-box;
  padding-top: 0.5rem;
  flex: 1;
}
.header {
  display: flex;
  width: 6.8rem;
  height: 0.9rem;
  background: #fff;
  border-radius: 0.45rem;
  margin: 0 auto;
  .header-item {
    flex: 1;
    color: #919191;
    font-weight: bold;
    transition: all 0.3 ease;
    &.active {
      color: $theme_default;
    }
  }
}
.list-item {
  padding: 0.3rem;
}
</style>
<template>
  <div class="travel">

    <noauth v-if="!userId"></noauth>

    <header class="header" v-if="userId">
      <div class="header-item dc" v-theme="activeIndex == 1"
        @click="selectIndex(1)">
        最近预定
      </div>
      <!-- <div class="header-item dc" :class="{'active': activeIndex== 2}"
        @click="selectIndex(2)">已完成</div> -->
      <div class="header-item dc" v-theme="activeIndex == 3"
        @click="selectIndex(3)">
        喜欢</div>
    </header>

    <div class="content" v-if="userId">
      <div class="list-item" v-if="activeIndex==1">
        <empty v-if="orderList.length === 0"></empty>
        <item v-if="userId" :item.sync="item" v-for="item in orderList"></item>
      </div>
      <!-- <div class="list-item" v-if="activeIndex==2">
        <item v-for="item in [1]"></item>
      </div> -->
      <div class="list-item" v-if="activeIndex==3">
        <empty v-if="likeList.length === 0"></empty>
        <list v-for="item in likeList" :item.sync="item.hotel"></list>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import item from "../../components/item";
import list from "../../components/list";

import { getLikeList } from "../../assets/api/hotel";
import { getOrderList } from "../../assets/api/order";
export default {
  name: "travel",
  components: {
    item,
    list,
  },
  setup(props) {
    const store = useStore();
    const activeIndex = ref(1);
    const userId = computed(() => store.getters.userInfo.userId);
    const selectIndex = (index) => {
      activeIndex.value = index;
      if (index == 3) {
        getLikelist();
      }
    };

    const obj = reactive({
      orderList: [],
      likeList: [],
    });

    const getList = async () => {
      if (userId.value) {
        await getOrderList({
          user_id: userId.value,
          pageIndex: 1,
          pageSize: 1000,
        }).then((res) => {
          obj.orderList = res.list;
        });
      }
    };

    const getLikelist = async () => {
      if (userId.value) {
        await getLikeList({ user_id: userId.value }).then((res) => {
          obj.likeList = res;
        });
      }
    };

    getList();

    return {
      userId,
      activeIndex,
      ...toRefs(obj),
      selectIndex,
    };
  },
};
</script>
