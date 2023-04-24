/*货币格式分割逗号*/
export function formatCoin(num: string) {
  //取整，三行逗号隔开
  return parseFloat(num ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })
}
