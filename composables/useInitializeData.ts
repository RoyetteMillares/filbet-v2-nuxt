import { useAffiliateStore } from "~~/stores/affilate"
import { useHomeStore } from "~~/stores/home"

export const useInitializeData = () => {
  const storeAffiliate = useAffiliateStore()

  const initAffiliate = async () => {
    await storeAffiliate.INIT()
  }

  return {
    initAffiliate,
  }
}
