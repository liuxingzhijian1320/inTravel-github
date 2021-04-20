<style lang="scss" scoped>
.comment-item {
  margin-bottom: 0.3rem;
  .comment-info {
    display: flex;
    margin-bottom: 0.3rem;
  }
  .comment-avatar {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: red;
  }
  .comment-msg {
    // padding-left: 0.3rem;
    padding-top: 0.2rem;
    flex: 1;
  }
  .comment-name {
    color: #404040;
    font-size: 0.34rem;
    font-weight: bold;
  }
  .comment-date {
    color: #bfbfbf;
    font-size: 0.28rem;
    margin-top: 0.1rem;
  }
  .comment-count {
    padding-top: 0.2rem;
  }
  .comment-grade {
    color: #404040;
    text-align: right;
  }
  .comment-star {
  }
  .comment-value {
    text-align: justify;
    color: #919191;
    padding-bottom: 0.4rem;
  }
}
.second-box {
  padding: 0 0.3rem 0 0.7rem;

  .second-info {
    display: flex;
    .second-avatar {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: red;
    }
    .second-msg {
      flex: 1;
      // padding-left: 0.3rem;

      .second-nickname {
        color: #404040;
        font-size: 0.3rem;
        margin-top: 0.05rem;
      }
      .second-time {
        color: #bfbfbf;
        font-size: 0.26rem;
      }
    }
  }
  .second-desc {
    // padding-left: 0.3rem;
    margin-top: 0.2rem;
    text-align: justify;
    color: #919191;
    padding-bottom: 0.4rem;
  }
}
</style>
<template>
  <div class="comment-item px1">
    <div class="comment-info">
      <!-- <div class="comment-avatar"></div> -->
      <div class="comment-msg">
        <div class="comment-name">{{item.user.nickname}}</div>
        <div class="comment-date">{{  $filters.friendlyDate(item.create_time) }}
        </div>
      </div>
      <!-- <div class="comment-count">
        <div class="comment-grade">8.0</div>
        <div class="comment-star">
          <star></star>
        </div>
      </div> -->
    </div>
    <div class="comment-value">{{item.content}}</div>
    <div class="second" v-if="item.replyList.length>0">
      <div class="second-box" v-for="code in item.replyList" :key="code.id">
        <div class="second-info">
          <!-- <div class="second-avatar"></div> -->
          <div class="second-msg">
            <div class="second-nickname">
              {{code.from_user.nickname}}@{{code.to_user.nickname}}</div>
            <div class="second-time">{{$filters.friendlyDate(code.create_time)}}
            </div>
          </div>
        </div>
        <div class="second-desc">{{code.content}}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import star from "./star";
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
};
</script>


