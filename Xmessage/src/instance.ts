import type { ExtractPropTypes, VNode, ComponentInternalInstance } from "vue";
import { PropType, shallowReactive } from "vue";
type messageType = "success" | "info" | "warning" | "error";
const definePropType = <T>(val: any): PropType<T> => val;
export const messageProps = {
  id: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
    require: true,
  },
  type: {
    type: String as PropType<messageType>,
    default: "info",
  },
  duration: {
    type: Number,
    default: 3000,
  },
  customClass: {
    type: String,
    default: "",
  },
  offset: {
    type: Number,
    default: 20,
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
  onDestroy: {
    type: definePropType<() => void>(Function),
    required: false,
  },
};
export type messagePropsType = Partial<ExtractPropTypes<typeof messageProps>>;
export const instances = shallowReactive<messageInstance[]>([]);
export type messageInstance = {
  id: string;
  vnode: VNode;
  props: messagePropsType;
  vm: ComponentInternalInstance;
};
export const getInstance = (id: string) => {
  const index = instances.findIndex((instance) => id == instance.id);
  let prev = null;
  const current = instances[index];
  if (index > 0) {
    prev = instances[index - 1];
  }
  return {
    prev,
    current,
    currentIndex: index,
  };
};
export const getLastInstanceOffset = (id: string): number => {
  // Get Prev Instance OffsetTop
  const { prev } = getInstance(id);
  if (!prev) return 0;
  return prev.vm.exposeProxy!.bottom;
};
