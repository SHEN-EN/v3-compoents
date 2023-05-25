import { render, createVNode, watch } from "vue";
import type { ComponentInternalInstance } from "vue";
import XMessageBox from "./messageBox.vue";
import {
  messgaeBoxOptionsPropsType,
  messageBoxInstance,
} from "./instance";
const messageBox = (options: messgaeBoxOptionsPropsType): Promise<string> => {
  return new Promise((resolve, reject) => {
    const vm:any = visibilityMessageBox(options);
    messageBoxInstance.set(vm, {
      options,
      resolve,
      reject,
    });
  });
};
const visibilityMessageBox = (options: messgaeBoxOptionsPropsType) => {
  const container = genContainer();
  options.onVanish = () => {
    GcMessageBox(vm, container);
  };
  const vm:ComponentInternalInstance = initMessageInstance(container, options);
  watchMessageActionEvent(vm, container);
  return vm.proxy;
};
const initMessageInstance = (
  container: HTMLElement,
  props: messgaeBoxOptionsPropsType
) => {
  const vnode = createVNode(XMessageBox, props);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  return vnode.component!; // Current MessageBox Instance
};
const genContainer = () => {
  return document.createElement("div");
};
const watchMessageActionEvent = (vm: ComponentInternalInstance, container: any) => {
  watch(
    // Watch Action Event
    () => vm.exposed?.actionEvent.value,
    (newVal) => {
      const { resolve, reject } = messageBoxInstance.get(vm.proxy!)!;
      if (newVal === "confirm") {
        resolve(newVal);
      }
      if (["cancel", "close"].includes(newVal)) {
        reject(newVal);
      }
    }
  );
};
const GcMessageBox = (
  vm: ComponentInternalInstance,
  container: HTMLElement
) => {
  render(null, container);
  messageBoxInstance.delete(vm.proxy!); //  Delete Instance
};
export default messageBox;
