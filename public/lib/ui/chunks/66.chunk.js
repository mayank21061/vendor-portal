(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{1653:function(e,o,t){var n=t(28),a=t(1761);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var i={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let o;o=document.getElementsByTagName("apryse-webviewer"),o.length||(o=function e(o,t=document){const n=[];return t.querySelectorAll(o).forEach(e=>n.push(e)),t.querySelectorAll("*").forEach(t=>{t.shadowRoot&&n.push(...e(o,t.shadowRoot))}),n}("apryse-webviewer"));const t=[];for(let n=0;n<o.length;n++){const a=o[n];if(0===n)a.shadowRoot.appendChild(e),e.onload=function(){t.length>0&&t.forEach(o=>{o.innerHTML=e.innerHTML})};else{const o=e.cloneNode(!0);a.shadowRoot.appendChild(o),t.push(o)}}},singleton:!1};n(a,i);e.exports=a.locals||{}},1761:function(e,o,t){(o=e.exports=t(29)(!1)).push([e.i,".open.PageRedactionModal{visibility:visible}.closed.PageRedactionModal{visibility:hidden}:host{display:inline-block;container-type:inline-size;width:100%;height:100%;overflow:hidden}@media(min-width:901px){.App:not(.is-web-component) .hide-in-desktop{display:none}}@container (min-width: 901px){.hide-in-desktop{display:none}}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .hide-in-tablet{display:none}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .hide-in-tablet{display:none}}@media(max-width:640px)and (min-width:431px){.App:not(.is-web-component) .hide-in-mobile{display:none}}@container (max-width: 640px) and (min-width: 431px){.App.is-web-component .hide-in-mobile{display:none}}@media(max-width:430px){.App:not(.is-web-component) .hide-in-small-mobile{display:none}}@container (max-width: 430px){.App.is-web-component .hide-in-small-mobile{display:none}}.always-hide{display:none}.PageRedactionModal .footer .modal-button.confirm:hover{background:var(--primary-button-hover);border-color:var(--primary-button-hover);color:var(--gray-0)}.PageRedactionModal .footer .modal-button.confirm{background:var(--primary-button);border-color:var(--primary-button);color:var(--primary-button-text)}.PageRedactionModal .footer .modal-button.confirm.disabled{cursor:default;background:var(--disabled-button-color);color:var(--primary-button-text)}.PageRedactionModal .footer .modal-button.confirm.disabled span{color:var(--primary-button-text)}.PageRedactionModal .footer .modal-button.cancel:hover,.PageRedactionModal .footer .modal-button.secondary-btn-custom:hover{border:none;box-shadow:inset 0 0 0 1px var(--blue-6);color:var(--blue-6)}.PageRedactionModal .footer .modal-button.cancel,.PageRedactionModal .footer .modal-button.secondary-btn-custom{border:none;box-shadow:inset 0 0 0 1px var(--primary-button);color:var(--primary-button)}.PageRedactionModal .footer .modal-button.cancel.disabled,.PageRedactionModal .footer .modal-button.secondary-btn-custom.disabled{cursor:default;border:none;box-shadow:inset 0 0 0 1px rgba(43,115,171,.5);color:rgba(43,115,171,.5)}.PageRedactionModal .footer .modal-button.cancel.disabled span,.PageRedactionModal .footer .modal-button.secondary-btn-custom.disabled span{color:rgba(43,115,171,.5)}.PageRedactionModal{position:fixed;left:0;bottom:0;z-index:100;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:var(--modal-negative-space)}.PageRedactionModal .modal-container .wrapper .modal-content{padding:10px}.PageRedactionModal .footer{display:flex;flex-direction:row;justify-content:flex-end;width:100%;margin-top:13px}.PageRedactionModal .footer.modal-footer{padding:16px;margin:0;border-top:1px solid var(--divider)}.PageRedactionModal .footer .modal-button{display:flex;justify-content:center;align-items:center;padding:6px 18px;margin:8px 0 0;width:auto;width:-moz-fit-content;width:fit-content;border-radius:4px;height:30px;cursor:pointer}.PageRedactionModal .footer .modal-button.confirm{margin-left:4px}.PageRedactionModal .footer .modal-button.secondary-btn-custom{border-radius:4px;padding:2px 20px 4px;cursor:pointer}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .footer .modal-button{padding:23px 8px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .footer .modal-button{padding:23px 8px}}.PageRedactionModal .swipe-indicator{background:var(--swipe-indicator-bg);border-radius:2px;height:4px;width:38px;position:absolute;top:12px;margin-left:auto;margin-right:auto;left:0;right:0}@media(min-width:641px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .swipe-indicator{display:none}}@container (min-width: 641px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .swipe-indicator{display:none}}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .swipe-indicator{width:32px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .swipe-indicator{width:32px}}.PageRedactionModal .modal-container{align-items:center;background:var(--component-background);width:888px}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container{width:480px}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container{width:480px}}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container{width:100%}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container{width:100%}}.PageRedactionModal .modal-container .body{padding:16px;grid-gap:16px;gap:16px;display:flex;width:100%}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container .body{display:flex;grid-gap:5px;gap:5px;flex-direction:column}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container .body{display:flex;grid-gap:5px;gap:5px;flex-direction:column}}.PageRedactionModal .modal-container .body .canvas-container{border:1px solid var(--lighter-border);background-color:var(--file-preview-background);height:448px;width:60%;display:flex;align-items:center;justify-content:space-between;flex-direction:column;overflow:auto;grid-gap:5px;gap:5px}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container .body .canvas-container{width:55%;height:300px}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container .body .canvas-container{width:55%;height:300px}}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container .body .canvas-container{width:100%;height:250px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container .body .canvas-container{width:100%;height:250px}}.PageRedactionModal .modal-container .body .canvas-container canvas{box-shadow:0 0 3px 0 var(--box-shadow)}.PageRedactionModal .modal-container .body .selection-options{width:40%;grid-gap:12px;gap:12px;display:flex;flex-direction:column}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container .body .selection-options{width:100%}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container .body .selection-options{width:100%}}.PageRedactionModal .modal-container .body .selection-options .page-number-input-container{width:100%;margin-top:8px}.PageRedactionModal .modal-container .body .selection-options .page-number-input-container .PageNumberInput{height:54px}.PageRedactionModal .modal-container .body .selection-options .page-number-input-container .PageNumberInput .page-number-input{height:32px;width:100%;align-self:flex-end}.PageRedactionModal .modal-container .body .selection-options .ui__choice--disabled{text-decoration:line-through}.PageRedactionModal .modal-container .body .selection-options .ui__choice{font-size:13px;margin:0}.PageRedactionModal .modal-container .body .selection-options .ui__choice.specify-pages-choice.ui__choice--checked{align-items:baseline;height:75px}.PageRedactionModal .modal-container .body .selection-options .ui__choice.specify-pages-choice.ui__choice--checked .ui__choice__label{width:100%;position:relative;top:-2px}.PageRedactionModal .modal-container .body .selection-options .ui__choice .specifyPagesChoiceLabel{display:flex}.PageRedactionModal .modal-container .body .selection-options .ui__choice .specifyPagesChoiceLabel .specifyPagesExampleLabel{margin-left:4px;color:var(--faded-text)}.PageRedactionModal .modal-container .footer{margin-top:0;width:100%;display:flex;align-items:center;justify-content:flex-end;padding:16px;border-top:1px solid var(--divider)}.PageRedactionModal .modal-container .footer .Button{margin-top:0;height:32px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageRedactionModal .modal-container .footer .Button{padding:8px 16px!important}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .PageRedactionModal .modal-container .footer .Button{padding:8px 16px!important}}",""]),o.locals={LEFT_HEADER_WIDTH:"41px",RIGHT_HEADER_WIDTH:"41px"}},1867:function(e,o,t){"use strict";t.r(o);t(44),t(46),t(52),t(118),t(117),t(35),t(19),t(12),t(14),t(8),t(13),t(9),t(10),t(11),t(16),t(15),t(20),t(18);var n=t(0),a=t.n(n),i=t(5),r=t(6),d=t(3),c=t(2),l=t(1),p=t(1409),s=t(17),m=t.n(s),u=t(388),g=t(41),b=t(146),f=t(4),h=t.n(f),y=t(429),x=t(328);t(1653);function w(e,o){return function(e){if(Array.isArray(e))return e}(e)||function(e,o){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,i,r,d=[],c=!0,l=!1;try{if(i=(t=t.call(e)).next,0===o){if(Object(t)!==t)return;c=!1}else for(;!(c=(n=i.call(t)).done)&&(d.push(n.value),d.length!==o);c=!0);}catch(e){l=!0,a=e}finally{try{if(!c&&null!=t.return&&(r=t.return(),Object(r)!==r))return}finally{if(l)throw a}}return d}}(e,o)||function(e,o){if(!e)return;if("string"==typeof e)return v(e,o);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,o)}(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,o){(null==o||o>e.length)&&(o=e.length);for(var t=0,n=new Array(o);t<o;t++)n[t]=e[t];return n}var P={closeModal:h.a.func,currentPage:h.a.number,pageLabels:h.a.array,selectedPages:h.a.array,markPages:h.a.func,redactPages:h.a.func,evenDisabled:h.a.bool,renderCanvases:h.a.func,isOpen:h.a.bool},R="current",M="specify",A="odd",E="even",k=function(e){var o=e.closeModal,t=e.pageLabels,r=e.selectedPages,d=e.currentPage,c=e.markPages,l=e.redactPages,p=e.evenDisabled,s=e.renderCanvases,f=e.isOpen,h=Object(u.a)().t,v=w(Object(n.useState)(R),2),P=v[0],k=v[1],O=w(Object(n.useState)(),2),_=O[0],C=O[1],j=w(Object(n.useState)(""),2),S=j[0],L=j[1];Object(n.useEffect)((function(){C(r)}),[r]);var D=function(){var e=[];if(P===R)return[d];if(P===M)return _;if(P===A)for(var o=1;t.length>=o;o+=2)e.push(o);else if(P===E)for(var n=2;t.length>=n;n+=2)e.push(n);return e},N=Object(n.useRef)();Object(n.useEffect)((function(){f&&s(N,D())}),[P,f,_,s,D]);var T=function(e){var t=e.event.target;(N.current.clientHeight<N.current.scrollHeight||N.current.clientWidth<N.current.scrollWidth)&&(t===N.current||N.current.contains(t))?e.event.stopPropagation():o()},I=a.a.createElement(a.a.Fragment,null,a.a.createElement("label",{className:"specifyPagesChoiceLabel"},a.a.createElement("span",null,h("option.pageRedactModal.specify")),"specify"===P&&a.a.createElement("span",{className:"specifyPagesExampleLabel"},"- ",h("option.thumbnailPanel.multiSelectPagesExample"))),"specify"===P&&a.a.createElement("div",{className:m()("page-number-input-container",{error:!!S})},a.a.createElement(y.a,{selectedPageNumbers:_,pageCount:t.length,ariaLabel:h("option.pageRedactModal.specify"),onSelectedPageNumbersChange:function(e){e.length>0&&(L(""),C(e))},onBlurHandler:C,onError:function(e){e&&L("".concat(h("message.errorPageNumber")," ").concat(t.length))},pageNumberError:S})));return a.a.createElement("div",{className:m()({Modal:!0,PageRedactionModal:!0,open:f,closed:!f}),"data-element":i.a.PAGE_REDACT_MODAL},a.a.createElement(x.a,{title:"action.redactPages",isOpen:f,onCloseClick:o,closeHandler:o,onSwipedDown:T,onSwipedUp:T,swipeToClose:!0},a.a.createElement("div",{className:"body"},a.a.createElement("div",{className:"canvas-container",ref:N}),a.a.createElement("form",{className:"selection-options",onChange:function(e){e.target.classList.contains("page-number-input")||(k(e.target.value),L(""))},onSubmit:function(e){return e.preventDefault()}},a.a.createElement("strong",null,h("option.pageRedactModal.pageSelection")),a.a.createElement(b.a,{checked:P===R,radio:!0,name:"page-redaction-option",label:h("option.pageRedactModal.current"),value:R}),a.a.createElement(b.a,{checked:P===M,radio:!0,name:"page-redaction-option",className:"specify-pages-choice",label:I,value:M}),a.a.createElement(b.a,{checked:P===A,radio:!0,name:"page-redaction-option",label:h("option.pageRedactModal.odd"),value:A}),a.a.createElement(b.a,{checked:P===E,radio:!0,name:"page-redaction-option",label:h("option.pageRedactModal.even"),value:E,disabled:p}))),a.a.createElement("div",{className:"footer"},a.a.createElement(g.a,{className:"cancel modal-button secondary-button",dataElement:"modalRedactButton",label:"annotation.redact",disabled:S,onClick:function(){return l(D())}}),a.a.createElement(g.a,{className:"confirm modal-button",dataElement:"modalMarkRedactButton",label:"option.pageRedactModal.addMark",disabled:S,onClick:function(){return c(D())}}))))};k.propTypes=P;var O=k;function _(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||j(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,o){return function(e){if(Array.isArray(e))return e}(e)||function(e,o){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,i,r,d=[],c=!0,l=!1;try{if(i=(t=t.call(e)).next,0===o){if(Object(t)!==t)return;c=!1}else for(;!(c=(n=i.call(t)).done)&&(d.push(n.value),d.length!==o);c=!0);}catch(e){l=!0,a=e}finally{try{if(!c&&null!=t.return&&(r=t.return(),Object(r)!==r))return}finally{if(l)throw a}}return d}}(e,o)||j(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,o){if(e){if("string"==typeof e)return S(e,o);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?S(e,o):void 0}}function S(e,o){(null==o||o>e.length)&&(o=e.length);for(var t=0,n=new Array(o);t<o;t++)n[t]=e[t];return n}var L=function(){var e=Object(r.d)(),o=C(Object(r.e)((function(e){return[d.a.isElementOpen(e,i.a.PAGE_REDACT_MODAL),d.a.getCurrentPage(e),d.a.getSelectedThumbnailPageIndexes(e),d.a.getPageLabels(e),d.a.getActiveToolName(e),d.a.getActiveToolStyles(e)]})),6),t=o[0],s=o[1],m=o[2],g=o[3],b=o[4],f=o[5],h=Object(n.useRef)(0),y=m.map((function(e){return e+1}));Object(n.useEffect)((function(){t&&e(c.a.closeElements([i.a.PRINT_MODAL,i.a.LOADING_MODAL,i.a.PROGRESS_MODAL,i.a.ERROR_MODAL]))}),[t,e]);var x=function(){return e(c.a.closeElement(i.a.PAGE_REDACT_MODAL))},w=function(){return null!=b&&b.includes("AnnotationCreateRedaction")?f:{}},v=Object(u.a)().t,P=C(Object(n.useState)(!1),2),R=P[0],M=P[1];return Object(n.useEffect)((function(){var e=function(){var e=l.a.getDocument(),o=e.getDocumentCompletePromise();null==o||o.then((function(){var o=e.getPageCount();M(o<2)}))};return l.a.addEventListener("documentLoaded",e),function(){return l.a.removeEventListener("documentLoaded",e)}}),[]),a.a.createElement(O,{evenDisabled:R,closeModal:x,renderCanvases:function(e,o){var n;h.current++;for(var a=h.current,i=_(o),r=l.a.getDocument();e.current.firstChild;)e.current.removeChild(e.current.firstChild);if(i){(null===(n=i)||void 0===n?void 0:n.length)>10&&(i=i.splice(0,10));var d,c=function(e,o){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=j(e))||o&&e&&"number"==typeof e.length){t&&(e=t);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,d=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return r=e.done,e},e:function(e){d=!0,i=e},f:function(){try{r||null==t.return||t.return()}finally{if(d)throw i}}}}(i);try{var p=function(){var o=d.value,n=null==r?void 0:r.getPageInfo(o);if(t&&r&&e.current&&n){var i=1,c=e.current.getBoundingClientRect(),l=parseInt(window.getComputedStyle(e.current).borderWidth)+.1;c.height-=l,c.width-=l,(i=n.width>n.height?c.width/n.width:c.height/n.height)>0&&r.loadCanvas({pageNumber:o,zoom:i,pageRotation:0,drawComplete:function(t){var n;a===h.current&&null!==(n=e.current)&&void 0!==n&&n.appendChild(t)&&(t.setAttribute("role","img"),t.setAttribute("aria-label","".concat(v("action.page")," ").concat(o)))},allowUseOfOptimizedThumbnail:!0})}};for(c.s();!(d=c.n()).done;)p()}catch(e){c.e(e)}finally{c.f()}}},redactPages:function(e){Object(p.l)(e,w()),x()},markPages:function(e){Object(p.a)(e,w()),x()},currentPage:s,selectedPages:y,pageLabels:g,isOpen:t})};o.default=L}}]);
//# sourceMappingURL=66.chunk.js.map