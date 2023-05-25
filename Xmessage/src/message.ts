import Xmessage from "./Xmessage.vue";
import { createVNode, render } from "vue";
import {
  messagePropsType,
  messageInstance,
  instances,
  getInstance,
} from "./instance";
let seed = 0;
const createMessageInstance = (options: messagePropsType): messageInstance => {
  const container = document.createElement("div");
  const id = `message_${seed++}`;
  const props = {
    id,
    ...options,
    onDestroy: () => {
      // Message Close
      // GC
      render(null, container);
    },
    onClose: () => {
      closeMessage(instance);
    },
  };
  const vnode = createVNode(Xmessage, props, null);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!; // Current Components
  const instance: messageInstance = {
    id,
    vnode,
    props,
    vm,
  };
  instances.push(instance);
  return instance;
};
const closeMessage = (instance: messageInstance) => {
  const index = getInstance(instance.id).currentIndex;
  instances.splice(index, 1);
};
const message = (options: messagePropsType) => {
  return createMessageInstance(options);
};

export default message;
