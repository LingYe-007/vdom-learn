import pacth from "./patch";
import patchVnode from "./patchVnode";
import createElement from "./createElement";
import checkSameVnode from "./checkSameVnode";

export default function updateChildren(parentElm, oldCh, newCh) {
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;
  // 旧前节点
  let oldStartVnode = oldCh[0];
  //   旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  //   新前节点
  let newStartVnode = newCh[0];
  //   新后节点
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    //   新前和旧前
    if (oldStartVnode == null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前
      pacthVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      pacthVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndVnode];
      newStartIdx = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      //  当新后与旧前命中的时候,需要将旧节点插入到旧节点的末尾的后面
      //   插入dom树上本身存在的节点,它就会被移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      //   当4新前和旧后命中的时候,此时要移动节点.移动新前指向的节点到老节点的旧前的前面
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 四种命中都未找到
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld == undefined) {
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        const elmToMove = oldCh[idxInOld];
        pacthVnode(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  //   继续看看有没有剩余的
  if (newStartIdx <= newEndIdx) {
    console.log("new 还有剩余节点没有处理");
    const before =
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null,如果是null就会自动排到队尾去.
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldStartIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
