<style lang='scss' scoped>
.s {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.1rem;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAiCAMAAAAAh4u3AAAAk1BMVEUAAAAcHBwyMjIyMjIyMjIqKiozMzMzMzMyMjIyMjIxMTEzMzMyMjIyMjIyMjIyMjIxMTExMTEyMjIyMjIyMjIyMjIyMjIwMDAwMDAyMjIyMjIyMjIwMDAxMTEwMDAyMjIyMjIxMTExMTExMTEyMjIvLy8zMzMyMjIyMjIxMTEyMjIxMTEtLS0yMjIzMzMyMjIzMzO5DYebAAAAMHRSTlMABOvcRAro2J9eFOLMr5ZOPjf1v7akcyIQiINqMSkZxql4Y1QtJh6akH5XUxzu0qiSBX7YAAABLUlEQVQ4y42TB5KDMAxFbUNsOpjeW0L6lvufboHsboJtTDTDCMMbSXx9ABsJ0SDYiiCO8i3GU6CBjA1Ii8erkzNzldKUT3U5zXPpMqbGyZQoTiWQEz/yOZQ03P2+g2G7A5sBNaKC7bgqVkz/y6W9Ywck5IupjuX7mNg9BIPiFDevgitD1tWeeOMeUnnfgzkC50a6KordKWXKYZ1xkfu40dHq5+rPAuoatTeT50HFtYg5ovL1mH+JoOiy1ANXokLMAjOBsQuN9bYl6Kazvv3gocZjn3zzkFWym/R5KGTVGxQeOhWstjYP9ZH4F6B5QExL02eBEpOBPum0ckvJ1CqhhY2yyWXmsIR8CO4hcf8MenfQKJJ9XRoaGR3uXj1cBs3NZtRsfe3I+i1qa/B+/AC1NQ9C0gGBsAAAAABJRU5ErkJggg==")
    no-repeat center center;
  background-size: cover;
  cursor: pointer;
  &.active {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAMAAADiW5DOAAAAgVBMVEUAAAD/Sy3/Sy3/Sy3/OiP/TC3/Si3/TCz/SCz/Sy3/Sy3/Syz/SSj/RiX/Sy3/Sy3/Sy3/Sy3/Sy7/Sy3/Sy3/Syz/Si3/Siv/Sin/SSv/OR3/Sy3/Sy3/Sy7/Sy3/Sy3/Syz/Sy3/Syz/Syz/Sy7/Sy3/Siz/TC7/TCz/QCb/TC45n2HWAAAAKnRSTlMA+ee/C/SiijTfzV4bD+zU0ci4pZSDTSwnIQf8rZeOd2dkUlCcmW5UQBQ7h2dZAAAA6klEQVQ4y42T2RKCMAxFUypQFnFhE0RUcM3/f6DAoEgM1PPWmdNOe3sDlKvxAA0VorHUOGtEPM4rChucecfClnpO8UXnbDTHdJynlRP2mCnw7CR+MBRnLGyBX4h4AZS7g4QgSvz3/sq2tq6JLCJwpO03weqQsNI6MShTo2xzAGXMKlbefcD0lYYOLOWkchvyc5EngoGMv7gzytpGAvP9GZsyKTaJkq1awTghcQ6Mc2FaSimIw8W4Ik7AOPvxu1LkSLiJMENPZWlS9lUof58l4me/zL3OkiMnbMu0G43JnoboCbem4xa5HvzNC59iXI+UN5RRAAAAAElFTkSuQmCC");
  }
}
</style>
<template>
  <div class="star">
    <span v-for="(item, index) in [1,2,3,4,5]" :key="index" class="s"
      :class="{'active':index < count}"></span>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    count: {
      type: Number,
      default: (val) => {
        if (val > 5) {
          return 5;
        } else if (val < 1) {
          return 1;
        } else {
          return parseInt(val);
        }
      },
    },
  },
});
</script>


