/*! For license information please see 39dd7899.432bbcda.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{163:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return s}));var r=n(2),o=n(9),a=(n(0),n(259)),i=(n(263),n(262),{title:"v0.10.x to v0.11.x"}),c={id:"migration-guides/v0.10.x-to-v0.11.x",title:"v0.10.x to v0.11.x",description:"@InjectQueryService",source:"@site/docs/migration-guides/v0.10.x-to-v0.11.x.mdx",permalink:"/nestjs-query/docs/migration-guides/v0.10.x-to-v0.11.x",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/migration-guides/v0.10.x-to-v0.11.x.mdx",sidebar:"docs",previous:{title:"v0.5.x to v0.6.x",permalink:"/nestjs-query/docs/migration-guides/v0.5.x-to-v0.6.x"},next:{title:"v0.12.x to v0.13.x",permalink:"/nestjs-query/docs/migration-guides/v0.12.x-to-v0.13.x"}},u=[{value:"<code>@InjectQueryService</code>",id:"injectqueryservice",children:[]},{value:"New Features",id:"new-features",children:[]}],l={rightToc:u};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h3",{id:"injectqueryservice"},Object(a.b)("inlineCode",{parentName:"h3"},"@InjectQueryService")),Object(a.b)("p",null,"In ",Object(a.b)("inlineCode",{parentName:"p"},"v0.11.x")," an new decorator was added ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectQueryService"),", this decorator replaces the ORM specific decorators:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"@InjectTypeOrmQueryService")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"@InjectSequelizeQueryService"))),Object(a.b)("p",null,"To migrate replace all ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectTypeOrmQueryService")," and ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectSequelizeQueryService")," with ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectQueryService"),"."),Object(a.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"You still need to import the ",Object(a.b)("inlineCode",{parentName:"p"},"NestjsQueryTypeOrmModule")," or ",Object(a.b)("inlineCode",{parentName:"p"},"NestjsQuerySequelizeModule")," to use ",Object(a.b)("inlineCode",{parentName:"p"},"@InjectQueryService"),"."))),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { QueryService, InjectQueryService } from '@nestjs-query/core';\nimport { CRUDResolver } from '@nestjs-query/query-graphql';\nimport { Resolver } from '@nestjs/graphql';\nimport { TodoItemDTO } from './dto/todo-item.dto';\nimport { TodoItemEntity } from './todo-item.entity';\n\n@Resolver(() => TodoItemDTO)\nexport class TodoItemResolver extends CRUDResolver(TodoItemDTO) {\n  constructor(@InjectQueryService(TodoItemEntity) readonly service: QueryService<TodoItemEntity>) {\n    super(service);\n  }\n}\n")),Object(a.b)("h2",{id:"new-features"},"New Features"),Object(a.b)("p",null,"To see other non-breaking features checkout to ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../../blog/v0.11.0"}),"v0.11.0 blog post")))}s.isMDXComponent=!0},259:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),s=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(n),d=r,m=p["".concat(i,".").concat(d)]||p[d]||b[d]||a;return n?o.a.createElement(m,c(c({ref:t},l),{},{components:n})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},260:function(e,t,n){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)&&r.length){var i=o.apply(null,r);i&&e.push(i)}else if("object"===a)for(var c in r)n.call(r,c)&&r[c]&&e.push(c)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},261:function(e,t,n){"use strict";var r=n(0),o=Object(r.createContext)({tabGroupChoices:{},setTabGroupChoices:function(){}});t.a=o},262:function(e,t,n){"use strict";var r=n(0),o=n.n(r);t.a=function(e){return o.a.createElement("div",null,e.children)}},263:function(e,t,n){"use strict";n(23),n(18),n(17);var r=n(0),o=n.n(r),a=n(261);var i=function(){return Object(r.useContext)(a.a)},c=n(260),u=n.n(c),l=n(126),s=n.n(l),p=37,b=39;t.a=function(e){var t=e.block,n=e.children,a=e.defaultValue,c=e.values,l=e.groupId,d=i(),m=d.tabGroupChoices,v=d.setTabGroupChoices,f=Object(r.useState)(a),j=f[0],y=f[1];if(null!=l){var O=m[l];null!=O&&O!==j&&y(O)}var g=function(e){y(e),null!=l&&v(l,e)},h=[];return o.a.createElement("div",null,o.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:u()("tabs",{"tabs--block":t})},c.map((function(e){var t=e.value,n=e.label;return o.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":j===t,className:u()("tabs__item",s.a.tabItem,{"tabs__item--active":j===t}),key:t,ref:function(e){return h.push(e)},onKeyDown:function(e){return function(e,t,n){switch(n.keyCode){case b:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case p:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(h,e.target,e)},onFocus:function(){return g(t)},onClick:function(){return g(t)}},n)}))),o.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},r.Children.toArray(n).filter((function(e){return e.props.value===j}))[0]))}}}]);