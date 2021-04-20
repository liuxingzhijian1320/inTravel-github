<style lang="scss">
.comment {
  padding: 0.3rem 0.3rem 2rem 0.3rem;
  .btn {
    color: #101010;
    font-size: 0.32rem;
    text-decoration: underline;
    padding-bottom: 0.5rem;
  }
  .write {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    // background: $theme_default;
    position: fixed;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    // box-shadow: 0 0 0.2rem $theme_default;
  }
  .icon {
    font-size: 0.8rem;
    color: #fff;
  }
  .no-data {
    text-align: center;
    color: #999;
    padding-top: 3rem;
  }
}

.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-from {
  transform: translateX(100%);
}
</style>
<template>
  <div class="comment">
    <div class="btn no-data" v-if="list.length === 0">快快写上您的评论吧～</div>
    <commentitem v-for="item in list" :item.sync="item">
      <div class="btn" @click="commentHandler(item)">评论</div>
    </commentitem>
    <div class="write dc" v-theme-bg v-theme-boxshadow="['0', '0', '0.2rem']"
      @click="commentHandler()">
      <i class="iconfont icon-post icon"></i>
    </div>
    <transition name="slide">
      <post v-if="modelShow" :hotel_id="hotel_id" @close="close"></post>
    </transition>
  </div>
</template>

<script>
import commentitem from "../../components/commentitem.vue";
import post from "../../components/post.vue";
import { useStore } from "vuex";
import { reactive, toRefs, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getCommentList } from "../../assets/api/comment";
import { showMessage } from "../../assets/scripts/tools";

export default {
  name: "hotel_comment",
  components: {
    commentitem,
    post,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const userId = computed(() => store.getters.userInfo.userId);
    const hotel_id = ref(0);

    const commentHandler = (item = {}) => {
      if (!userId.value) {
        showMessage({
          content: "您还未登录",
          cancleText: "关闭",
          okText: "登录",
        }).then(() => {
          router.push("/auth");
        });
      } else {
        store.commit("setShowStatus", true);
        store.commit("setModelData", item);
      }
    };
    const obj = reactive({ list: [], itemActive: {} });
    hotel_id.value = route.query.hotel_id;

    const getList = () => {
      const fetchParams = {
        hotel_id: hotel_id.value,
        pageIndex: 1,
        pageSize: 200,
      };
      getCommentList(fetchParams).then((res) => {
        obj.list = res.list;
      });
    };

    getList();

    const close = (val) => {
      if (val) {
        getList();
      }
    };

    return {
      ...toRefs(obj),
      commentHandler,
      hotel_id,
      close,
      modelShow: computed(() => store.getters.modelShow),
    };
  },
};
</script>

