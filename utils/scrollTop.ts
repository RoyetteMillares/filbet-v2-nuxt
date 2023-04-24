import { scroll } from "~/utils/scroll"
import { isClient } from "@vueuse/core"

export const scrollToTop = () => {
  if (isClient) {
    const layoutSection = document.getElementById("layout-section")
    scroll(layoutSection, layoutSection?.scrollTop, 0, "scrollTop", 1000)
  }
}
