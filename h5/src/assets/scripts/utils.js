export function pad(num, n) {
  var i = (num + "").length;
  while (i++ < n) num = "0" + num;
  return num;
}

// 日期
export function formatDate(time, type = "") {
  let date = new Date(time);

  let year = date.getFullYear(),
    month = pad(pad(date.getMonth() + 1), 2), // 月份是从0开始的
    day = pad(date.getDate(), 2),
    hour = pad(date.getHours(), 2),
    min = pad(date.getMinutes(), 2),
    sec = pad(date.getSeconds(), 2);

  if (type == "YYYY/MM/DD hh:mm:ss") {
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
  }

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

export function validateMail(mail) {
  //校验邮箱
  if (mail != "") {
    var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!strRegex.test(mail)) {
      return false;
    }
  }
  return true;
}

// 防抖 window.onscroll
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
export function debounce(fn, delay) {
  let timer = null; //借助闭包
  return function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(fn, delay); // 简化写法
  };
}
// 节流 (throttle)
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
export function throttle(fn, delay = 100) {
  //首先设定一个变量，在没有执行我们的定时器时为null
  let timer = null;
  return function() {
    //当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

export function judgerColorRule(c) {
  if (!c) {
    return false;
  }
  const arr = c.split("#");
  let reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
  return !reg.test(arr[1]);
}

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 * stringTime为:年-月-日 时:分:秒
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function friendlyFormatTime(stringTime) {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let month = day * 30;
  let time1 = new Date().getTime(); //当前的时间戳
  let time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
  let time = time1 - time2;

  let result = null;
  if (time < 0) {
    result = "刚刚";
  } else if (time / month >= 1) {
    result = parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
    result = parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
    result = parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
    result = parseInt(time / minute) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}
