(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{1485:function(e,t,o){"use strict";o(46),o(51),o(94),o(34),o(75),o(117),o(40),o(16),o(19),o(12),o(14),o(8),o(13),o(9),o(10),o(11),o(15),o(20),o(17);var n=o(0),i=o.n(n),r=o(18),l=o.n(r),a=(o(1507),o(387)),c=o(4),d=o.n(c),s=o(2),u=o(6),p=o(49),m=o(21),h=o(3),f=o(42);function y(e){return function(e){if(Array.isArray(e))return w(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||x(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var n,i,r,l,a=[],c=!0,d=!1;try{if(r=(o=o.call(e)).next,0===t){if(Object(o)!==o)return;c=!1}else for(;!(c=(n=r.call(o)).done)&&(a.push(n.value),a.length!==t);c=!0);}catch(e){d=!0,i=e}finally{try{if(!c&&null!=o.return&&(l=o.return(),Object(l)!==l))return}finally{if(d)throw i}}return a}}(e,t)||x(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){if(e){if("string"==typeof e)return w(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?w(e,t):void 0}}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var v=function(e){var t,o;if(!e)return e;var n=e;return null!==(t=n)&&void 0!==t&&t.toHexString&&(n=n.toHexString()),null!==(o=n)&&void 0!==o&&o.toLowerCase&&(n=n.toLowerCase()),n},g=i.a.createElement("svg",{width:"100%",height:"100%",className:l()("transparent")},i.a.createElement("line",{stroke:"#d82e28",x1:"0",y1:"100%",x2:"100%",y2:"0",strokeWidth:"2",strokeLinecap:"round"})),S={color:d.a.any},C=function(e){var t=e.onColorChange,o=e.hasTransparentColor,r=void 0!==o&&o,c=e.color,d=e.activeTool,x=e.type,w=Object.values(window.Core.Tools.ToolNames).includes(d)?d:window.Core.Tools.ToolNames.EDIT,S=Object(u.f)(),C=Object(a.a)().t,k=Object(u.d)(),E=b(Object(u.e)((function(e){return[h.a.getColors(e,w,x)]})),1)[0],T=b(Object(n.useState)(),2),P=T[0],A=T[1],O=b(Object(n.useState)(!1),2),j=O[0],R=O[1],z=Object(n.useRef)(!0);Object(n.useEffect)((function(){z.current=!0}),[w,c]),Object(n.useEffect)((function(){c&&A(v(c))}),[c]);var _=function(){var e=h.a.getCustomColor(S.getState());return k(s.a.setCustomColor(null)),e},N=Object(n.useCallback)((function(){k(s.a.openElement("ColorPickerModal"));Object(m.c)().addEventListener(p.a.VISIBILITY_CHANGED,(function e(o){var n=o.detail,i=n.element,r=n.isVisible;if("ColorPickerModal"===i&&!r){var l=v(_());if(l)if(E.includes(l))A(l),t(l);else{var a=[].concat(y(E),[l]);k(s.a.setColors(a,w,x,!0)),A(l),t(l)}}Object(m.c)().removeEventListener(p.a.VISIBILITY_CHANGED,e)}))}),[null==E?void 0:E.length,k,A,t,_,x,w]),F=E.map((function(e){return e.toLowerCase()}));r&&F.push("transparent"),P||A("transparent"),F.indexOf(P)>6&&!j&&z.current&&(R(!0),z.current=!1);var I=F.length<=7,L=!(P&&!F.includes(P)),D=F.length<=1||!L;return j||(F=F.slice(0,7)),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:l()("ColorPalette")},F.map((function(e){return v(e)})).map((function(e,o){return e?i.a.createElement("button",{key:o,className:"cell-container",onClick:function(){A(e),t(e)},"aria-label":"".concat(C("option.colorPalette.colorLabel")," ").concat(o+1)},i.a.createElement("div",{className:l()({"cell-outer":!0,active:v(P)===e||!v(P)&&"transparent"===e})},i.a.createElement("div",{className:l()({cell:!0,border:!0}),style:{backgroundColor:e}},"transparent"===e&&g))):i.a.createElement("div",{key:o,className:"dummy-cell"})}))),i.a.createElement("div",{className:"palette-controls"},i.a.createElement("div",{className:"button-container"},i.a.createElement(f.a,{img:"icon-header-zoom-in-line",title:C("action.addNewColor"),onClick:N,className:"control-button",dataElement:"addCustomColor"}),i.a.createElement(f.a,{img:"icon-delete-line",title:C("action.deleteColor"),onClick:function(){var e=v(P),o=y(E),n=o.indexOf(e);if(n>-1){var i=n===o.length-1?0:n+1;A(E[i]),t(E[i]),o.splice(n,1),k(s.a.setColors(o,w,x,!0))}},disabled:D,className:"control-button",dataElement:"deleteSelectedColor"}),i.a.createElement(f.a,{img:"icon-copy2",title:C("action.copySelectedColor"),onClick:function(){var e=v(P),t=[].concat(y(E),[e]);k(s.a.setColors(t,w,x,!0))},disabled:L,className:"control-button",dataElement:"copySelectedColor"})),i.a.createElement("button",{className:l()("show-more-button control-button",{hidden:I}),onClick:function(){R(!j)}},C(j?"message.showLess":"message.showMore"))))};C.propTypes=S;var k=C;t.a=k},1507:function(e,t,o){var n=o(30),i=o(1508);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let t;t=document.getElementsByTagName("apryse-webviewer"),t.length||(t=function e(t,o=document){const n=[];return o.querySelectorAll(t).forEach(e=>n.push(e)),o.querySelectorAll("*").forEach(o=>{o.shadowRoot&&n.push(...e(t,o.shadowRoot))}),n}("apryse-webviewer"));const o=[];for(let n=0;n<t.length;n++){const i=t[n];if(0===n)i.shadowRoot.appendChild(e),e.onload=function(){o.length>0&&o.forEach(t=>{t.innerHTML=e.innerHTML})};else{const t=e.cloneNode(!0);i.shadowRoot.appendChild(t),o.push(t)}}},singleton:!1};n(i,r);e.exports=i.locals||{}},1508:function(e,t,o){(t=e.exports=o(31)(!1)).push([e.i,":host{display:inline-block;container-type:inline-size;width:100%;height:100%;overflow:hidden}@media(min-width:901px){.App:not(.is-web-component) .hide-in-desktop{display:none}}@container (min-width: 901px){.hide-in-desktop{display:none}}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .hide-in-tablet{display:none}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .hide-in-tablet{display:none}}@media(max-width:640px)and (min-width:431px){.App:not(.is-web-component) .hide-in-mobile{display:none}}@container (max-width: 640px) and (min-width: 431px){.App.is-web-component .hide-in-mobile{display:none}}@media(max-width:430px){.App:not(.is-web-component) .hide-in-small-mobile{display:none}}@container (max-width: 430px){.App.is-web-component .hide-in-small-mobile{display:none}}.always-hide{display:none}.StylePicker .ColorPalette{display:flex;flex-wrap:wrap;display:grid;grid-template-columns:repeat(7,1fr);grid-row-gap:8px;row-gap:8px;justify-items:center}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.StylePicker .ColorPalette{width:196px}}.StylePicker .ColorPalette.padding{padding:4px 12px 8px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .StylePicker .ColorPalette{max-width:450px;width:auto}}@media(max-width:640px)and (-ms-high-contrast:active),(max-width:640px)and (-ms-high-contrast:none){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .StylePicker .ColorPalette{width:308px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .StylePicker .ColorPalette{max-width:450px;width:auto}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.App.is-web-component:not(.is-in-desktop-only-mode) .StylePicker .ColorPalette{width:308px}}}.StylePicker .ColorPalette .cell-container{padding:0;border:none;background-color:transparent;flex:1 0 14%;cursor:pointer;width:var(--cell-border-size);height:var(--cell-border-size);display:flex;align-items:center;justify-content:center}:host(:not([data-tabbing=true])) .StylePicker .ColorPalette .cell-container,html:not([data-tabbing=true]) .StylePicker .ColorPalette .cell-container{outline:none}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .StylePicker .ColorPalette .cell-container{width:44px;height:44px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .StylePicker .ColorPalette .cell-container{width:44px;height:44px}}.StylePicker .ColorPalette .cell-container .cell-outer.active{border:1px solid var(--color-palette-border);width:var(--cell-outer-border-size);height:var(--cell-outer-border-size);border-radius:10000000px;display:flex;align-items:center;justify-content:center}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .StylePicker .ColorPalette .cell-container .cell-outer.active{width:36px;height:36px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .StylePicker .ColorPalette .cell-container .cell-outer.active{width:36px;height:36px}}.StylePicker .ColorPalette .cell-container .cell-outer .cell{width:18px;height:18px;border-radius:10000000px}.StylePicker .ColorPalette .cell-container .cell-outer .cell .transparent{border:2px solid var(--faded-text);border-radius:10000000px}.StylePicker .ColorPalette .cell-container .cell-outer .cell.border{border:1px solid var(--white-color-palette-border)}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .StylePicker .ColorPalette .cell-container .cell-outer .cell{width:24px;height:24px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .StylePicker .ColorPalette .cell-container .cell-outer .cell{width:24px;height:24px}}.StylePicker .palette-controls{padding-right:12px;padding-left:2px;display:flex;justify-content:space-between}.StylePicker .palette-controls .button-container{display:flex;grid-gap:8px;gap:8px}.StylePicker .palette-controls .control-button{display:flex;align-items:center;justify-content:center;text-align:center;min-width:32px;min-height:32px;padding:0;border:none;background-color:transparent;cursor:pointer;border-radius:4px}:host(:not([data-tabbing=true])) .StylePicker .palette-controls .control-button,html:not([data-tabbing=true]) .StylePicker .palette-controls .control-button{outline:none}.StylePicker .palette-controls .control-button.show-more-button{color:var(--ribbon-active-color)}.StylePicker .palette-controls .control-button.show-more-button:hover{background:none;color:var(--primary-button-hover)}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .StylePicker .palette-controls .control-button.show-more-button{color:var(--ribbon-active-color)}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .StylePicker .palette-controls .control-button.show-more-button{color:var(--ribbon-active-color)}}.StylePicker .palette-controls .control-button:disabled{cursor:no-drop}.StylePicker .palette-controls .control-button:disabled .Icon{color:var(--disabled-icon)}.StylePicker .palette-controls .control-button.hidden{display:none}.StylePicker .palette-controls .control-button.focus-visible,.StylePicker .palette-controls .control-button:focus-visible{outline:var(--focus-visible-outline)}",""]),t.locals={LEFT_HEADER_WIDTH:"41px",RIGHT_HEADER_WIDTH:"41px"}},1509:function(e,t,o){var n=o(30),i=o(1510);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let t;t=document.getElementsByTagName("apryse-webviewer"),t.length||(t=function e(t,o=document){const n=[];return o.querySelectorAll(t).forEach(e=>n.push(e)),o.querySelectorAll("*").forEach(o=>{o.shadowRoot&&n.push(...e(t,o.shadowRoot))}),n}("apryse-webviewer"));const o=[];for(let n=0;n<t.length;n++){const i=t[n];if(0===n)i.shadowRoot.appendChild(e),e.onload=function(){o.length>0&&o.forEach(t=>{t.innerHTML=e.innerHTML})};else{const t=e.cloneNode(!0);i.shadowRoot.appendChild(t),o.push(t)}}},singleton:!1};n(i,r);e.exports=i.locals||{}},1510:function(e,t,o){(t=e.exports=o(31)(!1)).push([e.i,":host{display:inline-block;container-type:inline-size;width:100%;height:100%;overflow:hidden}@media(min-width:901px){.App:not(.is-web-component) .hide-in-desktop{display:none}}@container (min-width: 901px){.hide-in-desktop{display:none}}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .hide-in-tablet{display:none}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .hide-in-tablet{display:none}}@media(max-width:640px)and (min-width:431px){.App:not(.is-web-component) .hide-in-mobile{display:none}}@container (max-width: 640px) and (min-width: 431px){.App.is-web-component .hide-in-mobile{display:none}}@media(max-width:430px){.App:not(.is-web-component) .hide-in-small-mobile{display:none}}@container (max-width: 430px){.App.is-web-component .hide-in-small-mobile{display:none}}.always-hide{display:none}@keyframes bottom-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes up-bottom{0%{transform:translateY(0)}to{transform:translateY(100%)}}.RichTextStyleEditor{margin-bottom:16px}.RichTextStyleEditor .menu-items{margin-bottom:8px!important}.RichTextStyleEditor .menu-items .icon-grid{padding-top:12px;grid-row-gap:12px;row-gap:12px}.RichTextStyleEditor .menu-items .icon-grid .row{padding-top:0}.RichTextStyleEditor .menu-items .icon-grid .row.isRedaction{padding-bottom:8px}.RichTextStyleEditor .menu-items .icon-grid .auto-size-checkbox{padding-top:4px;padding-bottom:8px}.RichTextStyleEditor .menu-items .icon-grid .auto-size-checkbox .ui__choice__input__check--focus{outline:var(--focus-visible-outline)}.RichTextStyleEditor .Dropdown__wrapper{width:100%}.RichTextStyleEditor .Dropdown__wrapper .Dropdown{width:100%!important}.RichTextStyleEditor .Dropdown__wrapper .Dropdown__items{right:unset}.RichTextStyleEditor .FontSizeDropdown{width:100%!important}.RichTextStyleEditor .ColorPalette{padding-bottom:8px}.RichTextStyleEditor .text-size-slider{margin-top:16px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .RichTextStyleEditor .icon-grid{display:flex;flex-direction:column}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .RichTextStyleEditor .icon-grid{display:flex;flex-direction:column}}",""]),t.locals={LEFT_HEADER_WIDTH:"41px",RIGHT_HEADER_WIDTH:"41px"}},1571:function(e,t,o){"use strict";o.r(t);o(34),o(46),o(51),o(19),o(82),o(325),o(395),o(396),o(12),o(14),o(8),o(13),o(9),o(10),o(11),o(16),o(15),o(20),o(17),o(26),o(27),o(25),o(22),o(33),o(32),o(55),o(23),o(24),o(57),o(56);var n=o(0),i=o.n(n),r=o(6),l=o(4),a=o.n(l),c=o(1485),d=o(1),s=o(2),u=o(3),p=(o(1509),o(5)),m=o(280),h=o(1407);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function b(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?y(Object(o),!0).forEach((function(t){x(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):y(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function x(e,t,o){return(t=function(e){var t=function(e,t){if("object"!==f(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var n=o.call(e,t||"default");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===f(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var n,i,r,l,a=[],c=!0,d=!1;try{if(r=(o=o.call(e)).next,0===t){if(Object(o)!==o)return;c=!1}else for(;!(c=(n=r.call(o)).done)&&(a.push(n.value),a.length!==t);c=!0);}catch(e){d=!0,i=e}finally{try{if(!c&&null!=o.return&&(l=o.return(),Object(l)!==l))return}finally{if(d)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var g={annotation:a.a.object,editor:a.a.object,style:a.a.shape({TextColor:a.a.object,RichTextStyle:a.a.any}),isFreeTextAutoSize:a.a.bool,onFreeTextSizeToggle:a.a.func,onPropertyChange:a.a.func,onRichTextStyleChange:a.a.func,isRedaction:a.a.bool,isRichTextEditMode:a.a.bool,setIsRichTextEditMode:a.a.func,isTextStylePickerHidden:a.a.bool},S=function(e){var t,o,l,a,f,y,v,g,S,C,k,E,T,P=e.annotation,A=e.editor,O=e.style,j=e.isFreeTextAutoSize,R=e.onFreeTextSizeToggle,z=e.onPropertyChange,_=e.onRichTextStyleChange,N=e.isRichTextEditMode,F=e.setIsRichTextEditMode,I=e.isRedaction,L=e.isTextStylePickerHidden,D=e.activeTool,H=e.textSizeSliderComponent,M=w(Object(r.e)((function(e){return[u.a.getFonts(e)]}),r.c),1)[0],B=w(Object(n.useState)({}),2),W=B[0],Y=B[1],V=Object(n.useRef)(null),q=Object(n.useRef)(null),G=Object(n.useRef)({}),U=Object(r.d)(),J=Object(n.useRef)(),$=Object(n.useRef)();$.current=N,Object(n.useEffect)((function(){var e=function(e,t){!e&&t&&V.current&&V.current.setSelection(t.index,t.length),e&&V.current&&Y(Q(e))},t=function(){var e;Y(Q(null===(e=V.current)||void 0===e?void 0:e.getSelection()))};return d.a.addEventListener("editorSelectionChanged",e),d.a.addEventListener("editorTextChanged",t),U(s.a.disableElements([p.a.ANNOTATION_STYLE_POPUP])),function(){d.a.removeEventListener("editorSelectionChanged",e),d.a.removeEventListener("editorTextChanged",t),U(s.a.enableElements([p.a.ANNOTATION_STYLE_POPUP]))}}),[]),Object(n.useEffect)((function(){var e;if(V.current=A,q.current=P,N&&P){var t,o,n,i,r,l,a="solid";try{a="dash"===P.Style?"".concat(P.Style,",").concat(P.Dashes):P.Style}catch(e){console.error(e)}var c=P.getRichTextStyle()[0];G.current={Font:P.Font,FontSize:P.FontSize,TextAlign:P.TextAlign,TextVerticalAlign:P.TextVerticalAlign,bold:null!==(t="bold"===(null==c?void 0:c["font-weight"]))&&void 0!==t&&t,italic:null!==(o="italic"===(null==c?void 0:c["font-style"]))&&void 0!==o&&o,underline:(null==c||null===(n=c["text-decoration"])||void 0===n?void 0:n.includes("underline"))||(null==c||null===(i=c["text-decoration"])||void 0===i?void 0:i.includes("word")),strikeout:null!==(r=null==c||null===(l=c["text-decoration"])||void 0===l?void 0:l.includes("line-through"))&&void 0!==r&&r,size:null==c?void 0:c["font-size"],font:null==c?void 0:c["font-family"],StrokeStyle:a,calculatedFontSize:P.getCalculatedFontSize()}}Y(Q(null===(e=V.current)||void 0===e?void 0:e.getSelection())),J.current&&(V.current.setSelection(J.current),J.current=null)}),[P,A,N]),Object(n.useEffect)((function(){var e=function(){V.current=null,q.current=null,F(!1)},t=function(){F(!0)};return d.a.addEventListener("editorBlur",e),d.a.addEventListener("editorFocus",t),function(){d.a.removeEventListener("editorBlur",e),d.a.removeEventListener("editorFocus",t)}}),[U]);var K,Q=function(e){if(!e)return{};var t=V.current.getFormat(e.index,e.length);if("string"==typeof t.color)t.color=new window.Core.Annotations.Color(t.color);else if(Array.isArray(t.color)){var o=new window.Core.Annotations.Color(t.color[t.color.length-1]);t.color=o}else t.color||(t.color=q.current.TextColor);for(var n=0,i=["font","size","originalSize"];n<i.length;n++){var r=i[n];t[r]&&Array.isArray(t[r])&&(t[r]=void 0)}return t},X=function(e,t){var o,n;"size"===e?null===(o=V.current)||void 0===o||o.format("applyCustomFontSize",t):null===(n=V.current)||void 0===n||n.format(e,t);"color"===e&&(t=new window.Core.Annotations.Color(t)),Y(b(b({},W),{},x({},e,t)))},Z=O.RichTextStyle,ee={bold:null!==(t="bold"===(null==Z||null===(o=Z[0])||void 0===o?void 0:o["font-weight"]))&&void 0!==t&&t,italic:null!==(l="italic"===(null==Z||null===(a=Z[0])||void 0===a?void 0:a["font-style"]))&&void 0!==l&&l,underline:(null==Z||null===(f=Z[0])||void 0===f||null===(y=f["text-decoration"])||void 0===y?void 0:y.includes("underline"))||(null==Z||null===(v=Z[0])||void 0===v||null===(g=v["text-decoration"])||void 0===g?void 0:g.includes("word")),strikeout:null!==(S=null==Z||null===(C=Z[0])||void 0===C||null===(k=C["text-decoration"])||void 0===k?void 0:k.includes("line-through"))&&void 0!==S&&S,font:null==Z||null===(E=Z[0])||void 0===E?void 0:E["font-family"],size:null==Z||null===(T=Z[0])||void 0===T?void 0:T["font-size"],StrokeStyle:"solid"};return K=b(b({},O),ee),N&&P&&(G.current.bold=W.bold,G.current.italic=W.italic,G.current.underline=W.underline,G.current.strikeout=W.strike,G.current.quillFont=W.font||G.current.Font,G.current.quillFontSize=W.originalSize||G.current.FontSize),i.a.createElement("div",{className:"RichTextStyleEditor",onMouseDown:function(e){"touchstart"!==e.type&&N&&e.preventDefault()}},!L&&i.a.createElement("div",{className:"menu-items"},i.a.createElement(m.a,{fonts:M,onPropertyChange:function(e,t){if($.current){var o=V.current.getSelection(),n=o.index,i=o.length,r=q.current;r[e]=t,V.current.blur(),"FontSize"!==e&&"Font"!==e||Object(h.a)(r),setTimeout((function(){J.current={index:n,length:i},d.a.getAnnotationManager().getEditBoxManager().focusBox(r)}),0)}else z(e,t)},onRichTextStyleChange:function(e,t){if($.current){var o={"font-weight":"bold","font-style":"italic",underline:"underline","line-through":"strike","font-family":"font","font-size":"size"};if("font-family"===e||"font-size"===e){X(o[e],t);var n=q.current;if(n.isAutoSized())d.a.getAnnotationManager().getEditBoxManager().resizeAnnotation(n)}else!function(e){return function(){var t=V.current.getSelection(),o=t.index,n=t.length;if(0===n){J.current={index:o,length:n};var i=V.current.getSelection();o=i.index,n=i.length}var r=V.current.getFormat(o,n);X(e,!r[e])}}(o[e])()}else _(e,t)},properties:N?G.current:K,stateless:!0,isFreeText:!I,onFreeTextSizeToggle:R,isFreeTextAutoSize:j,isRichTextEditMode:N,isRedaction:I})),i.a.createElement(c.a,{onColorChange:function(e){!function(e,t){$.current?X("color",t.toHexString()):z(e,t)}("TextColor",new window.Core.Annotations.Color(e))},color:N?W.color:O.TextColor,activeTool:D,type:"Text"}),H)};S.propTypes=g;var C=i.a.memo(S);t.default=C}}]);
//# sourceMappingURL=48.chunk.js.map