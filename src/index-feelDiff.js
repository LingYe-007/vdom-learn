import { init } from "snabbdom";
import { classModule } from "snabbdom";
import { propsModule } from "snabbdom";
import { styleModule } from "snabbdom";
import { eventListenersModule } from "snabbdom";
import { h } from "snabbdom";

// 创建出patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);


const vnode = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

const container = document.getElementById("container");

// 上树
patch(container, vnode);

let vnode2

// 修改页面元素后,更新智能
vnode2 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
  h("li", {}, "E"),
]);

// 没有加key,暴力拆除
vnode2 = h("ul", {}, [
  h("li", {}, "E"),
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

// 加了key,没有暴力拆除
vnode2 = h("ul", {}, [
  h("li", { key: "E" }, "E"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);

//父节点变换,暴力拆除
vnode2 = h("ol", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

const button = document.getElementById("button");

button.onclick = function () {
  patch(vnode, vnode2);
};
