/**
 * 背景图片加载插件
 */
/**
 * 背景图片加载失败
 */
import noneSvg from "~/assets/default/pic-none.png"
const load = async (el: HTMLElement, binding: any) => {
  const imgURL = binding.value

  if (imgURL) {
    const exist = await imageIsExist(imgURL)
    if (exist) el.setAttribute("style", `background-image:url(${imgURL})`)
    else el.setAttribute("style", `background-image:url(${noneSvg})`)
  } else el.setAttribute("style", `background-image:url(${noneSvg})`)
  // 判断一个图片是否存在, 注意是异步行为
}
function imageIsExist(url: string) {
  return new Promise((resolve) => {
    let img: HTMLImageElement | null = new Image()
    img.src = url
    img.onload = () => {
      if (img?.complete) {
        resolve(true)
        img = null
      }
    }
    img.onerror = () => {
      resolve(false)
      img = null
    }
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("ground", {
    async beforeMount(el, binding) {
      await load(el, binding)
    },
    mounted(el) {
      el.focus()
    },
    async updated(el, binding) {
      const imgURL = binding.value
      if (imgURL) {
        const exist = await imageIsExist(imgURL)
        if (exist) el.setAttribute("style", `background-image:url(${imgURL})`)
        else el.setAttribute("style", `background-image:url(${noneSvg})`)
      } else el.setAttribute("style", `background-image:url(${noneSvg})`)
      // load(el, binding)
    },
    getSSRProps() {
      // you can provide SSR-specific props here
      return {}
    },
  })
})
