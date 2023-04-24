/**
 * @author django
 * @description 字典类调用 获取数据
 */

import { useAppStore } from "~/stores/app"

/**
 * @description 获取某一个字典
 * @param key {string} 字典的key
 */
const getDirection = (key: string) => {
  let value = []
  try {
    // @ts-ignore
    value = useAppStore().dictionary[key]
  } catch (e) {}
  return value
}
/**
 * @description 根据字典的value 获取到相对应的label(文本)
 * @param list {array} 字典的列表
 * @param value {string|number} 数据的value
 * @return {string} 字典的label
 */
const getTitle = (list: any[], value: unknown) => {
  let label = ""
  try {
    // @ts-ignore
    label = list.find((item: any) => item.code === value?.toString())?.title
  } catch (e) {
    console.log(e)
  }
  return label
}
const getCode = () => {}
export const useDictionary = () => {
  return {
    dictionary: useAppStore().dictionary,
    getDirection,
    getTitle,
  }
}
