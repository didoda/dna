!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in n||(n[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==o.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=n[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(o.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=n[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return s[a]||(s[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},b.name);c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=n[k],o=s[k];o?j=o.exports:l&&!l.declarative?j=l.esModule:l?(h(l),o=l.module,j=o.exports):j=m(k),o&&o.importers?(o.importers.push(c),c.dependencies.push(o)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=n[a];if(c)c.declarative?l(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=m(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b["default"]:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=n[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){if(b===a)return b;var c={};if("object"==typeof b||"function"==typeof b)if(p){var d;for(var e in b)(d=Object.getOwnPropertyDescriptor(b,e))&&r(c,e,d)}else{var f=b&&b.hasOwnProperty;for(var e in b)(!f||b.hasOwnProperty(e))&&(c[e]=b[e])}return c["default"]=b,r(c,"__useDefault",{value:!0}),c}function l(b,c){var d=n[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==o.call(c,g)&&(n[g]?l(g,c):m(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function m(a){if(u[a])return u[a];if("@node/"==a.substr(0,6))return t(a.substr(6));var b=n[a];if(!b)throw"Module "+a+" not present.";return f(a),l(a,[]),n[a]=void 0,b.declarative&&r(b.module.exports,"__esModule",{value:!0}),u[a]=b.declarative?b.module.exports:b.esModule}var n={},o=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},p=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(q){p=!1}var r;!function(){try{Object.defineProperty({},"a",{})&&(r=Object.defineProperty)}catch(a){r=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}}();var s={},t="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,u={"@empty":{}};return function(a,d,e){return function(f){f(function(f){for(var g={_nodeRequire:t,register:b,registerDynamic:c,get:m,set:function(a,b){u[a]=b},newModule:function(a){return a}},h=0;h<d.length;h++)(function(a,b){b&&b.__esModule?u[a]=b:u[a]=k(b)})(d[h],arguments[h]);e(g);var i=m(a[0]);if(a.length>1)for(var h=1;h<a.length;h++)m(a[h]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)(["1"],[],function(a){!function(){var b=a;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var c=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");b.set("@@cjs-helpers",b.newModule({getPathVars:function(a){var b,d=a.lastIndexOf("!");b=-1!=d?a.substr(0,d):a;var e=b.split("/");return e.pop(),e=e.join("/"),"file:///"==b.substr(0,8)?(b=b.substr(7),e=e.substr(7),isWindows&&(b=b.substr(1),e=e.substr(1))):c&&b.substr(0,c.length)===c&&(b=b.substr(c.length),e=e.substr(c.length)),{filename:b,dirname:e}}}))}(),a.registerDynamic("2",[],!0,function(a,b,c){"use strict";function d(a){this.listenerMap=[{},{}],a&&this.root(a),this.handle=d.prototype.handle.bind(this)}function e(a,b){return a.toLowerCase()===b.tagName.toLowerCase()}function f(a,b){return this.rootElement===window?b===document:this.rootElement===b}function g(a,b){return a===b.id}var h=this,i=h.define;h.define=void 0,c.exports=d,d.prototype.root=function(a){var b,c=this.listenerMap;if(this.rootElement){for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!1)}if(!a||!a.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=a;for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!1);return this},d.prototype.captureForType=function(a){return-1!==["blur","error","focus","load","resize","scroll"].indexOf(a)},d.prototype.on=function(a,b,c,d){var h,i,k,l;if(!a)throw new TypeError("Invalid event type: "+a);if("function"==typeof b&&(d=c,c=b,b=null),void 0===d&&(d=this.captureForType(a)),"function"!=typeof c)throw new TypeError("Handler must be a type of Function");return h=this.rootElement,i=this.listenerMap[d?1:0],i[a]||(h&&h.addEventListener(a,this.handle,d),i[a]=[]),b?/^[a-z]+$/i.test(b)?(l=b,k=e):/^#[a-z0-9\-_]+$/i.test(b)?(l=b.slice(1),k=g):(l=b,k=j):(l=null,k=f.bind(this)),i[a].push({selector:b,handler:c,matcher:k,matcherParam:l}),this},d.prototype.off=function(a,b,c,d){var e,f,g,h,i;if("function"==typeof b&&(d=c,c=b,b=null),void 0===d)return this.off(a,b,c,!0),this.off(a,b,c,!1),this;if(g=this.listenerMap[d?1:0],!a){for(i in g)g.hasOwnProperty(i)&&this.off(i,b,c);return this}if(h=g[a],!h||!h.length)return this;for(e=h.length-1;e>=0;e--)f=h[e],b&&b!==f.selector||c&&c!==f.handler||h.splice(e,1);return h.length||(delete g[a],this.rootElement&&this.rootElement.removeEventListener(a,this.handle,d)),this},d.prototype.handle=function(a){var b,c,d,e,f,g,h,i=a.type,j=[],k="ftLabsDelegateIgnore";if(a[k]!==!0){switch(h=a.target,3===h.nodeType&&(h=h.parentNode),d=this.rootElement,e=a.eventPhase||(a.target!==a.currentTarget?3:2)){case 1:j=this.listenerMap[1][i];break;case 2:this.listenerMap[0]&&this.listenerMap[0][i]&&(j=j.concat(this.listenerMap[0][i])),this.listenerMap[1]&&this.listenerMap[1][i]&&(j=j.concat(this.listenerMap[1][i]));break;case 3:j=this.listenerMap[0][i]}for(c=j.length;h&&c;){for(b=0;c>b&&(f=j[b],f);b++)if(f.matcher.call(h,f.matcherParam,h)&&(g=this.fire(a,h,f)),g===!1)return a[k]=!0,void a.preventDefault();if(h===d)break;c=j.length,h=h.parentElement}}},d.prototype.fire=function(a,b,c){return c.handler.call(b,a,b)};var j=function(a){if(a){var b=a.prototype;return b.matches||b.matchesSelector||b.webkitMatchesSelector||b.mozMatchesSelector||b.msMatchesSelector||b.oMatchesSelector}}(Element);return d.prototype.destroy=function(){this.off(),this.root()},h.define=i,c.exports}),a.register("1",["2"],function(a){"use strict";function b(a,c){var d=void 0;return a&&(d=Object.getOwnPropertyDescriptor(a,c),!d&&a.__proto__&&(d=b(a.__proto__,c))),d}function c(a,b){if(b&&b.set&&b.set.wrapped)return b.set;var c=function(c){b.set?b.set.call(this,c):this["__"+a]=c;var d=this[a];return null!==d&&void 0!==d&&d!==!1?"string"!=typeof d&&"number"!=typeof d||this.getAttribute(a)===d?"boolean"==typeof d&&this.setAttribute(e(a),a):this.setAttribute(e(a),d):this.removeAttribute(e(a)),d};return c.wrapped=!0,c}function d(a,b){return b.get||function(){return this["__"+a]}}function e(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2")}function f(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function g(a,b,c){var d=a;"function"!=typeof d&&d.constructor&&(d=d.constructor);var e=i(b),f=d[e]||d.__proto__&&d.__proto__[e];if(f&&Array.isArray(f))for(var g=0,h=f.length;h>g;g++)f[g].apply(a,c)}function h(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)h(a,b[c]);else{if(a.__attachedBehaviors=a.__attachedBehaviors||[],-1!==a.__attachedBehaviors.indexOf(b))return;var d=G,e=Object.getOwnPropertyNames(b);for(var f in e){var g=e[f];if(g in B||(a[g]=b[g]),-1!==d.indexOf(g)){var j=i(g);a[j]=a[j]||[],a[j].push(b[g])}else g in B||(a[g]=b[g])}if(b.prototype){e=Object.getOwnPropertyNames(b.prototype);for(var f in e){var g=e[f];if(-1!==d.indexOf(g)){var j=i(g);a[j]=a[j]||[],a[j].push(b.prototype[g])}else g in B.prototype||(a.prototype[g]=b.prototype[g])}}a.__attachedBehaviors.push(b)}}function i(a){return"__"+a+"Callbacks"}function j(a){var b={};return Array.prototype.forEach.call(a.attributes||[],function(a){b[a.name]=a.value}),b}function k(a){return a.nodeType===Node.TEXT_NODE?new I.VText(a.textContent):new I.VNode(a.tagName,{attributes:j(a)},Array.prototype.map.call(a.childNodes||[],k))}function l(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("string"!=typeof a)throw"Missing or bad typed `tagName` property";var c=b.prototype;if("undefined"==typeof c)throw"Missing prototype";if("function"!=typeof c){var d=function(){};d.prototype=c,c=d}var e=L(c,K);for(var f in c.prototype)-1!==["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].indexOf(f)&&(e.prototype[f]=p(e.prototype[f],K.prototype[f]));Object.defineProperty(e,"tagName",{configurable:!0,get:function(){return a}}),b.tagName=a;var g=s(e,b);return g.Extend=function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b="function"==typeof a?a:function(a){var b=function(){};return b.prototype=a,b}(a);return L(b,c)},g}function m(a){function b(b){if(-1===d.indexOf(b)){var c={key:b};if("function"==typeof a[b])c.value=a[b];else{var e=Object.getOwnPropertyDescriptor(a,b)||{};e.get?(c.get=e.get,c.set=e.set):c.value=a[b]}return d.push(b),c}}var c=[],d=["name","length","prototype"];for(var e in a){var f=b(e);f&&c.push(f)}var g=Object.getOwnPropertyNames(a);for(var h in g){var f=b(g[h]);f&&c.push(f)}return c}function n(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}function o(a,b,c){return b&&n(a.prototype,b),c&&n(a,c),a}function p(a,b){return function(){a.apply(this,arguments),b.apply(this,arguments)}}function q(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function r(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:get(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)}function s(){return z.register.apply(z,arguments)}var t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L;return{setters:[function(a){t=a["default"]}],execute:function(){u=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},v=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),w=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},x=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},y=function j(){u(this,j)},y.useWebComponents="undefined"!=typeof window&&("undefined"!=typeof window.WebComponents||"undefined"!=typeof window.CustomElements),y.useVirtualDOM="undefined"!=typeof window&&"undefined"!=typeof window.virtualDom,y.autoUpdateView=!0,z=function(){function a(){u(this,a)}return v(a,null,[{key:"register",value:function(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=void 0,e=void 0;"string"==typeof b&&(d=b,"function"==typeof c?(b=c,c={}):"undefined"!=typeof c.prototype&&(b=c.prototype)),"function"==typeof b?(d=d||c.tagName||b.hasOwnProperty("tagName")&&b.tagName||a.classToElement(b),Object.defineProperty(b,"tagName",{get:function(){return d}}),"function"==typeof b.onRegister&&b.onRegister.call(b),c.prototype=b.prototype,c["extends"]||"string"!=typeof b["extends"]||(c["extends"]=b["extends"])):(c.prototype=b,b=function(){c.prototype.constructor.apply(this,arguments)},b.prototype=c.prototype);try{return b.prototype.is=d,e=y.useWebComponents?document.registerElement(d,c):function(){var a=document.createElement(d);return Object.setPrototypeOf(a,b.prototype),setTimeout(function(){a.createdCallback()},0),a},e.prototype.is=d,"function"==typeof b&&(e.prototype.constructor=b),e}catch(f){return console.error(f),!1}}},{key:"classToElement",value:function(a){var b=a.name||a.toString().match(/^function\s*([^\s(]+)/)[1];if(b)return a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")}},{key:"elementToClass",value:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(a,b){return 0===+a?"":a.toUpperCase()}).replace(/[\-|\_]/g,"")}}]),a}(),"function"!=typeof HTMLElement&&(A=function(){},A.prototype=HTMLElement.prototype,HTMLElement=A),B=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(a,b,c){}}],[{key:"onRegister",value:function(){}},{key:"tagName",get:function(){return this._tagName||z.classToElement(this)},set:function(a){"string"==typeof a&&(this._tagName=a)}}]),b}(HTMLElement),C=function n(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:n(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)},D=function(a){function g(){return u(this,g),w(this,Object.getPrototypeOf(g).apply(this,arguments))}return x(g,a),v(g,[{key:"createdCallback",value:function(){var a=this;C(Object.getPrototypeOf(g.prototype),"createdCallback",this).call(this);for(var b=this.attributes||[],c=0,d=b.length;d>c;c++){var f=b[c];""!=f.value?this.attributeChangedCallback(f.name,void 0,f.value):null!==this.getAttribute(f.name)&&this.attributeChangedCallback(f.name,void 0,!0)}var h=this.constructor.normalizedAttributes||[];h.forEach(function(b){null!==a[b]&&void 0!==a[b]&&a[b]!==!1&&a.setAttribute(e(b),a[b])})}},{key:"attributeChangedCallback",value:function(a,b,c){C(Object.getPrototypeOf(g.prototype),"attributeChangedCallback",this).call(this,a,b,c);var d=this.constructor;d&&d.normalizedAttributes&&Array.isArray(d.normalizedAttributes)&&(a=f(a),-1!==d.normalizedAttributes.indexOf(a)&&(this[a]=c))}}],[{key:"onRegister",value:function(){var a=this,e=this.attributes||[];this.normalizedAttributes=e.map(function(e){e=f(e);var g=b(a.prototype,e)||{};return Object.defineProperty(a.prototype,e,{configurable:!0,get:d(e,g),set:c(e,g)}),e})}}]),g}(B),E=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){var a=this,c=this.constructor.events||this.constructor.bindEvents;if(c){var d=new t(this);for(var e in c){var f="string"==typeof c[e]?this[c[e]]:c[e];f&&"function"==typeof f&&!function(){var b=e.split(" ").shift(),c=e.split(" ").slice(1).join(" "),g=f.bind(a);c?d.on(b,c,function(a){g(a,this)}):d.on(b,function(a){g(a,this)})}()}}C(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"addEventListener",value:function(a,b){return"undefined"!=typeof Node.prototype.addEventListener?Node.prototype.addEventListener.call(this,a,b):"undefined"!=typeof Node.prototype.attachEvent?Node.prototype.attachEvent.call(this,"on"+a,b):void 0}},{key:"trigger",value:function(a,c){var d=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],e=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],f=b.createEvent();if(f){if("undefined"!=typeof f.initEvent&&f.initEvent(a,d,e),f.detail=c,"undefined"!=typeof Node.prototype.dispatchEvent)return Node.prototype.dispatchEvent.call(this,f);if("undefined"!=typeof Node.prototype.fireEvent)return Node.prototype.fireEvent.call(this,"on"+a,f)}}}],[{key:"createEvent",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"Event":arguments[0];return"undefined"!=typeof document.createEvent?document.createEvent(a):"undefined"!=typeof document.createEventObject?document.createEventObject():void 0}}]),b}(B),F=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){C(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),g(this,"createdCallback")}},{key:"attachedCallback",value:function(){C(Object.getPrototypeOf(b.prototype),"attachedCallback",this).call(this),g(this,"attachedCallback")}},{key:"detachedCallback",value:function(){C(Object.getPrototypeOf(b.prototype),"detachedCallback",this).call(this),g(this,"detachedCallback")}},{key:"attributeChangedCallback",value:function(a,c,d){C(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d),g(this,"attributeChangedCallback",[a,c,d])}}],[{key:"onRegister",value:function(){for(var a,c=this,d=this,e=arguments.length,f=Array(e),j=0;e>j;j++)f[j]=arguments[j];(a=C(Object.getPrototypeOf(b),"onRegister",this)).call.apply(a,[this].concat(f)),G.forEach(function(a){var b=i(a);c[b]=[]});var k=this.behaviors||[];return h(this,k),g(this,"onRegister",f),delete this.__attachedBehaviors,d}}]),b}(B),G=["onRegister","createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"],H=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){C(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.is&&this.classList.add(this.is)}}],[{key:"onRegister",value:function(){this.css&&this.addCss(this.css)}},{key:"addCss",value:function(a){"function"==typeof a&&(a=a());var b="style-"+this.tagName,c=document.getElementById(b)||document.createElement("style");if(c.type="text/css",c.setAttribute("id",b),c.styleSheet?c.styleSheet.cssText=a:(c.innerHTML="",c.appendChild(document.createTextNode(a))),!c.parentNode){var d=document.head||document.getElementsByTagName("head")[0];d.firstElementChild?d.insertBefore(c,d.firstElementChild):d.appendChild(c)}return c}}]),b}(B),I=window.virtualDom,J=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){this.updateViewContent(),C(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"updateViewContent",value:function(){if("function"==typeof this.render){var a=this.render(),b=a;if(a instanceof NodeList){b="";for(var c=0,d=a.length;d>c;c++)b+=a[c].outerHTML}else a instanceof Node&&(b=a.outerHTML);if(b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," "),y.useVirtualDOM){var e=document.createElement("div");e.innerHTML=b;var f=k(e);if(this._vtree){var g=I.diff(this._vtree,f);I.patch(this,g)}else this.innerHTML=b;this._vtree=f}else this.innerHTML=b}}}],[{key:"onRegister",value:function(){var a=this,b=this;this.template&&("function"==typeof b.template?b.prototype.render=function(){return b.template.call(this)}:"string"==typeof b.template?!function(){var c=b.template;b.prototype.render=function(a){return function(){return c}}(a)}():b.template instanceof Node&&"TEMPLATE"==b.template.tagName&&(b.prototype.render=function(){return document.importNode(b.template.content,!0)}),y.autoUpdateView&&!function(){var b=a.prototype;Object.getOwnPropertyNames(b).forEach(function(c){"function"!=typeof b[c]&&!function(){var d=Object.getOwnPropertyDescriptor(b,c)||{};Object.defineProperty(a.prototype,c,{configurable:!0,get:function(){return d.get?d.get.call(this):this["__"+c]},set:function(a){var b=void 0;return b=d.set?d.set.call(this,a):this["__"+c]=a,this.updateViewContent(),b}})}()})}())}}]),b}(B),K=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,null,[{key:"behaviors",get:function(){return[H,E,D,J]}}]),b}(F),L=function(a,b){var c=function f(){r(Object.getPrototypeOf(f.prototype),"constructor",a).apply(a,arguments)};q(c,b);for(var d in b.prototype){var e=Object.getOwnPropertyDescriptor(b.prototype,d)||{};e.get&&Object.defineProperty(c.prototype,d,{get:e.get,set:e.set,configurable:!0})}return o(c,m(a.prototype),m(a))},a("Config",y),a("DNAComponent",B),a("DNAAttributesComponent",D),a("DNAEventsComponent",E),a("DNAMixedComponent",F),a("DNAStyleComponent",H),a("DNATemplateComponent",J),a("DNABaseComponent",K),a("Create",l),a("Register",s)}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():DNAComponents=a()});
//# sourceMappingURL=dna-components.js.map