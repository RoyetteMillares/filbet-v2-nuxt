import { ElNotification } from "element-plus"

export function Notify(...args: Parameters<typeof ElNotification>) {
  return ElNotification(...args)
}
