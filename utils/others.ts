export const isFormData = (v: {}): boolean => {
  return Object.prototype.toString.call(v) === "[object FormData]"
}
