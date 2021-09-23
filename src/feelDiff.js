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
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);

const container = document.getElementById("container");

// 上树
patch(container, vnode);

let vnode2;

const button = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

button.onclick = function () {
  // 修改页面元素后,更新智能
  vnode2 = h("ul", {}, [
    h("li", {}, "A"),
    h("li", {}, "B"),
    h("li", {}, "C"),
    h("li", {}, "D"),
    h("li", {}, "E"),
  ]);
  patch(vnode, vnode2);
};

btn1.onclick = function () {
  // 没有加key,暴力拆除
  vnode2 = h("ul", {}, [
    h("li", {}, "E"),
    h("li", {}, "A"),
    h("li", {}, "B"),
    h("li", {}, "C"),
    h("li", {}, "D"),
  ]);
  patch(vnode, vnode2);
};

btn2.onclick = function () {
  // 加了key,没有暴力拆除
  vnode2 = h("ul", {}, [
    h("li", { key: "E" }, "E"),
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "D" }, "D"),
  ]);
  patch(vnode, vnode2);
};

btn3.onclick = function () {
  // 加了key,没有暴力拆除
  vnode2 = h("ol", {}, [
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "D" }, "D"),
  ]);
  patch(vnode, vnode2);
};
