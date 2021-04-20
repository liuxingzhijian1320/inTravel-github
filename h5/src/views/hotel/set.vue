<style lang="scss">
.set {
  height: 100vh;
  width: 100%;
  .bg {
    display: block;
    filter: blur(61.4px);
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="set ">
    <img class="bg" src="../../assets/images/bg.jpg" alt="">
    <setDate v-if="show === 1" @selected="getEmitDate"></setDate>
    <setRoom v-if="show === 2" @selectedRoom="getEmitRoom"></setRoom>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { reactive, toRefs, ref, computed } from "vue";
import { useStore } from "vuex";
import setDate from "../../components/setDate";
import setRoom from "../../components/setRoom";
import { createOrder } from "../../assets/api/order";
import { showMessage, showToast } from "../../assets/scripts/tools";

export default {
  name: "setT",
  components: { setDate, setRoom },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const userId = computed(() => store.getters.userInfo.userId);
    if (!userId.value) {
      showMessage({
        content: "你还未登录，暂时无法操作",
        okText: "去登录",
      }).then(() => {
        router.push("/auth");
      });
      return;
    }
    const show = ref(1);
    const { hotel_id, room_id } = route.query;

    let formData = {
      hotel_id: +hotel_id,
      user_id: userId.value,
      room_id: +room_id,
      start: "",
      end: "",
      people: "",
      rooms: "",
    };

    const getEmitDate = (t) => {
      formData.start = t.startDate.year
        ? `${t.startDate.year}/${t.startDate.month}/${t.startDate.day}`
        : "";
      formData.end = t.endDate.year
        ? `${t.endDate.year}/${t.endDate.month}/${t.endDate.day}`
        : "";

      if (formData.start && formData.end) {
        show.value = 2;
      } else {
        showToast({ title: "请选择住房时间", position: "center" });
      }
    };

    const getEmitRoom = async (t) => {
      formData.rooms = t.rooms;
      formData.people = t.people;

      await createOrder(formData).then((res) => {
        showToast({ title: "下单成功" });
        router.push(`/order/detail?id=${res.order_id}`);
      });
    };

    return {
      show,
      getEmitDate,
      getEmitRoom,
    };
  },
};
</script>
