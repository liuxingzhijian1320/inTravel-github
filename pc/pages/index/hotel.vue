<style lang="scss" scoped>
$hoverColor: #0185f2;

.hotel {
  min-height: 100vh;
  background: #eff1f4;
}

.tabs-banner {
  height: 60px;
  background: #fff;
  .tabs-banner-list {
    display: flex;
  }
  .tab {
    height: 100%;
    line-height: 60px;
    position: relative;
    font-size: 16px;
    font-weight: 400;
    color: #222;
    margin-right: 40px;
    cursor: pointer;
    &.active {
      color: $hoverColor;
      font-weight: 500;
    }
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding: 60px 0;
  position: relative;
  .loading-div {
    position: absolute;
    left: 50%;
    top: 10px;
    font-size: 14px;
    transform: translateX(-50%);
    color: #999;
  }
  .box {
    background: #fff;
    margin: 0 30px 30px 0;
    transition: box-shadow 0.3s, transform 0.3s;
    transform: translateY(0);
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-5px);
      opacity: 0.9;
    }
    .info {
      padding: 30px 10px 10px 10px;
    }
    .cover {
      width: 370px;
      height: 200px;
      background-size: 370px 200px;
      background-position: center;
      overflow: hidden;
    }
    .title {
      font-size: 20px;
      font-weight: 500;
      color: #222;
      line-height: 28px;
      width: 350px;
      overflow: hidden;
      &:hover {
        color: $hoverColor;
      }
    }
    .address {
      font-size: 14px;
      font-weight: 400;
      color: #999;
      line-height: 20px;
      margin-top: 5px;
      display: flex;
      .address-desc {
        display: inline-block;
        flex: 1;
      }
    }
  }
}
</style>
<template>
  <div class="hotel">
    <mySwiper></mySwiper>
    <div class="tabs-banner">
      <ul class="layout tabs-banner-list">
        <li class="tab" v-for="item in list" @click="selectItem(item)"
          :key="item.title" :class="{'active': item.checked}">{{item.title}}
        </li>
      </ul>
    </div>
    <div class="content layout">
      <div class="loading-div" v-if="loading">加载中...</div>
      <nuxt-link class="box" v-for="(item, index) in hotelList" :key="index"
        :to="`/detail?id=${item.id}`">
        <div class="hotel-item">
          <div class="cover" :style="`backgroundImage: url(${item.cover})`">
          </div>
          <div class="info">
            <div class="title of1">
              {{item.title}}
            </div>
            <div class="address">
              <span class="address-desc">{{item.province}} {{item.city}}
                {{item.district}}</span>
              <span>评分：</span>
              <span>{{item.grade}}分</span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getHotelList } from '../../assets/api/hotel'
import mySwiper from '../../components/mySwiper'
export default {
  components: { mySwiper },
  scrollToTop: true,
  data() {
    return {
      list: [
        { title: '全部', checked: true, type: '' },
        { title: '最火', checked: false, type: 'hot' },
        { title: '最实惠', checked: false, type: 'lower' },
      ],
      loading: false,
    }
  },
  async asyncData(ctx) {
    return await getHotelList().then((res) => {
      return {
        hotelList: res.list,
      }
    })
  },

  methods: {
    selectItem(item) {
      this.list.forEach((code) => {
        code.checked = false
        if (item.title === code.title) {
          code.checked = true
          this.getData(code.type)
        }
      })
    },
    async getData(type) {
      let params = {
        pageIndex: 1,
        pageSize: 100,
        type,
      }
      this.loading = true
      await getHotelList(params)
        .then((res) => {
          this.hotelList = res.list
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    // console.log(2, process.browser)
    // getHotelList().then((res) => {
    //   console.log(14, res)
    //   this.hotelList = res.list
    // })
  },
}
</script>


