import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
  // 判断新旧vnode是否是同一个对象
  if (oldVnode === newVnode) return;
  // 判断新vnode有没有text属性
  if (
    newVnode.text != undefined &&
    (newVnode.children == undefined || newVnode.children.length == 0)
  ) {
    if (newVnode.text != oldVnode.text) {
      // 如果新虚拟节点中的text与老的虚拟节点的text不同,直接写入
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 新老节点都有children
      // case1 新增
      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
    } else {
      //   老的没有children,新的children
      oldVnode.elm.innerHTML = "";
      // 遍历新的节点,创建新的dom,并且上树
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
