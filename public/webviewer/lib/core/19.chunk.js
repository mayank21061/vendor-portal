/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[19],{586:function(xa){(function(){xa.exports={Na:function(){function ta(a,b){this.scrollLeft=a;this.scrollTop=b}function h(a){if(null===a||"object"!==typeof a||void 0===a.behavior||"auto"===a.behavior||"instant"===a.behavior)return!0;if("object"===typeof a&&"smooth"===a.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+a.behavior+" is not a valid value for enumeration ScrollBehavior.");}function pa(a,b){if("Y"===
b)return a.clientHeight+f<a.scrollHeight;if("X"===b)return a.clientWidth+f<a.scrollWidth}function qa(a,b){a=ha.getComputedStyle(a,null)["overflow"+b];return"auto"===a||"scroll"===a}function na(a){var b=pa(a,"Y")&&qa(a,"Y");a=pa(a,"X")&&qa(a,"X");return b||a}function ja(a){var b=(n()-a.startTime)/468;var e=.5*(1-Math.cos(Math.PI*(1<b?1:b)));b=a.LF+(a.x-a.LF)*e;e=a.MF+(a.y-a.MF)*e;a.method.call(a.XM,b,e);b===a.x&&e===a.y||ha.requestAnimationFrame(ja.bind(ha,a))}function ka(a,b,e){var w=n();if(a===x.body){var ba=
ha;var y=ha.scrollX||ha.pageXOffset;a=ha.scrollY||ha.pageYOffset;var ea=r.scroll}else ba=a,y=a.scrollLeft,a=a.scrollTop,ea=ta;ja({XM:ba,method:ea,startTime:w,LF:y,MF:a,x:b,y:e})}var ha=window,x=document;if(!("scrollBehavior"in x.documentElement.style&&!0!==ha.eNa)){var aa=ha.HTMLElement||ha.Element,r={scroll:ha.scroll||ha.scrollTo,scrollBy:ha.scrollBy,t5:aa.prototype.scroll||ta,scrollIntoView:aa.prototype.scrollIntoView},n=ha.performance&&ha.performance.now?ha.performance.now.bind(ha.performance):
Date.now,f=RegExp("MSIE |Trident/|Edge/").test(ha.navigator.userAgent)?1:0;ha.scroll=ha.scrollTo=function(a,b){void 0!==a&&(!0===h(a)?r.scroll.call(ha,void 0!==a.left?a.left:"object"!==typeof a?a:ha.scrollX||ha.pageXOffset,void 0!==a.top?a.top:void 0!==b?b:ha.scrollY||ha.pageYOffset):ka.call(ha,x.body,void 0!==a.left?~~a.left:ha.scrollX||ha.pageXOffset,void 0!==a.top?~~a.top:ha.scrollY||ha.pageYOffset))};ha.scrollBy=function(a,b){void 0!==a&&(h(a)?r.scrollBy.call(ha,void 0!==a.left?a.left:"object"!==
typeof a?a:0,void 0!==a.top?a.top:void 0!==b?b:0):ka.call(ha,x.body,~~a.left+(ha.scrollX||ha.pageXOffset),~~a.top+(ha.scrollY||ha.pageYOffset)))};aa.prototype.scroll=aa.prototype.scrollTo=function(a,b){if(void 0!==a)if(!0===h(a)){if("number"===typeof a&&void 0===b)throw new SyntaxError("Value could not be converted");r.t5.call(this,void 0!==a.left?~~a.left:"object"!==typeof a?~~a:this.scrollLeft,void 0!==a.top?~~a.top:void 0!==b?~~b:this.scrollTop)}else b=a.left,a=a.top,ka.call(this,this,"undefined"===
typeof b?this.scrollLeft:~~b,"undefined"===typeof a?this.scrollTop:~~a)};aa.prototype.scrollBy=function(a,b){void 0!==a&&(!0===h(a)?r.t5.call(this,void 0!==a.left?~~a.left+this.scrollLeft:~~a+this.scrollLeft,void 0!==a.top?~~a.top+this.scrollTop:~~b+this.scrollTop):this.scroll({left:~~a.left+this.scrollLeft,top:~~a.top+this.scrollTop,behavior:a.behavior}))};aa.prototype.scrollIntoView=function(a){if(!0===h(a))r.scrollIntoView.call(this,void 0===a?!0:a);else{for(a=this;a!==x.body&&!1===na(a);)a=a.parentNode||
a.host;var b=a.getBoundingClientRect(),e=this.getBoundingClientRect();a!==x.body?(ka.call(this,a,a.scrollLeft+e.left-b.left,a.scrollTop+e.top-b.top),"fixed"!==ha.getComputedStyle(a).position&&ha.scrollBy({left:b.left,top:b.top,behavior:"smooth"})):ha.scrollBy({left:e.left,top:e.top,behavior:"smooth"})}}}}}})()}}]);}).call(this || window)
