(this["webpackJsonpredux-libs-demos"]=this["webpackJsonpredux-libs-demos"]||[]).push([[1],{225:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(20),i=n(17),c=n(64),o=Object(c.a)({initialState:[],name:"$todos"}),u=0,d=o.addCaseReducers({addTodo:{prepare:function(e){return{payload:{id:u++,text:e}}},reducer:function(e,t){var n=t.payload,r=n.id,a=n.text;e.push({completed:!1,id:r,text:a})}}}).addTodo;function s(){var e=Object(r.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(i.d)();return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),o(d(n)),c("")}},a.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:n}),a.a.createElement("button",{disabled:!n.trim(),type:"submit"},"Add Todo"))}var f=n(24),m="SHOW_ACTIVE",p="SHOW_ALL",b="SHOW_COMPLETED",E=p,v=Object(c.a)({initialState:E,name:"$visibilityFilter"}),O=v.selector,h=o.selector,j=Object(f.a)([h,O],(function(e,t){switch(t){case p:return e;case b:return e.filter((function(e){return e.completed}));case m:return e.filter((function(e){return!e.completed}));default:throw new Error("Unknown filter: ".concat(t))}})),y=o.addCaseReducers({toggleTodo:function(e,t){var n=e.find((function(e){return e.id===t.payload}));n&&(n.completed=!n.completed)}}).toggleTodo;function C(e){var t=e.completed,n=e.onClick,r=e.text;return a.a.createElement("li",{onClick:n,style:{textDecoration:t?"line-through":"none"}},r)}function g(){var e=Object(i.d)(),t=Object(i.e)(j);return a.a.createElement("ul",null,t.map((function(t){return a.a.createElement(C,Object.assign({key:t.id},t,{onClick:function(){return e(y(t.id))}}))})))}var k=v.addCaseReducers({setVisibilityFilter:function(e,t){return t.payload}}).setVisibilityFilter;function x(e){var t=e.children,n=e.filter,r=Object(i.d)(),l=Object(i.e)(O);return a.a.createElement("button",{disabled:l===n,onClick:function(){return r(k(n))},style:{marginLeft:"4px"}},t)}function S(){return a.a.createElement("div",null,a.a.createElement("span",null,"Show: "),a.a.createElement(x,{filter:p},"All"),a.a.createElement(x,{filter:m},"Active"),a.a.createElement(x,{filter:b},"Completed"))}t.default=function(){return a.a.createElement("div",null,a.a.createElement(s,null),a.a.createElement(g,null),a.a.createElement(S,null))}}}]);
//# sourceMappingURL=TodosSfr.bdc5b288.chunk.js.map