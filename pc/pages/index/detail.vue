<style lang="scss" scoped>
.detail {
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
}
.content {
  border-radius: 4px;
  background: #fff;
  margin: 10px auto;
  padding-top: 100px;
  .info {
    display: flex;
    height: 1000px;
    .message {
      flex: 1;
      padding-left: 30px;
    }
  }
  .cover {
    width: 500px;
  }
  .title {
    font-size: 20px;
    color: #0f294d;
  }
  .address {
    margin: 10px 0;
    color: #455873;
    letter-spacing: 0;
    line-height: 18px;
  }
}
</style>
<template>
  <div class="detail" v-if="detail && detail.title">
    <div class="content layout">
      <div class="info">
        <img class="cover" :src="detail.cover" alt="">
        <div class="message">
          <h2 class="title">{{detail.title}}(评分：{{detail.grade}}分)</h2>
          <h4 class="address">
            {{detail.province}},{{detail.city}},{{detail.district}}
            {{detail.address}}</h4>
          <div class="desc">介绍：{{detail.desc}}</div>
        </div>
      </div>
      <div>
        <div class="item" v-for="item in roomList">
          <img :src="item.cover" alt="">
          <div>{{item.max}}人</div>
          <div>{{item.max}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotelDetail, getRoomList } from '../../assets/api/hotel'
export default {
  components: {},
  data() {
    return {
      loading: false,
    }
  },
  async asyncData({ query }) {
    return await getHotelDetail({ id: query.id }).then(async (res) => {
      console.log(333, res)
      return await getRoomList({ hotel_id: res.id }).then((m) => {
        console.log(123, m)
        return {
          detail: res,
          roomList: m.list,
        }
      })
    })
  },
  methods: {},
}
</script>


