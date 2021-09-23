import vnode from "./vnode";
import createElement from "./createElement";
import pacthVnode from "./patchVnode";

export default function pacth(oldVnode, newVnode) {
  // 判断传入的参数
  if (oldVnode.sel == "" || oldVnode.sel == undefined) {
    // 如果传入参数是DOM节点,把他包装成vNode
      oldVnode = vnode(
        oldVnode.tagName.toLowerCase(),
        {},
        [],
        undefined,
        oldVnode
      );
  }

  //   判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
     pacthVnode(oldVnode,newVnode)
  } else {
    console.log("不是同一个节点");
    console.log(newVnode);
    let newVnodeElm = createElement(newVnode);
    if (oldVnode.elm != undefined && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // createElement(newVnode)
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
