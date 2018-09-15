/**
 * 节流函数 返回函数连续调用时
 * @param method {function}  请求关联函数，实际应用需要调用的函数
 * @param duration  {number} 延迟时间，单位毫秒
 */
const _throttle = (method, duration) => {
   let begin = new Date();
   return function () {
      var current = new Date();
      if (current - begin >= duration) {
         method.apply(this, arguments);
         begin = current;
      }
   }
}
/**
 * 去抖函数 返回函数连续调用时
 * @param method {function}  请求关联函数，实际应用需要调用的函数
 * @param delay  {number} 延迟时间，单位毫秒
 */
const _debounce = (method, delay) => {
   return function () {
      clearTimeout(method.id)
      method.id = setTimeout(() => {
         method.call(this, arguments)
      }, delay)
   }
}

export {_throttle, _debounce}
