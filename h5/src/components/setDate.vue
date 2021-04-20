<style lang="scss">
.w {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  padding-bottom: 1rem;
  .c {
    margin-top: 1rem;
  }
  .wrapper {
    border-radius: 0.2rem;
    width: 7rem;
    background: #fff;
    margin: 0.3rem auto;
  }
  .dis-date {
    display: flex;
    .start-end {
      flex: 1;
      text-align: center;
      padding: 0.3rem;
      .title {
        font-size: 0.28rem;
        color: #919191;
      }
      .subtitle {
        font-size: 0.32rem;
        color: #404040;
        margin-top: 0.2rem;
      }
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 0.3rem;
    .weekday {
      height: 0.6rem;
      display: flex;
      width: 100%;
      .weekday-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .item {
      width: 1rem;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &.outdate {
        color: #999;
      }
      &.select {
        background: $theme_default;
        color: #fff;
        // border-radius: 50%;
      }
    }
    .current-month {
      width: 100%;
      display: flex;
      height: 0.8rem;
      .current-val-month {
        flex: 1;
      }
      .current-opt-month {
        width: 1rem;
        .opt-icon {
          font-size: 0.5rem;
          color: #bfbfbf;
          &.next-icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .next {
    width: 6.9rem;
    background: $theme_default;
    font-size: 0.32rem;
    color: #fff;
    letter-spacing: 3px;
    margin: 0 auto;
  }
}
</style>
<template>
  <div class="w">
    <div class="c">
      <div class="wrapper dis-date">
        <div class="start-end">
          <div class="title">出发</div>
          <div class="subtitle">
            {{!startDate.year ? '请选择': `${startDate.year}年${startDate.month}月${startDate.day}日`}}
          </div>
        </div>
        <div class="start-end">
          <div class="title">返回</div>
          <div class="subtitle">
            {{!endDate.year ? '请选择': `${endDate.year}年${endDate.month}月${endDate.day}日`}}
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="content">
          <div class="current-month">
            <div class="current-opt-month dc" @click="prevMonthHandler">
              <i class="iconfont icon-prev opt-icon"></i>
            </div>
            <div class="current-val-month dc">{{year}}年{{month}}月</div>
            <div class="current-opt-month dc" @click="nextMonthHandler">
              <i class="iconfont icon-prev opt-icon next-icon"></i>
            </div>
          </div>
          <div class="weekday">
            <div class="weekday-item" v-for="(item,index) in week" :key="index">
              {{item}}</div>
          </div>
          <div class="item"
            :class="{'outdate':item.isOutdate,'select':item.isSelect&&!item.isOutdate}"
            v-for="(item,index) in rows[1]" :key="index"
            @click="selectDayHandler(item)">
            {{item.day}}
          </div>
        </div>
        <div class="content">
          <div class="current-month">
            <!-- <div class="current-opt-month dc" @click="prevMonthHandler">
                <i class="iconfont icon-prev opt-icon"></i>
              </div> -->
            <div class="current-val-month dc">{{nextYear}}年{{nextMonth}}月
            </div>
            <!-- <div class="current-opt-month dc" @click="nextMonthHandler">
                <i class="iconfont icon-prev opt-icon next-icon"></i>
              </div> -->
          </div>
          <div class="weekday">
            <div class="weekday-item" v-for="(item,index) in week" :key="index">
              {{item}}</div>
          </div>
          <div class="item"
            :class="{'outdate':item.isOutdate,'select':item.isSelect&&!item.isOutdate}"
            v-for="(item,index) in rows[2]" :key="index"
            @click="selectDayHandler(item)">
            {{item.day}}
          </div>
        </div>
      </div>

      <div class="cbtn next dc" @click="nextHandler">下一步</div>
    </div>
  </div>

</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
  name: "setDate",
  components: {},
  setup(props, { emit }) {
    const obj = reactive({
      week: ["日", "一", "二", "三", "四", "五", "六"],
      rows: [[], [], []], // 四个月的日期
      year: 0, // 当前 年
      month: 0, // 当前 月
      nextYear: "", // 上一年
      nextMonth: "", // 上一月
      prevYear: "", // 下一年
      prevMonth: "", // 下一月
      nextTwoMonth: "", // 下俩月
      nextTwoYear: "", // 下俩年
      count: 0,
      startDate: "", // 起止的日期
      endDate: "", // 起止的日期
    });

    // 选中某一天
    const selectDayHandler = (item) => {
      item.isSelect = true;
      // 计数法
      if (item.isOutdate) {
        return false;
      } else if (obj.count == 0) {
        obj.startDate = item;
        obj.count = obj.count + 1;
      } else if (obj.count == 1) {
        obj.count = obj.count + 1;
        obj.endDate = item;

        // 进行换位操作
        if (
          +new Date(
            `${obj.startDate.year}/${obj.startDate.month}/${obj.startDate.day} 23:59:59`
          ) >
          +new Date(
            `${obj.endDate.year}/${obj.endDate.month}/${obj.endDate.day} 23:59:59`
          )
        ) {
          let temp = obj.endDate;
          obj.endDate = obj.startDate;
          obj.startDate = temp;
          // console.info("反向操作");
        }

        // 进行转化，用户的先选和后选 不确定起止顺序
        var firstDate = `${obj.startDate.year}/${obj.startDate.month}/${obj.startDate.day} 23:59:59`;
        var lastDate = `${obj.endDate.year}/${obj.endDate.month}/${obj.endDate.day} 23:59:59`;

        obj.rows.forEach((item) => {
          item.forEach((el) => {
            let date = `${el.year}/${el.month}/${el.day} 23:59:59`;
            // 取时间差
            if (
              +new Date(firstDate) <= +new Date(date) &&
              +new Date(date) <= +new Date(lastDate)
            ) {
              el.isSelect = true;
            }
          });
        });
      } else if (obj.count == 2) {
        obj.rows.forEach((item) => {
          item.forEach((el) => {
            el.isSelect = false;
          });
        });

        obj.startDate = item;
        obj.endDate = "";
        obj.count = 1;
        item.isSelect = true;
      }
      // console.info("this.count", obj.count);
    };

    // 下一年
    obj.nextYear = computed(() => {
      if (obj.month == 12) {
        return obj.year - 0 + 1;
      } else {
        return obj.year;
      }
    });
    // 下一月
    obj.nextMonth = computed(() => {
      if (obj.month == 12) {
        return 1;
      } else {
        return obj.month - 0 + 1;
      }
    });
    // 下俩年
    obj.nextTwoYear = computed(() => {
      if (obj.month > 10) {
        return obj.year - 0 + 1;
      } else {
        return obj.year;
      }
    });
    // 下俩月
    obj.nextTwoMonth = computed(() => {
      if (obj.month > 10) {
        return obj.month + 2 - 12;
      } else {
        return obj.month - 0 + 2;
      }
    });
    // 上一年
    obj.prevYear = computed(() => {
      if (obj.month == 1) {
        return obj.year - 1;
      } else {
        return obj.year;
      }
    });
    // 上一月
    obj.prevMonth = computed(() => {
      if (obj.month == 1) {
        return 12;
      } else {
        return obj.month - 1;
      }
    });

    // 上月
    const prevMonthHandler = () => {
      if (obj.month == 1) {
        obj.month = 12;
        obj.year = obj.year - 1;
      } else {
        obj.month = obj.month - 1;
      }

      initCalendar(obj.year, obj.month);
    };
    // 下月
    const nextMonthHandler = () => {
      if (obj.month == 12) {
        obj.month = 1;
        obj.year = obj.year - 0 + 1;
      } else {
        obj.month = obj.month - 0 + 1;
      }

      initCalendar(obj.year, obj.month);
    };

    // 相邻4个月天数
    const initCalendar = (year, month) => {
      obj.rows = [
        Array.from(
          new Array(getDayCountOfMonth(obj.prevYear, obj.prevMonth)),
          (n, i) => ({
            day: i + 1,
            month: obj.prevMonth,
            year: obj.prevYear,
            isOutdate: false, // 是否 过期
            isSelect: false, // 是否 选中
          })
        ),

        Array.from(new Array(getDayCountOfMonth(year, month)), (n, i) => ({
          day: i + 1,
          month: month,
          year: year,
          isOutdate: false, // 是否 过期
          isSelect: false, // 是否 选中
        })),

        Array.from(
          new Array(getDayCountOfMonth(obj.nextYear, obj.nextMonth)),
          (n, i) => ({
            day: i + 1,
            month: obj.nextMonth,
            year: obj.nextYear,
            isOutdate: false, // 是否 过期
            isSelect: false, // 是否 选中
          })
        ),

        Array.from(
          new Array(getDayCountOfMonth(obj.nextTwoYear, obj.nextTwoMonth)),
          (n, i) => ({
            day: i + 1,
            month: obj.nextTwoMonth,
            year: obj.nextTwoYear,
            isOutdate: false, // 是否 过期
            isSelect: false, // 是否 选中
          })
        ),
      ];

      let copyDate = [...obj.rows];
      // console.info("copyDate", copyDate);

      //月份 偏移量
      // console.log(1, obj.prevYear, obj.prevMonth);
      // console.log(2, year, month);
      // console.log(3, obj.nextYear, obj.nextMonth);
      obj.offset = [
        offsetDay(obj.prevYear, obj.prevMonth),
        offsetDay(year, month),
        offsetDay(obj.nextYear, obj.nextMonth),
        offsetDay(obj.nextTwoYear, obj.nextTwoMonth),
      ];
      // console.info("offset", obj.offset);

      // 空位补齐

      // 当月 头部补齐
      // 备注：填充量为0，即为空一行（为7个数量）
      let repairHeaderDate = copyDate[0].slice(
        obj.offset[1] == 0 ? -7 : obj.offset[1] * -1
      );
      repairHeaderDate = repairHeaderDate.map((el) => {
        return {
          ...el,
          isOutdate: true,
          month: obj.prevMonth,
          year: obj.prevYear,
        };
      });
      // console.info("repairHeaderDate", repairHeaderDate);
      // 当月 尾部补齐 (42个填充，42-当月天数-头部填充数量)
      let nextDate = copyDate[2].slice(
        0,
        42 - copyDate[1].length - repairHeaderDate.length
      );
      nextDate = nextDate.map((el) => {
        return {
          ...el,
          // 下一个月
          isOutdate: true,
          month: obj.nextMonth,
          year: obj.nextYear,
        };
      });
      obj.rows[1] = [...repairHeaderDate, ...copyDate[1], ...nextDate];

      // 下一月 头部补齐
      // 备注：填充量为0，即为空一行（为7个数量）
      let repairFooterDate = copyDate[1].slice(
        obj.offset[2] == 0 ? -7 : obj.offset[2] * -1
      );
      repairFooterDate = repairFooterDate.map((el) => {
        return {
          ...el,
          isOutdate: true,
          month: obj.month,
          year: obj.year,
        };
      });
      // console.info("repairFooterDate", repairFooterDate);
      // 当月 尾部补齐 (42个填充，42-当月天数-头部填充数量)
      let footerDate = copyDate[3].slice(
        0,
        42 - copyDate[2].length - repairFooterDate.length
      );
      footerDate = footerDate.map((el) => {
        return {
          ...el,
          // 下一个月
          isOutdate: true,
          month: obj.nextTwoMonth,
          year: obj.nextTwoYear,
        };
      });
      obj.rows[2] = [...repairFooterDate, ...copyDate[2], ...footerDate];

      // console.log(999, obj.rows);

      isOutdateHandler();
    };

    // 是否显示过期时间
    const isOutdateHandler = () => {
      obj.rows.forEach((item, index) => {
        // console.info(item);
        item.forEach((el, elindex) => {
          // ios 不会识别 00:00:00 这样的写法 和 日期需要使用的‘/’的连接符
          let date = `${el.year}/${el.month}/${el.day} 23:59:59`;

          if (+new Date(date) > +new Date()) {
            if (item[15].month == el.month) {
              // console.info("当月", date, el.isOutdate);
              el.isOutdate = false;
            } else {
              el.isOutdate = true;
              // console.info("兄弟月", date, el.isOutdate);
            }
          } else {
            // console.info("上一跃", date, el.isOutdate);
            el.isOutdate = true;
          }
        });
      });

      // console.info("rows[1]", this.rows);
    };

    // 偏移量
    const offsetDay = (y, m) => {
      let offset = getFirstDayOfMonth(y, m, 1);
      // console.info("偏移量", y, m, 1, offset);
      return offset;
    };

    // 获取每个月的1号是周几 (0-6,0代表星期天)
    const getFirstDayOfMonth = (y, m, d) => {
      return new Date(`${y}/${m}/${d}`).getDay();
    };

    // 每个月多少天
    const getDayCountOfMonth = (year, month) => {
      let a = new Date(year, month, 0).getDate();
      // console.log("每个月多少天", year, month, a);
      return a;
    };

    const init = () => {
      // 初始化当前时间
      const date = new Date();

      obj.year = date.getFullYear();
      obj.month = date.getMonth() + 1;
      // obj.year = 2021;
      // obj.month = 12;

      // console.info(333, obj.year, obj.month);
      initCalendar(obj.year, obj.month);
    };

    init();

    const nextHandler = () => {
      emit("selected", {
        startDate: obj.startDate,
        endDate: obj.endDate,
      });
    };

    return {
      ...toRefs(obj),
      prevMonthHandler,
      nextMonthHandler,
      selectDayHandler,
      nextHandler,
    };
  },
};
</script>
