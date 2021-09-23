export default function checkSameVnode(oldVnode, newVnode) {
  //   判断key是否相同
  const isSameKey = oldVnode.key === newVnode.key;
  //   判断节点data是否相同
  const isSameIs = oldVnode.data === newVnode.data;
  //   判断节点选择器是否相同
  const isSameSel = oldVnode.sel === newVnode.sel;
  
  return isSameKey && isSameIs && isSameSel;
}
