import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

let myVnode1, myVnode2;

// 孤儿节点
const myVnode = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "D"),
]);

const container = document.getElementById("container");
console.log(container);

patch(container, myVnode);

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");

btn1.onclick = () => {
  myVnode1 = h("ol", {}, [
    h("li", {}, "A"),
    h("li", {}, "B"),
    h("li", {}, "D"),
  ]);
  patch(myVnode, myVnode1);
};

btn2.onclick = () => {
  myVnode2 = h("ol", {}, "你好吗");
  patch(myVnode, myVnode2);
};

btn3.onclick = () => {
  myVnode1 = h("ol", {}, "你好吗");
  myVnode2 = h("ul", {}, [
    h("li", {}, "A"),
    h("li", {}, "B"),
    h("li", {}, "D"),
  ]);
  patch(myVnode, myVnode1);
  setTimeout(() => {
    patch(myVnode1, myVnode2);
  }, 2000);
};

btn4.onclick = () => {
  myVnode2 = h("ul", {}, [
    h("li", {}, "A"),
    h("li", {}, "B"),
    h("li", {}, "M"),
  ]);
  patch(myVnode, myVnode2);
};
