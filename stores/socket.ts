import { defineStore } from "pinia"
import { useAppStore } from "./app"
import { useMessage } from "./message"
import { SocketAction, StoreTypes } from "~/types/store"

type DataType<M extends SocketAction> = Omit<
  StoreTypes.Socket.Data,
  "message"
> & {
  message: StoreTypes.Socket.MessageMap[M]
}

const initialValue: StoreTypes.Socket.State = {
  ws: null,
  data: null,
  status: "NONE",
}

export const useSocketStore = defineStore("socket", {
  state: () => {
    return {
      ...initialValue,
    }
  },
  actions: {
    /**
     * 连接 socket
     */
    CONNECT_SOCKET() {
      try {
        if (this.status === "NONE") {
          const appStore = useAppStore()
          const token = getToken()
          const socketUrl = `${appStore.websocketURL}/${token}/d/0`
          const websocket = useWebSocket(socketUrl, {
            autoReconnect: true,
            onMessage: (_, event) => {
              const payload = JSON.parse(event.data)
              this.$patch({ data: { ...payload, nonce: Date.now() } })
            },
          })
          this.$patch({
            ws: websocket.ws.value,
          })
          watch(
            [websocket.status],
            () => {
              this.$patch({
                status: websocket.status.value,
              })
            },
            {
              deep: true,
            }
          )
        }
      } catch (e) {
        console.log(e, 9090)
      }
    },
    /**
     * 断开连接
     */
    CLOSE_SOCKET() {
      if (this.ws) {
        // this.ws.$soctket_close();
      }
      this.ws = null
    },
    ActionHandler() {
      switch (this.data?.action) {
        case SocketAction.COIN_CHANGE: {
          const payload = this.data as DataType<SocketAction.COIN_CHANGE>
          return payload
        }
        case SocketAction.DEPOSIT_COIN_CHANGE: {
          const payload = this
            .data as DataType<SocketAction.DEPOSIT_COIN_CHANGE>
          return payload
        }
        case SocketAction.NOTICE_CHANGE: {
          const payload = this.data as DataType<SocketAction.NOTICE_CHANGE>
          return payload
        }
        case SocketAction.PUSH_DN: {
          const payload = this.data as DataType<SocketAction.PUSH_DN>
          return payload
        }
        case SocketAction.PUSH_WN: {
          const payload = this.data as DataType<SocketAction.PUSH_WN>
          return payload
        }
      }
    },
  },
})
