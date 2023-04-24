const images = await iconsPromises()
export const useSvgs = () => {
  const source = (key: SvgKey) => {
    return images[key]
  }
  return { source, images }
}
