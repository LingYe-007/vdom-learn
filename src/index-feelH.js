import { init } from "snabbdom";
import { classModule } from "snabbdom";
import { propsModule } from "snabbdom";
import { styleModule } from "snabbdom";
import { eventListenersModule } from "snabbdom";
import { h } from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 创建虚拟节点
var myVnode = h(
  "a",
  { props: { href: "ewqe", target: "_blank" } },
  "www",
  "123"
);
console.log(myVnode);

// 嵌套使用h函数
const myVnode3 = h("ul",[
    h('li','节点'),
    h('li',[
        h('div',[
            h('p','哈哈')
        ])
    ]),
    h('li','火龙果')
])

// 让虚拟节点上书
const container = document.getElementById("container");
patch(container, myVnode);
patch(container,myVnode3)
