export const copy = (value: any) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value)
  } else {
    const textarea: HTMLTextAreaElement = document.createElement("textarea")
    document.body.appendChild(textarea)
    textarea.style.position = "absolute"
    textarea.style.top = "-100px"
    textarea.style.left = "-1000px"
    textarea.style.zIndex = "-1000"
    textarea.style.clip = "rect(0 0 0 0)"
    textarea.readOnly = true
    textarea.value = value
    textarea.select()
    document.execCommand("copy", true)
  }
  Notify({
    title: "Successfully",
    message: "Copy Successfully",
    type: "success",
    duration: 1000,
    position: "top-left",
  })
}
