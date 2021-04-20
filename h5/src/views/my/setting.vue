<style lang="scss" scoped>
.color-content {
  flex-wrap: wrap;
  display: flex;
  padding: 0.5rem 0.3rem;
  .out {
    width: 1.9rem;
    height: 1rem;
    border: 1px solid transparent;
    padding: 0.1rem;
    margin: 0.1rem 0.08rem;
    border-radius: 0.08rem;
  }
  .box {
    height: 100%;
    width: 100%;
    border-radius: 0.04rem;
  }
}

.modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  background: rgba($color: #000000, $alpha: 0.5);
  .modal-content {
    width: 6.9rem;
    background: #fff;
    border-radius: 0.1rem;
    position: relative;
    .modal-close {
      width: 1rem;
      height: 1rem;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .modal-title {
    text-align: center;
    padding: 0.4rem 0;
    color: #333;
    font-size: 0.32rem;
    font-weight: 500;
  }

  .submit {
    width: 4rem;
    height: 0.9rem;
    border-radius: 0.1rem;
    border: 1px solid #ccc;
    color: #333;
    margin: 0.4rem auto;
  }
  .color {
    margin: 0 auto;
    display: block;
    height: 1rem;
    width: 2rem;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  width: 100%;
  color: #fff;
}
</style>
<template>
  <div class="color-content">

    <div class="out" v-for="item in list" @click="selectItem(item)"
      :style="`border-color: ${activeIndex == item ? item : ''}`">
      <div class="box dc" :style="`background: ${item}`">
        {{item}}
      </div>
    </div>

    <div class="out"
      :style="`border-color: ${activeIndex == 123 && customColor}`">
      <div class="box dc" @click="open" :style="`background: ${customColor}`">
        {{customColor ? customColor+'自定义' : '自定义'}}</div>
    </div>

    <div class="modal dc" v-show="show">
      <div class="modal-content">
        <div class="modal-close dc" @click="close">X</div>
        <div class="modal-title">自定义主题</div>
        <input class="color" type="color" id="myColor">
        <div class="submit dc" @click="getValue">确定</div>
      </div>
    </div>

    <div class="footer dc" @click="changeColor"
      :style="`background: ${currentColor}`">更换主题</div>

  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { showToast } from "../../assets/scripts/tools";

export default {
  name: "blank",
  components: {},
  setup(props) {
    const store = useStore();
    const currentColor = computed(() => store.getters.currentColor);
    const customColor = ref("");
    const show = ref(false);
    const activeIndex = ref(currentColor.value);
    const list = [
      "#13c2c2",
      "#e8692f",
      "#e83a30",
      "#e72f8c",
      "#892fe8",
      "#4030e8",
      "#3080e8",
      "#2de8bd",
      "#31c9e8",
      "#31e749",
      "#a4e82f",
      "#e8e22f",
      "#e7b72f",
      "#e88c30",
      "#c67d54",
      "#269ea1",
      "#143192",
      "#ffa4a4",
    ];

    // watch(
    //   () => activeIndex.value,
    //   (n, o) => {
    //     console.info(234, n, o);
    //   }
    // );

    const getValue = () => {
      customColor.value = document.getElementById("myColor").value;
      show.value = false;
    };

    const open = () => {
      activeIndex.value = 123;
      if (customColor.value) {
        document.getElementById("myColor").value = customColor.value;
      }

      show.value = true;
    };

    const selectItem = (e) => {
      activeIndex.value = e;
    };

    const close = (e) => {
      show.value = false;
    };

    const changeColor = () => {
      let color = "";
      if (activeIndex.value != 123) {
        color = activeIndex.value;
      } else {
        color = customColor.value;
      }
      store.commit("setSkinColor", color);
      showToast({ title: "修改成功" });
    };

    return {
      currentColor,
      list,
      customColor,
      getValue,
      show,
      open,
      close,
      selectItem,
      activeIndex,
      changeColor,
    };
  },
};
</script>
