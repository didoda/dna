!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in o||(o[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==p.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=o[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(p.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=o[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return s[a]||(s[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},b.name);c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=o[k],m=s[k];m?j=m.exports:l&&!l.declarative?j=l.esModule:l?(h(l),m=l.module,j=m.exports):j=n(k),m&&m.importers?(m.importers.push(c),c.dependencies.push(m)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=o[a];if(c)c.declarative?m(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=n(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b.default:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=o[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){var c={};if(("object"==typeof b||"function"==typeof b)&&b!==a)if(q)for(var d in b)"default"!==d&&l(c,b,d);else{var e=b&&b.hasOwnProperty;for(var d in b)"default"===d||e&&!b.hasOwnProperty(d)||(c[d]=b[d])}return c.default=b,r(c,"__useDefault",{value:!0}),c}function l(a,b,c){try{var d;(d=Object.getOwnPropertyDescriptor(b,c))&&r(a,c,d)}catch(d){return a[c]=b[c],!1}}function m(b,c){var d=o[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==p.call(c,g)&&(o[g]?m(g,c):n(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function n(a){if(u[a])return u[a];if("@node/"==a.substr(0,6))return t(a.substr(6));var b=o[a];if(!b)throw"Module "+a+" not present.";return f(a),m(a,[]),o[a]=void 0,b.declarative&&r(b.module.exports,"__esModule",{value:!0}),u[a]=b.declarative?b.module.exports:b.esModule}var o={},p=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},q=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(a){q=!1}var r;!function(){try{Object.defineProperty({},"a",{})&&(r=Object.defineProperty)}catch(a){r=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(a){}}}}();var s={},t="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,u={"@empty":{}};return function(a,d,e,f){return function(g){g(function(g){for(var h={_nodeRequire:t,register:b,registerDynamic:c,get:n,set:function(a,b){u[a]=b},newModule:function(a){return a}},i=0;i<d.length;i++)(function(a,b){b&&b.__esModule?u[a]=b:u[a]=k(b)})(d[i],arguments[i]);f(h);var j=n(a[0]);if(a.length>1)for(var i=1;i<a.length;i++)n(a[i]);return e?j.default:j})}}}("undefined"!=typeof self?self:global)(["2"],[],!1,function(a){var b=this.require,c=this.exports,d=this.module;!function(b){function c(a,b){for(var c=a.split(".");c.length;)b=b[c.shift()];return b}function d(a){if("string"==typeof a)return c(a,b);if(!(a instanceof Array))throw new Error("Global exports must be a string or array.");for(var d={},e=!0,f=0;f<a.length;f++){var g=c(a[f],b);e&&(d.default=g,e=!1),d[a[f].split(".").pop()]=g}return d}function e(a){if(Object.keys)Object.keys(b).forEach(a);else for(var c in b)i.call(b,c)&&a(c)}function f(a){e(function(c){if(-1==j.call(k,c)){try{var d=b[c]}catch(a){k.push(c)}a(c,d)}})}var g,h=a,i=Object.prototype.hasOwnProperty,j=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},k=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];h.set("@@global-helpers",h.newModule({prepareGlobal:function(a,c,e){var h=b.define;b.define=void 0;var i;if(e){i={};for(var j in e)i[j]=b[j],b[j]=e[j]}return c||(g={},f(function(a,b){g[a]=b})),function(){var a;if(c)a=d(c);else{a={};var e,j;f(function(b,c){g[b]!==c&&"undefined"!=typeof c&&(a[b]=c,"undefined"!=typeof e?j||e===c||(j=!0):e=c)}),a=j?a:e}if(i)for(var k in i)b[k]=i[k];return b.define=h,a}}}))}("undefined"!=typeof self?self:global),a.registerDynamic("4",[],!1,function(e,f,g){var h=a.get("@@global-helpers").prepareGlobal(g.id,null,null);return function(){!function(a){if("object"==typeof c&&"undefined"!=typeof d)d.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.virtualDom=a()}}(function(){return function a(c,d,e){function f(h,i){if(!d[h]){if(!c[h]){var j="function"==typeof b&&b;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var l=d[h]={exports:{}};c[h][0].call(l.exports,function(a){var b=c[h][1][a];return f(b?b:a)},l,l.exports,a,c,d,e)}return d[h].exports}for(var g="function"==typeof b&&b,h=0;h<e.length;h++)f(e[h]);return f}({1:[function(a,b,c){var d=a("./vdom/create-element.js");b.exports=d},{"./vdom/create-element.js":13}],2:[function(a,b,c){var d=a("./vtree/diff.js");b.exports=d},{"./vtree/diff.js":31}],3:[function(a,b,c){var d=a("./virtual-hyperscript/index.js");b.exports=d},{"./virtual-hyperscript/index.js":19}],4:[function(a,b,c){var d=a("./diff.js"),e=a("./patch.js"),f=a("./h.js"),g=a("./create-element.js"),h=a("./vnode/vnode.js"),i=a("./vnode/vtext.js");b.exports={diff:d,patch:e,h:f,create:g,VNode:h,VText:i}},{"./create-element.js":1,"./diff.js":2,"./h.js":3,"./patch.js":11,"./vnode/vnode.js":27,"./vnode/vtext.js":29}],5:[function(a,b,c){},{}],6:[function(a,b,c){b.exports=function(a){var b,c=String.prototype.split,d=/()??/.exec("")[1]===a;return b=function(b,e,f){if("[object RegExp]"!==Object.prototype.toString.call(e))return c.call(b,e,f);var g,h,i,j,k=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),m=0,e=new RegExp(e.source,l+"g");for(b+="",d||(g=new RegExp("^"+e.source+"$(?!\\s)",l)),f=f===a?-1>>>0:f>>>0;(h=e.exec(b))&&(i=h.index+h[0].length,!(i>m&&(k.push(b.slice(m,h.index)),!d&&h.length>1&&h[0].replace(g,function(){for(var b=1;b<arguments.length-2;b++)arguments[b]===a&&(h[b]=a)}),h.length>1&&h.index<b.length&&Array.prototype.push.apply(k,h.slice(1)),j=h[0].length,m=i,k.length>=f)));)e.lastIndex===h.index&&e.lastIndex++;return m===b.length?!j&&e.test("")||k.push(""):k.push(b.slice(m)),k.length>f?k.slice(0,f):k}}()},{}],7:[function(a,b,c){"use strict";function d(a){var b=a[g];return b||(b=a[g]={}),b}var e=a("individual/one-version"),f="7";e("ev-store",f);var g="__EV_STORE_KEY@"+f;b.exports=d},{"individual/one-version":10}],8:[function(a,b,c){(function(c){var d="undefined"!=typeof c?c:"undefined"!=typeof window?window:{},e=a("min-document");if("undefined"!=typeof document)b.exports=document;else{var f=d["__GLOBAL_DOCUMENT_CACHE@4"];f||(f=d["__GLOBAL_DOCUMENT_CACHE@4"]=e),b.exports=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"min-document":5}],9:[function(a,b,c){(function(a){"use strict";function c(a,b){return a in d?d[a]:(d[a]=b,b)}var d="undefined"!=typeof window?window:"undefined"!=typeof a?a:{};b.exports=c}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(a,b,c){"use strict";function d(a,b,c){var d="__INDIVIDUAL_ONE_VERSION_"+a,f=d+"_ENFORCE_SINGLETON",g=e(f,b);if(g!==b)throw new Error("Can only have one copy of "+a+".\nYou already have version "+g+" installed.\nThis means you cannot install version "+b);return e(d,c)}var e=a("./index.js");b.exports=d},{"./index.js":9}],11:[function(a,b,c){var d=a("./vdom/patch.js");b.exports=d},{"./vdom/patch.js":16}],12:[function(a,b,c){function d(a,b,c){for(var d in b){var g=b[d];void 0===g||null===g?e(a,d,g,c):h(g)?(e(a,d,g,c),g.hook&&g.hook(a,d,c?c[d]:void 0)):"object"==typeof g?f(a,b,c,d,g):a[d]=g}}function e(a,b,c,d){if(d){var e=d[b];if(h(e))e.unhook&&e.unhook(a,b,c);else if("attributes"===b)for(var f in e)a.removeAttribute(f);else if("style"===b)for(var g in e)a.style[g]="";else"string"==typeof e?a[b]="":a[b]=null}}function f(a,b,c,d,e){var f=c?c[d]:void 0;if("attributes"!==d){if(f&&"object"==typeof f&&g(f)!==g(e))return void(a[d]=e);"object"!=typeof a[d]&&(a[d]={});var h="style"===d?"":void 0;for(var i in e){var j=e[i];a[d][i]=void 0===j?h:j}}else for(var k in e){var l=e[k];if("class"===k){var m=l.split(" "),n=f&&f[k]&&f[k].split(" ")||[];m.forEach(function(b){n.indexOf(b)===-1&&a.classList.add(b)}),n.forEach(function(b){m.indexOf(b)===-1&&a.classList.remove(b)})}else void 0===l?a.removeAttribute(k):a.setAttribute(k,l)}}function g(a){return Object.getPrototypeOf?Object.getPrototypeOf(a):a.__proto__?a.__proto__:a.constructor?a.constructor.prototype:void 0}var h=a("../vnode/is-vhook.js");b.exports=d},{"../vnode/is-vhook.js":23}],13:[function(a,b,c){function d(a,b){var c=b?b.document||e:e,j=b?b.warn:null;if(a=i(a).a,h(a))return c.createTextNode(a.text);if(!g(a))return j&&j("Item is not a valid virtual dom node",a),null;var k=a.properties||{},l=k.attributes&&k.attributes.is||k.is,m=null;m=null===a.namespace?l?c.createElement(a.tagName,l):c.createElement(a.tagName):l?c.createElementNS(a.namespace,a.tagName,l):c.createElementNS(a.namespace,a.tagName),f(m,k);for(var n=a.children,o=0;o<n.length;o++){var p=d(n[o],b);p&&m.appendChild(p)}return m}var e=a("global/document"),f=a("./apply-properties"),g=a("../vnode/is-vnode.js"),h=a("../vnode/is-vtext.js"),i=a("../vnode/handle-thunk.js");b.exports=d},{"../vnode/handle-thunk.js":21,"../vnode/is-vnode.js":24,"../vnode/is-vtext.js":25,"./apply-properties":12,"global/document":8}],14:[function(a,b,c){function d(a,b,c,d){return c&&0!==c.length?(c.sort(g),e(a,b,c,d,0)):{}}function e(a,b,c,d,g){if(d=d||{},a){f(c,g,g)&&(d[g]=a);var i=b.children;if(i)for(var j=a.childNodes,k=0;k<b.children.length;k++){g+=1;var l=i[k]||h,m=g+(l.count||0);f(c,g,m)&&e(j[k],l,c,d,g),g=m}}return d}function f(a,b,c){if(0===a.length)return!1;for(var d,e,f=0,g=a.length-1;f<=g;){if(d=(g+f)/2>>0,e=a[d],f===g)return e>=b&&e<=c;if(e<b)f=d+1;else{if(!(e>c))return!0;g=d-1}}return!1}function g(a,b){return a>b?1:-1}var h={};b.exports=d},{}],15:[function(a,b,c){function d(a,b,c){var d=a.type,m=a.vNode,n=a.patch;switch(d){case l.REMOVE:return e(b,m);case l.INSERT:return f(b,n,c);case l.VTEXT:return g(b,m,n,c);case l.VNODE:return h(b,m,n,c);case l.ORDER:return i(b,n),b;case l.PROPS:return k(b,n,m.properties),b;case l.THUNK:return j(b,c.patch(b,n,c));default:return b}}function e(a,b){var c=a.parentNode;return c&&c.removeChild(a),null}function f(a,b,c){var d=c.render(b,c);return a&&a.appendChild(d),a}function g(a,b,c,d){var e;if(3===a.nodeType)a.replaceData(0,a.length,c.text),e=a;else{var f=a.parentNode;e=d.render(c,d),f&&e!==a&&f.replaceChild(e,a)}return e}function h(a,b,c,d){var e=a.parentNode,f=d.render(c,d);return e&&f!==a&&e.replaceChild(f,a),f}function i(a,b){for(var c,d,e,f=a.childNodes,g={},h=0;h<b.removes.length;h++)d=b.removes[h],c=f[d.from],d.key&&(g[d.key]=c),a.removeChild(c);for(var i=f.length,j=0;j<b.inserts.length;j++)e=b.inserts[j],c=g[e.key],a.insertBefore(c,e.to>=i++?null:f[e.to])}function j(a,b){return a&&b&&a!==b&&a.parentNode&&a.parentNode.replaceChild(b,a),b}var k=a("./apply-properties"),l=a("../vnode/vpatch.js");b.exports=d},{"../vnode/vpatch.js":28,"./apply-properties":12}],16:[function(a,b,c){function d(a,b,c){return c=c||{},c.patch=c.patch&&c.patch!==d?c.patch:e,c.render=c.render||i,c.patch(a,b,c)}function e(a,b,c){var d=g(b);if(0===d.length)return a;var e=j(a,b.a,d),i=a.ownerDocument;c.document||i===h||(c.document=i);for(var k=0;k<d.length;k++){var l=d[k];a=f(a,e[l],b[l],c)}return a}function f(a,b,c,d){if(!b)return a;var e;if(Array.isArray(c))for(var f=0;f<c.length;f++)e=k(c[f],b,d),b===a&&(a=e);else e=k(c,b,d),b===a&&(a=e);return a}function g(a){var b=[];for(var c in a)"a"!==c&&b.push(Number(c));return b}var h=a("global/document"),i=a("./create-element"),j=a("./dom-index"),k=a("./patch-op");b.exports=d},{"./create-element":13,"./dom-index":14,"./patch-op":15,"global/document":8}],17:[function(a,b,c){"use strict";function d(a){return this instanceof d?void(this.value=a):new d(a)}var e=a("ev-store");b.exports=d,d.prototype.hook=function(a,b){var c=e(a),d=b.substr(3);c[d]=this.value},d.prototype.unhook=function(a,b){var c=e(a),d=b.substr(3);c[d]=void 0}},{"ev-store":7}],18:[function(a,b,c){"use strict";function d(a){return this instanceof d?void(this.value=a):new d(a)}b.exports=d,d.prototype.hook=function(a,b){a[b]!==this.value&&(a[b]=this.value)}},{}],19:[function(a,b,c){"use strict";function d(a,b,c){var d,g,i,k,m=[];if(!c&&h(b)&&(c=b,g={}),g=g||b||{},d=r(a,g),g.hasOwnProperty("key")&&(i=g.key,g.key=void 0),g.hasOwnProperty("namespace")&&(k=g.namespace,g.namespace=void 0),"INPUT"===d&&!k&&g.hasOwnProperty("value")&&void 0!==g.value&&!p(g.value)){if(null!==g.value&&"string"!=typeof g.value)throw j({expected:"String",received:typeof g.value,Vnode:{tagName:d,properties:g}});g.value=s(g.value)}return f(g),void 0!==c&&null!==c&&e(c,m,d,g),new l(d,g,m,i,k)}function e(a,b,c,d){if("string"==typeof a)b.push(new m(a));else if("number"==typeof a)b.push(new m(String(a)));else if(g(a))b.push(a);else{if(!Array.isArray(a)){if(null===a||void 0===a)return;throw i({foreignObject:a,parentVnode:{tagName:c,properties:d}})}for(var f=0;f<a.length;f++)e(a[f],b,c,d)}}function f(a){for(var b in a)if(a.hasOwnProperty(b)){var c=a[b];if(p(c))continue;"ev-"===b.substr(0,3)&&(a[b]=t(c))}}function g(a){return n(a)||o(a)||q(a)}function h(a){return"string"==typeof a||Array.isArray(a)||g(a)}function i(a){var b=new Error;return b.type="virtual-hyperscript.unexpected.virtual-element",b.message="Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / string but:\ngot:\n"+k(a.foreignObject)+".\nThe parent vnode is:\n"+k(a.parentVnode),b.foreignObject=a.foreignObject,b.parentVnode=a.parentVnode,b}function j(a){var b=new Error;return b.type="virtual-hyperscript.unsupported.value-type",b.message="Unexpected value type for input passed to h().\nExpected a "+k(a.expected)+" but got:\n"+k(a.received)+".\nThe vnode is:\n"+k(a.Vnode),b.Vnode=a.Vnode,b}function k(a){try{return JSON.stringify(a,null,"    ")}catch(b){return String(a)}}var l=a("../vnode/vnode.js"),m=a("../vnode/vtext.js"),n=a("../vnode/is-vnode"),o=a("../vnode/is-vtext"),p=a("../vnode/is-vhook"),q=a("../vnode/is-thunk"),r=a("./parse-tag.js"),s=a("./hooks/soft-set-hook.js"),t=a("./hooks/ev-hook.js");b.exports=d},{"../vnode/is-thunk":22,"../vnode/is-vhook":23,"../vnode/is-vnode":24,"../vnode/is-vtext":25,"../vnode/vnode.js":27,"../vnode/vtext.js":29,"./hooks/ev-hook.js":17,"./hooks/soft-set-hook.js":18,"./parse-tag.js":20}],20:[function(a,b,c){"use strict";function d(a,b){if(!a)return"DIV";var c=!b.hasOwnProperty("id"),d=e(a,f),h=null;g.test(d[1])&&(h="DIV");var i,j,k,l;for(l=0;l<d.length;l++)j=d[l],j&&(k=j.charAt(0),h?"."===k?(i=i||[],i.push(j.substring(1,j.length))):"#"===k&&c&&(b.id=j.substring(1,j.length)):h=j);return i&&(b.className&&i.push(b.className),b.className=i.join(" ")),b.namespace?h:h.toUpperCase()}var e=a("browser-split"),f=/([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/,g=/^\.|#/;b.exports=d},{"browser-split":6}],21:[function(a,b,c){function d(a,b){var c=a,d=b;return h(b)&&(d=e(b,a)),h(a)&&(c=e(a,null)),{a:c,b:d}}function e(a,b){var c=a.vnode;if(c||(c=a.vnode=a.render(b)),!f(c)&&!g(c))throw new Error("thunk did not return a valid node");return c}var f=a("./is-vnode"),g=a("./is-vtext"),h=a("./is-thunk");b.exports=d},{"./is-thunk":22,"./is-vnode":24,"./is-vtext":25}],22:[function(a,b,c){function d(a){return a&&"Thunk"===a.type}b.exports=d},{}],23:[function(a,b,c){function d(a){return a&&("function"==typeof a.hook&&!a.hasOwnProperty("hook")||"function"==typeof a.unhook&&!a.hasOwnProperty("unhook"))}b.exports=d},{}],24:[function(a,b,c){function d(a){return a&&"VirtualNode"===a.type&&a.version===e}var e=a("./version");b.exports=d},{"./version":26}],25:[function(a,b,c){function d(a){return a&&"VirtualText"===a.type&&a.version===e}var e=a("./version");b.exports=d},{"./version":26}],26:[function(a,b,c){b.exports="2"},{}],27:[function(a,b,c){function d(a,b,c,d,e){this.tagName=a,this.properties=b||i,this.children=c||j,this.key=null!=d?String(d):void 0,this.namespace="string"==typeof e?e:null;var k,l=c&&c.length||0,m=0,n=!1,o=!1;for(var p in b)if(b.hasOwnProperty(p)){var q=b[p];h(q)&&q.unhook&&(k||(k={}),k[p]=q)}for(var r=0;r<l;r++){var s=c[r];f(s)?(m+=s.count||0,!n&&s.hasThunks&&(n=!0),o||!s.hooks&&!s.descendantHooks||(o=!0)):!n&&g(s)&&(n=!0)}this.count=l+m,this.hasThunks=n,this.hooks=k,this.descendantHooks=o}var e=a("./version"),f=a("./is-vnode"),g=a("./is-thunk"),h=a("./is-vhook");b.exports=d;var i={},j=[];d.prototype.version=e,d.prototype.type="VirtualNode"},{"./is-thunk":22,"./is-vhook":23,"./is-vnode":24,"./version":26}],28:[function(a,b,c){function d(a,b,c){this.type=Number(a),this.vNode=b,this.patch=c}var e=a("./version");d.NONE=0,d.VTEXT=1,d.VNODE=2,d.PROPS=3,d.ORDER=4,d.INSERT=5,d.REMOVE=6,d.THUNK=7,b.exports=d,d.prototype.version=e,d.prototype.type="VirtualPatch"},{"./version":26}],29:[function(a,b,c){function d(a){this.text=String(a)}var e=a("./version");b.exports=d,d.prototype.version=e,d.prototype.type="VirtualText"},{"./version":26}],30:[function(a,b,c){function d(a,b){var c;for(var g in a){g in b||(c=c||{},c[g]=void 0);var h=a[g],i=b[g];if(h!==i)if(h&&"object"==typeof h&&i&&"object"==typeof i)if(e(i)!==e(h))c=c||{},c[g]=i;else if(f(i))c=c||{},c[g]=i;else{var j=d(h,i);j&&(c=c||{},c[g]=j)}else c=c||{},c[g]=i}for(var k in b)k in a||(c=c||{},c[k]=b[k]);return c}function e(a){return Object.getPrototypeOf?Object.getPrototypeOf(a):a.__proto__?a.__proto__:a.constructor?a.constructor.prototype:void 0}var f=a("../vnode/is-vhook");b.exports=d},{"../vnode/is-vhook":23}],31:[function(a,b,c){function d(a,b){var c={a:a};return e(a,b,c,0),c}function e(a,b,c,d){if(a!==b){var e=c[d],i=!1;if(s(a)||s(b))h(a,b,c,d);else if(null==b)g(a,c,d),e=c[d],e=o(e,new p(p.REMOVE,a,b));else if(q(b))if(q(a))if(a.tagName===b.tagName&&a.namespace===b.namespace&&a.key===b.key){var j=u(a.properties,b.properties);j&&(e=o(e,new p(p.PROPS,a,j))),e=f(a,b,c,e,d)}else e=o(e,new p(p.VNODE,a,b)),i=!0;else e=o(e,new p(p.VNODE,a,b)),i=!0;else r(b)&&(r(a)?a.text!==b.text&&(e=o(e,new p(p.VTEXT,a,b))):(e=o(e,new p(p.VTEXT,a,b)),i=!0));e&&(c[d]=e),i&&g(a,c,d)}}function f(a,b,c,d,f){for(var g=a.children,h=l(g,b.children),i=h.children,j=g.length,k=i.length,m=j>k?j:k,n=0;n<m;n++){var r=g[n],s=i[n];f+=1,r?e(r,s,c,f):s&&(d=o(d,new p(p.INSERT,null,s))),q(r)&&r.count&&(f+=r.count)}return h.moves&&(d=o(d,new p(p.ORDER,a,h.moves))),d}function g(a,b,c){j(a,b,c)}function h(a,b,c,e){var f=t(a,b),g=d(f.a,f.b);i(g)&&(c[e]=new p(p.THUNK,null,g))}function i(a){for(var b in a)if("a"!==b)return!0;return!1}function j(a,b,c){if(q(a)){if(a.hooks&&(b[c]=o(b[c],new p(p.PROPS,a,k(a.hooks)))),a.descendantHooks||a.hasThunks)for(var d=a.children,e=d.length,f=0;f<e;f++){var g=d[f];c+=1,j(g,b,c),q(g)&&g.count&&(c+=g.count)}}else s(a)&&h(a,null,b,c)}function k(a){var b={};for(var c in a)b[c]=void 0;return b}function l(a,b){var c=n(b),d=c.keys,e=c.free;if(e.length===b.length)return{children:b,moves:null};var f=n(a),g=f.keys,h=f.free;if(h.length===a.length)return{children:b,moves:null};for(var i=[],j=0,k=e.length,l=0,o=0;o<a.length;o++){var p,q=a[o];q.key?d.hasOwnProperty(q.key)?(p=d[q.key],i.push(b[p])):(p=o-l++,i.push(null)):j<k?(p=e[j++],i.push(b[p])):(p=o-l++,i.push(null))}for(var r=j>=e.length?b.length:e[j],s=0;s<b.length;s++){var t=b[s];t.key?g.hasOwnProperty(t.key)||i.push(t):s>=r&&i.push(t)}for(var u,v=i.slice(),w=0,x=[],y=[],z=0;z<b.length;){var A=b[z];for(u=v[w];null===u&&v.length;)x.push(m(v,w,null)),u=v[w];u&&u.key===A.key?(w++,z++):A.key?(u&&u.key&&d[u.key]!==z+1?(x.push(m(v,w,u.key)),u=v[w],u&&u.key===A.key?w++:y.push({key:A.key,to:z})):y.push({key:A.key,to:z}),z++):u&&u.key&&x.push(m(v,w,u.key))}for(;w<v.length;)u=v[w],x.push(m(v,w,u&&u.key));return x.length!==l||y.length?{children:i,moves:{removes:x,inserts:y}}:{children:i,moves:null}}function m(a,b,c){return a.splice(b,1),{from:b,key:c}}function n(a){for(var b={},c=[],d=a.length,e=0;e<d;e++){var f=a[e];f.key?b[f.key]=e:c.push(e)}return{keys:b,free:c}}function o(a,b){return a?(Array.isArray(a)?a.push(b):a=[a,b],a):b}var p=a("../vnode/vpatch"),q=a("../vnode/is-vnode"),r=a("../vnode/is-vtext"),s=a("../vnode/is-thunk"),t=a("../vnode/handle-thunk"),u=a("./diff-props");b.exports=d},{"../vnode/handle-thunk":21,"../vnode/is-thunk":22,"../vnode/is-vnode":24,"../vnode/is-vtext":25,"../vnode/vpatch":28,"./diff-props":30}]},{},[4])(4)})}(),h()}),a.register("2",["4"],function(a,b){"use strict";function c(a,b){var c="";Array.isArray(b)||(b=[b]),b.forEach(function(a){"function"==typeof a&&(a=a()),c+=a}),a="style-"+a;var d=document.getElementById(a)||document.createElement("style");if(d.type="text/css",d.setAttribute("id",a),d.innerHTML="",d.appendChild(document.createTextNode(c)),!d.parentNode){var e=document.head;e.firstElementChild?e.insertBefore(d,e.firstElementChild):e.appendChild(d)}return d}function d(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return c.call(a,b)}function e(a,b,c,e){a.addEventListener(b,function(b){for(var f=b.target;f&&f!==a;){if(d(f,c))return void e.call(a,b,f);f=f.parentNode}})}function f(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function g(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function h(a,b){var c=void 0;if(a){c=Object.getOwnPropertyDescriptor(a,b);var d=Object.getPrototypeOf(a);!c&&d&&(c=h(d,b))}return c}function i(a,b,c){var d="function"==typeof b.get,e=function(){var e=void 0;return e=d?b.get.call(this):B.get(this,a),"undefined"!=typeof e?e:c};return e}function j(a,b,c){if(b&&b.set&&b.set.callbacks)return b.set.callbacks.push(c),b.set;var d=function c(d){var e=this;b.set?b.set.call(this,d):B.set(this,a,d);var f=this[a];return c.callbacks.forEach(function(b){"function"==typeof b&&b.call(e,a,f)}),f};return d.callbacks=[c],d}function k(a,b,c){var d=a.getAttribute(b);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||d===c?"boolean"==typeof c&&""!==d&&a.setAttribute(b,""):a.setAttribute(b,c):(d||""===d)&&a.removeAttribute(b)}function l(a){return E.get(a)||function(){var b=(a.observedAttributes||[]).map(function(a){return g(a)});return E.set(a,b),b}()}function m(a,b){return"undefined"!=typeof b&&(G[a]=b),G[a]}function n(a,b){if("function"==typeof b&&(b=b.call(a)),"string"==typeof b){b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," ");var c=new DOMParser,d=c.parseFromString(b,"text/html");b=d.body&&d.body.childNodes}if(b instanceof Node)if("TEMPLATE"===b.tagName){if("function"!=typeof document.importNode||"undefined"==typeof HTMLTemplateElement)throw new Error("Template element is not supported by the browser");var e=document.createDocumentFragment(),f=document.importNode(b.content,!0);e.appendChild(f),b=e.childNodes}else b=[b];return b instanceof NodeList&&(b=Array.prototype.slice.call(b,0)),b}function o(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]||arguments[2],d={};return Array.prototype.forEach.call(a.attributes||[],function(a){c&&"is"!==a.name?d[a.name]=new K(a.value,b.namespace):d[a.name]=a.value}),d}function p(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("undefined"==typeof a||a.nodeType===Node.COMMENT_NODE)return!1;if(a.nodeType===Node.TEXT_NODE)return new r.VText(a.textContent);var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);a.tagName&&"svg"===a.tagName.toLowerCase()&&(c.namespace="http://www.w3.org/2000/svg");var e=a.constructor,f=c.hooks&&"function"==typeof e,g=o(a,c,f);f?g["life-cycle-hook"]=new J:g={attributes:g};var h=Array.prototype.filter.call(a.childNodes||[],function(a){return a&&a instanceof Node&&a.nodeType!==Node.COMMENT_NODE});return new r.VNode(a.tagName,g,h.map(function(a){return p(a,c)}),(void 0),c.namespace)}function q(a,b){var c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],d=function(d){return d=d||document.createElement(c.extends?c.extends:a),d.__proto__=b.prototype,b.prototype.constructor.call(d),d};return d.prototype=b.prototype,Object.defineProperty(d.prototype,"constructor",{configurable:!1,get:function(){return b}}),d}var r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R;return{setters:[function(a){r=a.virtualDom}],execute:function(){s=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},t=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},u=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},v=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),a("mix",w=function(a){return new x(a)}),x=function(){function a(b){s(this,a),this.superclass=b}return v(a,[{key:"with",value:function(){return Array.from(arguments).reduce(function(a,b){return b(a)},this.superclass)}}]),a}(),a("DNAComponent",y=function(a){function b(){return s(this,b),t(this,Object.getPrototypeOf(b).apply(this,arguments))}return u(b,a),v(b,[{key:"connectedCallback",value:function(){}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(){}}]),b}(HTMLElement)),a("DNAStyleComponent",z=function(a){function b(){s(this,b);var a=t(this,Object.getPrototypeOf(b).call(this));if(a.is){var d=a.constructor.css;d&&c(a.is,d),a.classList.add(a.is)}return a}return u(b,a),v(b,null,[{key:"addCss",value:function(){return c.apply(void 0,arguments)}}]),b}(y)),a("DNAEventsComponent",A=function(a){function b(){s(this,b);var a=t(this,Object.getPrototypeOf(b).call(this)),c=a.constructor.events;if(c)for(var d in c)c.hasOwnProperty(d)&&!function(){var b="string"==typeof c[d]?a[c[d]]:c[d];if(b&&"function"==typeof b){var f=d.split(" "),g=f.shift(),h=f.join(" ");h?e(a,g,h,function(c,d){b.call(a,c,d)}):a.addEventListener(g,function(c){b.call(a,c,a)})}}();return a}return u(b,a),v(b,[{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments.length<=3||void 0===arguments[3]||arguments[3];if(!a)throw new Error("Event name is undefined");var e=document.createEvent("Event");return"undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),b&&(e.detail=b),this.dispatchEvent(e)}}]),b}(y)),a("DNAProperty",B=function(){function a(){s(this,a)}return v(a,null,[{key:"get",value:function(b,c){var d=a.map.get(b)||{};return d[c]}},{key:"set",value:function(b,c,d){var e=arguments.length<=3||void 0===arguments[3]||arguments[3],f=a.map.get(b)||{},g=f[c];return g!==d&&(f[c]=d,a.map.set(b,f),e&&this.changed(b,c,g,d)),b[c]}},{key:"delete",value:function(b,c){var d=arguments.length<=2||void 0===arguments[2]||arguments[2],e=a.map.get(b)||{};if(e.hasOwnProperty(c)){var f=e[c];delete e[c],a.map.set(b,e),d&&this.changed(b,c,f,void 0)}}},{key:"observe",value:function(b,c,d){"function"==typeof c&&(d=c,c=a.GENERIC_OBSERVER);var e=a.callbacks.get(b)||{};e[c]=e[c]||[],e[c].push(d),a.callbacks.set(b,e);var f=e[c].length-1;return{cancel:function(){e[c]=e[c]||[],e[c][f]=null,a.callbacks.set(b,e)}}}},{key:"changed",value:function(b,c,d,e){var f=a.callbacks.get(b)||{},g=(f[c]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1});g||(f[a.GENERIC_OBSERVER]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1})}},{key:"GENERIC_OBSERVER",get:function(){return"-1"}}]),a}()),B.map=new WeakMap,B.callbacks=new WeakMap,a("DNAPropertiesComponent",C=function(a){function b(){s(this,b);var a=t(this,Object.getPrototypeOf(b).call(this)),c=a.constructor,d=c.observedProperties||[];d.forEach(function(b){var d=h(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:i(b,d),set:j(b,d,function(b,c){B.set(a,b,c)})})});for(var e=Array.prototype.slice.call(a.attributes||[],0),f=0,k=e.length;f<k;f++){var l=e[f],m=g(l.name);if(d.indexOf(m)!==-1){var n=l.value;if(a.removeAttribute(l.name),""===n)a[m]=!0;else try{a[m]=JSON.parse(n)}catch(b){a[m]=n}}}return a}return u(b,a),v(b,[{key:"observeProperty",value:function(a,b){return B.observe(this,a,b)}},{key:"observeProperties",value:function(a){return B.observe(this,a)}}]),b}(y)),D=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)},E=new WeakMap,a("DNAAttributesComponent",F=function(a){function b(){s(this,b);var a=t(this,Object.getPrototypeOf(b).call(this)),c=a.constructor,d=l(c);d.forEach(function(b){var d=h(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:i(b,d),set:j(b,d,function(a,b){var c=f(a);k(this,c,b)})})});for(var e=a.attributes||[],g=0,m=e.length;g<m;g++){var n=e[g];a.attributeChangedCallback(n.name,void 0,n.value)}return d.forEach(function(b){k(a,f(b),a[b])}),a}return u(b,a),v(b,[{key:"attributeChangedCallback",value:function(a,c,d){D(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d);var e=l(this.constructor);if(e&&Array.isArray(e)){var f=g(a);e.indexOf(f)!==-1&&(""===d&&(d=!0),d!==this[f]&&(this[f]=d))}}}]),b}(y)),G={},H=!0,a("DNATemplateComponent",I=function(a){function b(){return s(this,b),t(this,Object.getPrototypeOf(b).apply(this,arguments))}return u(b,a),v(b,[{key:"connectedCallback",value:function(){var a=this.constructor;a.hasOwnProperty("template")&&m(this.is,a.template),a&&a.autoUpdateView&&B.observe(this,function(){this.templateReady&&this.render()}),this.templateReady=!0,this.render(),D(Object.getPrototypeOf(b.prototype),"connectedCallback",this).call(this)}},{key:"render",value:function(a){if(a=a||m(this.is),a=n(this,a),null!==a&&void 0!==a){if(Array.isArray(a)){var b=B.get(this,"__lastNode");if(b){b instanceof Node&&(b=[b]);for(var c=0;c<b.length;c++){var d=b[c];d.parentNode===this&&this.removeChild(d);
}}a instanceof Node&&(a=[a]);for(var e=0;e<a.length;e++)this.appendChild(a[e]);B.set(this,"__lastNode",a,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"autoUpdateView",get:function(){return H}}]),b}(y)),J=function(){function a(){s(this,a)}return v(a,[{key:"hook",value:function(b){var c=B.get(b,a.CREATED_PROP);c||B.set(b,a.CREATED_PROP,!0,!1),this.isAttached(b)}},{key:"isAttached",value:function(b){var c=B.get(b,a.ATTACHED_PROP);this.parentNode&&!c?(B.set(b,a.ATTACHED_PROP,!0,!1),this.trigger("connectedCallback")):!this.parentNode&&c&&(B.set(b,a.ATTACHED_PROP,!1,!1),this.trigger("disconnectedCallback"))}},{key:"trigger",value:function(a){if("function"==typeof this[a]){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];this[a].apply(this,c)}}}],[{key:"CREATED_PROP",get:function(){return"__virtualDomCreated"}},{key:"ATTACHED_PROP",get:function(){return"__virtualDomAttached"}}]),a}(),K=function(){function a(b,c){s(this,a),this.value=b,this.namespace=c}return v(a,[{key:"hook",value:function(a,b,c){var d=this.value,e=c&&c.value;e!==d&&(void 0!==d&&null!==d?this.namespace?(a.removeAttribute(b),a.setAttributeNS(this.namespace,b,d)):a.setAttribute(b,d):c&&(this.namespace?a.removeAttributeNS(this.namespace,b):a.removeAttribute(b)),"function"==typeof a.attributeChangedCallback&&a.attributeChangedCallback(b,e,d))}}]),a}(),a("DNAVDomComponent",L=function(a){function b(){return s(this,b),t(this,Object.getPrototypeOf(b).apply(this,arguments))}return u(b,a),v(b,[{key:"render",value:function(a){var b=this;if(a=a||m(this.is),a=n(this,a),null!==a&&void 0!==a){var c=new r.VNode(this.tagName),d=B.get(this,"__vtree")||c;if(Array.isArray(a)&&!function(){var d=b.constructor.useVirtualDomHooks;a=a.map(function(a){return p(a,{hooks:d})}),c=new r.VNode(b.tagName,{},a)}(),c instanceof r.VNode){var e=r.diff(d||p(),c);r.patch(this,e),B.set(this,"__vtree",c,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"useVirtualDomHooks",get:function(){return!0}}]),b}(I)),M=w(y).with(C,z,A,F,L),a("DNAVDomBaseComponent",N=function(a){function b(){return s(this,b),t(this,Object.getPrototypeOf(b).apply(this,arguments))}return u(b,a),b}(M)),O=w(y).with(C,z,A,F,I),a("DNABaseComponent",P=function(a){function b(){return s(this,b),t(this,Object.getPrototypeOf(b).apply(this,arguments))}return u(b,a),b}(O)),a("Version",Q='2.0.0-beta1'||"dev"),a("BaseComponent",R=N),a("DNAVDomBaseComponent",N),a("BaseComponent",R),a("Version",Q),a("mix",w),a("DNAProperty",B),a("register",q),a("DNAComponent",y),a("DNAPropertiesComponent",C),a("DNAAttributesComponent",F),a("DNAEventsComponent",A),a("DNAStyleComponent",z),a("DNATemplateComponent",I),a("DNABaseComponent",P),a("DNAVDomComponent",L)}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():DNA=a()});