import vnode from "./vnode";

// 低配版h函数,函数必须接受3个参数
// c第三个参数有三种类型:
// 1.h('div',{},'文字')
// 2.h('div',{},[])
// 3.h('div',{},h())
export default function h(sel, data, c) {
  // 检查参数个数
  if (arguments.length != 3) {
    throw new Error("功能有限");
  }
  if (typeof c == "string" || typeof c == "number") {
    //   说明调用h函数是形态1
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 说明调用h函数是形态2
    let children = [];
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] == "object" && c[i].hasOwnProperty("sel"))) {
        throw new Error("c");
      }
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c == "object" && c.hasOwnProperty("sel")) {
    //   说明调用h函数是形态3
    // 传入的c是唯一的children
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("传入第三个参数类型不对");
  }
}
