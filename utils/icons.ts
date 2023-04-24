let __icons: Record<string, any>

export const iconsPromises = () => {
  if (__icons) {
    return __icons
  }

  __icons = Object.fromEntries(
    Object.entries(import.meta.glob("~/assets/icons/*.svg", { as: "raw" })).map(
      ([key, value]) => {
        const filename = key.split("/").pop()!.split(".").shift()
        return [filename, value]
      }
    )
  )

  return __icons
}

let __images: Record<string, any>
export const imagesPromises = async () => {
  if (__images) {
    return __images
  }
  const importPromise = await import.meta.glob("~/assets/images/**", {
    eager: true,
    import: "default",
  })
  __images = Object.fromEntries(
    Object.entries(importPromise).map(([__path, value]) => {
      // const key = __path.match(/(?!\/)([^/])+(?=\.\w+)/g)?.pop() ?? ""
      const key = __path
        .replaceAll(/(\/assets\/images\/)|(\.\w+)/g, "")
        .replaceAll(/\//g, "-")
      const path = value
      return [key, path]
    })
  )

  return __images
}

let __assets: Record<AssetKey, string>
export const assetPromises = async () => {
  if (__assets) {
    return __assets
  }
  const importPromise = await import.meta.glob(
    "~/assets/**/*.(png|svg|jpg|jpeg|gif|webp)",
    {
      eager: true,
      import: "default",
    }
  )
  __assets = Object.fromEntries(
    Object.entries(importPromise).map(([__path, value]) => {
      const key = __path
        .replaceAll(/(\/assets\/)|(\.\w+)/g, "")
        .replaceAll(/\//g, "-")
      const path = value
      return [key, path]
    })
  ) as typeof __assets

  // console.log(
  //   Object.keys(__assets)
  //     .map((k) => `${k}`)
  //     .join("\n")
  // )

  return __assets
}
