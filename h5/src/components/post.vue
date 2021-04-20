<style lang="scss" scoped>
.post {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: #fff;
  overflow: hidden;
  z-index: 100;
  .back {
    width: 1.5rem;
    height: 1.2rem;
  }
  .back-icon {
    position: absolute;
    top: 0.2rem;
    left: 0.4rem;
    transform: rotate(180deg);
    color: #404040;
    font-size: 0.6rem;
  }
  .c_title {
    font-size: 0.36rem;
    color: #404040;
    text-align: center;
  }
  .title {
    padding: 1rem 0.3rem;
  }
  .title-cb {
    padding: 1rem 0.3rem 0.2rem 0.3rem;
  }
  .subtitle {
    text-align: center;
    font-size: 0.3rem;
    color: #999;
  }
  .textarea {
    display: inline-block;
    width: 6.9rem;
    margin: 0.3rem;
    box-sizing: border-box;
    border: 1px solid #dfdfdd;
    padding: 0.2rem;
    border-radius: 0.1rem;
    outline: none;
  }
  .submit {
    width: 6.9rem;
    color: #fff;
    // background: $theme_default;
    font-size: 0.32rem;
    margin: 0.5rem auto;
  }
}
</style>
<template>
  <div class="post" @touchmove.prevent>
    <div class="back" @click="backHandler">
      <i class="iconfont icon-back back-icon"></i>
    </div>
    <div class="c_title title" v-if="!(modelData.id)">留下您的足迹</div>

    <div class="c_title title-cb" v-if="modelData.id">
      回复：{{modelData.user.nickname}}</div>
    <div class="subtitle" v-if="modelData.id">当前评论: {{modelData.content}}</div>

    <textarea class="textarea" cols="30" rows="10"
      v-model.trim="content"></textarea>
    <div class="submit cbtn dc" v-theme-bg @click="submit">
      发表
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { createComment, createReply } from "../assets/api/comment";
import { showToast } from "../assets/scripts/tools";

export default {
  components: {},
  props: ["hotel_id"],

  setup(props, { emit }) {
    const store = useStore();
    const userId = computed(() => store.getters.userInfo.userId);
    const content = ref("");
    const modelData = computed(() => store.getters.modelData).value;

    const backHandler = () => {
      store.commit("setShowStatus", false);
    };

    const submit = () => {
      if (!modelData.id) {
        // 顶层评论
        const params = {
          hotel_id: +props.hotel_id,
          content: content.value,
          user_id: userId.value,
        };
        createComment(params).then((res) => {
          showToast({ title: res.message });
          store.commit("setShowStatus", false);
          emit("close", true);
          content.value = "";
        });
      } else {
        // 二级评论
        const params = {
          comment_id: modelData.id,
          content: content.value,
          from_id: userId.value,
          to_id: modelData.user.id,
        };
        createReply(params).then((res) => {
          showToast({ title: res.message });
          store.commit("setShowStatus", false);
          emit("close", true);
          content.value = "";
        });
      }
    };

    return {
      backHandler,
      submit,
      content,
      modelData,
    };
  },
};
</script>


