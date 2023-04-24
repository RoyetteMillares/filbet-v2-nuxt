const images = await imagesPromises()
export const useImages = () => {
  const source = (key: string) => {
    return images[key]
  }
  return { source, images }
}
