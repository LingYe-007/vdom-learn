import h from "./mysnabbdom/h";
import { init } from "snabbdom";
import { classModule } from "snabbdom";
import { propsModule } from "snabbdom";
import { styleModule } from "snabbdom";
import { eventListenersModule } from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 形态1
// const myVnode = h("div", "Geek", "3");

// // 形态2
// const myVnode = h("div", "Geek", [
//   h("p", {}, "哈哈"),
//   h("p", {}, "喜喜"),
//   h("p", {}, "呵呵"),
// ]);
// 形态3
const myVnode = h("div", "Geek", h("p", {}, "呜呜"));

console.log(myVnode)

const container = document.getElementById("container");
patch(container,myVnode)