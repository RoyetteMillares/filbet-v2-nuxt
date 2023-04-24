<template>
  <section class="custom-id">
    <Suspense>
      <!--      <Teleport :disabled="showToBody" to="body">-->
      <transition name="modal">
        <section
          v-show="!!modelValue"
          class="custom-overlay flex-box fixed w-full h-full z-100 left-0 top-0 <sm:(pt-50px) @sm:(pt-100px) pt-150px"
          @click.self="closeDialog"
        >
          <transition name="fade-scale">
            <div
              v-show="!!modelValue"
              class="dialog-modal rounded-12px text-center relative w-11/12 px-62px py-41px <sm:(px-18px py-25px) @sm:(px-30px py-32px) @md:(px-36px py-34px) @lg:(px-45px py-38px) modal-container max-w-580px m-0-auto"
            >
              <!--          header-->
              <div
                class="dialog-header text-20px <sm:(text-16px) @sm:(text-17px) @md:(text-18px) @lg:(text-19px) font-700"
              >
                {{ title }}
              </div>
              <section
                class="show-content <sm:(max-h-80vh) max-h-70vh overflow-y-scroll"
              >
                <!--        content  -->
                <div class="show-content-modal min-h-100px <sm:(min-h-50px)">
                  <div
                    class="show-message mt-40px <sm:(mt-20px text-14px) text-18px"
                  >
                    {{ message }}
                  </div>
                  <slot></slot>
                </div>
                <!--          footer-->
                <slot v-if="slot.footer" name="footer"></slot>
                <div
                  v-if="showFooter && !slot.footer"
                  class="footer-modal flex items-center"
                >
                  <CommonButton
                    v-if="showCancelButton"
                    class="dialog-button is-half cancel-button !rounded-8px"
                    type="info"
                    @click="cancel"
                  >
                    <span class="text-16px font-500 <sm:(text-12px)">{{
                      cancelText
                    }}</span>
                  </CommonButton>
                  <CommonButton
                    class="dialog-button text-center !rounded-8px"
                    :class="showCancelButton ? 'is-half' : 'is-full'"
                    @click="confirm"
                  >
                    <span class="text-16px <sm:(text-12px) font-500">{{
                      confirmText
                    }}</span>
                  </CommonButton>
                </div>
              </section>

              <span class="close-icon" @click="closeDialog">
                <CommonSvgIcon name="close-dialog" />
              </span>
            </div>
          </transition>
        </section>
      </transition>
      <!--      </Teleport>-->
    </Suspense>
  </section>
</template>

<script setup>
import { useSlots } from "vue"

import i18n from "~/utils/lang"
const t = i18n.global.t
const slot = useSlots()
const props = defineProps({
  modelValue: {
    type: [Boolean, String],
    required: true,
  },
  title: {
    type: String,
    default: () => "",
  },
  beforeClose: {
    type: Function,
    default: () => () => {},
  },
  // when click the overlay if need to hidden of the dialog
  overlayClick: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
  resolve: {
    type: Function,
    default: () => {},
  },
  reject: {
    type: Function,
    default: () => {},
  },
  removeEl: {
    type: Function,
    default: null,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  showToBody: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: () => i18n.global.t("public.Cancel"),
  },
  confirmText: {
    type: String,
    default: () => i18n.global.t("public.Confirm"),
  },
})
const emit = defineEmits(["update:modelValue", "confirm"])
const closeDialog = () => {
  if (props.removeEl) props.removeEl()
  if (props.beforeClose) props.beforeClose()
  else emit("update:modelValue", false)
}
const cancel = () => {
  closeDialog()
  if (props.reject) props.reject(false)
}
const confirm = () => {
  emit("confirm")
  if (props.resolve) {
    props.resolve(true)
    closeDialog()
  }
  // closeDialog();
}
</script>

<style lang="scss" scoped>
.custom-overlay {
  background: rgba(0, 0, 0, 0.7);
  .dialog-modal {
    background: var(--v-dialog-bg);
    box-shadow: 0px 12px 22px rgba(0, 0, 0, 0.2);

    .dialog-header {
      color: var(--v-dialog-title-color);
    }
    .show-content {
      .show-content-modal {
        //min-height: 100px;
        .show-message {
          //color: $main-text-color;
          //max-width: 400px;
        }
      }
      .footer-modal {
        width: 100%;
        justify-content: space-between;
        .dialog-button {
          height: 44px;
          border-radius: 25px;
          font-size: 22px;
        }
        .is-full {
          width: 100%;
          margin: 0 auto;
        }
        .is-half {
          width: 49%;
        }
        .cancel-button {
          background: grey;
        }
      }
    }
    .close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
