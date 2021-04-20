<template>
  <div id="container" class="tmap" style="width: 100%; height:  100%"></div>
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "TMap",
  props: ["lat", "lng"],
  setup({ lat, lng }) {
    onMounted(() => {
      init();
    });
    const init = () => {
      var center = new TMap.LatLng(lat, lng); //设置中心点坐标
      //初始化地图
      let c = document.getElementById("container");
      var map = new TMap.Map(c, { center });

      // //创建并初始化MultiMarker
      var markerLayer = new TMap.MultiMarker({
        map: map, //指定地图容器
        styles: {
          myStyle: new TMap.MarkerStyle({
            width: 35,
            height: 35,
            // src: "", //图片路径 这里不设置，就会使用默认的样式
            anchor: { x: 16, y: 32 },
          }),
        },
        geometries: [
          {
            //点标注数据数组
            id: "demo",
            styleId: "marker",
            position: new TMap.LatLng(lat, lng),
            properties: {
              title: "marker",
            },
          },
        ],
      });
    };

    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>
