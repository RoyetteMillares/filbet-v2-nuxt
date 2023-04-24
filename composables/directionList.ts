import { useDictionary } from "~/composables/dictionary"

export const useDirectionList = () => {
  const { t } = useLang()
  const { getDirection } = useDictionary()
  // 充值记录
  const depositStatusList = computed<DirectionType[]>(() => {
    // let list = [{ title: t("public.All"), code: "" }];
    let list = [{ title: t("public.All"), code: "" }]
    if (
      getDirection("dic_deposit_record_status") &&
      getDirection("dic_deposit_record_status").length
    )
      list = list.concat(getDirection("dic_deposit_record_status"))
    return list
  })
  // 提现记录
  const withdrawStatusList = computed<DirectionType[]>(() => {
    // let list = [{ title: t("public.All"), code: "" }];
    let list = [{ title: t("public.All"), code: "" }]
    if (
      getDirection("dic_withdrawal_record_status") &&
      getDirection("dic_withdrawal_record_status").length
    )
      list = list.concat(getDirection("dic_withdrawal_record_status"))
    return list
  })
  return {
    depositStatusList,
    withdrawStatusList,
  }
}
