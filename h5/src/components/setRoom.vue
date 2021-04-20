<style lang="scss">
.setRoom {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .wrapper {
  }
  .content {
    border-radius: 0.2rem;
    width: 6.8rem;
    background: #fff;
    margin: 0.3rem auto;
    padding-bottom: 0.6rem;
    .input-div {
      padding: 0.4rem 0.7rem;
      font-size: 0.32rem;
      color: #404040;
      display: flex;
      .label {
        flex: 1;
      }
      .val {
        text-align: right;
        display: flex;
      }
      .icon {
        font-size: 0.5rem;
      }
      span {
        margin: 0.1rem 0.3rem;
      }
    }
  }

  .next {
    width: 6rem;
    // background: $theme_default;
    font-size: 0.32rem;
    color: #fff;
    letter-spacing: 3px;
    margin: 0.6rem auto 0rem auto;
  }
}
</style>
<template>
  <div class="setRoom dc">
    <div class="wrapper">
      <div class="content">
        <div class="input-div px1">
          <div class="label">房间数</div>
          <div class="val">
            <i class="iconfont icon-plus icon" @click="optHandler(1)"></i>
            <span>{{rooms}}</span>
            <i class="iconfont icon-add icon" @click="optHandler(2)"></i>
          </div>
        </div>
        <div class="input-div px1">
          <div class="label">人数</div>
          <div class="val">
            <i class="iconfont icon-plus icon" @click="optHandler(3)"></i>
            <span>{{people}}</span>
            <i class="iconfont icon-add icon" @click="optHandler(4)"></i>
          </div>
        </div>
        <div class="cbtn next dc" v-theme-bg @click="nextHandler">
          下订单</div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
import { showToast } from "../assets/scripts/tools";

export default {
  name: "setRoom",
  components: {},
  setup(props, { emit }) {
    const obj = reactive({
      rooms: 1,
      people: 1,
    });

    const optHandler = (index) => {
      if (index === 1) {
        if (obj.rooms <= 1) {
          showToast({ title: "不能再少啦" });
        } else {
          obj.rooms--;
        }
      } else if (index === 2) {
        if (obj.rooms >= 10) {
          showToast({ title: "最多预定10个房间" });
        } else if (obj.rooms >= 1 && obj.rooms < 10) {
          obj.rooms++;
        }
      } else if (index === 3) {
        if (obj.people <= 1) {
          showToast({ title: "不能再少啦" });
        } else {
          obj.people--;
        }
      } else if (index === 4) {
        if (obj.people >= 10) {
          showToast({ title: "最多预定20人" });
        } else if (obj.people >= 1 && obj.people < 10) {
          obj.people++;
        }
      }
    };

    const nextHandler = () => {
      emit("selectedRoom", {
        ...obj,
      });
    };

    return {
      ...toRefs(obj),
      optHandler,
      nextHandler,
    };
  },
};
</script>
