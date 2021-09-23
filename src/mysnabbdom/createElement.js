export default function createElement(vnode) {
  let domNode = document.createElement(vnode.sel);
  // 看子节点和文本是否同时存在
  if (
    vnode.text != "" && (vnode.children == undefined ||
    vnode.children.length == 0)
  ) {
    //   孤儿节点
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 内部是子节点,需要递归创建节点
    for(let i =0; i<vnode.children.length;i++){
        let ch = vnode.children[i]
        console.log(ch)
        let chDom = createElement(ch)
        domNode.appendChild(chDom)
    }
  }
  vnode.elm = domNode;
  return vnode.elm;
}
