/**
 * @author django
 * @description 滑动 缓动函数
 * @param el 滚动条的目标元素
 * @param from 起始位置
 * @param to 到达位置
 * @param duration 动画时间
 * @param endCallback 回调函数
 */
// scrollTop animation
export function scroll(
  el: any,
  from = 0,
  to = 0,
  direction = "scrollLeft",
  duration = 500,
  endCallback?: Function
) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      // @ts-ignore
      window?.webkitRequestAnimationFrame ||
      // @ts-ignore
      window?.mozRequestAnimationFrame ||
      // @ts-ignore
      window?.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 50)

  function scroll(start: number, end: number, step: number) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el[direction] = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}
