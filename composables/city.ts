import areaList from "~/assets/json/area.json"
export type City = {
  code: string
  zh: string
  icon: string
  locale: string
  isFirst: boolean
  initial: string
  en: string | number
}
const cityList = computed(() => {
  const newList = areaList.sort(function (a, b) {
    if (a.en.toUpperCase() < b.en.toUpperCase()) {
      return -1
    }
    if (a.en.toUpperCase() > b.en.toUpperCase()) {
      return 1
    }
    return 0
  })
  return newList
}) as unknown as City[]
export const useCityList = () => {
  return { cityList }
}
