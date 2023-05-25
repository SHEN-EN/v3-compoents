import type { ComponentPublicInstance, ExtractPropTypes } from "vue";
import type { PropType } from "vue";
export type Action<T> = "confirm" | "cancel" | "close" | T;
export type MessageType = "success" | "info" | "warning" | "error";
const definePropType = <T>(val: any): PropType<T> => val;
export const messageBoxProps = {
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<MessageType>,
    default: "info",
  },
  icon: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  showConfirmButton: {
    type: Boolean,
    default: "",
  },
  showCancleButton: {
    type: Boolean,
    default: true
  },
  cancelButtonText: {
    type: String,
    default: "Cancle",
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  onVanish: {
    type: definePropType<() => void>(Function),
    required: false,
  },
};
export type messgaeBoxOptionsPropsType = Partial<
  ExtractPropTypes<typeof messageBoxProps>
>;
export const messageBoxInstance = new Map<
  ComponentPublicInstance,
  {
    options: any;
    resolve: (res: any) => void;
    reject: (reason: any) => void;
  }
>();
