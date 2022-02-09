
<style lang="scss" scoped>
.list {
  display: flex;
  width: 820px;
  height: 300px;
  margin: 0 auto;
  .left {
    width: 400px;
    background-image: url('../../assets/images/2.jpeg');
    background-size: 400px 300px;
    background-position: center;
    position: relative;
    &:hover {
      background-size: 800px;
      transition: all 0.3s ease;
    }
  }
  .right {
    width: 400px;
    margin-left: 10px;
    .top-btn-bottom {
      height: 145px;
      width: 100%;
      position: relative;
      &:hover {
        background-size: 500px;
        transition: all 0.3s ease;
      }
    }
    .top {
      margin-bottom: 10px;
      background-image: url('../../assets/images/1.jpeg');
      background-size: 100%;
      background-position: center bottom;
    }
    .bottom {
      margin-bottom: 10px;
      background-image: url('../../assets/images/3.jpeg');
      background-size: 100%;
      background-position: center bottom;
    }
  }
  .box {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    color: #fff;
    padding: 30px;
    text-align: center;
    .title {
      font-size: 22px;
      margin-bottom: 10px;
    }
    .subtitle {
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}
.event-list {
  display: flex;
  flex-wrap: wrap;
  width: 820px;
  margin: 0 auto;
  padding-bottom: 100px;
  .event-item {
    width: 400px;
    margin-bottom: 20px;
    height: 200px;
    background: red;
    position: relative;
    background-size: 400px 200px;
    &:nth-child(2n) {
      margin-left: 20px;
    }
    &.one {
      background-image: url('../../assets/images/5.jpeg');
    }
    &.two {
      background-image: url('../../assets/images/6.jpeg');
    }
    &.three {
      background-image: url('../../assets/images/4.jpeg');
    }
    &.four {
      background-image: url('../../assets/images/7.jpeg');
    }
    .event-mask {
      padding: 10px;
      position: absolute;
      left: 0;
      width: 200px;
      top: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
    }
    .event-title {
      font-size: 20px;
      color: #333;
      margin: 20px 0;
    }
    .event-subtitle {
      font-size: 16px;
      color: #333;
      line-height: 1.4;
    }
  }
}
</style>

<template>
  <div>
    <Banner></Banner>
    <Title :title="'热门景点'" :subtitle="'Popular View'"></Title>
    <div class="list">
      <div class="left">
        <div class="box">
          <div class="title">三亚亚特兰蒂斯</div>
          <div class="subtitle">漫步于沙滩，吹着海风</div>
        </div>
      </div>
      <div class="right">
        <div class="top-btn-bottom top">
          <div class="box">
            <div class="title">云南</div>
            <div class="subtitle">丽江+大理+香格里拉+泸沽湖</div>
          </div>
        </div>
        <div class="top-btn-bottom bottom">
          <div class="box">
            <div class="title">成都</div>
            <div class="subtitle">吃着火锅，看着大熊猫</div>
          </div>
        </div>
      </div>
    </div>
    <Title :title="'最新活动'" :subtitle="'New Events'"></Title>
    <ul class="event-list">
      <li class="event-item one">
        <div class="event-mask">
          <div class="event-title">【观赏樱花胜地】</div>
          <div class="event-subtitle">
            盼望着，盼望着，一年一度的樱花季终于来到了。樱花树下的武汉，瞬间变成了全国最浪漫的城市！</div>
        </div>
      </li>
      <li class="event-item two">
        <div class="event-mask">
          <div class="event-title">【郁金香盛会】</div>
          <div class="event-subtitle">
            上万株的郁金香等各色春季花卉遍布园内，让您琳瑯满目！
          </div>
        </div>
      </li>
      <li class="event-item three">
        <div class="event-mask">
          <div class="event-title">【安塞腰鼓】</div>
          <div class="event-subtitle">
            “一群茂腾腾的后生”，“朴实得就像那片高粱”，在“黄土高原上，爆出一场多么壮阔、多么豪放、多么火烈的舞蹈！
          </div>
        </div>
      </li>
      <li class="event-item four">
        <div class="event-mask">
          <div class="event-title">【云南歌舞】</div>
          <div class="event-subtitle">
            艺术的气息，传统文化的展现
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Banner from '../../components/banner.vue'
import Title from '../../components/title.vue'
export default {
  components: {
    Banner,
    Title,
  },
  data() {
    return {}
  },
  mounted() {},
}
</script>
