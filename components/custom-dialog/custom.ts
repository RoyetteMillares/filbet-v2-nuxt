import { createVNode, render } from "vue"
import { isClient } from "@vueuse/core"
import type { AppContext, ComponentPublicInstance, VNode } from "vue"
import Main from "./index.vue"
type PropsTypes = {
  modelValue: boolean
  title: string
  beforeClose?: Function
  overlayClick?: boolean
  loading?: boolean
  showCancelButton?: boolean
  showFooter?: boolean
  showToBody?: boolean
  message?: string
  cancelText?: string
  confirmText?: string
  resolve?: Function
  reject?: Function
  removeEl?: Function
}
/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @returns 组件实例
 */
const renderInstance = (
  Constructor: any,
  props: PropsTypes,
  appContext: AppContext | null = null
) => {
  if (process.client) {
    const container: HTMLDivElement = document.createElement("div")
    container.id = "container"
    const removeEl = () => {
      render(null, container)
      document.body.removeChild(container)
    }
    props.removeEl = removeEl
    const vNode = createVNode(Constructor, props)
    vNode.appContext = appContext
    render(vNode, container)
    document.body.appendChild(container)
    return removeEl
  }
}
export const dialogConfirm = (message: string, title: string, config: {}) => {
  return new Promise((resolve, reject) => {
    renderInstance(Main, {
      modelValue: true,
      message,
      title,
      resolve,
      reject,
      ...config,
    })
  })
}
