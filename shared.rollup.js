import{CommandHandlerRemote,CommandHandlerFactory}from"chrome://resources/js/browser_command/browser_command.mojom-webui.js";import{html,PolymerElement,Polymer,Base,dom,dedupingMixin,dashToCamelCase,useShadow}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-webui.js";import"chrome://resources/js/cr.m.js";import"chrome://new-tab-page/strings.m.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import{PageHandlerRemote,PageCallbackRouter,PageHandlerFactory}from"chrome://new-tab-page/new_tab_page.mojom-webui.js";// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const AUTO_SRC="auto-src";const CLEAR_SRC="clear-src";const WITH_COOKIES="with-cookies";class CrAutoImgElement extends HTMLImageElement{static get observedAttributes(){return[AUTO_SRC,WITH_COOKIES]}attributeChangedCallback(name,oldValue,newValue){if(name!==AUTO_SRC&&name!==WITH_COOKIES){return}if(name===WITH_COOKIES&&oldValue===null===(newValue===null)){return}if(this.hasAttribute(CLEAR_SRC)){this.removeAttribute("src")}let url=null;try{url=new URL(this.getAttribute(AUTO_SRC)||"")}catch(_){}if(!url||url.protocol==="chrome-untrusted:"){this.removeAttribute("src")}else if(url.protocol==="data:"||url.protocol==="chrome:"){this.src=url.href}else if(this.hasAttribute(WITH_COOKIES)){this.src=`chrome://image?url=${encodeURIComponent(url.href)}&withCookies=true`}else{this.src="chrome://image?"+url.href}}set autoSrc(src){this.setAttribute(AUTO_SRC,src)}get autoSrc(){return this.getAttribute(AUTO_SRC)}set clearSrc(_){this.setAttribute(CLEAR_SRC,"")}get clearSrc(){return this.getAttribute(CLEAR_SRC)}set withCookies(enabled){if(enabled){this.setAttribute(WITH_COOKIES,"")}else{this.removeAttribute(WITH_COOKIES)}}get withCookies(){return this.hasAttribute(WITH_COOKIES)}}customElements.define("cr-auto-img",CrAutoImgElement,{extends:"img"});// Copyright 2020 The Chromium Authors. All rights reserved.
let instance$2=null;class BrowserCommandProxy{constructor(){this.handler=new CommandHandlerRemote;const factory=CommandHandlerFactory.getRemote();factory.createBrowserCommandHandler(this.handler.$.bindNewPipeAndPassReceiver())}static getInstance(){return instance$2||(instance$2=new BrowserCommandProxy)}static setInstance(newInstance){instance$2=newInstance}}// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert$1(condition,opt_message){if(!condition){let message="Assertion failed";if(opt_message){message=message+": "+opt_message}const error=new Error(message);const global=function(){const thisOrSelf=this||self;thisOrSelf.traceAssertionsForTesting;return thisOrSelf}();if(global.traceAssertionsForTesting){console.warn(error.stack)}throw error}return condition}function assertNotReached$1(message){assert$1(false,message||"Unreachable code hit")}function assertInstanceof(value,type,message){if(!(value instanceof type)){assertNotReached$1(message||"Value "+value+" is not a[n] "+(type.name||typeof type))}return value}function getTemplate$1(){return html`<!--_html_template_start_--><style>
  :host(:not([hidden])) {
    display: block;
  }

  #iframe {
    border: none;
    border-radius: inherit;
    display: block;
    height: inherit;
    max-height: inherit;
    max-width: inherit;
    width: inherit;
  }
</style>
<iframe id="iframe" src="[[src_]]"></iframe>
<!--_html_template_end_-->`}// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert(value,message){if(value){return}throw new Error("Assertion failed"+(message?`: ${message}`:""))}function assertNotReached(message="Unreachable code hit"){assert(false,message)}// Copyright 2020 The Chromium Authors. All rights reserved.
function createScrollBorders(container,topBorder,bottomBorder,showAttribute){const topProbe=document.createElement("div");container.prepend(topProbe);const bottomProbe=document.createElement("div");container.append(bottomProbe);const observer=new IntersectionObserver((entries=>{entries.forEach((({target:target,intersectionRatio:intersectionRatio})=>{const show=intersectionRatio===0;if(target===topProbe){topBorder.toggleAttribute(showAttribute,show)}else if(target===bottomProbe){bottomBorder.toggleAttribute(showAttribute,show)}}))}),{root:container});observer.observe(topProbe);observer.observe(bottomProbe);return observer}function decodeString16(str){return str?str.data.map((ch=>String.fromCodePoint(ch))).join(""):""}function mojoString16(str){const array=new Array(str.length);for(let i=0;i<str.length;++i){array[i]=str.charCodeAt(i)}return{data:array}}function mojoTimeDelta(timeDelta){return{microseconds:BigInt(Math.floor(timeDelta*1e3))}}function mojoTimeTicks(timeTicks){return{internalValue:BigInt(Math.floor(timeTicks*1e3))}}function $$(element,selector){return element.shadowRoot.querySelector(selector)}function strictQuery(root,selector,type){const element=root.querySelector(selector);assert(element&&element instanceof type);return element}// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$1=null;class WindowProxy{static getInstance(){return instance$1||(instance$1=new WindowProxy)}static setInstance(newInstance){instance$1=newInstance}navigate(href){window.location.href=href}open(url){window.open(url,"_blank")}setTimeout(callback,duration){return window.setTimeout(callback,duration)}clearTimeout(id){window.clearTimeout(id!==null?id:undefined)}random(){return Math.random()}createIframeSrc(src){return src}matchMedia(query){return window.matchMedia(query)}now(){return Date.now()}waitForLazyRender(){return new Promise((resolve=>{window.requestIdleCallback(resolve,{timeout:500})}))}postMessage(iframe,message,targetOrigin){iframe.contentWindow.postMessage(message,targetOrigin)}get url(){return new URL(window.location.href)}}// Copyright 2020 The Chromium Authors. All rights reserved.
/**
 * @fileoverview Wrapper around <iframe> element that lets us mock out loading
 * and postMessaging in tests.
 */class IframeElement extends PolymerElement{static get is(){return"ntp-iframe"}static get template(){return getTemplate$1()}static get properties(){return{src:{reflectToAttribute:true,type:String},src_:{type:String,computed:"computeSrc_(src)"}}}postMessage(message){assert$1(this.shadowRoot);WindowProxy.getInstance().postMessage(strictQuery(this.shadowRoot,"#iframe",HTMLIFrameElement),message,new URL(this.src).origin)}computeSrc_(){return WindowProxy.getInstance().createIframeSrc(this.src)}}customElements.define(IframeElement.is,IframeElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$5=html`<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --google-red-100-rgb: 244, 199, 195;  
      --google-red-100: rgb(var(--google-red-100-rgb));
      --google-red-300-rgb: 230, 124, 115;  
      --google-red-300: rgb(var(--google-red-300-rgb));
      --google-red-500-rgb: 219, 68, 55;  
      --google-red-500: rgb(var(--google-red-500-rgb));
      --google-red-700-rgb: 197, 57, 41;  
      --google-red-700: rgb(var(--google-red-700-rgb));

      --google-blue-100-rgb: 198, 218, 252;  
      --google-blue-100: rgb(var(--google-blue-100-rgb));
      --google-blue-300-rgb: 123, 170, 247;  
      --google-blue-300: rgb(var(--google-blue-300-rgb));
      --google-blue-500-rgb: 66, 133, 244;  
      --google-blue-500: rgb(var(--google-blue-500-rgb));
      --google-blue-700-rgb: 51, 103, 214;  
      --google-blue-700: rgb(var(--google-blue-700-rgb));

      --google-green-100-rgb: 183, 225, 205;  
      --google-green-100: rgb(var(--google-green-100-rgb));
      --google-green-300-rgb: 87, 187, 138;  
      --google-green-300: rgb(var(--google-green-300-rgb));
      --google-green-500-rgb: 15, 157, 88;  
      --google-green-500: rgb(var(--google-green-500-rgb));
      --google-green-700-rgb: 11, 128, 67;  
      --google-green-700: rgb(var(--google-green-700-rgb));

      --google-yellow-100-rgb: 252, 232, 178;  
      --google-yellow-100: rgb(var(--google-yellow-100-rgb));
      --google-yellow-300-rgb: 247, 203, 77;  
      --google-yellow-300: rgb(var(--google-yellow-300-rgb));
      --google-yellow-500-rgb: 244, 180, 0;  
      --google-yellow-500: rgb(var(--google-yellow-500-rgb));
      --google-yellow-700-rgb: 240, 147, 0;  
      --google-yellow-700: rgb(var(--google-yellow-700-rgb));

      --google-grey-100-rgb: 245, 245, 245;  
      --google-grey-100: rgb(var(--google-grey-100-rgb));
      --google-grey-300-rgb: 224, 224, 224;  
      --google-grey-300: rgb(var(--google-grey-300-rgb));
      --google-grey-500-rgb: 158, 158, 158;  
      --google-grey-500: rgb(var(--google-grey-500-rgb));
      --google-grey-700-rgb: 97, 97, 97;  
      --google-grey-700: rgb(var(--google-grey-700-rgb));

      

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; 
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; 
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;
}

</style>
</custom-style>
`;template$5.setAttribute("style","display: none;");document.head.appendChild(template$5.content);const $_documentContainer=document.createElement("template");$_documentContainer.innerHTML=`<custom-style>\n<style is="custom-style" css-build="shadow">html {\n  --google-blue-50-rgb: 232, 240, 254;  \n    --google-blue-50: rgb(var(--google-blue-50-rgb));\n    --google-blue-100-rgb: 210, 227, 252;  \n    --google-blue-100: rgb(var(--google-blue-100-rgb));\n    --google-blue-200-rgb: 174, 203, 250;  \n    --google-blue-200: rgb(var(--google-blue-200-rgb));\n    --google-blue-300-rgb: 138, 180, 248;  \n    --google-blue-300: rgb(var(--google-blue-300-rgb));\n    --google-blue-400-rgb: 102, 157, 246;  \n    --google-blue-400: rgb(var(--google-blue-400-rgb));\n    --google-blue-500-rgb: 66, 133, 244;  \n    --google-blue-500: rgb(var(--google-blue-500-rgb));\n    --google-blue-600-rgb: 26, 115, 232;  \n    --google-blue-600: rgb(var(--google-blue-600-rgb));\n    --google-blue-700-rgb: 25, 103, 210;  \n    --google-blue-700: rgb(var(--google-blue-700-rgb));\n\n    --google-green-50-rgb: 230, 244, 234;  \n    --google-green-50: rgb(var(--google-green-50-rgb));\n    --google-green-300-rgb: 129, 201, 149;  \n    --google-green-300: rgb(var(--google-green-300-rgb));\n    --google-green-400-rgb: 91, 185, 116;  \n    --google-green-400: rgb(var(--google-green-400-rgb));\n    --google-green-500-rgb: 52, 168, 83;  \n    --google-green-500: rgb(var(--google-green-500-rgb));\n    --google-green-600-rgb: 30, 142, 62;  \n    --google-green-600: rgb(var(--google-green-600-rgb));\n    --google-green-700-rgb: 24, 128, 56;  \n    --google-green-700: rgb(var(--google-green-700-rgb));\n\n    --google-grey-50-rgb: 248, 249, 250;  \n    --google-grey-50: rgb(var(--google-grey-50-rgb));\n    --google-grey-100-rgb: 241, 243, 244;  \n    --google-grey-100: rgb(var(--google-grey-100-rgb));\n    --google-grey-200-rgb: 232, 234, 237;  \n    --google-grey-200: rgb(var(--google-grey-200-rgb));\n    --google-grey-300-rgb: 218, 220, 224;  \n    --google-grey-300: rgb(var(--google-grey-300-rgb));\n    --google-grey-400-rgb: 189, 193, 198;  \n    --google-grey-400: rgb(var(--google-grey-400-rgb));\n    --google-grey-500-rgb: 154, 160, 166;  \n    --google-grey-500: rgb(var(--google-grey-500-rgb));\n    --google-grey-600-rgb: 128, 134, 139;  \n    --google-grey-600: rgb(var(--google-grey-600-rgb));\n    --google-grey-700-rgb: 95, 99, 104;  \n    --google-grey-700: rgb(var(--google-grey-700-rgb));\n    --google-grey-800-rgb: 60, 64, 67;  \n    --google-grey-800: rgb(var(--google-grey-800-rgb));\n    --google-grey-900-rgb: 32, 33, 36;  \n    --google-grey-900: rgb(var(--google-grey-900-rgb));\n    \n    --google-grey-900-white-4-percent: #292a2d;\n\n    --google-red-300-rgb: 242, 139, 130;  \n    --google-red-300: rgb(var(--google-red-300-rgb));\n    --google-red-500-rgb: 234, 67, 53;  \n    --google-red-500: rgb(var(--google-red-500-rgb));\n    --google-red-600-rgb: 217, 48, 37;  \n    --google-red-600: rgb(var(--google-red-600-rgb));\n\n    --google-yellow-50-rgb: 254, 247, 224;  \n    --google-yellow-50: rgb(var(--google-yellow-50-rgb));\n    --google-yellow-300-rgb: 253, 214, 51;  \n    --google-yellow-300: rgb(var(--google-yellow-300-rgb));\n    --google-yellow-400-rgb: 252, 201, 52;  \n    --google-yellow-400: rgb(var(--google-yellow-400-rgb));\n    --google-yellow-500-rgb: 251, 188, 4;  \n    --google-yellow-500: rgb(var(--google-yellow-500-rgb));\n\n    --cr-primary-text-color: var(--google-grey-900);\n    --cr-secondary-text-color: var(--google-grey-700);\n\n    --cr-card-background-color: white;\n    --cr-card-shadow-color-rgb: var(--google-grey-800-rgb);\n\n    --cr-elevation-1: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 1px 3px 1px;\n    --cr-elevation-2: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 2px 6px 2px;\n    --cr-elevation-3: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 3px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 4px 8px 3px;\n    --cr-elevation-4: rgba(var(--cr-card-shadow-color-rgb), .3) 0 2px 3px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 6px 10px 4px;\n    --cr-elevation-5: rgba(var(--cr-card-shadow-color-rgb), .3) 0 4px 4px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 8px 12px 6px;\n\n    --cr-card-shadow: var(--cr-elevation-2);\n\n    --cr-checked-color: var(--google-blue-600);\n    --cr-focused-item-color: var(--google-grey-300);\n    --cr-form-field-label-color: var(--google-grey-700);\n    --cr-hairline-rgb: 0, 0, 0;\n    --cr-iph-anchor-highlight-color: rgba(var(--google-blue-600-rgb), 0.1);\n    --cr-link-color: var(--google-blue-700);\n    --cr-menu-background-color: white;\n    --cr-menu-background-focus-color: var(--google-grey-400);\n    --cr-menu-shadow: 0 2px 6px var(--paper-grey-500);\n    --cr-separator-color: rgba(0, 0, 0, .06);\n    --cr-title-text-color: rgb(90, 90, 90);\n    --cr-toolbar-background-color: white;\n\n    --cr-hover-background-color: rgba(var(--google-grey-900-rgb), .1);\n    --cr-active-background-color: rgba(var(--google-grey-900-rgb), .16);\n    --cr-focus-outline-color: rgba(var(--google-blue-600-rgb), .4);\n}\n\n@media (prefers-color-scheme: dark) {\nhtml {\n  --cr-primary-text-color: var(--google-grey-200);\n      --cr-secondary-text-color: var(--google-grey-500);\n\n      --cr-card-background-color: var(--google-grey-900-white-4-percent);\n      --cr-card-shadow-color-rgb: 0, 0, 0;\n\n      --cr-checked-color: var(--google-blue-300);\n      --cr-focused-item-color: var(--google-grey-800);\n      --cr-form-field-label-color: var(--dark-secondary-color);\n      --cr-hairline-rgb: 255, 255, 255;\n      --cr-iph-anchor-highlight-color: rgba(var(--google-grey-100-rgb), 0.1);\n      --cr-link-color: var(--google-blue-300);\n      --cr-menu-background-color: var(--google-grey-900);\n      --cr-menu-background-focus-color: var(--google-grey-700);\n      --cr-menu-background-sheen: rgba(255, 255, 255, .06);  \n      --cr-menu-shadow: rgba(0, 0, 0, .3) 0 1px 2px 0,\n                        rgba(0, 0, 0, .15) 0 3px 6px 2px;\n      --cr-separator-color: rgba(255, 255, 255, .1);\n      --cr-title-text-color: var(--cr-primary-text-color);\n      --cr-toolbar-background-color: var(--google-grey-900-white-4-percent);\n\n      --cr-hover-background-color: rgba(255, 255, 255, .1);\n      --cr-active-background-color: rgba(var(--google-grey-200-rgb), .16);\n      --cr-focus-outline-color: rgba(var(--google-blue-300-rgb), .4);\n}\n\n}\n\nhtml {\n  --cr-button-edge-spacing: 12px;\n    --cr-button-height: 32px;\n\n    \n    --cr-controlled-by-spacing: 24px;\n\n    \n    --cr-default-input-max-width: 264px;\n\n    \n    --cr-icon-ripple-size: 36px;\n    --cr-icon-ripple-padding: 8px;\n\n    --cr-icon-size: 20px;\n\n    --cr-icon-button-margin-start: 16px;\n\n    \n    --cr-icon-ripple-margin: calc(var(--cr-icon-ripple-padding) * -1);\n\n    \n    \n    --cr-section-min-height: 48px;\n    --cr-section-two-line-min-height: 64px;\n\n    --cr-section-padding: 20px;\n    --cr-section-vertical-padding: 12px;\n    --cr-section-indent-width: 40px;\n    --cr-section-indent-padding: calc(\n        var(--cr-section-padding) + var(--cr-section-indent-width));\n\n    --cr-section-vertical-margin: 21px;\n\n    --cr-centered-card-max-width: 680px;\n    --cr-centered-card-width-percentage: 0.96;\n\n    --cr-hairline: 1px solid rgba(var(--cr-hairline-rgb), .14);\n\n    --cr-separator-height: 1px;\n    --cr-separator-line: var(--cr-separator-height) solid\n        var(--cr-separator-color);\n\n    --cr-toolbar-overlay-animation-duration: 150ms;\n    --cr-toolbar-height: 56px;\n\n    --cr-container-shadow-height: 6px;\n    --cr-container-shadow-margin: calc(-1 * var(--cr-container-shadow-height));\n\n    --cr-container-shadow-max-opacity: 1;\n\n    \n    --cr-card-border-radius: 8px;\n    --cr-disabled-opacity: .38;\n    --cr-form-field-bottom-spacing: 16px;\n    --cr-form-field-label-font-size: .625rem;\n    --cr-form-field-label-height: 1em;\n    --cr-form-field-label-line-height: 1em;\n}\n\n</style>\n</custom-style>\n`;document.head.appendChild($_documentContainer.content);const template$4=document.createElement("template");template$4.innerHTML=`<dom-module id="cr-hidden-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-hidden-style">[hidden], :host([hidden]) {\n  display: none !important;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$4.content.cloneNode(true));const template$3=document.createElement("template");template$3.innerHTML=`<dom-module id="cr-icons" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-icons">.icon-arrow-back {\n  --cr-icon-image: url(../images/icon_arrow_back.svg);\n}\n\n.icon-arrow-dropdown {\n  --cr-icon-image: url(../images/icon_arrow_dropdown.svg);\n}\n\n.icon-cancel {\n  --cr-icon-image: url(../images/icon_cancel.svg);\n}\n\n.icon-clear {\n  --cr-icon-image: url(../images/icon_clear.svg);\n}\n\n.icon-copy-content {\n  --cr-icon-image: url(../images/icon_copy_content.svg);\n}\n\n.icon-delete-gray {\n  --cr-icon-image: url(../images/icon_delete_gray.svg);\n}\n\n.icon-edit {\n  --cr-icon-image: url(../images/icon_edit.svg);\n}\n\n.icon-picture-delete {\n  --cr-icon-image: url(../images/icon_picture_delete.svg);\n}\n\n.icon-expand-less {\n  --cr-icon-image: url(../images/icon_expand_less.svg);\n}\n\n.icon-expand-more {\n  --cr-icon-image: url(../images/icon_expand_more.svg);\n}\n\n.icon-external {\n  --cr-icon-image: url(../images/open_in_new.svg);\n}\n\n.icon-more-vert {\n  --cr-icon-image: url(../images/icon_more_vert.svg);\n}\n\n.icon-refresh {\n  --cr-icon-image: url(../images/icon_refresh.svg);\n}\n\n.icon-search {\n  --cr-icon-image: url(../images/icon_search.svg);\n}\n\n.icon-settings {\n  --cr-icon-image: url(../images/icon_settings.svg);\n}\n\n.icon-visibility {\n  --cr-icon-image: url(../images/icon_visibility.svg);\n}\n\n.icon-visibility-off {\n  --cr-icon-image: url(../images/icon_visibility_off.svg);\n}\n\n.subpage-arrow {\n  --cr-icon-image: url(../images/arrow_right.svg);\n}\n\n.cr-icon {\n  -webkit-mask-image: var(--cr-icon-image);\n        -webkit-mask-position: center;\n        -webkit-mask-repeat: no-repeat;\n        -webkit-mask-size: var(--cr-icon-size);\n        background-color: var(--cr-icon-color, var(--google-grey-700));\n        flex-shrink: 0;\n        height: var(--cr-icon-ripple-size);\n        margin-inline-end: var(--cr-icon-ripple-margin);\n        margin-inline-start: var(--cr-icon-button-margin-start);\n        user-select: none;\n        width: var(--cr-icon-ripple-size);\n}\n\n:host-context([dir=rtl]) .cr-icon {\n  transform: scaleX(-1);\n}\n\n.cr-icon.no-overlap {\n  margin-inline-end: 0;\n        margin-inline-start: 0;\n}\n\n@media (prefers-color-scheme: dark) {\n.cr-icon {\n  background-color: var(--cr-icon-color, var(--google-grey-500));\n}\n\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$3.content.cloneNode(true));const template$2=document.createElement("template");template$2.innerHTML=`<dom-module id="cr-shared-style" assetpath="chrome://resources/">\n  <template>\n    <style include="cr-hidden-style cr-icons" scope="cr-shared-style">html, :host {\n  --scrollable-border-color: var(--google-grey-300);\n}\n\n@media (prefers-color-scheme: dark) {\nhtml, :host {\n  --scrollable-border-color: var(--google-grey-700);\n}\n\n}\n\n[actionable] {\n  cursor: pointer;\n}\n\n.hr {\n  border-top: var(--cr-separator-line);\n}\n\niron-list.cr-separators > *:not([first]) {\n  border-top: var(--cr-separator-line);\n}\n\n[scrollable] {\n  border-color: transparent;\n        border-style: solid;\n        border-width: 1px 0;\n        overflow-y: auto;\n}\n\n[scrollable].is-scrolled {\n  border-top-color: var(--scrollable-border-color);\n}\n\n[scrollable].can-scroll:not(.scrolled-to-bottom) {\n  border-bottom-color: var(--scrollable-border-color);\n}\n\n[scrollable] iron-list > :not(.no-outline):focus, [selectable]:focus, [selectable] > :focus {\n  background-color: var(--cr-focused-item-color);\n        outline: none;\n}\n\n.scroll-container {\n  display: flex;\n        flex-direction: column;\n        min-height: 1px;\n}\n\n[selectable] > * {\n  cursor: pointer;\n}\n\n.cr-centered-card-container {\n  box-sizing: border-box;\n        display: block;\n        height: inherit;\n        margin: 0 auto;\n        max-width: var(--cr-centered-card-max-width);\n        min-width: 550px;\n        position: relative;\n        width: calc(100% * var(--cr-centered-card-width-percentage));\n}\n\n.cr-container-shadow {\n  box-shadow: inset 0 5px 6px -3px rgba(0, 0, 0, .4);\n        height: var(--cr-container-shadow-height);\n        left: 0;\n        margin: 0 0 var(--cr-container-shadow-margin);\n        opacity: 0;\n        pointer-events: none;\n        position: relative;\n        right: 0;\n        top: 0;\n        transition: opacity 500ms;\n        z-index: 1;\n}\n\n#cr-container-shadow-bottom {\n  margin-bottom: 0;\n        margin-top: var(--cr-container-shadow-margin);\n        transform: scaleY(-1);\n}\n\n#cr-container-shadow-top.has-shadow, #cr-container-shadow-bottom.has-shadow {\n  opacity: var(--cr-container-shadow-max-opacity);\n}\n\n.cr-row {\n  align-items: center;\n        border-top: var(--cr-separator-line);\n        display: flex;\n        min-height: var(--cr-section-min-height);\n        padding: 0 var(--cr-section-padding);\n}\n\n.cr-row.first, .cr-row.continuation {\n  border-top: none;\n}\n\n.cr-row-gap {\n  padding-inline-start: 16px;\n}\n\n.cr-button-gap {\n  margin-inline-start: 8px;\n}\n\npaper-tooltip {\n  --paper-tooltip_-_border-radius:  var(--paper-tooltip-border-radius, 2px); --paper-tooltip_-_font-size:  92.31%; --paper-tooltip_-_font-weight:  500; --paper-tooltip_-_max-width:  330px; --paper-tooltip_-_min-width:  var(--paper-tooltip-min-width, 200px); --paper-tooltip_-_padding:  var(--paper-tooltip-padding, 10px 8px);\n}\n\n.cr-padded-text {\n  padding-block-end: var(--cr-section-vertical-padding);\n        padding-block-start: var(--cr-section-vertical-padding);\n}\n\n.cr-title-text {\n  color: var(--cr-title-text-color);\n        font-size: 107.6923%; \n        font-weight: 500;\n}\n\n.cr-secondary-text {\n  color: var(--cr-secondary-text-color);\n        font-weight: 400;\n}\n\n.cr-form-field-label {\n  color: var(--cr-form-field-label-color);\n        display: block;\n        font-size: var(--cr-form-field-label-font-size);\n        font-weight: 500;\n        letter-spacing: .4px;\n        line-height: var(--cr-form-field-label-line-height);\n        margin-bottom: 8px;\n}\n\n.cr-vertical-tab {\n  align-items: center;\n        display: flex;\n}\n\n.cr-vertical-tab::before {\n  border-radius: 0 3px 3px 0;\n        content: '';\n        display: block;\n        flex-shrink: 0;\n        height: var(--cr-vertical-tab-height, 100%);\n        width: 4px;\n}\n\n.cr-vertical-tab.selected::before {\n  background: var(--cr-vertical-tab-selected-color, var(--cr-checked-color));\n}\n\n:host-context([dir=rtl]) .cr-vertical-tab::before {\n  transform: scaleX(-1);\n}\n\n.iph-anchor-highlight {\n  background-color: var(--cr-iph-anchor-highlight-color);\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$2.content.cloneNode(true));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$1=html`<custom-style>
  <style is="custom-style" css-build="shadow">[hidden] {
  display: none !important;
}

</style>
</custom-style>
<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --layout_-_display:  flex;;

      --layout-inline_-_display:  inline-flex;;

      --layout-horizontal_-_display:  var(--layout_-_display); --layout-horizontal_-_flex-direction:  row;;

      --layout-horizontal-reverse_-_display:  var(--layout_-_display); --layout-horizontal-reverse_-_flex-direction:  row-reverse;;

      --layout-vertical_-_display:  var(--layout_-_display); --layout-vertical_-_flex-direction:  column;;

      --layout-vertical-reverse_-_display:  var(--layout_-_display); --layout-vertical-reverse_-_flex-direction:  column-reverse;;

      --layout-wrap_-_flex-wrap:  wrap;;

      --layout-wrap-reverse_-_flex-wrap:  wrap-reverse;;

      --layout-flex-auto_-_flex:  1 1 auto;;

      --layout-flex-none_-_flex:  none;;

      --layout-flex_-_flex:  1; --layout-flex_-_flex-basis:  0.000000001px;;

      --layout-flex-2_-_flex:  2;;

      --layout-flex-3_-_flex:  3;;

      --layout-flex-4_-_flex:  4;;

      --layout-flex-5_-_flex:  5;;

      --layout-flex-6_-_flex:  6;;

      --layout-flex-7_-_flex:  7;;

      --layout-flex-8_-_flex:  8;;

      --layout-flex-9_-_flex:  9;;

      --layout-flex-10_-_flex:  10;;

      --layout-flex-11_-_flex:  11;;

      --layout-flex-12_-_flex:  12;;

      

      --layout-start_-_align-items:  flex-start;;

      --layout-center_-_align-items:  center;;

      --layout-end_-_align-items:  flex-end;;

      --layout-baseline_-_align-items:  baseline;;

      

      --layout-start-justified_-_justify-content:  flex-start;;

      --layout-center-justified_-_justify-content:  center;;

      --layout-end-justified_-_justify-content:  flex-end;;

      --layout-around-justified_-_justify-content:  space-around;;

      --layout-justified_-_justify-content:  space-between;;

      --layout-center-center_-_align-items:  var(--layout-center_-_align-items); --layout-center-center_-_justify-content:  var(--layout-center-justified_-_justify-content);;

      

      --layout-self-start_-_align-self:  flex-start;;

      --layout-self-center_-_align-self:  center;;

      --layout-self-end_-_align-self:  flex-end;;

      --layout-self-stretch_-_align-self:  stretch;;

      --layout-self-baseline_-_align-self:  baseline;;

      

      --layout-start-aligned_-_align-content:  flex-start;;

      --layout-end-aligned_-_align-content:  flex-end;;

      --layout-center-aligned_-_align-content:  center;;

      --layout-between-aligned_-_align-content:  space-between;;

      --layout-around-aligned_-_align-content:  space-around;;

      

      --layout-block_-_display:  block;;

      --layout-invisible_-_visibility:  hidden !important;;

      --layout-relative_-_position:  relative;;

      --layout-fit_-_position:  absolute; --layout-fit_-_top:  0; --layout-fit_-_right:  0; --layout-fit_-_bottom:  0; --layout-fit_-_left:  0;;

      --layout-scroll_-_-webkit-overflow-scrolling:  touch; --layout-scroll_-_overflow:  auto;;

      --layout-fullbleed_-_margin:  0; --layout-fullbleed_-_height:  100vh;;

      

      --layout-fixed-top_-_position:  fixed; --layout-fixed-top_-_top:  0; --layout-fixed-top_-_left:  0; --layout-fixed-top_-_right:  0;;

      --layout-fixed-right_-_position:  fixed; --layout-fixed-right_-_top:  0; --layout-fixed-right_-_right:  0; --layout-fixed-right_-_bottom:  0;;

      --layout-fixed-bottom_-_position:  fixed; --layout-fixed-bottom_-_right:  0; --layout-fixed-bottom_-_bottom:  0; --layout-fixed-bottom_-_left:  0;;

      --layout-fixed-left_-_position:  fixed; --layout-fixed-left_-_top:  0; --layout-fixed-left_-_bottom:  0; --layout-fixed-left_-_left:  0;;
}

</style>
</custom-style>`;template$1.setAttribute("style","display: none;");document.head.appendChild(template$1.content);var style=document.createElement("style");style.textContent="[hidden] { display: none !important; }";document.head.appendChild(style);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class IronMeta{constructor(options){IronMeta[" "](options);this.type=options&&options.type||"default";this.key=options&&options.key;if(options&&"value"in options){this.value=options.value}}get value(){var type=this.type;var key=this.key;if(type&&key){return IronMeta.types[type]&&IronMeta.types[type][key]}}set value(value){var type=this.type;var key=this.key;if(type&&key){type=IronMeta.types[type]=IronMeta.types[type]||{};if(value==null){delete type[key]}else{type[key]=value}}}get list(){var type=this.type;if(type){var items=IronMeta.types[this.type];if(!items){return[]}return Object.keys(items).map((function(key){return metaDatas[this.type][key]}),this)}}byKey(key){this.key=key;return this.value}}IronMeta[" "]=function(){};IronMeta.types={};var metaDatas=IronMeta.types;Polymer({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:true},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:true},__computeMeta:function(type,key,value){var meta=new IronMeta({type:type,key:key});if(value!==undefined&&value!==meta.value){meta.value=value}else if(this.value!==meta.value){this.value=meta.value}return meta},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(self){if(self){this.value=this}},byKey:function(key){return new IronMeta({type:this.type,key:key}).value}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="iron-icon">:host {
  display: var(--layout-inline_-_display);
        align-items: var(--layout-center-center_-_align-items); justify-content: var(--layout-center-center_-_justify-content);
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        ;
}

:host([hidden]) {
  display: none;
}

</style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:Base.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(icon){var parts=(icon||"").split(":");this._iconName=parts.pop();this._iconsetName=parts.pop()||this._DEFAULT_ICONSET;this._updateIcon()},_srcChanged:function(src){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){if(this._usesIconset()){if(this._img&&this._img.parentNode){dom(this.root).removeChild(this._img)}if(this._iconName===""){if(this._iconset){this._iconset.removeIcon(this)}}else if(this._iconsetName&&this._meta){this._iconset=this._meta.byKey(this._iconsetName);if(this._iconset){this._iconset.applyIcon(this,this._iconName,this.theme);this.unlisten(window,"iron-iconset-added","_updateIcon")}else{this.listen(window,"iron-iconset-added","_updateIcon")}}}else{if(this._iconset){this._iconset.removeIcon(this)}if(!this._img){this._img=document.createElement("img");this._img.style.width="100%";this._img.style.height="100%";this._img.draggable=false}this._img.src=this.src;dom(this.root).appendChild(this._img)}}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-icon-button">:host {
  --cr-icon-button-fill-color: var(--google-grey-700);
        --cr-icon-button-icon-start-offset: 0;
        --cr-icon-button-icon-size: 20px;
        --cr-icon-button-size: 36px;
        --cr-icon-button-height: var(--cr-icon-button-size);
        --cr-icon-button-transition: 150ms ease-in-out;
        --cr-icon-button-width: var(--cr-icon-button-size);
        
        -webkit-tap-highlight-color: transparent;
        border-radius: 50%;
        color: var(--cr-icon-button-stroke-color,
            var(--cr-icon-button-fill-color));
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        height: var(--cr-icon-button-height);
        margin-inline-end: var(--cr-icon-button-margin-end,
            var(--cr-icon-ripple-margin));
        margin-inline-start: var(--cr-icon-button-margin-start);
        outline: none;
        overflow: hidden;
        user-select: none;
        vertical-align: middle;
        width: var(--cr-icon-button-width);
}

:host(:hover) {
  background-color: var(--cr-icon-button-hover-background-color,
            var(--cr-hover-background-color));
}

:host(:focus-visible:focus) {
  box-shadow: inset 0 0 0 2px var(--cr-icon-button-focus-outline-color,
            var(--cr-focus-outline-color));
}

:host(:active) {
  background-color: var(--cr-icon-button-active-background-color,
            var(--cr-active-background-color));
}

:host([disabled]) {
  cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

:host(.no-overlap) {
  --cr-icon-button-margin-end: 0;
        --cr-icon-button-margin-start: 0;
}

:host-context([dir=rtl]):host(:not([dir=ltr]):not([multiple-icons_])) {
  transform: scaleX(-1);
}

:host-context([dir=rtl]):host(:not([dir=ltr])[multiple-icons_]) iron-icon {
  transform: scaleX(-1);
}

:host(:not([iron-icon])) #maskedImage {
  -webkit-mask-image: var(--cr-icon-image);
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: var(--cr-icon-button-icon-size);
        -webkit-transform: var(--cr-icon-image-transform, none);
        background-color: var(--cr-icon-button-fill-color);
        height: 100%;
        transition: background-color var(--cr-icon-button-transition);
        width: 100%;
}

#icon {
  align-items: center;
        border-radius: 4px;
        display: flex;
        height: 100%;
        justify-content: center;
        padding-inline-start: var(--cr-icon-button-icon-start-offset);
        
        position: relative;
        width: 100%;
}

iron-icon {
  --iron-icon-fill-color: var(--cr-icon-button-fill-color);
        --iron-icon-stroke-color: var(--cr-icon-button-stroke-color, none);
        --iron-icon-height: var(--cr-icon-button-icon-size);
        --iron-icon-width: var(--cr-icon-button-icon-size);
        transition: fill var(--cr-icon-button-transition),
            stroke var(--cr-icon-button-transition);
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-icon-button-fill-color: var(--google-grey-500);
}

}

</style>
    <div id="icon">
      <div id="maskedImage"></div>
    </div>
<!--_html_template_end_-->`,is:"cr-icon-button",properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},customTabIndex:{type:Number,observer:"applyTabIndex_"},ironIcon:{type:String,observer:"onIronIconChanged_",reflectToAttribute:true},multipleIcons_:{type:Boolean,reflectToAttribute:true}},hostAttributes:{"aria-disabled":"false",role:"button",tabindex:0},listeners:{blur:"onBlur_",click:"onClick_",keydown:"onKeyDown_",keyup:"onKeyUp_"},spaceKeyDown_:false,disabledChanged_(newValue,oldValue){if(!newValue&&oldValue===undefined){return}if(this.disabled){this.blur()}this.setAttribute("aria-disabled",this.disabled?"true":"false");this.applyTabIndex_()},applyTabIndex_(){let value=this.customTabIndex;if(value===undefined){value=this.disabled?-1:0}this.setAttribute("tabindex",value)},onBlur_(){this.spaceKeyDown_=false},onClick_(e){if(this.disabled){e.stopImmediatePropagation()}},onIronIconChanged_(){this.shadowRoot.querySelectorAll("iron-icon").forEach((el=>el.remove()));if(!this.ironIcon){return}const icons=(this.ironIcon||"").split(",");this.multipleIcons_=icons.length>1;icons.forEach((icon=>{const ironIcon=document.createElement("iron-icon");ironIcon.icon=icon;this.$.icon.appendChild(ironIcon);if(ironIcon.shadowRoot){ironIcon.shadowRoot.querySelectorAll("svg","img").forEach((child=>child.setAttribute("role","none")))}}))},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.click()}else if(e.key===" "){this.spaceKeyDown_=true}},onKeyUp_(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation()}if(this.spaceKeyDown_&&e.key===" "){this.spaceKeyDown_=false;this.click()}}});// Copyright (c) 2012 The Chromium Authors. All rights reserved.
const sanitizeInnerHtml=function(rawString,opts){opts=opts||{};return parseHtmlSubset("<b>"+rawString+"</b>",opts.tags,opts.attrs).firstChild.innerHTML};const parseHtmlSubset=function(){const allowAttribute=(node,value)=>true;const allowedAttributes=new Map([["href",(node,value)=>node.tagName==="A"&&(value.startsWith("chrome://")||value.startsWith("https://")||value==="#")],["target",(node,value)=>node.tagName==="A"&&value==="_blank"]]);const allowedOptionalAttributes=new Map([["class",allowAttribute],["id",allowAttribute],["is",(node,value)=>value==="action-link"||value===""],["role",(node,value)=>value==="link"],["src",(node,value)=>node.tagName==="IMG"&&value.startsWith("chrome://")],["tabindex",allowAttribute],["aria-hidden",allowAttribute],["aria-labelledby",allowAttribute]]);const allowedTags=new Set(["A","B","BR","DIV","KBD","P","PRE","SPAN","STRONG"]);const allowedOptionalTags=new Set(["IMG","LI","UL"]);let unsanitizedPolicy;function mergeTags(optTags){const clone=new Set(allowedTags);optTags.forEach((str=>{const tag=str.toUpperCase();if(allowedOptionalTags.has(tag)){clone.add(tag)}}));return clone}function mergeAttrs(optAttrs){const clone=new Map([...allowedAttributes]);optAttrs.forEach((key=>{if(allowedOptionalAttributes.has(key)){clone.set(key,allowedOptionalAttributes.get(key))}}));return clone}function walk(n,f){f(n);for(let i=0;i<n.childNodes.length;i++){walk(n.childNodes[i],f)}}function assertElement(tags,node){if(!tags.has(node.tagName)){throw Error(node.tagName+" is not supported")}}function assertAttribute(attrs,attrNode,node){const n=attrNode.nodeName;const v=attrNode.nodeValue;if(!attrs.has(n)||!attrs.get(n)(node,v)){throw Error(node.tagName+"["+n+'="'+v+'"] is not supported')}}return function(s,extraTags,extraAttrs){const tags=extraTags?mergeTags(extraTags):allowedTags;const attrs=extraAttrs?mergeAttrs(extraAttrs):allowedAttributes;const doc=document.implementation.createHTMLDocument("");const r=doc.createRange();r.selectNode(doc.body);if(window.trustedTypes){if(!unsanitizedPolicy){unsanitizedPolicy=trustedTypes.createPolicy("parse-html-subset",{createHTML:untrustedHTML=>untrustedHTML})}s=unsanitizedPolicy.createHTML(s)}const df=r.createContextualFragment(s);walk(df,(function(node){switch(node.nodeType){case Node.ELEMENT_NODE:assertElement(tags,node);const nodeAttrs=node.attributes;for(let i=0;i<nodeAttrs.length;++i){assertAttribute(attrs,nodeAttrs[i],node)}break;case Node.COMMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:case Node.TEXT_NODE:break;default:throw Error("Node type "+node.nodeType+" is not supported")}}));return df}}();// Copyright 2021 The Chromium Authors. All rights reserved.
const I18nMixin=dedupingMixin((superClass=>{class I18nMixin extends superClass{i18nRaw_(id,...varArgs){return varArgs.length===0?loadTimeData.getString(id):loadTimeData.getStringF(id,...varArgs)}i18n(id,...varArgs){const rawString=this.i18nRaw_(id,...varArgs);return parseHtmlSubset(`<b>${rawString}</b>`).firstChild.textContent}i18nAdvanced(id,opts){opts=opts||{};const rawString=this.i18nRaw_(id,...opts.substitutions||[]);return sanitizeInnerHtml(rawString,opts)}i18nDynamic(_locale,id,...varArgs){return this.i18n(id,...varArgs)}i18nRecursive(locale,id,...varArgs){let args=varArgs;if(args.length>0){args=args.map((str=>this.i18nExists(str)?loadTimeData.getString(str):str))}return this.i18nDynamic(locale,id,...args)}i18nExists(id){return loadTimeData.valueExists(id)}}return I18nMixin}));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class IronSelection{constructor(selectCallback){this.selection=[];this.selectCallback=selectCallback}get(){return this.multi?this.selection.slice():this.selection[0]}clear(excludes){this.selection.slice().forEach((function(item){if(!excludes||excludes.indexOf(item)<0){this.setItemSelected(item,false)}}),this)}isSelected(item){return this.selection.indexOf(item)>=0}setItemSelected(item,isSelected){if(item!=null){if(isSelected!==this.isSelected(item)){if(isSelected){this.selection.push(item)}else{var i=this.selection.indexOf(item);if(i>=0){this.selection.splice(i,1)}}if(this.selectCallback){this.selectCallback(item,isSelected)}}}}select(item){if(this.multi){this.toggle(item)}else if(this.get()!==item){this.setItemSelected(this.get(),false);this.setItemSelected(item,true)}}toggle(item){this.setItemSelected(item,!this.isSelected(item))}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronSelectableBehavior={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:true},selectedItem:{type:Object,readOnly:true,notify:true},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:true,notify:true,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this);this._selection=new IronSelection(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this);this._addListener(this.activateEvent)},detached:function(){if(this._observer){dom(this).unobserveNodes(this._observer)}this._removeListener(this.activateEvent)},indexOf:function(item){return this.items?this.items.indexOf(item):-1},select:function(value){this.selected=value},selectPrevious:function(){var length=this.items.length;var index=length-1;if(this.selected!==undefined){index=(Number(this._valueToIndex(this.selected))-1+length)%length}this.selected=this._indexToValue(index)},selectNext:function(){var index=0;if(this.selected!==undefined){index=(Number(this._valueToIndex(this.selected))+1)%this.items.length}this.selected=this._indexToValue(index)},selectIndex:function(index){this.select(this._indexToValue(index))},forceSynchronousItemUpdate:function(){if(this._observer&&typeof this._observer.flush==="function"){this._observer.flush()}else{this._updateItems()}},get _shouldUpdateSelection(){return this.selected!=null},_checkFallback:function(){this._updateSelected()},_addListener:function(eventName){this.listen(this,eventName,"_activateHandler")},_removeListener:function(eventName){this.unlisten(this,eventName,"_activateHandler")},_activateEventChanged:function(eventName,old){this._removeListener(old);this._addListener(eventName)},_updateItems:function(){var nodes=dom(this).queryDistributedElements(this.selectable||"*");nodes=Array.prototype.filter.call(nodes,this._bindFilterItem);this._setItems(nodes)},_updateAttrForSelected:function(){if(this.selectedItem){this.selected=this._valueForItem(this.selectedItem)}},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(selected){if(!this.items){return}var item=this._valueToItem(this.selected);if(item){this._selection.select(item)}else{this._selection.clear()}if(this.fallbackSelection&&this.items.length&&this._selection.get()===undefined){this.selected=this.fallbackSelection}},_filterItem:function(node){return!this._excludedLocalNames[node.localName]},_valueToItem:function(value){return value==null?null:this.items[this._valueToIndex(value)]},_valueToIndex:function(value){if(this.attrForSelected){for(var i=0,item;item=this.items[i];i++){if(this._valueForItem(item)==value){return i}}}else{return Number(value)}},_indexToValue:function(index){if(this.attrForSelected){var item=this.items[index];if(item){return this._valueForItem(item)}}else{return index}},_valueForItem:function(item){if(!item){return null}if(!this.attrForSelected){var i=this.indexOf(item);return i===-1?null:i}var propValue=item[dashToCamelCase(this.attrForSelected)];return propValue!=undefined?propValue:item.getAttribute(this.attrForSelected)},_applySelection:function(item,isSelected){if(this.selectedClass){this.toggleClass(this.selectedClass,isSelected,item)}if(this.selectedAttribute){this.toggleAttribute(this.selectedAttribute,isSelected,item)}this._selectionChange();this.fire("iron-"+(isSelected?"select":"deselect"),{item:item})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(node){return dom(node).observeNodes((function(mutation){this._updateItems();this._updateSelected();this.fire("iron-items-changed",mutation,{bubbles:false,cancelable:false})}))},_activateHandler:function(e){var t=e.target;var items=this.items;while(t&&t!=this){var i=items.indexOf(t);if(i>=0){var value=this._indexToValue(i);this._itemActivate(value,t);return}t=t.parentNode}},_itemActivate:function(value,item){if(!this.fire("iron-activate",{selected:value,item:item},{cancelable:true}).defaultPrevented){this.select(value)}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronMultiSelectableBehaviorImpl={properties:{multi:{type:Boolean,value:false,observer:"multiChanged"},selectedValues:{type:Array,notify:true,value:function(){return[]}},selectedItems:{type:Array,readOnly:true,notify:true,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(value){if(this.multi){this._toggleSelected(value)}else{this.selected=value}},multiChanged:function(multi){this._selection.multi=multi;this._updateSelected()},get _shouldUpdateSelection(){return this.selected!=null||this.selectedValues!=null&&this.selectedValues.length},_updateAttrForSelected:function(){if(!this.multi){IronSelectableBehavior._updateAttrForSelected.apply(this)}else if(this.selectedItems&&this.selectedItems.length>0){this.selectedValues=this.selectedItems.map((function(selectedItem){return this._indexToValue(this.indexOf(selectedItem))}),this).filter((function(unfilteredValue){return unfilteredValue!=null}),this)}},_updateSelected:function(){if(this.multi){this._selectMulti(this.selectedValues)}else{this._selectSelected(this.selected)}},_selectMulti:function(values){values=values||[];var selectedItems=(this._valuesToItems(values)||[]).filter((function(item){return item!==null&&item!==undefined}));this._selection.clear(selectedItems);for(var i=0;i<selectedItems.length;i++){this._selection.setItemSelected(selectedItems[i],true)}if(this.fallbackSelection&&!this._selection.get().length){var fallback=this._valueToItem(this.fallbackSelection);if(fallback){this.select(this.fallbackSelection)}}},_selectionChange:function(){var s=this._selection.get();if(this.multi){this._setSelectedItems(s);this._setSelectedItem(s.length?s[0]:null)}else{if(s!==null&&s!==undefined){this._setSelectedItems([s]);this._setSelectedItem(s)}else{this._setSelectedItems([]);this._setSelectedItem(null)}}},_toggleSelected:function(value){var i=this.selectedValues.indexOf(value);var unselected=i<0;if(unselected){this.push("selectedValues",value)}else{this.splice("selectedValues",i,1)}},_valuesToItems:function(values){return values==null?null:values.map((function(value){return this._valueToItem(value)}),this)}};const IronMultiSelectableBehavior=[IronSelectableBehavior,IronMultiSelectableBehaviorImpl];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-selector",behaviors:[IronMultiSelectableBehavior]});// Copyright 2020 The Chromium Authors. All rights reserved.
function skColorToRgba(skColor){const a=skColor.value>>24&255;const r=skColor.value>>16&255;const g=skColor.value>>8&255;const b=skColor.value&255;return`rgba(${r}, ${g}, ${b}, ${(a/255).toFixed(2)})`}function hexColorToSkColor(hexColor){if(!/^#[0-9a-f]{6}$/.test(hexColor)){return{value:0}}const r=parseInt(hexColor.substring(1,3),16);const g=parseInt(hexColor.substring(3,5),16);const b=parseInt(hexColor.substring(5,7),16);return{value:4278190080+(r<<16)+(g<<8)+b}}// Copyright (c) 2012 The Chromium Authors. All rights reserved.
function getDeepActiveElement(){let a=document.activeElement;while(a&&a.shadowRoot&&a.shadowRoot.activeElement){a=a.shadowRoot.activeElement}return a}function isRTL(){return document.documentElement.dir==="rtl"}function hasKeyModifiers(e){return!!(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)}// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CLASS_NAME="focus-outline-visible";const docsToManager=new Map;class FocusOutlineManager{constructor(doc){this.focusByKeyboard_=true;this.classList_=doc.documentElement.classList;const onEvent=function(focusByKeyboard,e){if(this.focusByKeyboard_===focusByKeyboard){return}this.focusByKeyboard_=focusByKeyboard;this.updateVisibility()};doc.addEventListener("keydown",onEvent.bind(this,true),true);doc.addEventListener("mousedown",onEvent.bind(this,false),true);this.updateVisibility()}updateVisibility(){this.visible=this.focusByKeyboard_}set visible(visible){this.classList_.toggle(CLASS_NAME,visible)}get visible(){return this.classList_.contains(CLASS_NAME)}static forDocument(doc){let manager=docsToManager.get(doc);if(!manager){manager=new FocusOutlineManager(doc);docsToManager.set(doc,manager)}return manager}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var KEY_IDENTIFIER={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"};var KEY_CODE={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"};var MODIFIER_KEYS={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"};var KEY_CHAR=/[a-z0-9*]/;var IDENT_CHAR=/U\+/;var ARROW_KEY=/^arrow/;var SPACE_KEY=/^space(bar)?/;var ESC_KEY=/^escape$/;function transformKey(key,noSpecialChars){var validKey="";if(key){var lKey=key.toLowerCase();if(lKey===" "||SPACE_KEY.test(lKey)){validKey="space"}else if(ESC_KEY.test(lKey)){validKey="esc"}else if(lKey.length==1){if(!noSpecialChars||KEY_CHAR.test(lKey)){validKey=lKey}}else if(ARROW_KEY.test(lKey)){validKey=lKey.replace("arrow","")}else if(lKey=="multiply"){validKey="*"}else{validKey=lKey}}return validKey}function transformKeyIdentifier(keyIdent){var validKey="";if(keyIdent){if(keyIdent in KEY_IDENTIFIER){validKey=KEY_IDENTIFIER[keyIdent]}else if(IDENT_CHAR.test(keyIdent)){keyIdent=parseInt(keyIdent.replace("U+","0x"),16);validKey=String.fromCharCode(keyIdent).toLowerCase()}else{validKey=keyIdent.toLowerCase()}}return validKey}function transformKeyCode(keyCode){var validKey="";if(Number(keyCode)){if(keyCode>=65&&keyCode<=90){validKey=String.fromCharCode(32+keyCode)}else if(keyCode>=112&&keyCode<=123){validKey="f"+(keyCode-112+1)}else if(keyCode>=48&&keyCode<=57){validKey=String(keyCode-48)}else if(keyCode>=96&&keyCode<=105){validKey=String(keyCode-96)}else{validKey=KEY_CODE[keyCode]}}return validKey}function normalizedKeyForEvent(keyEvent,noSpecialChars){if(keyEvent.key){return transformKey(keyEvent.key,noSpecialChars)}if(keyEvent.detail&&keyEvent.detail.key){return transformKey(keyEvent.detail.key,noSpecialChars)}return transformKeyIdentifier(keyEvent.keyIdentifier)||transformKeyCode(keyEvent.keyCode)||""}function keyComboMatchesEvent(keyCombo,event){var keyEvent=normalizedKeyForEvent(event,keyCombo.hasModifiers);return keyEvent===keyCombo.key&&(!keyCombo.hasModifiers||!!event.shiftKey===!!keyCombo.shiftKey&&!!event.ctrlKey===!!keyCombo.ctrlKey&&!!event.altKey===!!keyCombo.altKey&&!!event.metaKey===!!keyCombo.metaKey)}function parseKeyComboString(keyComboString){if(keyComboString.length===1){return{combo:keyComboString,key:keyComboString,event:"keydown"}}return keyComboString.split("+").reduce((function(parsedKeyCombo,keyComboPart){var eventParts=keyComboPart.split(":");var keyName=eventParts[0];var event=eventParts[1];if(keyName in MODIFIER_KEYS){parsedKeyCombo[MODIFIER_KEYS[keyName]]=true;parsedKeyCombo.hasModifiers=true}else{parsedKeyCombo.key=keyName;parsedKeyCombo.event=event||"keydown"}return parsedKeyCombo}),{combo:keyComboString.split(":").shift()})}function parseEventString(eventString){return eventString.trim().split(" ").map((function(keyComboString){return parseKeyComboString(keyComboString)}))}const IronA11yKeysBehavior={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:false},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(eventString,handlerName){this._imperativeKeyBindings[eventString]=handlerName;this._prepKeyBindings();this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={};this._prepKeyBindings();this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(event,eventString){var keyCombos=parseEventString(eventString);for(var i=0;i<keyCombos.length;++i){if(keyComboMatchesEvent(keyCombos[i],event)){return true}}return false},_collectKeyBindings:function(){var keyBindings=this.behaviors.map((function(behavior){return behavior.keyBindings}));if(keyBindings.indexOf(this.keyBindings)===-1){keyBindings.push(this.keyBindings)}return keyBindings},_prepKeyBindings:function(){this._keyBindings={};this._collectKeyBindings().forEach((function(keyBindings){for(var eventString in keyBindings){this._addKeyBinding(eventString,keyBindings[eventString])}}),this);for(var eventString in this._imperativeKeyBindings){this._addKeyBinding(eventString,this._imperativeKeyBindings[eventString])}for(var eventName in this._keyBindings){this._keyBindings[eventName].sort((function(kb1,kb2){var b1=kb1[0].hasModifiers;var b2=kb2[0].hasModifiers;return b1===b2?0:b1?-1:1}))}},_addKeyBinding:function(eventString,handlerName){parseEventString(eventString).forEach((function(keyCombo){this._keyBindings[keyCombo.event]=this._keyBindings[keyCombo.event]||[];this._keyBindings[keyCombo.event].push([keyCombo,handlerName])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners();if(this.isAttached){this._listenKeyEventListeners()}},_listenKeyEventListeners:function(){if(!this.keyEventTarget){return}Object.keys(this._keyBindings).forEach((function(eventName){var keyBindings=this._keyBindings[eventName];var boundKeyHandler=this._onKeyBindingEvent.bind(this,keyBindings);this._boundKeyHandlers.push([this.keyEventTarget,eventName,boundKeyHandler]);this.keyEventTarget.addEventListener(eventName,boundKeyHandler)}),this)},_unlistenKeyEventListeners:function(){var keyHandlerTuple;var keyEventTarget;var eventName;var boundKeyHandler;while(this._boundKeyHandlers.length){keyHandlerTuple=this._boundKeyHandlers.pop();keyEventTarget=keyHandlerTuple[0];eventName=keyHandlerTuple[1];boundKeyHandler=keyHandlerTuple[2];keyEventTarget.removeEventListener(eventName,boundKeyHandler)}},_onKeyBindingEvent:function(keyBindings,event){if(this.stopKeyboardEventPropagation){event.stopPropagation()}if(event.defaultPrevented){return}for(var i=0;i<keyBindings.length;i++){var keyCombo=keyBindings[i][0];var handlerName=keyBindings[i][1];if(keyComboMatchesEvent(keyCombo,event)){this._triggerKeyHandler(keyCombo,handlerName,event);if(event.defaultPrevented){return}}}},_triggerKeyHandler:function(keyCombo,handlerName,keyboardEvent){var detail=Object.create(keyCombo);detail.keyboardEvent=keyboardEvent;var event=new CustomEvent(keyCombo.event,{detail:detail,cancelable:true});this[handlerName].call(this,event);if(event.defaultPrevented){keyboardEvent.preventDefault()}}};var MAX_RADIUS_PX=300;var MIN_DURATION_MS=800;var distance=function(x1,y1,x2,y2){var xDelta=x1-x2;var yDelta=y1-y2;return Math.sqrt(xDelta*xDelta+yDelta*yDelta)};Polymer({_template:html`<!--css-build:shadow--><style scope="paper-ripple">:host {
  bottom: 0;
        display: block;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        
        transform: translate3d(0, 0, 0);
}

.ripple {
  background-color: currentcolor;
        left: 0;
        opacity: var(--paper-ripple-opacity, 0.25);
        pointer-events: none;
        position: absolute;
        will-change: height, transform, width;
}

.ripple, :host(.circle) {
  border-radius: 50%;
}

</style>
`,is:"paper-ripple",behaviors:[IronA11yKeysBehavior],properties:{center:{type:Boolean,value:false},holdDown:{type:Boolean,value:false,observer:"_holdDownChanged"},recenters:{type:Boolean,value:false},noink:{type:Boolean,value:false}},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},created:function(){this.ripples=[]},attached:function(){this.keyEventTarget=this.parentNode.nodeType==11?dom(this).getOwnerRoot().host:this.parentNode;this.keyEventTarget=this.keyEventTarget;this.listen(this.keyEventTarget,"up","uiUpAction");this.listen(this.keyEventTarget,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction");this.unlisten(this.keyEventTarget,"down","uiDownAction");this.keyEventTarget=null},simulatedRipple:function(){this.downAction();this.async(function(){this.upAction()}.bind(this),1)},uiDownAction:function(e){if(!this.noink)this.downAction(e)},downAction:function(e){if(this.ripples.length&&this.holdDown)return;this.debounce("show ripple",(function(){this.__showRipple(e)}),1)},clear:function(){this.__hideRipple();this.holdDown=false},showAndHoldDown:function(){this.ripples.forEach((ripple=>{ripple.remove()}));this.ripples=[];this.holdDown=true},__showRipple:function(e){var rect=this.getBoundingClientRect();var roundedCenterX=function(){return Math.round(rect.width/2)};var roundedCenterY=function(){return Math.round(rect.height/2)};var centered=!e||this.center;if(centered){var x=roundedCenterX();var y=roundedCenterY()}else{var sourceEvent=e.detail.sourceEvent;var x=Math.round(sourceEvent.clientX-rect.left);var y=Math.round(sourceEvent.clientY-rect.top)}var corners=[{x:0,y:0},{x:rect.width,y:0},{x:0,y:rect.height},{x:rect.width,y:rect.height}];var cornerDistances=corners.map((function(corner){return Math.round(distance(x,y,corner.x,corner.y))}));var radius=Math.min(MAX_RADIUS_PX,Math.max.apply(Math,cornerDistances));var startTranslate=x-radius+"px, "+(y-radius)+"px";if(this.recenters&&!centered){var endTranslate=roundedCenterX()-radius+"px, "+(roundedCenterY()-radius)+"px"}else{var endTranslate=startTranslate}var ripple=document.createElement("div");ripple.classList.add("ripple");ripple.style.height=ripple.style.width=2*radius+"px";this.ripples.push(ripple);this.shadowRoot.appendChild(ripple);ripple.animate({transform:["translate("+startTranslate+") scale(0)","translate("+endTranslate+") scale(1)"]},{duration:Math.max(MIN_DURATION_MS,Math.log(radius)*radius)||0,easing:"cubic-bezier(.2, .9, .1, .9)",fill:"forwards"})},uiUpAction:function(e){if(!this.noink)this.upAction()},upAction:function(e){if(!this.holdDown)this.debounce("hide ripple",(function(){this.__hideRipple()}),1)},__hideRipple:function(){Promise.all(this.ripples.map((function(ripple){return new Promise((function(resolve){var removeRipple=function(){ripple.remove();resolve()};var opacity=getComputedStyle(ripple).opacity;if(!opacity.length){removeRipple()}else{var animation=ripple.animate({opacity:[opacity,0]},{duration:150,fill:"forwards"});animation.addEventListener("finish",removeRipple);animation.addEventListener("cancel",removeRipple)}}))}))).then(function(){this.fire("transitionend")}.bind(this));this.ripples=[]},_onEnterKeydown:function(){this.uiDownAction();this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(newHoldDown,oldHoldDown){if(oldHoldDown===undefined)return;if(newHoldDown)this.downAction();else this.upAction()}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronButtonStateImpl={properties:{pressed:{type:Boolean,readOnly:true,value:false,reflectToAttribute:true,observer:"_pressedChanged"},toggles:{type:Boolean,value:false,reflectToAttribute:true},active:{type:Boolean,value:false,notify:true,reflectToAttribute:true},pointerDown:{type:Boolean,readOnly:true,value:false},receivedFocusFromKeyboard:{type:Boolean,readOnly:true},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){if(this.toggles){this._userActivate(!this.active)}else{this.active=false}},_focusChanged:function(focused){this._detectKeyboardFocus(focused);if(!focused){this._setPressed(false)}},_detectKeyboardFocus:function(focused){this._setReceivedFocusFromKeyboard(!this.pointerDown&&focused)},_userActivate:function(active){if(this.active!==active){this.active=active;this.fire("change")}},_downHandler:function(event){this._setPointerDown(true);this._setPressed(true);this._setReceivedFocusFromKeyboard(false)},_upHandler:function(){this._setPointerDown(false);this._setPressed(false)},_spaceKeyDownHandler:function(event){var keyboardEvent=event.detail.keyboardEvent;var target=dom(keyboardEvent).localTarget;if(this.isLightDescendant(target))return;keyboardEvent.preventDefault();keyboardEvent.stopImmediatePropagation();this._setPressed(true)},_spaceKeyUpHandler:function(event){var keyboardEvent=event.detail.keyboardEvent;var target=dom(keyboardEvent).localTarget;if(this.isLightDescendant(target))return;if(this.pressed){this._asyncClick()}this._setPressed(false)},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(pressed){this._changedButtonState()},_ariaActiveAttributeChanged:function(value,oldValue){if(oldValue&&oldValue!=value&&this.hasAttribute(oldValue)){this.removeAttribute(oldValue)}},_activeChanged:function(active,ariaActiveAttribute){if(this.toggles){this.setAttribute(this.ariaActiveAttribute,active?"true":"false")}else{this.removeAttribute(this.ariaActiveAttribute)}this._changedButtonState()},_controlStateChanged:function(){if(this.disabled){this._setPressed(false)}else{this._changedButtonState()}},_changedButtonState:function(){if(this._buttonStateChanged){this._buttonStateChanged()}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const PaperRippleBehavior={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){if(this.focused){this.ensureRipple()}},_downHandler:function(event){IronButtonStateImpl._downHandler.call(this,event);if(this.pressed){this.ensureRipple(event)}},ensureRipple:function(optTriggeringEvent){if(!this.hasRipple()){this._ripple=this._createRipple();this._ripple.noink=this.noink;var rippleContainer=this._rippleContainer||this.root;if(rippleContainer){dom(rippleContainer).appendChild(this._ripple)}if(optTriggeringEvent){var domContainer=dom(this._rippleContainer||this);var target=dom(optTriggeringEvent).rootTarget;if(domContainer.deepContains(target)){this._ripple.uiDownAction(optTriggeringEvent)}}}},getRipple:function(){this.ensureRipple();return this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){var element=document.createElement("paper-ripple");return element},_noinkChanged:function(noink){if(this.hasRipple()){this._ripple.noink=noink}}};// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-button">:host {
  --active-shadow-rgb: var(--google-grey-800-rgb);
        --active-shadow-action-rgb: var(--google-blue-500-rgb);
        --bg-action: var(--google-blue-600);
        --border-color: var(--google-grey-300);
        --disabled-bg-action: var(--google-grey-100);
        --disabled-bg: white;
        --disabled-border-color: var(--google-grey-100);
        --disabled-text-color: var(--google-grey-600);
        --focus-shadow-color: rgba(var(--google-blue-600-rgb), .4);
        --hover-bg-action: rgba(var(--google-blue-600-rgb), .9);
        --hover-bg-color: rgba(var(--google-blue-500-rgb), .04);
        --hover-border-color: var(--google-blue-100);
        --hover-shadow-action-rgb: var(--google-blue-500-rgb);
        --ink-color-action: white;
        
        --ink-color: var(--google-blue-600);
        --ripple-opacity-action: .32;
        --ripple-opacity: .1;
        --text-color-action: white;
        --text-color: var(--google-blue-600);
}

@media (prefers-color-scheme: dark) {
:host {
  --active-bg: black linear-gradient(rgba(255, 255, 255, .06),
                                             rgba(255, 255, 255, .06));
          --active-shadow-rgb: 0, 0, 0;
          --active-shadow-action-rgb: var(--google-blue-500-rgb);
          --bg-action: var(--google-blue-300);
          --border-color: var(--google-grey-700);
          --disabled-bg-action: var(--google-grey-800);
          
          --disabled-bg: transparent;
          --disabled-border-color: var(--google-grey-800);
          --disabled-text-color: var(--google-grey-500);
          --focus-shadow-color: rgba(var(--google-blue-300-rgb), .5);
          --hover-bg-action: var(--bg-action)
              linear-gradient(rgba(0, 0, 0, .08), rgba(0, 0, 0, .08));
          --hover-bg-color: rgba(var(--google-blue-300-rgb), .08);
          --ink-color-action: black;
          --ink-color: var(--google-blue-300);
          --ripple-opacity-action: .16;
          --ripple-opacity: .16;
          --text-color-action: var(--google-grey-900);
          --text-color: var(--google-blue-300);
}

}

:host {
  --paper-ripple-opacity: var(--ripple-opacity);
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--text-color);
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        font-weight: 500;
        height: var(--cr-button-height);
        justify-content: center;
        min-width: 5.14em;
        outline-width: 0;
        overflow: hidden;
        padding: 8px 16px;
        position: relative;
        user-select: none;
}

:host-context(.focus-outline-visible):host(:focus) {
  box-shadow: 0 0 0 2px var(--focus-shadow-color);
}

:host(:active) {
  background: var(--active-bg);
        box-shadow: var(--active-shadow,
            0 1px 2px 0 rgba(var(--active-shadow-rgb), .3),
            0 3px 6px 2px rgba(var(--active-shadow-rgb), .15));
}

:host(:hover) {
  background-color: var(--hover-bg-color);
}

@media (prefers-color-scheme: light) {
:host(:hover) {
  border-color: var(--hover-border-color);
}

}

:host(.action-button) {
  --ink-color: var(--ink-color-action);
        --paper-ripple-opacity: var(--ripple-opacity-action);
        background-color: var(--bg-action);
        border: none;
        color: var(--text-color-action);
}

:host(.action-button:active) {
  box-shadow: var(--active-shadow-action,
            0 1px 2px 0 rgba(var(--active-shadow-action-rgb), .3),
            0 3px 6px 2px rgba(var(--active-shadow-action-rgb), .15));
}

:host(.action-button:hover) {
  background: var(--hover-bg-action);
}

@media (prefers-color-scheme: light) {
:host(.action-button:not(:active):hover) {
  box-shadow:
              0 1px 2px 0 rgba(var(--hover-shadow-action-rgb), .3),
              0 1px 3px 1px rgba(var(--hover-shadow-action-rgb), .15);
}

}

:host([disabled]) {
  background-color: var(--disabled-bg);
        border-color: var(--disabled-border-color);
        color: var(--disabled-text-color);
        cursor: auto;
        pointer-events: none;
}

:host(.action-button[disabled]) {
  background-color: var(--disabled-bg-action);
        border-color: transparent;
}

:host(.cancel-button) {
  margin-inline-end: 8px;
}

:host(.action-button), :host(.cancel-button) {
  line-height: 154%;
}

paper-ripple {
  color: var(--ink-color);
        height: var(--paper-ripple-height);
        
        left: var(--paper-ripple-left, 0);
        top: var(--paper-ripple-top, 0);
        width: var(--paper-ripple-width);
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,is:"cr-button",behaviors:[PaperRippleBehavior],properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},customTabIndex:{type:Number,observer:"applyTabIndex_"},circleRipple:{type:Boolean,value:false}},hostAttributes:{"aria-disabled":"false",role:"button",tabindex:0},listeners:{blur:"onBlur_",click:"onClick_",keydown:"onKeyDown_",keyup:"onKeyUp_",pointerdown:"onPointerDown_"},spaceKeyDown_:false,timeoutIds_:null,ready(){FocusOutlineManager.forDocument(document);this.timeoutIds_=new Set},detached(){this.timeoutIds_.forEach(clearTimeout);this.timeoutIds_.clear()},setTimeout_(fn,delay){if(!this.isConnected){return}const id=setTimeout((()=>{this.timeoutIds_.delete(id);fn()}),delay);this.timeoutIds_.add(id)},disabledChanged_(newValue,oldValue){if(!newValue&&oldValue===undefined){return}if(this.disabled){this.blur()}this.setAttribute("aria-disabled",Boolean(this.disabled));this.applyTabIndex_()},applyTabIndex_(){let value=this.customTabIndex;if(value===undefined){value=this.disabled?-1:0}this.setAttribute("tabindex",value)},onBlur_(){this.spaceKeyDown_=false},onClick_(e){if(this.disabled){e.stopImmediatePropagation()}},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){this.lastKeyDownKey_=null;return}this.getRipple().uiDownAction();if(e.key==="Enter"){this.click();this.setTimeout_((()=>this.getRipple().uiUpAction()),100)}else if(e.key===" "){this.spaceKeyDown_=true}},onKeyUp_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(this.spaceKeyDown_&&e.key===" "){this.spaceKeyDown_=false;this.click();this.getRipple().uiUpAction()}},onPointerDown_(){this.ensureRipple()},_createRipple(){const ripple=PaperRippleBehavior._createRipple();if(this.circleRipple){ripple.setAttribute("center","");ripple.classList.add("circle")}return ripple}});// Copyright 2017 The Chromium Authors. All rights reserved.
const CrContainerShadowSide={TOP:"top",BOTTOM:"bottom"};const CrContainerShadowBehavior={intersectionObserver_:null,dropShadows_:null,intersectionProbes_:null,sides_:null,ready(){this.dropShadows_=new Map;this.intersectionProbes_=new Map},attached(){const hasBottomShadow=this.$.container.hasAttribute("show-bottom-shadow");this.sides_=hasBottomShadow?[CrContainerShadowSide.TOP,CrContainerShadowSide.BOTTOM]:[CrContainerShadowSide.TOP];this.sides_.forEach((side=>{const shadow=document.createElement("div");shadow.id=`cr-container-shadow-${side}`;shadow.classList.add("cr-container-shadow");this.dropShadows_.set(side,shadow);this.intersectionProbes_.set(side,document.createElement("div"))}));this.$.container.parentNode.insertBefore(this.dropShadows_.get(CrContainerShadowSide.TOP),this.$.container);this.$.container.prepend(this.intersectionProbes_.get(CrContainerShadowSide.TOP));if(hasBottomShadow){this.$.container.parentNode.insertBefore(this.dropShadows_.get(CrContainerShadowSide.BOTTOM),this.$.container.nextSibling);this.$.container.append(this.intersectionProbes_.get(CrContainerShadowSide.BOTTOM))}this.enableShadowBehavior(true)},detached(){this.enableShadowBehavior(false)},getIntersectionObserver_(){const callback=entries=>{for(const entry of entries){const target=entry.target;this.sides_.forEach((side=>{if(target===this.intersectionProbes_.get(side)){this.dropShadows_.get(side).classList.toggle("has-shadow",entry.intersectionRatio===0)}}))}};return new IntersectionObserver(callback,{root:this.$.container,threshold:0})},enableShadowBehavior(enable){if(enable===!!this.intersectionObserver_){return}if(!enable){this.intersectionObserver_.disconnect();this.intersectionObserver_=null;return}this.intersectionObserver_=this.getIntersectionObserver_();window.setTimeout((()=>{if(this.intersectionObserver_){this.intersectionProbes_.forEach((probe=>{this.intersectionObserver_.observe(probe)}))}}))},showDropShadows(){assert$1(!this.intersectionObserver_);assert$1(this.sides_);for(const side of this.sides_){this.dropShadows_.get(side).classList.toggle("has-shadow",true)}}};// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons" scope="cr-dialog">dialog {
  --scroll-border-color: var(--paper-grey-300);
        --scroll-border: 1px solid var(--scroll-border-color);
        border: 0;
        border-radius: 8px;
        bottom: 50%;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.12),
                    0 16px 16px rgba(0, 0, 0, 0.24);
        color: inherit;
        max-height: initial;
        max-width: initial;
        overflow-y: hidden;
        padding: 0;
        position: absolute;
        top: 50%;
        width: var(--cr-dialog-width, 512px);
}

@media (prefers-color-scheme: dark) {
dialog {
  --scroll-border-color: var(--google-grey-700);
          background-color: var(--google-grey-900);
          
          background-image: linear-gradient(rgba(255, 255, 255, .04),
                                            rgba(255, 255, 255, .04));
}

}

dialog[open] #content-wrapper {
  display: flex;
        flex-direction: column;
        max-height: 100vh;
        overflow: auto;
}

.top-container, :host ::slotted([slot=button-container]), :host ::slotted([slot=footer]) {
  flex-shrink: 0;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.6);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
}

:host ::slotted([slot=body]) {
  color: var(--cr-secondary-text-color);
        padding: 0 var(--cr-dialog-body-padding-horizontal, 20px);
}

:host ::slotted([slot=title]) {
  color: var(--cr-primary-text-color);
        flex: 1;
        font-family: var(--cr-dialog-font-family, inherit);
        font-size: var(--cr-dialog-title-font-size, calc(15 / 13 * 100%));
        line-height: 1;
        padding-bottom: var(--cr-dialog-title-slot-padding-bottom, 16px);
        padding-inline-end:  var(--cr-dialog-title-slot-padding-end, 20px);
        padding-inline-start: var(--cr-dialog-title-slot-padding-start, 20px);
        padding-top: var(--cr-dialog-title-slot-padding-top, 20px);
}

:host ::slotted([slot=button-container]) {
  display: flex;
        justify-content: flex-end;
        padding-bottom: var(--cr-dialog-button-container-padding-bottom, 16px);
        padding-inline-end: var(--cr-dialog-button-container-padding-horizontal, 16px);
        padding-inline-start: var(--cr-dialog-button-container-padding-horizontal, 16px);
        padding-top: 24px;
}

:host ::slotted([slot=footer]) {
  border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        border-top: 1px solid #dbdbdb;
        margin: 0;
        padding: 16px 20px;
}

@media (prefers-color-scheme: dark) {
:host ::slotted([slot=footer]) {
  border-top-color: var(--cr-separator-color);
}

}

.body-container {
  box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 1.375rem; 
        overflow: auto;
}

:host {
  --transparent-border: 1px solid transparent;
}

#cr-container-shadow-top {
  border-bottom: var(--cr-dialog-body-border-top,
            var(--transparent-border));
}

#cr-container-shadow-bottom {
  border-bottom: var(--cr-dialog-body-border-bottom,
            var(--transparent-border));
}

#cr-container-shadow-top.has-shadow, #cr-container-shadow-bottom.has-shadow {
  border-bottom: var(--scroll-border);
}

.top-container {
  align-items: flex-start;
        display: flex;
        min-height: var(--cr-dialog-top-container-min-height, 31px);
}

.title-container {
  display: flex;
        flex: 1;
        outline: none;
}

#close {
  align-self: flex-start;
        margin-inline-end: 4px;
        margin-top: 4px;
}

</style>
    <!-- TODO(crbug/1139958): Remove "not chromeos" block when chromeVox issue is fixed-->
    <!--Update both "not chromeos" and "chromeos" blocks if either changes-->

    <dialog id="dialog" on-close="onNativeDialogClose_" on-cancel="onNativeDialogCancel_" part="dialog" aria-labelledby="title">
    <!-- This wrapper is necessary, such that the "pulse" animation is not
        erroneously played when the user clicks on the outer-most scrollbar. -->
      <div id="content-wrapper" part="wrapper">
        <div class="top-container">
          <div id="title" class="title-container" tabindex="-1">
            <slot name="title"></slot>
          </div>
          <cr-icon-button id="close" class="icon-clear" hidden$="[[!showCloseButton]]" aria-label$="[[closeText]]" on-click="cancel" on-keypress="onCloseKeypress_">
          </cr-icon-button>
        </div>
        <slot name="header"></slot>
        <div class="body-container" id="container" show-bottom-shadow="" part="body-container">
          <slot name="body"></slot>
        </div>
        <slot name="button-container"></slot>
        <slot name="footer"></slot>
      </div>
    </dialog>


<!--_html_template_end_-->`,is:"cr-dialog",behaviors:[CrContainerShadowBehavior],properties:{open:{type:Boolean,value:false,reflectToAttribute:true},closeText:String,ignorePopstate:{type:Boolean,value:false},ignoreEnterKey:{type:Boolean,value:false},consumeKeydownEvent:{type:Boolean,value:false},noCancel:{type:Boolean,value:false},showCloseButton:{type:Boolean,value:false},showOnAttach:{type:Boolean,value:false}},listeners:{pointerdown:"onPointerdown_"},intersectionObserver_:null,mutationObserver_:null,boundKeydown_:null,ready(){window.addEventListener("popstate",function(){if(!this.ignorePopstate&&this.$.dialog.open){this.cancel()}}.bind(this));if(!this.ignoreEnterKey){this.addEventListener("keypress",this.onKeypress_.bind(this))}},attached(){const mutationObserverCallback=function(){if(this.$.dialog.open){this.enableShadowBehavior(true);this.addKeydownListener_()}else{this.enableShadowBehavior(false);this.removeKeydownListener_()}}.bind(this);this.mutationObserver_=new MutationObserver(mutationObserverCallback);this.mutationObserver_.observe(this.$.dialog,{attributes:true,attributeFilter:["open"]});mutationObserverCallback();if(this.showOnAttach){this.showModal()}},detached(){this.removeKeydownListener_();if(this.mutationObserver_){this.mutationObserver_.disconnect();this.mutationObserver_=null}},addKeydownListener_(){if(!this.consumeKeydownEvent){return}this.boundKeydown_=this.boundKeydown_||this.onKeydown_.bind(this);this.addEventListener("keydown",this.boundKeydown_);document.body.addEventListener("keydown",this.boundKeydown_)},removeKeydownListener_(){if(!this.boundKeydown_){return}this.removeEventListener("keydown",this.boundKeydown_);document.body.removeEventListener("keydown",this.boundKeydown_);this.boundKeydown_=null},showModal(){this.$.dialog.showModal();assert$1(this.$.dialog.open);this.open=true;this.fire("cr-dialog-open")},cancel(){this.fire("cancel");this.$.dialog.close();assert$1(!this.$.dialog.open);this.open=false},close(){this.$.dialog.close("success");assert$1(!this.$.dialog.open);this.open=false},setTitleAriaLabel(title){this.$.dialog.removeAttribute("aria-labelledby");this.$.dialog.setAttribute("aria-label",title)},onCloseKeypress_(e){e.stopPropagation()},onNativeDialogClose_(e){if(e.target!==this.getNative()){return}this.fire("close")},onNativeDialogCancel_(e){if(e.target!==this.getNative()){return}if(this.noCancel){e.preventDefault();return}this.open=false;this.fire("cancel")},getNative(){return this.$.dialog},onKeypress_(e){if(e.key!=="Enter"){return}const accept=e.target===this||e.composedPath().some((el=>el.tagName==="CR-INPUT"&&el.type!=="search"));if(!accept){return}const actionButton=this.querySelector(".action-button:not([disabled]):not([hidden])");if(actionButton){actionButton.click();e.preventDefault()}},onKeydown_(e){assert$1(this.consumeKeydownEvent);if(!this.getNative().open){return}if(this.ignoreEnterKey&&e.key==="Enter"){return}e.stopPropagation()},onPointerdown_(e){if(e.button!==0||e.composedPath()[0].tagName!=="DIALOG"){return}this.$.dialog.animate([{transform:"scale(1)",offset:0},{transform:"scale(1.02)",offset:.4},{transform:"scale(1.02)",offset:.6},{transform:"scale(1)",offset:1}],{duration:180,easing:"ease-in-out",iterations:1});e.preventDefault()},focus(){this.$$(".title-container").focus()}});const template=document.createElement("template");template.innerHTML=`<dom-module id="cr-input-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-input-style">:host {\n  --cr-input-background-color: var(--google-grey-100);\n        --cr-input-color: var(--cr-primary-text-color);\n        --cr-input-error-color: var(--google-red-600);\n        --cr-input-focus-color: var(--google-blue-600);\n        display: block;\n        \n        outline: none;\n}\n\n@media (prefers-color-scheme: dark) {\n:host {\n  --cr-input-background-color: rgba(0, 0, 0, .3);\n          --cr-input-error-color: var(--google-red-300);\n          --cr-input-focus-color: var(--google-blue-300);\n}\n\n}\n\n:host([focused_]:not([readonly]):not([invalid])) #label {\n  color: var(--cr-input-focus-color);\n}\n\n#input-container {\n  border-radius: var(--cr-input-border-radius, 4px);\n        overflow: hidden;\n        position: relative;\n        width: var(--cr-input-width, 100%);\n}\n\n#inner-input-container {\n  background-color: var(--cr-input-background-color);\n        box-sizing: border-box;\n        padding: 0;\n}\n\n#input {\n  -webkit-appearance: none;\n        \n        background-color: transparent;\n        border: none;\n        box-sizing: border-box;\n        caret-color: var(--cr-input-focus-color);\n        color: var(--cr-input-color);\n        font-family: inherit;\n        font-size: inherit;\n        font-weight: inherit;\n        line-height: inherit;\n        min-height: var(--cr-input-min-height, auto);\n        outline: none;\n\n        \n        padding-bottom: var(--cr-input-padding-bottom, 6px);\n        padding-inline-end: var(--cr-input-padding-end, 8px);\n        padding-inline-start: var(--cr-input-padding-start, 8px);\n        padding-top: var(--cr-input-padding-top, 6px);\n\n        text-align: inherit;\n        text-overflow: ellipsis;\n        width: 100%;\n}\n\n#underline {\n  border-bottom: 2px solid var(--cr-input-focus-color);\n        border-radius: var(--cr-input-underline-border-radius, 0);\n        bottom: 0;\n        box-sizing: border-box;\n        display: var(--cr-input-underline-display);\n        height: var(--cr-input-underline-height, 0);\n        left: 0;\n        margin: auto;\n        opacity: 0;\n        position: absolute;\n        right: 0;\n        transition: opacity 120ms ease-out, width 0s linear 180ms;\n        width: 0;\n}\n\n:host([invalid]) #underline, :host([force-underline]) #underline, :host([focused_]) #underline {\n  opacity: 1;\n        transition: opacity 120ms ease-in, width 180ms ease-out;\n        width: 100%;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template.content.cloneNode(true));// Copyright 2018 The Chromium Authors. All rights reserved.
const SUPPORTED_INPUT_TYPES=new Set(["number","password","search","text","url"]);Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-input-style cr-shared-style" scope="cr-input">:host([disabled]) :-webkit-any(#label, #error, #input-container) {
  opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

:host ::slotted(cr-button[slot=suffix]) {
  margin-inline-start: var(--cr-button-edge-spacing) !important;
}

:host([invalid]) #label {
  color: var(--cr-input-error-color);
}

#input {
  border-bottom: var(--cr-input-border-bottom, none);
        letter-spacing: var(--cr-input-letter-spacing);
}

#input::placeholder {
  color: var(--cr-input-placeholder-color, var(--cr-secondary-text-color));
        letter-spacing: var(--cr-input-placeholder-letter-spacing);
}

:host([invalid]) #input {
  caret-color: var(--cr-input-error-color);
}

:host([readonly]) #input {
  opacity: var(--cr-input-readonly-opacity, 0.6);
}

:host([invalid]) #underline {
  border-color: var(--cr-input-error-color);
}

#error {
  color: var(--cr-input-error-color);
        display: var(--cr-input-error-display, block);
        font-size: var(--cr-form-field-label-font-size);
        height: var(--cr-form-field-label-height);
        line-height: var(--cr-form-field-label-line-height);
        margin: 8px 0;
        visibility: hidden;
        white-space: var(--cr-input-error-white-space);
}

:host([invalid]) #error {
  visibility: visible;
}

#row-container, #inner-input-container {
  align-items: center;
        display: flex;
        
        justify-content: space-between;
        position: relative;
}

#input[type='search']::-webkit-search-cancel-button {
  display: none;
}

:host-context([dir=rtl]) #input[type=url] {
  text-align: right;
}

#input[type=url] {
  direction: ltr;
}

</style>
    <div id="label" class="cr-form-field-label" hidden="[[!label]]" aria-hidden="true">
      [[label]]
    </div>
    <div id="row-container" part="row-container">
      <div id="input-container">
        <div id="inner-input-container">
          <slot name="inline-prefix"></slot>
          <!-- Only attributes that are named inconsistently between html and js
              need to use attr$="", such as |readonly| vs .readOnly. -->
          <input id="input" disabled="[[disabled]]" autofocus="[[autofocus]]" value="{{value::input}}" tabindex$="[[inputTabindex]]" type="[[type]]" readonly$="[[readonly]]" maxlength$="[[maxlength]]" pattern$="[[pattern]]" required="[[required]]" minlength$="[[minlength]]" inputmode$="[[inputmode]]" aria-description$="[[ariaDescription]]" aria-label$="[[getAriaLabel_(ariaLabel, label, placeholder)]]" aria-invalid$="[[getAriaInvalid_(invalid)]]" max="[[max]]" min="[[min]]" on-focus="onInputFocus_" on-blur="onInputBlur_" on-change="onInputChange_" part="input" autocomplete="off">
          <slot name="inline-suffix"></slot>
        </div>
        <div id="underline"></div>
      </div>
      <slot name="suffix"></slot>
    </div>
    <div id="error" aria-live="assertive">[[displayErrorMessage_]]</div>
<!--_html_template_end_-->`,is:"cr-input",properties:{ariaDescription:{type:String},ariaLabel:{type:String,value:""},autofocus:{type:Boolean,value:false,reflectToAttribute:true},autoValidate:Boolean,disabled:{type:Boolean,value:false,reflectToAttribute:true},errorMessage:{type:String,value:"",observer:"onInvalidOrErrorMessageChanged_"},displayErrorMessage_:{type:String,value:""},focused_:{type:Boolean,value:false,reflectToAttribute:true},invalid:{type:Boolean,value:false,notify:true,reflectToAttribute:true,observer:"onInvalidOrErrorMessageChanged_"},max:{type:Number,reflectToAttribute:true},min:{type:Number,reflectToAttribute:true},maxlength:{type:Number,reflectToAttribute:true},minlength:{type:Number,reflectToAttribute:true},pattern:{type:String,reflectToAttribute:true},inputmode:String,label:{type:String,value:""},placeholder:{type:String,value:null,observer:"placeholderChanged_"},readonly:{type:Boolean,reflectToAttribute:true},required:{type:Boolean,reflectToAttribute:true},inputTabindex:{type:Number,value:0,observer:"onInputTabindexChanged_"},type:{type:String,value:"text",observer:"onTypeChanged_"},value:{type:String,value:"",notify:true,observer:"onValueChanged_"}},ready(){assert$1(!this.hasAttribute("tabindex"))},onInputTabindexChanged_(){assert$1(this.inputTabindex===0||this.inputTabindex===-1)},onTypeChanged_(){assert$1(SUPPORTED_INPUT_TYPES.has(this.type))},get inputElement(){return this.$.input},getAriaLabel_(ariaLabel,label,placeholder){return ariaLabel||label||placeholder},getAriaInvalid_(invalid){return invalid?"true":"false"},onInvalidOrErrorMessageChanged_(){this.displayErrorMessage_=this.invalid?this.errorMessage:"";const ERROR_ID="error";const errorElement=this.$$(`#${ERROR_ID}`);if(this.invalid){errorElement.setAttribute("role","alert");this.inputElement.setAttribute("aria-errormessage",ERROR_ID)}else{errorElement.removeAttribute("role");this.inputElement.removeAttribute("aria-errormessage")}},placeholderChanged_(){if(this.placeholder||this.placeholder===""){this.inputElement.setAttribute("placeholder",this.placeholder)}else{this.inputElement.removeAttribute("placeholder")}},focus(){this.focusInput()},focusInput(){if(this.shadowRoot.activeElement===this.inputElement){return false}this.inputElement.focus();return true},onValueChanged_(newValue,oldValue){if(!newValue&&!oldValue){return}if(this.autoValidate){this.validate()}},onInputChange_(e){this.fire("change",{sourceEvent:e})},onInputFocus_(){this.focused_=true},onInputBlur_(){this.focused_=false},select(start,end){this.inputElement.focus();if(start!==undefined&&end!==undefined){this.inputElement.setSelectionRange(start,end)}else{assert$1(start===undefined&&end===undefined);this.inputElement.select()}},validate(){this.invalid=!this.inputElement.checkValidity();return!this.invalid}});// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class EventTracker{constructor(){this.listeners_=[]}add(target,eventType,listener,capture=false){const h={target:target,eventType:eventType,listener:listener,capture:capture};this.listeners_.push(h);target.addEventListener(eventType,listener,capture)}remove(target,eventType){this.listeners_=this.listeners_.filter((listener=>{if(listener.target===target&&(!eventType||listener.eventType===eventType)){EventTracker.removeEventListener(listener);return false}return true}))}removeAll(){this.listeners_.forEach((listener=>EventTracker.removeEventListener(listener)));this.listeners_=[]}static removeEventListener(entry){entry.target.removeEventListener(entry.eventType,entry.listener,entry.capture)}}// Copyright 2021 The Chromium Authors. All rights reserved.
let instance=null;class NewTabPageProxy{constructor(handler,callbackRouter){this.handler=handler;this.callbackRouter=callbackRouter}static getInstance(){if(!instance){const handler=new PageHandlerRemote;const callbackRouter=new PageCallbackRouter;PageHandlerFactory.getRemote().createPageHandler(callbackRouter.$.bindNewPipeAndPassRemote(),handler.$.bindNewPipeAndPassReceiver());instance=new NewTabPageProxy(handler,callbackRouter)}return instance}static setInstance(handler,callbackRouter){instance=new NewTabPageProxy(handler,callbackRouter)}}// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var CustomizeDialogPage;(function(CustomizeDialogPage){CustomizeDialogPage["BACKGROUNDS"]="backgrounds";CustomizeDialogPage["SHORTCUTS"]="shortcuts";CustomizeDialogPage["MODULES"]="modules";CustomizeDialogPage["THEMES"]="themes"})(CustomizeDialogPage||(CustomizeDialogPage={}));// Copyright 2021 The Chromium Authors. All rights reserved.
function recordDuration(metricName,durationMs){chrome.metricsPrivate.recordValue({metricName:metricName,type:chrome.metricsPrivate.MetricTypeType.HISTOGRAM_LOG,min:1,max:6e4,buckets:100},Math.floor(durationMs))}function recordLoadDuration(metricName,msSinceEpoch){recordDuration(metricName,msSinceEpoch-loadTimeData.getValue("navigationStartTime"))}function recordPerdecage(metricName,value){chrome.metricsPrivate.recordValue({metricName:metricName,type:chrome.metricsPrivate.MetricTypeType.HISTOGRAM_LINEAR,min:1,max:11,buckets:12},value)}function recordOccurence(metricName){chrome.metricsPrivate.recordValue({metricName:metricName,type:chrome.metricsPrivate.MetricTypeType.HISTOGRAM_LINEAR,min:1,max:1,buckets:1},1)}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var ORPHANS=new Set;const IronResizableBehavior={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:false}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[];this._boundNotifyResize=this.notifyResize.bind(this);this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){if(this._parentResizable){this._parentResizable.stopResizeNotificationsFor(this)}else{ORPHANS.delete(this);window.removeEventListener("resize",this._boundNotifyResize)}this._parentResizable=null},notifyResize:function(){if(!this.isAttached){return}this._interestedResizables.forEach((function(resizable){if(this.resizerShouldNotify(resizable)){this._notifyDescendant(resizable)}}),this);this._fireResize()},assignParentResizable:function(parentResizable){if(this._parentResizable){this._parentResizable.stopResizeNotificationsFor(this)}this._parentResizable=parentResizable;if(parentResizable&&parentResizable._interestedResizables.indexOf(this)===-1){parentResizable._interestedResizables.push(this);parentResizable._subscribeIronResize(this)}},stopResizeNotificationsFor:function(target){var index=this._interestedResizables.indexOf(target);if(index>-1){this._interestedResizables.splice(index,1);this._unsubscribeIronResize(target)}},_subscribeIronResize:function(target){target.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(target){target.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(element){return true},_onDescendantIronResize:function(event){if(this._notifyingDescendant){event.stopPropagation();return}if(!useShadow){this._fireResize()}},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:false})},_onIronRequestResizeNotifications:function(event){var target=dom(event).rootTarget;if(target===this){return}target.assignParentResizable(this);this._notifyDescendant(target);event.stopPropagation()},_parentResizableChanged:function(parentResizable){if(parentResizable){window.removeEventListener("resize",this._boundNotifyResize)}},_notifyDescendant:function(descendant){if(!this.isAttached){return}this._notifyingDescendant=true;descendant.notifyResize();this._notifyingDescendant=false},_requestResizeNotifications:function(){if(!this.isAttached){return}if(document.readyState==="loading"){var _requestResizeNotifications=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function readystatechanged(){document.removeEventListener("readystatechange",readystatechanged);_requestResizeNotifications()}))}else{this._findParent();if(!this._parentResizable){ORPHANS.forEach((function(orphan){if(orphan!==this){orphan._findParent()}}),this);window.addEventListener("resize",this._boundNotifyResize);this.notifyResize()}else{this._parentResizable._interestedResizables.forEach((function(resizable){if(resizable!==this){resizable._findParent()}}),this)}}},_findParent:function(){this.assignParentResizable(null);this.fire("iron-request-resize-notifications",null,{node:this,bubbles:true,cancelable:true});if(!this._parentResizable){ORPHANS.add(this)}else{ORPHANS.delete(this)}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="iron-pages">:host {
  display: block;
}

:host > ::slotted(:not(slot):not(.iron-selected)) {
  display: none !important;
}

</style>

    <slot></slot>
`,is:"iron-pages",behaviors:[IronResizableBehavior,IronSelectableBehavior],properties:{activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(selected,old){this.async(this.notifyResize)}});function getTemplate(){return html`<!--_html_template_start_--><style include="cr-icons">
  :host {
    --receiving-audio-color: var(--google-red-500);
    --speak-shown-duration: 2s;
  }

  .display-stack {
    display: grid;
  }

  .display-stack > * {
    grid-column-start: 1;
    grid-row-start: 1;
  }

  #dialog {
    align-items: center;
    background-color: var(--ntp-background-override-color);
    border: none;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    margin: 0;
    max-height: initial;
    max-width: initial;
    padding: 0;
    top: 0;
    width: 100%;
  }

  #closeButton {
    --cr-icon-button-fill-color: var(--cr-secondary-text-color);
    margin: 0;
    position: absolute;
    top: 16px;
  }

  :host-context([dir='ltr']) #closeButton {
    right: 16px;
  }

  :host-context([dir='rtl']) #closeButton {
    left: 16px;
  }

  #content {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 660px;
  }

  #texts {
    color: var(--cr-secondary-text-color);
    flex-grow: 1;
    font-size: 32px;
    text-align: start;
  }

  *[text] {
    transition-delay: 200ms;
    transition-duration: 500ms;
    transition-property: opacity, padding-inline-start;
    transition-timing-function: ease-out;
    visibility: hidden;
    width: 100%;
  }

  *[text='waiting'],
  *[text='speak'] {
    opacity: 0;
    /* Hiding overflow to prevent jitter when the content area is narrow. */
    overflow-x: hidden;
    padding-inline-start: 50px;
  }

  *[text][visible] {
    opacity: 1;
    padding-inline-start: 0;
    visibility: visible;
  }

  *[text='speak'][visible] #speak {
    opacity: 0;
    transition: opacity 0ms var(--speak-shown-duration);
  }

  *[text='speak'] #listening {
    opacity: 0;
  }

  *[text='speak'][visible] #listening {
    opacity: 1;
    transition: opacity 750ms ease-out var(--speak-shown-duration);
  }

  #finalResult {
    color: var(--cr-primary-text-color);
  }

  #errors,
  #errorLinks {
    display: inline;
  }

  #errorLinks a {
    color: var(--cr-link-color);
    font-size: 18px;
    font-weight: 500;
    margin-inline-start: 0.25em;
    text-decoration: none;
  }

  #micContainer {
    --mic-button-size: 165px;
    --mic-container-size: 300px;
    align-items: center;
    flex-shrink: 0;
    height: var(--mic-container-size);
    justify-items: center;
    width: var(--mic-container-size);
  }

  #micVolume {
    --mic-volume-size: calc(var(--mic-button-size) +
        var(--mic-volume-level) * (var(--mic-container-size) -
            var(--mic-button-size)));
    align-items: center;
    background-color: var(--ntp-border-color);
    border-radius: 50%;
    display: flex;
    height: var(--mic-volume-size);
    justify-content: center;
    transition-duration: var(--mic-volume-duration);
    transition-property: height, width;
    transition-timing-function: ease-in-out;
    width: var(--mic-volume-size);
  }

  #micVolumeCutout {
    background-color: var(--ntp-background-override-color);
    border-radius: 50%;
    height: var(--mic-button-size);
    width: var(--mic-button-size);
  }

  #micButton {
    border-radius: 50%;
    height: var(--mic-button-size);
    transition: background-color 200ms ease-in-out;
    width: var(--mic-button-size);
  }

  .receiving #micButton {
    background-color: var(--receiving-audio-color);
    border-color: var(--receiving-audio-color);
  }

  #micIcon {
    -webkit-mask-image: url(icons/mic.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--ntp-border-color);
    height: 80px;
    transition: background-color 200ms ease-in-out;
    width: 80px;
  }

  .listening #micIcon {
    background-color: var(--receiving-audio-color);
  }

  .receiving #micIcon {
    background-color: white;
  }
</style>
<dialog id="dialog" on-close="onOverlayClose_" on-click="onOverlayClick_" on-keydown="onOverlayKeydown_">
  <div id="content" tabindex="-1">
    <iron-selector id="texts" selected="[[getText_(state_)]]" attr-for-selected="text" fallback-selection="none" aria-live="polite" selected-attribute="visible" class="display-stack">
      <div text="none"></div>
      <div text="waiting">Waiting…</div>
      <div text="speak" class="display-stack">
        <div id="speak">Speak now</div>
        <div id="listening">Listening…</div>
      </div>
      <div text="result" aria-hidden="true">
        <span id="finalResult">[[finalResult_]]</span>
        <span>[[interimResult_]]</span>
      </div>
      <div text="error">
        <iron-pages id="errors" selected="[[getErrorText_(error_)]]" attr-for-selected="error" fallback-selection="other">
          <span error="no-speech">Please check your microphone and audio levels.</span>
          <span error="audio-capture">Please check your microphone.</span>
          <span error="network">No Internet connection.</span>
          <span error="not-allowed">Voice search has been turned off.</span>
          <span error="language-not-supported">Voice search in your language is not available.</span>
          <span error="no-match">Didn&#39;t get that.</span>
          <span error="other">Unknown error.</span>
        </iron-pages>
        <iron-pages id="errorLinks" selected="[[getErrorLink_(error_)]]" attr-for-selected="link" fallback-selection="none">
          <span link="none"></span>
          <a link="learn-more" target="_blank" href="[[helpUrl_]]" on-click="onLearnMoreClick_" on-keydown="onLinkKeydown_"><!--
            -->Learn more
          </a>
          <a link="details" target="_blank" href="[[helpUrl_]]" on-keydown="onLinkKeydown_"><!--
            -->Details
          </a>
          <a link="try-again" id="retryLink" href="#" on-click="onTryAgainClick_" on-keydown="onLinkKeydown_"><!--
            -->Try again
          </a>
        </iron-pages>
      </div>
    </iron-selector>
    <div id="micContainer" class$="[[getMicClass_(state_)]] display-stack">
      <div id="micVolume" style="--mic-volume-level: [[micVolumeLevel_]];
                --mic-volume-duration: [[micVolumeDuration_]]ms;">
        <div id="micVolumeCutout">
        </div>
      </div>
      <cr-button id="micButton" on-click="onMicClick_">
        <div id="micIcon"></div>
      </cr-button>
    </div>
  </div>
  <cr-icon-button id="closeButton" class="icon-clear" title="Close">
  </cr-icon-button>
</dialog>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
const RECOGNITION_CONFIDENCE_THRESHOLD=.5;const QUERY_LENGTH_LIMIT=120;const IDLE_TIMEOUT_MS=8e3;const ERROR_TIMEOUT_SHORT_MS=9e3;const ERROR_TIMEOUT_LONG_MS=24e3;const VOLUME_ANIMATION_DURATION_MIN_MS=170;const VOLUME_ANIMATION_DURATION_RANGE_MS=10;var State;(function(State){State[State["UNINITIALIZED"]=-1]="UNINITIALIZED";State[State["STARTED"]=0]="STARTED";State[State["AUDIO_RECEIVED"]=1]="AUDIO_RECEIVED";State[State["SPEECH_RECEIVED"]=2]="SPEECH_RECEIVED";State[State["RESULT_RECEIVED"]=3]="RESULT_RECEIVED";State[State["ERROR_RECEIVED"]=4]="ERROR_RECEIVED";State[State["RESULT_FINAL"]=5]="RESULT_FINAL"})(State||(State={}));var Action;(function(Action){Action[Action["kActivateSearchBox"]=0]="kActivateSearchBox";Action[Action["kActivateKeyboard"]=1]="kActivateKeyboard";Action[Action["kCloseOverlay"]=2]="kCloseOverlay";Action[Action["kQuerySubmitted"]=3]="kQuerySubmitted";Action[Action["kSupportLinkClicked"]=4]="kSupportLinkClicked";Action[Action["kTryAgainLink"]=5]="kTryAgainLink";Action[Action["kTryAgainMicButton"]=6]="kTryAgainMicButton"})(Action||(Action={}));var Error$1;(function(Error){Error[Error["kAborted"]=0]="kAborted";Error[Error["kAudioCapture"]=1]="kAudioCapture";Error[Error["kBadGrammar"]=2]="kBadGrammar";Error[Error["kLanguageNotSupported"]=3]="kLanguageNotSupported";Error[Error["kNetwork"]=4]="kNetwork";Error[Error["kNoMatch"]=5]="kNoMatch";Error[Error["kNoSpeech"]=6]="kNoSpeech";Error[Error["kNotAllowed"]=7]="kNotAllowed";Error[Error["kOther"]=8]="kOther";Error[Error["kServiceNotAllowed"]=9]="kServiceNotAllowed"})(Error$1||(Error$1={}));function recordVoiceAction(action){chrome.metricsPrivate.recordEnumerationValue("NewTabPage.VoiceActions",action,Object.keys(Action).length)}function toError(webkitError){switch(webkitError){case"aborted":return Error$1.kAborted;case"audio-capture":return Error$1.kAudioCapture;case"language-not-supported":return Error$1.kLanguageNotSupported;case"network":return Error$1.kNetwork;case"no-speech":return Error$1.kNoSpeech;case"not-allowed":return Error$1.kNotAllowed;case"service-not-allowed":return Error$1.kServiceNotAllowed;case"bad-grammar":return Error$1.kBadGrammar;default:return Error$1.kOther}}function getErrorTimeout(error){switch(error){case Error$1.kAudioCapture:case Error$1.kNoSpeech:case Error$1.kNotAllowed:case Error$1.kNoMatch:return ERROR_TIMEOUT_LONG_MS;default:return ERROR_TIMEOUT_SHORT_MS}}class VoiceSearchOverlayElement extends PolymerElement{constructor(){super();this.timerId_=null;this.pageHandler_=NewTabPageProxy.getInstance().handler;this.voiceRecognition_=new window.webkitSpeechRecognition;this.voiceRecognition_.continuous=false;this.voiceRecognition_.interimResults=true;this.voiceRecognition_.lang=window.navigator.language;this.voiceRecognition_.onaudiostart=this.onAudioStart_.bind(this);this.voiceRecognition_.onspeechstart=this.onSpeechStart_.bind(this);this.voiceRecognition_.onresult=this.onResult_.bind(this);this.voiceRecognition_.onend=this.onEnd_.bind(this);this.voiceRecognition_.onerror=e=>{this.onError_(toError(e.error))};this.voiceRecognition_.onnomatch=()=>{this.onError_(Error$1.kNoMatch)}}static get is(){return"ntp-voice-search-overlay"}static get template(){return getTemplate()}static get properties(){return{interimResult_:String,finalResult_:String,state_:{type:Number,value:State.UNINITIALIZED},error_:Number,helpUrl_:{type:String,readOnly:true,value:`https://support.google.com/chrome/?`+`p=ui_voice_search&hl=${window.navigator.language}`},micVolumeLevel_:{type:Number,value:0},micVolumeDuration_:{type:Number,value:VOLUME_ANIMATION_DURATION_MIN_MS}}}connectedCallback(){super.connectedCallback();this.$.dialog.showModal();this.start()}start(){this.voiceRecognition_.start();this.state_=State.STARTED;this.resetIdleTimer_()}onOverlayClose_(){this.voiceRecognition_.abort();this.dispatchEvent(new Event("close"))}onOverlayClick_(){this.$.dialog.close();recordVoiceAction(Action.kCloseOverlay)}onOverlayKeydown_(e){if(["Enter"," "].includes(e.key)&&this.finalResult_){this.onFinalResult_()}else if(e.key==="Escape"){this.onOverlayClick_()}}onLinkKeydown_(e){if(!["Enter"," "].includes(e.key)){return}e.stopPropagation();e.preventDefault();e.target.click()}onLearnMoreClick_(){recordVoiceAction(Action.kSupportLinkClicked)}onTryAgainClick_(e){e.stopPropagation();this.start();recordVoiceAction(Action.kTryAgainLink)}onMicClick_(e){if(this.state_!==State.ERROR_RECEIVED||this.error_!==Error$1.kNoMatch){return}e.stopPropagation();this.start();recordVoiceAction(Action.kTryAgainMicButton)}resetIdleTimer_(){WindowProxy.getInstance().clearTimeout(this.timerId_);this.timerId_=WindowProxy.getInstance().setTimeout(this.onIdleTimeout_.bind(this),IDLE_TIMEOUT_MS)}onIdleTimeout_(){if(this.state_===State.RESULT_FINAL){return}if(this.finalResult_){this.onFinalResult_();return}this.voiceRecognition_.abort();this.onError_(Error$1.kNoMatch)}resetErrorTimer_(duration){WindowProxy.getInstance().clearTimeout(this.timerId_);this.timerId_=WindowProxy.getInstance().setTimeout((()=>{this.$.dialog.close()}),duration)}onAudioStart_(){this.resetIdleTimer_();this.state_=State.AUDIO_RECEIVED}onSpeechStart_(){this.resetIdleTimer_();this.state_=State.SPEECH_RECEIVED;this.animateVolume_()}onResult_(e){this.resetIdleTimer_();switch(this.state_){case State.STARTED:this.onAudioStart_();this.onSpeechStart_();break;case State.AUDIO_RECEIVED:this.onSpeechStart_();break;case State.SPEECH_RECEIVED:case State.RESULT_RECEIVED:break;default:return}const results=e.results;if(results.length===0){return}this.state_=State.RESULT_RECEIVED;this.interimResult_="";this.finalResult_="";const finalResult=results[e.resultIndex];if(finalResult.isFinal){this.finalResult_=finalResult[0].transcript;this.onFinalResult_();return}for(let j=0;j<results.length;j++){const result=results[j][0];if(result.confidence>RECOGNITION_CONFIDENCE_THRESHOLD){this.finalResult_+=result.transcript}else{this.interimResult_+=result.transcript}}if(this.interimResult_.length>QUERY_LENGTH_LIMIT){this.onFinalResult_()}}onFinalResult_(){if(!this.finalResult_){this.onError_(Error$1.kNoMatch);return}this.state_=State.RESULT_FINAL;const searchParams=new URLSearchParams;searchParams.append("q",this.finalResult_);searchParams.append("gs_ivs","1");const queryUrl=new URL("/search",loadTimeData.getString("googleBaseUrl"));queryUrl.search=searchParams.toString();recordVoiceAction(Action.kQuerySubmitted);WindowProxy.getInstance().navigate(queryUrl.href)}onEnd_(){switch(this.state_){case State.STARTED:this.onError_(Error$1.kAudioCapture);return;case State.AUDIO_RECEIVED:this.onError_(Error$1.kNoSpeech);return;case State.SPEECH_RECEIVED:case State.RESULT_RECEIVED:this.onError_(Error$1.kNoMatch);return;case State.ERROR_RECEIVED:case State.RESULT_FINAL:return;default:this.onError_(Error$1.kOther);return}}onError_(error){chrome.metricsPrivate.recordEnumerationValue("NewTabPage.VoiceErrors",error,Object.keys(Error$1).length);if(error===Error$1.kAborted){return}this.error_=error;this.state_=State.ERROR_RECEIVED;this.resetErrorTimer_(getErrorTimeout(error))}animateVolume_(){this.micVolumeLevel_=0;this.micVolumeDuration_=VOLUME_ANIMATION_DURATION_MIN_MS;if(this.state_!==State.SPEECH_RECEIVED&&this.state_!==State.RESULT_RECEIVED){return}this.micVolumeLevel_=WindowProxy.getInstance().random();this.micVolumeDuration_=Math.round(VOLUME_ANIMATION_DURATION_MIN_MS+WindowProxy.getInstance().random()*VOLUME_ANIMATION_DURATION_RANGE_MS);WindowProxy.getInstance().setTimeout(this.animateVolume_.bind(this),this.micVolumeDuration_)}getText_(){switch(this.state_){case State.STARTED:return"waiting";case State.AUDIO_RECEIVED:case State.SPEECH_RECEIVED:return"speak";case State.RESULT_RECEIVED:case State.RESULT_FINAL:return"result";case State.ERROR_RECEIVED:return"error";default:return"none"}}getErrorText_(){switch(this.error_){case Error$1.kNoSpeech:return"no-speech";case Error$1.kAudioCapture:return"audio-capture";case Error$1.kNetwork:return"network";case Error$1.kNotAllowed:case Error$1.kServiceNotAllowed:return"not-allowed";case Error$1.kLanguageNotSupported:return"language-not-supported";case Error$1.kNoMatch:return"no-match";case Error$1.kAborted:case Error$1.kOther:default:return"other"}}getErrorLink_(){switch(this.error_){case Error$1.kNoSpeech:case Error$1.kAudioCapture:return"learn-more";case Error$1.kNotAllowed:case Error$1.kServiceNotAllowed:return"details";case Error$1.kNoMatch:return"try-again";default:return"none"}}getMicClass_(){switch(this.state_){case State.AUDIO_RECEIVED:return"listening";case State.SPEECH_RECEIVED:case State.RESULT_RECEIVED:return"receiving";default:return""}}}customElements.define(VoiceSearchOverlayElement.is,VoiceSearchOverlayElement);export{$$ as $,Action as A,BrowserCommandProxy as B,CustomizeDialogPage as C,EventTracker as E,FocusOutlineManager as F,IframeElement as I,NewTabPageProxy as N,PaperRippleBehavior as P,VoiceSearchOverlayElement as V,WindowProxy as W,assert$1 as a,mojoTimeDelta as b,mojoString16 as c,decodeString16 as d,assertNotReached$1 as e,strictQuery as f,recordLoadDuration as g,hasKeyModifiers as h,hexColorToSkColor as i,CrAutoImgElement as j,recordDuration as k,recordOccurence as l,mojoTimeTicks as m,recordPerdecage as n,createScrollBorders as o,Error$1 as p,IronMeta as q,recordVoiceAction as r,skColorToRgba as s,I18nMixin as t,assertInstanceof as u,isRTL as v,getDeepActiveElement as w,assertNotReached as x};