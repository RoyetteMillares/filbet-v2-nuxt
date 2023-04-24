type ComponentsContext = {
  isLoadingMaskOpen: boolean
}

type ComponentsContextUpdater = (payload: Partial<ComponentsContext>) => void

const initialValue: ComponentsContext = {
  isLoadingMaskOpen: false,
}

const context = ref(initialValue)
export const useComponentsContext = () => {
  const update: ComponentsContextUpdater = (payload) => {
    context.value = {
      ...context.value,
      ...payload,
    }
  }
  return {
    context,
    update,
  }
}
