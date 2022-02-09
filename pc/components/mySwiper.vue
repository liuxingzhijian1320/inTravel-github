<style lang="scss" scoped>
.swiper {
  // height: 300px;
  width: 100%;
  height: 600px;
  .red {
    background-size: 100% 600px;
    background-position: center;
    background-size: cover;
  }
}
</style>
<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide red" v-for="item in list" :key="item"
        :style="`backgroundImage:url(${item})`"></div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        speed: 1000,
      },
      list: [
        require('../assets/images/b_1.jpeg'),
        require('../assets/images/b_2.jpeg'),
        require('../assets/images/b_3.jpeg'),
        require('../assets/images/b_4.jpeg'),
      ],
    }
  },
  mounted() {},
}
</script>


