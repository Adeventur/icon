import{P as PaperRippleBehavior,q as IronMeta,t as I18nMixin,a as assert,i as hexColorToSkColor,s as skColorToRgba,N as NewTabPageProxy,F as FocusOutlineManager,E as EventTracker,e as assertNotReached,u as assertInstanceof,h as hasKeyModifiers,v as isRTL,w as getDeepActiveElement,W as WindowProxy,g as recordLoadDuration,k as recordDuration,x as assertNotReached$1,l as recordOccurence,o as createScrollBorders,C as CustomizeDialogPage,B as BrowserCommandProxy,j as CrAutoImgElement,n as recordPerdecage}from"./shared.rollup.js";export{V as VoiceSearchOverlayElement}from"./shared.rollup.js";import{Polymer,html,dom,PolymerElement,FlattenedNodesObserver,templatize,microTask}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import{CustomizeThemesHandlerRemote,CustomizeThemesClientCallbackRouter,CustomizeThemesHandlerFactory,ThemeType}from"chrome://resources/cr_components/customize_themes/customize_themes.mojom-webui.js";import"chrome://new-tab-page/strings.m.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import{CustomizeDialogAction,OptInStatus as OptInStatus$1}from"chrome://new-tab-page/new_tab_page.mojom-webui.js";import{CartHandler,ConsentStatus}from"chrome://new-tab-page/chrome_cart.mojom-webui.js";import{isIOS,isWindows,isMac}from"chrome://resources/js/cr.m.js";import{DriveHandler}from"chrome://new-tab-page/drive.mojom-webui.js";import{PhotosHandler}from"chrome://new-tab-page/photos.mojom-webui.js";import{TaskModuleHandler}from"chrome://new-tab-page/task_module.mojom-webui.js";import{Command}from"chrome://resources/js/browser_command/browser_command.mojom-webui.js";import{TextDirection}from"chrome://resources/mojo/mojo/public/mojom/base/text_direction.mojom-webui.js";import{MostVisitedPageCallbackRouter,MostVisitedPageHandlerRemote,MostVisitedPageHandlerFactory}from"chrome://resources/cr_components/most_visited/most_visited.mojom-webui.js";import"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-webui.js";// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const MOVE_THRESHOLD_PX=5;Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-toggle">:host {
  --cr-toggle-checked-bar-color: var(--google-blue-600);
        --cr-toggle-checked-button-color: var(--google-blue-600);
        --cr-toggle-checked-ripple-color:
            rgba(var(--google-blue-600-rgb), .2);
        --cr-toggle-unchecked-bar-color: var(--google-grey-400);
        --cr-toggle-unchecked-button-color: white;
        --cr-toggle-unchecked-ripple-color:
            rgba(var(--google-grey-600-rgb), .15);
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: block;
        min-width: 34px;
        outline: none;
        position: relative;
        width: 34px;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-toggle-checked-bar-color: var(--google-blue-300);
          --cr-toggle-checked-button-color: var(--google-blue-300);
          --cr-toggle-checked-ripple-color:
              rgba(var(--google-blue-300-rgb), .4);
          --cr-toggle-unchecked-bar-color: var(--google-grey-500);
          --cr-toggle-unchecked-button-color: var(--google-grey-300);
          --cr-toggle-unchecked-ripple-color:
              rgba(var(--google-grey-300-rgb), .4);
}

}

:host([dark]) {
  --cr-toggle-checked-bar-color: var(--google-blue-300);
        --cr-toggle-checked-button-color: var(--google-blue-300);
        --cr-toggle-checked-ripple-color:
            rgba(var(--google-blue-300-rgb), .4);
        --cr-toggle-unchecked-bar-color: var(--google-grey-500);
        --cr-toggle-unchecked-button-color: var(--google-grey-300);
        --cr-toggle-unchecked-ripple-color:
            rgba(var(--google-grey-300-rgb), .4);
}

:host([disabled]) {
  cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

#bar {
  background-color: var(--cr-toggle-unchecked-bar-color);
        border-radius: 8px;
        height: 12px;
        left: 3px;
        position: absolute;
        top: 2px;
        transition: background-color linear 80ms;
        width: 28px;
        z-index: 0;
}

:host([checked]) #bar {
  background-color: var(--cr-toggle-checked-bar-color);
        opacity: var(--cr-toggle-checked-bar-opacity, 0.5);
}

#knob {
  background-color: var(--cr-toggle-unchecked-button-color);
        border-radius: 50%;
        box-shadow: var(--cr-toggle-box-shadow, 0 1px 3px 0 rgba(0, 0, 0, .4));
        display: block;
        height: 16px;
        position: relative;
        transition: transform linear 80ms, background-color linear 80ms;
        width: 16px;
        z-index: 1;
}

:host([checked]) #knob {
  background-color: var(--cr-toggle-checked-button-color);
        transform: translate3d(18px, 0, 0);
}

:host-context([dir=rtl]):host([checked]) #knob {
  transform: translate3d(-18px, 0, 0);
}

paper-ripple {
  --paper-ripple-opacity: 1;
        color: var(--cr-toggle-unchecked-ripple-color);
        height: var(--cr-toggle-ripple-diameter, 40px);
        left: 50%;
        outline: var(--cr-toggle-ripple-ring, none);
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: color linear 80ms;
        width: var(--cr-toggle-ripple-diameter, 40px);
}

:host([checked]) paper-ripple {
  color: var(--cr-toggle-checked-ripple-color);
}

:host-context([dir=rtl]) paper-ripple {
  left: auto;
        right: 50%;
        transform: translate(50%, -50%);
}

</style>
    <span id="bar"></span>
    <span id="knob"></span>
<!--_html_template_end_-->`,is:"cr-toggle",behaviors:[PaperRippleBehavior],properties:{checked:{type:Boolean,value:false,reflectToAttribute:true,observer:"checkedChanged_",notify:true},dark:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"}},hostAttributes:{"aria-disabled":"false","aria-pressed":"false",role:"button",tabindex:0},listeners:{blur:"hideRipple_",click:"onClick_",focus:"onFocus_",keydown:"onKeyDown_",keyup:"onKeyUp_",pointerdown:"onPointerDown_",pointerup:"onPointerUp_"},boundPointerMove_:null,handledInPointerMove_:false,attached(){const direction=this.matches(":host-context([dir=rtl]) cr-toggle")?-1:1;this.boundPointerMove_=e=>{e.preventDefault();const diff=e.clientX-this.pointerDownX_;if(Math.abs(diff)<MOVE_THRESHOLD_PX){return}this.handledInPointerMove_=true;const shouldToggle=diff*direction<0&&this.checked||diff*direction>0&&!this.checked;if(shouldToggle){this.toggleState_(false)}}},checkedChanged_(){this.setAttribute("aria-pressed",this.checked?"true":"false")},disabledChanged_(){this.setAttribute("tabindex",this.disabled?-1:0);this.setAttribute("aria-disabled",this.disabled?"true":"false")},onFocus_(){this.getRipple().showAndHoldDown()},hideRipple_(){this.getRipple().clear()},onPointerUp_(){this.removeEventListener("pointermove",this.boundPointerMove_);this.hideRipple_()},onPointerDown_(e){if(e.button!==0){return}this.setPointerCapture(e.pointerId);this.pointerDownX_=e.clientX;this.handledInPointerMove_=false;this.addEventListener("pointermove",this.boundPointerMove_)},onClick_(e){e.stopPropagation();e.preventDefault();if(this.handledInPointerMove_){return}this.toggleState_(false)},toggleState_(fromKeyboard){if(this.disabled){return}if(!fromKeyboard){this.hideRipple_()}this.checked=!this.checked;this.fire("change",this.checked)},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.toggleState_(true)}},onKeyUp_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.key===" "){this.toggleState_(true)}},_createRipple(){this._rippleContainer=this.$.knob;const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:false},useGlobalRtlAttribute:{type:Boolean,value:false}},created:function(){this._meta=new IronMeta({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){this._icons=this._createIconMap();return Object.keys(this._icons).map((function(n){return this.name+":"+n}),this)},applyIcon:function(element,iconName){this.removeIcon(element);var svg=this._cloneIcon(iconName,this.rtlMirroring&&this._targetIsRTL(element));if(svg){var pde=dom(element.root||element);pde.insertBefore(svg,pde.childNodes[0]);return element._svgIcon=svg}return null},createIcon:function(iconName,targetIsRTL){return this._cloneIcon(iconName,this.rtlMirroring&&targetIsRTL)},removeIcon:function(element){if(element._svgIcon){dom(element.root||element).removeChild(element._svgIcon);element._svgIcon=null}},_targetIsRTL:function(target){if(this.__targetIsRTL==null){if(this.useGlobalRtlAttribute){var globalElement=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL=globalElement.getAttribute("dir")==="rtl"}else{if(target&&target.nodeType!==Node.ELEMENT_NODE){target=target.host}this.__targetIsRTL=target&&window.getComputedStyle(target)["direction"]==="rtl"}}return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null;this._meta.key=this.name;this._meta.value=this;this.async((function(){this.fire("iron-iconset-added",this,{node:window})}))},_createIconMap:function(){var icons=Object.create(null);dom(this).querySelectorAll("[id]").forEach((function(icon){icons[icon.id]=icon}));return icons},_cloneIcon:function(id,mirrorAllowed){this._icons=this._icons||this._createIconMap();return this._prepareSvgClone(this._icons[id],this.size,mirrorAllowed)},_prepareSvgClone:function(sourceSvg,size,mirrorAllowed){if(sourceSvg){var content=sourceSvg.cloneNode(true),svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),viewBox=content.getAttribute("viewBox")||"0 0 "+size+" "+size,cssText="pointer-events: none; display: block; width: 100%; height: 100%;";if(mirrorAllowed&&content.hasAttribute("mirror-in-rtl")){cssText+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"}svg.setAttribute("viewBox",viewBox);svg.setAttribute("preserveAspectRatio","xMidYMid meet");svg.setAttribute("focusable","false");svg.style.cssText=cssText;svg.appendChild(content).removeAttribute("id");return svg}return null}});const template$1=html`<iron-iconset-svg name="cr20" size="20">
  <svg>
    <defs>
      <!--
      Keep these in sorted order by id="". See also http://goo.gl/Y1OdAq
      -->
      <g id="domain">
        <path d="M2,3 L2,17 L11.8267655,17 L13.7904799,17 L18,17 L18,7 L12,7 L12,3 L2,3 Z M8,13 L10,13 L10,15 L8,15 L8,13 Z M4,13 L6,13 L6,15 L4,15 L4,13 Z M8,9 L10,9 L10,11 L8,11 L8,9 Z M4,9 L6,9 L6,11 L4,11 L4,9 Z M12,9 L16,9 L16,15 L12,15 L12,9 Z M12,11 L14,11 L14,13 L12,13 L12,11 Z M8,5 L10,5 L10,7 L8,7 L8,5 Z M4,5 L6,5 L6,7 L4,7 L4,5 Z">
        </path>
      </g>
      <g id="kite">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.6327 8.00094L10.3199 2L16 8.00094L10.1848 16.8673C10.0995 16.9873 10.0071 17.1074 9.90047 17.2199C9.42417 17.7225 8.79147 18 8.11611 18C7.44076 18 6.80806 17.7225 6.33175 17.2199C5.85545 16.7173 5.59242 16.0497 5.59242 15.3371C5.59242 14.977 5.46445 14.647 5.22275 14.3919C4.98104 14.1369 4.66825 14.0019 4.32701 14.0019H4V12.6667H4.32701C5.00237 12.6667 5.63507 12.9442 6.11137 13.4468C6.58768 13.9494 6.85071 14.617 6.85071 15.3296C6.85071 15.6896 6.97867 16.0197 7.22038 16.2747C7.46209 16.5298 7.77488 16.6648 8.11611 16.6648C8.45735 16.6648 8.77014 16.5223 9.01185 16.2747C9.02396 16.2601 9.03607 16.246 9.04808 16.2319C9.08541 16.1883 9.12176 16.1458 9.15403 16.0947L9.55213 15.4946L4.6327 8.00094ZM10.3199 13.9371L6.53802 8.17116L10.3199 4.1814L14.0963 8.17103L10.3199 13.9371Z">
        </path>
      </g>
      <g id="menu">
        <path d="M2 4h16v2H2zM2 9h16v2H2zM2 14h16v2H2z"></path>
      </g>
      
  </defs></svg>
</iron-iconset-svg>
<iron-iconset-svg name="cr" size="24">
  <svg>
    <defs>
      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="account-child-invert" viewBox="0 0 48 48">
        <path d="M24 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path>
        <path fill="none" d="M0 0h48v48H0V0z"></path>
        <circle fill="none" cx="24" cy="26" r="4"></circle>
        <path d="M24 18c-6.16 0-13 3.12-13 7.23v11.54c0 2.32 2.19 4.33 5.2 5.63 2.32 1 5.12 1.59 7.8 1.59.66 0 1.33-.06 2-.14v-5.2c-.67.08-1.34.14-2 .14-2.63 0-5.39-.57-7.68-1.55.67-2.12 4.34-3.65 7.68-3.65.86 0 1.75.11 2.6.29 2.79.62 5.2 2.15 5.2 4.04v4.47c3.01-1.31 5.2-3.31 5.2-5.63V25.23C37 21.12 30.16 18 24 18zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z">
        </path>
      </g>
      <g id="add">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
      </g>
      <g id="arrow-back">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
      </g>
      <g id="arrow-drop-up">
        <path d="M7 14l5-5 5 5z">
      </path></g>
      <g id="arrow-drop-down">
        <path d="M7 10l5 5 5-5z"></path>
      </g>
      <g id="arrow-forward">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
      </g>
      <g id="arrow-right">
        <path d="M10 7l5 5-5 5z"></path>
      </g>
      
      <g id="cancel">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
        </path>
      </g>
      <g id="check">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
      </g>
      <g id="check-circle">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
        </path>
      </g>
      <g id="chevron-left">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
      </g>
      <g id="chevron-right">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </g>
      <g id="clear">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
        </path>
      </g>
      <g id="close">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
        </path>
      </g>
      <g id="computer">
        <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z">
        </path>
      </g>
      <g id="delete">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
      </g>
      <g id="domain">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z">
        </path>
      </g>
      <g id="error">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
        </path>
      </g>
      <g id="error-outline">
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">
        </path>
      </g>
      <g id="expand-less">
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
      </g>
      <g id="expand-more">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </g>
      <g id="extension">
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z">
        </path>
      </g>
      <g id="file-download">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
      </g>
      
      <g id="fullscreen">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
      </g>
      <g id="group">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z">
        </path>
      </g>
      <g id="help-outline">
        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z">
        </path>
      </g>
      <g id="info">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
        </path>
      </g>
      <g id="info-outline">
        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z">
        </path>
      </g>
      <g id="insert-drive-file">
        <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z">
        </path>
      </g>
      <g id="location-on">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z">
        </path>
      </g>
      <g id="mic">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z">
        </path>
      </g>
      <g id="more-vert">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
        </path>
      </g>
      <g id="open-in-new">
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z">
        </path>
      </g>
      <g id="person">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
        </path>
      </g>
      <g id="phonelink"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></g>
      <g id="print">
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z">
        </path>
      </g>
      <g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
      <g id="search">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
        </path>
      </g>
      <g id="security">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z">
        </path>
      </g>
      
      <!-- The <g> IDs are exposed as global variables in Vulcanized mode, which
        conflicts with the "settings" namespace of MD Settings. Using an "_icon"
        suffix prevents the naming conflict. -->
      <g id="settings_icon">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z">
        </path>
      </g>
      <g id="star">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
      </g>
      <g id="sync">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z">
        </path>
      </g>
      <g id="videocam">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z">
        </path>
      </g>
      <g id="warning">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$1.content);// Copyright 2021 The Chromium Authors. All rights reserved.
const ManagedDialogElementBase=I18nMixin(PolymerElement);class ManagedDialogElement extends ManagedDialogElementBase{static get is(){return"managed-dialog"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="managed-dialog">iron-icon {
  --iron-icon-height: var(--cr-icon-size);
    --iron-icon-width: var(--cr-icon-size);
    padding-inline-end: 10px;
}

cr-dialog::part(body-container) {
  padding-inline-start: 35px;
}

</style>

<cr-dialog id="dialog" close-text="[[i18n('close')]]" show-on-attach="">
  <div slot="title">
    <iron-icon icon="cr:domain" role="img" aria-label="[[i18n('controlledSettingPolicy')]]">
    </iron-icon>
    [[title]]
  </div>
  <div slot="body">[[body]]</div>
  <div slot="button-container">
    <cr-button class="action-button" on-click="onOkClick_">
      [[i18n('ok')]]
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}static get properties(){return{title:String,body:String}}onOkClick_(){this.$.dialog.close()}}customElements.define(ManagedDialogElement.is,ManagedDialogElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class CrGridElement extends PolymerElement{constructor(){super(...arguments);this.columns=1}static get is(){return"cr-grid"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-grid">:host {
  --cr-grid-gap: 0px;
}

#grid {
  display: grid;
    grid-column-gap: var(--cr-grid-gap);
    grid-row-gap: var(--cr-grid-gap);
    grid-template-columns: repeat(var(--cr-grid-columns), auto);
    width: fit-content;
}

::slotted(*) {
  align-self: center;
    justify-self: center;
}

</style>
<div id="grid" on-keydown="onKeyDown_">
  <slot id="items"></slot>
</div>
<!--_html_template_end_-->`}static get properties(){return{columns:{type:Number,observer:"onColumnsChange_"}}}onColumnsChange_(){this.updateStyles({"--cr-grid-columns":this.columns})}onKeyDown_(e){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)){e.preventDefault();const items=this.$.items.assignedElements().filter((el=>!!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)));const currentIndex=items.indexOf(e.target);const isRtl=window.getComputedStyle(this)["direction"]==="rtl";const bottomRowColumns=items.length%this.columns;const direction=["ArrowRight","ArrowDown"].includes(e.key)?1:-1;const inEdgeRow=direction===1?currentIndex>=items.length-bottomRowColumns:currentIndex<this.columns;let delta=0;switch(e.key){case"ArrowLeft":case"ArrowRight":delta=direction*(isRtl?-1:1);break;case"ArrowUp":case"ArrowDown":delta=direction*(inEdgeRow?bottomRowColumns:this.columns);break}if(e.key==="ArrowUp"&&inEdgeRow&&currentIndex>=bottomRowColumns){delta-=this.columns}else if(e.key==="ArrowDown"&&!inEdgeRow&&currentIndex+delta>=items.length){delta+=bottomRowColumns}const newIndex=(items.length+currentIndex+delta)%items.length;items[newIndex].focus()}if(["Enter"," "].includes(e.key)){e.preventDefault();e.stopPropagation();e.target.click()}}}customElements.define(CrGridElement.is,CrGridElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class ThemeIconElement extends PolymerElement{static get is(){return"cr-theme-icon"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-theme-icon">:host {
  --cr-theme-icon-size: 72px;
    cursor: pointer;
    display: block;
}

:host, svg {
  display: block;
    height: var(--cr-theme-icon-size);
    width: var(--cr-theme-icon-size);
}

#ring {
  fill: rgba(var(--google-blue-600-rgb), 0.4);
    visibility: hidden;
}

#checkMark {
  visibility: hidden;
}

:host([selected]) #ring, :host([selected]) #checkMark {
  visibility: visible;
}

#circle {
  fill: url(#gradient);
    stroke: var(--cr-theme-icon-stroke-color,
        var(--cr-theme-icon-frame-color));
    stroke-width: 1;
}

#leftColor {
  stop-color: var(--cr-theme-icon-active-tab-color);
}

#rightColor {
  stop-color: var(--cr-theme-icon-frame-color);
}

#checkMark circle {
  fill: var(--google-blue-600);
}

#checkMark path {
  fill: white;
}

@media (prefers-color-scheme: dark) {
#checkMark circle {
  fill: var(--google-blue-300);
}

#checkMark path {
  fill: var(--google-grey-900);
}

}

:host-context([dir='rtl']) #checkMark {
  transform: translateX(3.5px);
}

</style>
<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="gradient" gradientUnits="objectBoundingBox" x1="50%" y1="0" x2="50.01%" y2="0">
      <stop id="leftColor" offset="0%"></stop>
      <stop id="rightColor" offset="100%"></stop>
    </linearGradient>
  </defs>
  <circle id="ring" cx="36" cy="36" r="36"></circle>
  <circle id="circle" cx="36" cy="36" r="32"></circle>
  <g id="checkMark" transform="translate(48.5, 3.5)">
    <circle cx="10" cy="10" r="10"></circle>
    <path d="m 2.9885708,9.99721 5.0109458,4.98792 0.00275,-0.003
        0.024151,0.0227 8.9741604,-9.01557 -1.431323,-1.42476 -7.5742214,7.6092
        -3.6031671,-3.58665 z">
    </path>
  </g>
</svg>
<!--_html_template_end_-->`}}customElements.define(ThemeIconElement.is,ThemeIconElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="paper-tooltip">:host {
  display: block;
        position: absolute;
        outline: none;
        z-index: 1002;
        user-select: none;
        cursor: default;
}

#tooltip {
  display: block;
        outline: none;
        ;
        font-size: 10px;
        line-height: 1;
        background-color: var(--paper-tooltip-background, #616161);
        color: var(--paper-tooltip-text-color, white);
        padding: 8px;
        border-radius: 2px;
        border-radius: var(--paper-tooltip_-_border-radius, 2px); font-size: var(--paper-tooltip_-_font-size, 10px); font-weight: var(--paper-tooltip_-_font-weight); max-width: var(--paper-tooltip_-_max-width); min-width: var(--paper-tooltip_-_min-width); padding: var(--paper-tooltip_-_padding, 8px);
}

@keyframes keyFrameScaleUp {
0% {
  transform: scale(0.0);
}

100% {
  transform: scale(1.0);
}

}

@keyframes keyFrameScaleDown {
0% {
  transform: scale(1.0);
}

100% {
  transform: scale(0.0);
}

}

@keyframes keyFrameFadeInOpacity {
0% {
  opacity: 0;
}

100% {
  opacity: var(--paper-tooltip-opacity, 0.9);
}

}

@keyframes keyFrameFadeOutOpacity {
0% {
  opacity: var(--paper-tooltip-opacity, 0.9);
}

100% {
  opacity: 0;
}

}

@keyframes keyFrameSlideDownIn {
0% {
  transform: translateY(-2000px);
          opacity: 0;
}

10% {
  opacity: 0.2;
}

100% {
  transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
}

}

@keyframes keyFrameSlideDownOut {
0% {
  transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
}

10% {
  opacity: 0.2;
}

100% {
  transform: translateY(-2000px);
          opacity: 0;
}

}

.fade-in-animation {
  opacity: 0;
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameFadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
        ;
}

.fade-out-animation {
  opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 0ms);
        animation-name: keyFrameFadeOutOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.scale-up-animation {
  transform: scale(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameScaleUp;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
        ;
}

.scale-down-animation {
  transform: scale(1);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameScaleDown;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.slide-down-animation {
  transform: translateY(-2000px);
        opacity: 0;
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownIn;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.slide-down-animation-out {
  transform: translateY(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownOut;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.cancel-animation {
  animation-delay: -30s !important;
}

.hidden {
  display: none !important;
}

</style>

    <div id="tooltip" class="hidden">
      <slot></slot>
    </div>
`,is:"paper-tooltip",hostAttributes:{role:"tooltip",tabindex:-1},properties:{for:{type:String,observer:"_findTarget"},manualMode:{type:Boolean,value:false,observer:"_manualModeChanged"},position:{type:String,value:"bottom"},fitToVisibleBounds:{type:Boolean,value:false},offset:{type:Number,value:14},marginTop:{type:Number,value:14},animationDelay:{type:Number,value:500,observer:"_delayChange"},animationEntry:{type:String,value:""},animationExit:{type:String,value:""},animationConfig:{type:Object,value:function(){return{entry:[{name:"fade-in-animation",node:this,timing:{delay:0}}],exit:[{name:"fade-out-animation",node:this}]}}},_showing:{type:Boolean,value:false}},listeners:{webkitAnimationEnd:"_onAnimationEnd"},get target(){if(this._manualTarget)return this._manualTarget;var parentNode=dom(this).parentNode;var ownerRoot=dom(this).getOwnerRoot();var target;if(this.for){target=dom(ownerRoot).querySelector("#"+this.for)}else{target=parentNode.nodeType==Node.DOCUMENT_FRAGMENT_NODE?ownerRoot.host:parentNode}return target},set target(target){this._manualTarget=target;this._findTarget()},attached:function(){this._findTarget()},detached:function(){if(!this.manualMode)this._removeListeners()},playAnimation:function(type){if(type==="entry"){this.show()}else if(type==="exit"){this.hide()}},cancelAnimation:function(){this.$.tooltip.classList.add("cancel-animation")},show:function(){if(this._showing)return;if(dom(this).textContent.trim()===""){var allChildrenEmpty=true;var effectiveChildren=dom(this).getEffectiveChildNodes();for(var i=0;i<effectiveChildren.length;i++){if(effectiveChildren[i].textContent.trim()!==""){allChildrenEmpty=false;break}}if(allChildrenEmpty){return}}this._showing=true;this.$.tooltip.classList.remove("hidden");this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.updatePosition();this._animationPlaying=true;this.$.tooltip.classList.add(this._getAnimationType("entry"))},hide:function(){if(!this._showing){return}if(this._animationPlaying){this._showing=false;this._cancelAnimation();return}else{this._onAnimationFinish()}this._showing=false;this._animationPlaying=true},updatePosition:function(){if(!this._target)return;var offsetParent=this._composedOffsetParent();if(!offsetParent)return;var offset=this.offset;if(this.marginTop!=14&&this.offset==14)offset=this.marginTop;var parentRect=offsetParent.getBoundingClientRect();var targetRect=this._target.getBoundingClientRect();var thisRect=this.getBoundingClientRect();var horizontalCenterOffset=(targetRect.width-thisRect.width)/2;var verticalCenterOffset=(targetRect.height-thisRect.height)/2;var targetLeft=targetRect.left-parentRect.left;var targetTop=targetRect.top-parentRect.top;var tooltipLeft,tooltipTop;switch(this.position){case"top":tooltipLeft=targetLeft+horizontalCenterOffset;tooltipTop=targetTop-thisRect.height-offset;break;case"bottom":tooltipLeft=targetLeft+horizontalCenterOffset;tooltipTop=targetTop+targetRect.height+offset;break;case"left":tooltipLeft=targetLeft-thisRect.width-offset;tooltipTop=targetTop+verticalCenterOffset;break;case"right":tooltipLeft=targetLeft+targetRect.width+offset;tooltipTop=targetTop+verticalCenterOffset;break}if(this.fitToVisibleBounds){if(parentRect.left+tooltipLeft+thisRect.width>window.innerWidth){this.style.right="0px";this.style.left="auto"}else{this.style.left=Math.max(0,tooltipLeft)+"px";this.style.right="auto"}if(parentRect.top+tooltipTop+thisRect.height>window.innerHeight){this.style.bottom=parentRect.height-targetTop+offset+"px";this.style.top="auto"}else{this.style.top=Math.max(-parentRect.top,tooltipTop)+"px";this.style.bottom="auto"}}else{this.style.left=tooltipLeft+"px";this.style.top=tooltipTop+"px"}},_addListeners:function(){if(this._target){this.listen(this._target,"mouseenter","show");this.listen(this._target,"focus","show");this.listen(this._target,"mouseleave","hide");this.listen(this._target,"blur","hide");this.listen(this._target,"tap","hide")}this.listen(this.$.tooltip,"animationend","_onAnimationEnd");this.listen(this,"mouseenter","hide")},_findTarget:function(){if(!this.manualMode)this._removeListeners();this._target=this.target;if(!this.manualMode)this._addListeners()},_delayChange:function(newValue){if(newValue!==500){this.updateStyles({"--paper-tooltip-delay-in":newValue+"ms"})}},_manualModeChanged:function(){if(this.manualMode)this._removeListeners();else this._addListeners()},_cancelAnimation:function(){this.$.tooltip.classList.remove(this._getAnimationType("entry"));this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.add("hidden")},_onAnimationFinish:function(){if(this._showing){this.$.tooltip.classList.remove(this._getAnimationType("entry"));this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.add(this._getAnimationType("exit"))}},_onAnimationEnd:function(){this._animationPlaying=false;if(!this._showing){this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.$.tooltip.classList.add("hidden")}},_getAnimationType:function(type){if(type==="entry"&&this.animationEntry!==""){return this.animationEntry}if(type==="exit"&&this.animationExit!==""){return this.animationExit}if(this.animationConfig[type]&&typeof this.animationConfig[type][0].name==="string"){if(this.animationConfig[type][0].timing&&this.animationConfig[type][0].timing.delay&&this.animationConfig[type][0].timing.delay!==0){var timingDelay=this.animationConfig[type][0].timing.delay;if(type==="entry"){this.updateStyles({"--paper-tooltip-delay-in":timingDelay+"ms"})}else if(type==="exit"){this.updateStyles({"--paper-tooltip-delay-out":timingDelay+"ms"})}}return this.animationConfig[type][0].name}},_removeListeners:function(){if(this._target){this.unlisten(this._target,"mouseenter","show");this.unlisten(this._target,"focus","show");this.unlisten(this._target,"mouseleave","hide");this.unlisten(this._target,"blur","hide");this.unlisten(this._target,"tap","hide")}this.unlisten(this.$.tooltip,"animationend","_onAnimationEnd");this.unlisten(this,"mouseenter","hide")},_composedOffsetParent:function(){for(let ancestor=this;ancestor;ancestor=flatTreeParent(ancestor)){if(!(ancestor instanceof Element))continue;if(getComputedStyle(ancestor).display==="none")return null}for(let ancestor=flatTreeParent(this);ancestor;ancestor=flatTreeParent(ancestor)){if(!(ancestor instanceof Element))continue;const style=getComputedStyle(ancestor);if(style.display==="contents"){continue}if(style.position!=="static"){return ancestor}if(ancestor.tagName==="BODY")return ancestor}return null;function flatTreeParent(element){if(element.assignedSlot){return element.assignedSlot}if(element.parentNode instanceof ShadowRoot){return element.parentNode.host}return element.parentNode}}});// Copyright 2020 The Chromium Authors. All rights reserved.
class CustomizeThemesBrowserProxyImpl{constructor(){this.handler_=new CustomizeThemesHandlerRemote;this.callbackRouter_=new CustomizeThemesClientCallbackRouter;const factory=CustomizeThemesHandlerFactory.getRemote();factory.createCustomizeThemesHandler(this.callbackRouter_.$.bindNewPipeAndPassRemote(),this.handler_.$.bindNewPipeAndPassReceiver())}handler(){return this.handler_}callbackRouter(){return this.callbackRouter_}open(url){window.open(url,"_blank")}static getInstance(){return instance$3||(instance$3=new CustomizeThemesBrowserProxyImpl)}static setInstance(obj){instance$3=obj}}let instance$3=null;// Copyright 2020 The Chromium Authors. All rights reserved.
const CustomizeThemesElementBase=I18nMixin(PolymerElement);class CustomizeThemesElement extends CustomizeThemesElementBase{constructor(){super(...arguments);this.handler_=CustomizeThemesBrowserProxyImpl.getInstance().handler();this.callbackRouter_=CustomizeThemesBrowserProxyImpl.getInstance().callbackRouter();this.setThemeListenerId_=null}static get is(){return"cr-customize-themes"}static get properties(){return{selectedTheme:{type:Object,value:null,observer:"onThemeChange_",notify:true},autoConfirmThemeChanges:{type:Boolean,value:false},chromeThemes_:Array,showManagedThemeDialog_:{type:Boolean,value:false}}}connectedCallback(){super.connectedCallback();this.handler_.initializeTheme();this.handler_.getChromeThemes().then((({chromeThemes:chromeThemes})=>{this.chromeThemes_=chromeThemes}));this.setThemeListenerId_=this.callbackRouter_.setTheme.addListener((theme=>{this.selectedTheme=theme}))}disconnectedCallback(){this.revertThemeChanges();this.callbackRouter_.removeListener(assert(this.setThemeListenerId_));super.disconnectedCallback()}confirmThemeChanges(){this.handler_.confirmThemeChanges()}revertThemeChanges(){this.handler_.revertThemeChanges()}onCustomFrameColorChange_(e){this.handler_.applyAutogeneratedTheme(hexColorToSkColor(e.target.value));if(this.autoConfirmThemeChanges){this.handler_.confirmThemeChanges()}}onAutogeneratedThemeClick_(){if(this.isForcedTheme_()){this.showManagedThemeDialog_=true;return}this.$.colorPicker.click()}onDefaultThemeClick_(){if(this.isForcedTheme_()){this.showManagedThemeDialog_=true;return}this.handler_.applyDefaultTheme();if(this.autoConfirmThemeChanges){this.handler_.confirmThemeChanges()}}onChromeThemeClick_(e){if(this.isForcedTheme_()){this.showManagedThemeDialog_=true;return}this.handler_.applyChromeTheme(this.$.themes.itemForElement(e.target).id);if(this.autoConfirmThemeChanges){this.handler_.confirmThemeChanges()}}onThemeChange_(){if(!this.selectedTheme||this.selectedTheme.type!==ThemeType.kAutogenerated){return}const rgbaFrameColor=skColorToRgba(this.selectedTheme.info.autogeneratedThemeColors.frame);const rgbaActiveTabColor=skColorToRgba(this.selectedTheme.info.autogeneratedThemeColors.activeTab);this.$.autogeneratedTheme.style.setProperty("--cr-theme-icon-frame-color",rgbaFrameColor);this.$.autogeneratedTheme.style.setProperty("--cr-theme-icon-stroke-color",rgbaFrameColor);this.$.autogeneratedTheme.style.setProperty("--cr-theme-icon-active-tab-color",rgbaActiveTabColor);this.$.colorPickerIcon.style.setProperty("background-color",skColorToRgba(this.selectedTheme.info.autogeneratedThemeColors.activeTabText))}onUninstallThirdPartyThemeClick_(){this.handler_.applyDefaultTheme();this.handler_.confirmThemeChanges()}onThirdPartyLinkButtonClick_(){CustomizeThemesBrowserProxyImpl.getInstance().open(`https://chrome.google.com/webstore/detail/${this.selectedTheme.info.thirdPartyThemeInfo.id}`)}isThemeIconSelected_(id){if(!this.selectedTheme){return false}if(id==="autogenerated"){return this.selectedTheme.type===ThemeType.kAutogenerated}else if(id==="default"){return this.selectedTheme.type===ThemeType.kDefault}else{return this.selectedTheme.type===ThemeType.kChrome&&id===this.selectedTheme.info.chromeThemeId}}getTabIndex_(id){if(!this.selectedTheme||this.selectedTheme.type===ThemeType.kThirdParty){return id==="autogenerated"?"0":"-1"}return this.isThemeIconSelected_(id)?"0":"-1"}getThemeIconCheckedStatus_(id){return this.isThemeIconSelected_(id)?"true":"false"}isThirdPartyTheme_(){return!!this.selectedTheme&&this.selectedTheme.type===ThemeType.kThirdParty}isForcedTheme_(){return!!this.selectedTheme&&this.selectedTheme.isForced}skColorToRgba_(skColor){return skColorToRgba(skColor)}onManagedDialogClosed_(){this.showManagedThemeDialog_=false}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons cr-shared-style" scope="cr-customize-themes">:host {
  --cr-customize-themes-grid-gap: 20px;
    --cr-customize-themes-icon-size: 72px;
    display: inline-block;
}

#thirdPartyThemeContainer {
  max-width: 544px;
    width: 100%;
}

#thirdPartyTheme {
  align-items: center;
    border: 1px solid var(--google-grey-300);
    border-radius: 5px;
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    padding: 0 16px;
}

@media (prefers-color-scheme: dark) {
#thirdPartyTheme {
  border-color: var(--google-grey-700);
}

}

#thirdPartyBrushIcon {
  -webkit-mask-image: url(chrome://resources/cr_components/customize_themes/brush.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-primary-text-color);
    margin-inline-end: 20px;
    min-height: 24px;
    min-width: 24px;
}

#thirdPartyThemeNameContainer {
  flex-grow: 1;
    margin-inline-end: 24px;
}

#thirdPartyThemeName {
  font-weight: bold;
}

#thirdPartyLink {
  --cr-icon-button-fill-color: var(--cr-primary-text-color);
    margin-inline-end: 24px;
}

#uninstallThirdPartyButton {
  margin: 16px 0;
}

#themesContainer {
  --cr-grid-gap: var(--cr-customize-themes-grid-gap);
}

#themesContainer > * {
  outline-width: 0;
}

:host-context(.focus-outline-visible) #themesContainer > *:focus {
  box-shadow: 0 0 0 2px rgba(var(--google-blue-600-rgb), .4);
}

#autogeneratedThemeContainer {
  cursor: pointer;
    position: relative;
}

#colorPicker {
  border: 0;
    height: var(--cr-customize-themes-icon-size);
    left: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    visibility: hidden;
    width: var(--cr-customize-themes-icon-size);
}

#colorPickerIcon {
  -webkit-mask-image: url(chrome://resources/cr_components/customize_themes/colorize.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--google-grey-700);
    height: 20px;
    left: calc(50% - 10px);
    position: absolute;
    top: calc(50% - 10px);
    width: 20px;
}

cr-theme-icon {
  --cr-theme-icon-size: var(--cr-customize-themes-icon-size);
}

#autogeneratedTheme {
  --cr-theme-icon-frame-color: var(--google-grey-100);
    --cr-theme-icon-active-tab-color: white;
    --cr-theme-icon-stroke-color: var(--google-grey-300);
}

#defaultTheme {
  --cr-theme-icon-frame-color: rgb(222, 225, 230);
    --cr-theme-icon-active-tab-color: white;
}

@media (prefers-color-scheme: dark) {
#defaultTheme {
  --cr-theme-icon-frame-color: rgb(var(--google-grey-900-rgb));
      --cr-theme-icon-active-tab-color: rgb(50, 54, 57);
}

}

paper-tooltip {
  --paper-tooltip-delay-in: 100ms;
    --paper-tooltip-duration-in: 100ms;
    --paper-tooltip-duration-out: 100ms;
    --paper-tooltip-min-width: none;
    --paper-tooltip-padding: 5px 4px;
}

</style>
<div id="thirdPartyThemeContainer" hidden="[[!isThirdPartyTheme_(selectedTheme)]]">
  <div id="thirdPartyTheme">
    <div id="thirdPartyBrushIcon"></div>
    <div id="thirdPartyThemeNameContainer">
      <div id="thirdPartyThemeName">
        [[selectedTheme.info.thirdPartyThemeInfo.name]]
      </div>
      <div>[[i18n('thirdPartyThemeDescription')]]</div>
    </div>
    <cr-icon-button id="thirdPartyLink" class="icon-external" role="link" on-click="onThirdPartyLinkButtonClick_">
    </cr-icon-button>
    <cr-button id="uninstallThirdPartyButton" on-click="onUninstallThirdPartyThemeClick_">
      [[i18n('uninstallThirdPartyThemeButton')]]
    </cr-button>
  </div>
</div>
<cr-grid id="themesContainer" columns="6" role="radiogroup">
  <div aria-label="[[i18n('colorPickerLabel')]]" tabindex$="[[getTabIndex_('autogenerated', selectedTheme)]]" on-click="onAutogeneratedThemeClick_" role="radio" aria-checked$="[[getThemeIconCheckedStatus_('autogenerated', selectedTheme)]]">
    <div id="autogeneratedThemeContainer">
      <cr-theme-icon id="autogeneratedTheme" selected$="[[isThemeIconSelected_('autogenerated', selectedTheme)]]">
      </cr-theme-icon>
      <div id="colorPickerIcon" hidden="[[isForcedTheme_(selectedTheme)]]"></div>
      <input id="colorPicker" type="color" on-change="onCustomFrameColorChange_">
    </div>
    <paper-tooltip offset="0" fit-to-visible-bounds="">
      [[i18n('colorPickerLabel')]]
    </paper-tooltip>
  </div>
  <div aria-label="[[i18n('defaultThemeLabel')]]" tabindex$="[[getTabIndex_('default', selectedTheme)]]" on-click="onDefaultThemeClick_" role="radio" aria-checked$="[[getThemeIconCheckedStatus_('default', selectedTheme)]]">
    <cr-theme-icon id="defaultTheme" selected$="[[isThemeIconSelected_('default', selectedTheme)]]">
    </cr-theme-icon>
    <paper-tooltip offset="0" fit-to-visible-bounds="">
      [[i18n('defaultThemeLabel')]]
    </paper-tooltip>
  </div>
  <template is="dom-repeat" id="themes" items="[[chromeThemes_]]">
    <div aria-label="[[item.label]]" tabindex$="[[getTabIndex_(item.id, selectedTheme)]]" on-click="onChromeThemeClick_" class="chrome-theme-wrapper" role="radio" aria-checked$="[[getThemeIconCheckedStatus_(item.id, selectedTheme)]]">
      <cr-theme-icon style="--cr-theme-icon-frame-color:
              [[skColorToRgba_(item.colors.frame)]];
              --cr-theme-icon-active-tab-color:
              [[skColorToRgba_(item.colors.activeTab)]];" selected$="[[isThemeIconSelected_(item.id, selectedTheme)]]">
      </cr-theme-icon>
      <paper-tooltip offset="0" fit-to-visible-bounds="">
        [[item.label]]
      </paper-tooltip>
    </div>
  </template>
</cr-grid>
<template is="dom-if" if="[[showManagedThemeDialog_]]" restamp="">
  <managed-dialog on-close="onManagedDialogClosed_" title="[[i18n('themeManagedDialogTitle')]]" body="[[i18n('themeManagedDialogBody')]]">
  </managed-dialog>
</template>
<!--_html_template_end_-->`}}customElements.define(CustomizeThemesElement.is,CustomizeThemesElement);function getTemplate$i(){return html`<!--_html_template_start_--><style>
  :host {
    --ntp-mini-page-shortcut-color: var(--google-grey-300);
  }

  .mini-page {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  .mini-header {
    height: 28%;
    width: 92%;
  }

  :host(:not([single-colored-logo])) .mini-header {
    background-image: url(icons/colored_header.svg);
    background-repeat: no-repeat;
    background-size: 100%;
  }

  :host([single-colored-logo]) .mini-header {
    -webkit-mask-image: url(icons/colored_header.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--google-grey-300);
  }

  .mini-shortcuts {
    -webkit-mask-image: url(icons/shortcut_circles.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--ntp-mini-page-shortcut-color);
    height: 29%;
    margin-top: 8%;
    width: 82%;
  }

  @media (prefers-color-scheme: dark) {
    :host(:not([single-colored-logo])) .mini-header,
    .mini-header {
      -webkit-mask-image: url(icons/colored_header.svg);
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-size: 100%;
      background: white;
    }
  }
</style>
<div class="mini-page">
  <div class="mini-header"></div>
  <div class="mini-shortcuts"></div>
</div>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class MiniPageElement extends PolymerElement{static get is(){return"ntp-mini-page"}static get template(){return getTemplate$i()}}customElements.define(MiniPageElement.is,MiniPageElement);function getTemplate$h(){return html`<!--_html_template_start_--><style include="cr-hidden-style">
  :host {
    display: flex;
  }

  #container {
    padding: 4px;
  }

  cr-grid {
    --cr-grid-gap: 8px;
  }

  .tile {
    cursor: pointer;
    outline-width: 0;
  }

  ntp-iframe {
    pointer-events: none;
  }

  :host-context(.focus-outline-visible) .tile:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .image {
    border-radius: 4px;
    display: block;
    height: 176px;
    width: 176px;
  }

  .label {
    color: var(--cr-primary-text-color);
    margin-bottom: 4px;
    margin-top: 12px;
    min-height: 30px;
  }

  .selected {
    background-color: var(--ntp-selected-background-color);
    border-radius: 4px;
    position: relative;
  }

  .selected .image,
  .selected #uploadFromDevice {
    box-shadow: 0 1px 3px 0 rgba(var(--google-grey-800-rgb), .3),
        0 4px 8px 3px rgba(var(--google-grey-800-rgb), .15);
  }

  .selected .image {
    transform: scale(.8);
  }

  .selected-circle {
    background-color: var(--ntp-background-override-color);
    border-radius: 50%;
    box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .16),
        0 1px 2px 1px rgba(0, 0, 0, .23);
    display: none;
    height: 22px;
    left: initial;
    position: absolute;
    right: 10px;
    top: 8px;
    width: 22px;
  }

  :host-context([dir=rtl]) .selected-circle {
    left: 10px;
    right: initial;
  }

  .selected-check {
    -webkit-mask-image: url(icons/check_circle.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 28px;
    background-color: var(--ntp-selected-border-color);
    display: none;
    height: 28px;
    left: initial;
    position: absolute;
    right: 7px;
    top: 5px;
    width: 28px;
  }

  :host-context([dir=rtl]) .selected-check {
    left: 7px;
    right: initial;
  }

  .selected :-webkit-any(.selected-circle, .selected-check) {
    display: block;
  }

  #noBackground .image,
  #uploadFromDevice .image {
    background: var(--ntp-background-override-color);
    border: 1px solid var(--ntp-border-color);
  }

  #uploadFromDevice {
    position: relative;
  }

  #uploadFromDeviceImage {
    position: absolute;
    top: 0;
    width: 100%;
  }

  #uploadFromDeviceImage .label {
    text-align: center;
  }

  #uploadIcon {
    -webkit-mask-image: url(icons/upload.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--google-grey-700);
    height: 32px;
    margin: 61px auto 8px;
    width: 32px;
  }

  #backgroundsDisabled {
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  #backgroundsDisabledIcon {
    -webkit-mask-image: url(chrome://resources/images/business.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-primary-text-color);
    height: 48px;
    margin: auto;
    width: 48px;
  }

  #backgroundsDisabledTitle {
    margin-top: 10px;
    text-align: center;
    width: 50%;
  }

  @media (prefers-color-scheme: dark) {
    .selected .image,
    .selected #uploadFromDevice {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3),
          0 4px 8px 3px rgba(0, 0, 0, .15);
    }

    #uploadIcon {
      background-color: var(--google-grey-500);
    }
  }
</style>
<div id="backgroundsDisabled" hidden$="[[!customBackgroundDisabledByPolicy_]]">
  <div id="backgroundsDisabledIcon"></div>
  <div id="backgroundsDisabledTitle">Custom backgrounds have been turned off by your administrator</div>
</div>
<cr-grid id="collections" columns="3" hidden="[[!showBackgroundSelection_]]">
  <div id="uploadFromDevice" class="tile" role="button" on-click="onUploadFromDeviceClick_" tabindex="0">
    <div class$="[[getCustomBackgroundClass_(theme, backgroundSelection)]]">
      <div class="image">
      </div>
      <div id="uploadFromDeviceImage">
        <div id="uploadIcon"></div>
        <div class="label">Upload from device</div>
      </div>
      <div class="selected-circle"></div>
      <div class="selected-check"></div>
    </div>
    <div class="label"></div>
  </div>
  <div id="noBackground" class="tile" role="button" on-click="onDefaultClick_" tabindex="0">
    <div class$="[[getNoBackgroundClass_(theme, backgroundSelection)]]">
      <div class="image">
        <ntp-mini-page></ntp-mini-page>
      </div>
      <div class="selected-circle"></div>
      <div class="selected-check"></div>
    </div>
    <div class="label">Classic Chrome</div>
  </div>
  <dom-repeat id="collectionsRepeat" items="[[collections_]]">
    <template>
      <div class="tile" tabindex="0" title="[[item.label]]" role="button" on-click="onCollectionClick_">
        <ntp-iframe class="image" src="chrome-untrusted://new-tab-page/background_image?[[item.previewImageUrl.url]]">
        </ntp-iframe>
        <div class="label">[[item.label]]</div>
      </div>
    </template>
  </dom-repeat>
</cr-grid>
<cr-grid id="images" columns="3" hidden="[[!selectedCollection]]">
  <dom-repeat id="imagesRepeat" items="[[images_]]">
    <template>
      <div class$="tile
              [[getImageSelectedClass_(index, theme, backgroundSelection)]]" tabindex="0" title="[[item.attribution1]]" role="button" on-click="onImageClick_">
        <ntp-iframe class="image" src="chrome-untrusted://new-tab-page/background_image?[[item.previewImageUrl.url]]">
        </ntp-iframe>
        <div class="selected-circle"></div>
        <div class="selected-check"></div>
      </div>
    </template>
  </dom-repeat>
</cr-grid>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class CustomizeBackgroundsElement extends PolymerElement{constructor(){super();if(this.customBackgroundDisabledByPolicy_){return}this.pageHandler_=NewTabPageProxy.getInstance().handler;this.pageHandler_.getBackgroundCollections().then((({collections:collections})=>{this.collections_=collections}))}static get is(){return"ntp-customize-backgrounds"}static get template(){return getTemplate$h()}static get properties(){return{customBackgroundDisabledByPolicy_:{type:Boolean,value:()=>loadTimeData.getBoolean("customBackgroundDisabledByPolicy")},showBackgroundSelection_:{type:Boolean,computed:"computeShowBackgroundSelection_(selectedCollection)"},selectedCollection:{notify:true,observer:"onSelectedCollectionChange_",type:Object,value:null},theme:Object,collections_:Array,images_:Array}}computeShowBackgroundSelection_(){return!this.customBackgroundDisabledByPolicy_&&!this.selectedCollection}getCustomBackgroundClass_(){return this.theme&&this.theme.backgroundImage&&this.theme.backgroundImage.url.url.startsWith("chrome-untrusted://new-tab-page/background.jpg")?"selected":""}getNoBackgroundClass_(){return this.theme&&(this.theme.backgroundImage&&!this.theme.isCustomBackground||!this.theme.backgroundImage&&!this.theme.dailyRefreshCollectionId)?"selected":""}getImageSelectedClass_(index){const{url:url}=this.images_[index].imageUrl;return this.theme&&this.theme.backgroundImage&&this.theme.backgroundImage.url.url===url&&!this.theme.dailyRefreshCollectionId?"selected":""}onCollectionClick_(e){this.selectedCollection=e.model.item;this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kBackgroundsCollectionOpened)}async onUploadFromDeviceClick_(){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kBackgroundsUploadFromDeviceClicked);const{success:success}=await this.pageHandler_.chooseLocalCustomBackground();if(success){this.dispatchEvent(new Event("close",{bubbles:true,composed:true}))}}onDefaultClick_(){if(!this.theme.isCustomBackground){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kBackgroundsNoBackgroundSelected)}this.pageHandler_.setNoBackgroundImage()}onImageClick_(e){const image=e.model.item;if(this.theme.isCustomBackground&&this.theme.backgroundImage.url.url!==image.imageUrl.url){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kBackgroundsImageSelected)}const{attribution1:attribution1,attribution2:attribution2,attributionUrl:attributionUrl,imageUrl:imageUrl}=image;this.pageHandler_.setBackgroundImage(attribution1,attribution2,attributionUrl,imageUrl)}async onSelectedCollectionChange_(){this.images_=[];if(!this.selectedCollection){return}const collectionId=this.selectedCollection.id;const{images:images}=await this.pageHandler_.getBackgroundImages(collectionId);if(!this.selectedCollection||this.selectedCollection.id!==collectionId){return}this.images_=images}revertBackgroundChanges(){this.pageHandler_.revertBackgroundChanges()}confirmBackgroundChanges(){this.pageHandler_.confirmBackgroundChanges()}}customElements.define(CustomizeBackgroundsElement.is,CustomizeBackgroundsElement);function getTemplate$g(){return html`<!--_html_template_start_--><style include="cr-icons">
  :host {
    line-height: 20px;
  }

  #options {
    display: flex;
  }

  .option {
    margin-inline-end: 9px;
    width: 268px;
  }

  .option-image {
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    height: 176px;
    position: relative;
    width: 268px;
  }

  :host-context(.focus-outline-visible) .option-image:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .selected .option-image {
    background-color: var(--ntp-selected-background-color);
    border-color: var(--ntp-selected-border-color);
  }

  .option-mini {
    background-color: var(--ntp-background-override-color);
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    box-sizing: border-box;
    height: 144px;
    position: absolute;
    right: 40px;
    top: 16px;
    width: 144px;
  }

  :host-context([dir='rtl']) .option-mini {
    left: 40px;
    right: unset;
  }

  .selected .option-mini {
    border-color: transparent;
    box-shadow: 0 1px 3px 0 rgba(var(--google-grey-800-rgb), .3),
        0 4px 8px 3px rgba(var(--google-grey-800-rgb), .15);
  }

  @media (prefers-color-scheme: dark) {
    .selected .option-mini {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3),
          0 4px 8px 3px rgba(0, 0, 0, .15);
    }
  }

  ntp-mini-page {
    --ntp-mini-page-shortcut-color: var(--google-grey-500);
  }

  .selected ntp-mini-page {
    --ntp-mini-page-shortcut-color: var(--ntp-selected-border-color);
  }

  .option-icon {
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background: 96px 96px var(--ntp-border-color);
    height: 96px;
    left: 16px;
    position: absolute;
    top: 48px;
    width: 96px;
  }

  #optionCustomLinks .option-icon {
    -webkit-mask-image: url(icons/account_circle.svg);
  }

  #optionMostVisited .option-icon {
    -webkit-mask-image: url(icons/generic_globe.svg);
  }

  :host-context([dir='rtl']) .option-icon {
    right: 16px;
  }

  .selected .option-icon {
    background-color: var(--ntp-selected-light-background-color);
  }

  @media (prefers-color-scheme: dark) {
    .selected .option-icon {
      background-color: var(--ntp-selected-border-color);
    }
  }

  .option-image .selected-circle {
    box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .16),
        0 1px 2px 1px rgba(0, 0, 0, .23);
    height: 22px;
    left: 209px;
    top: 9px;
    width: 22px;
  }

  :host-context([dir='rtl']) .option-image .selected-circle {
    left: 0;
    right: 209px;
  }

  .option-image .selected-check {
    left: initial;
    right: 32px;
    top: 6px;
  }

  :host-context([dir='rtl']) .option-image .selected-check {
    left: 32px;
    right: initial;
  }

  .option-title {
    font-weight: bold;
    margin-bottom: 4px;
    margin-top: 12px;
  }

  .option-description {
    color: var(--cr-secondary-text-color);
  }

  .selected #hideDescription {
    color: var(--ntp-selected-border-color);
  }

  #hide {
    align-items: center;
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    height: 64px;
    margin-top: 24px;
    max-width: 544px;
    width: 100%;
  }

  #hide.selected {
    background-color: var(--ntp-selected-background-color);
    border-color: var(--ntp-selected-border-color);
    color: var(--ntp-selected-border-color);
  }

  #hideIcon {
    margin-inline-end: 20px;
    margin-inline-start: 24px;
  }

  .selected #hideIcon {
    background-color: var(--ntp-selected-border-color);
  }

  #hideTitleContainer {
    flex-grow: 1;
  }

  #hideTitle {
    font-weight: bold;
  }

  cr-toggle {
    margin-inline-end: 20px;
  }

  .selected-circle {
    background: var(--ntp-background-override-color) no-repeat center;
    border-radius: 50%;
    display: none;
    height: 22px;
    left: 66px;
    position: absolute;
    top: 46px;
    width: 22px;
  }

  :host-context([dir='rtl']) .selected-circle {
    left: auto;
    right: 66px;
  }

  .selected-check {
    background: url(icons/check_circle.svg) no-repeat center;
    background-size: 28px 28px;
    display: none;
    height: 28px;
    left: 63px;
    position: absolute;
    top: 43px;
    width: 28px;
  }

  .selected :-webkit-any(.selected-circle, .selected-check) {
    display: block;
  }

  :host-context([dir='rtl']) .selected-check {
    left: auto;
    right: 63px;
  }

  @media (prefers-color-scheme: dark) {
    .selected-check {
      background: transparent;
    }
  }

  /* We use ::after without content to provide the masked check element. */
  @media (prefers-color-scheme: dark) {
    .selected-check::after {
      -webkit-mask-image: url(icons/check_circle.svg);
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-size: 28px;
      background-color: var(--google-blue-300);
      content: '';
      display: block;
      height: 28px;
      left: 0;
      position: absolute;
      top: 0;
      width: 28px;
    }
  }
</style>
<div id="options">
  <div id="optionCustomLinks" class$="option [[getCustomLinksSelected_(customLinksEnabled_, hide_)]]">
    <cr-button id="optionCustomLinksButton" class="option-image" tabindex="0" aria-pressed$="[[getCustomLinksAriaPressed_(customLinksEnabled_,
            hide_)]]" title="My shortcuts" on-click="onCustomLinksClick_" noink="">
      <div class="option-icon"></div>
      <div class="option-mini">
        <ntp-mini-page single-colored-logo=""></ntp-mini-page>
      </div>
      <div class="selected-circle"></div>
      <div class="selected-check"></div>
    </cr-button>
    <div class="option-title">My shortcuts</div>
    <div class="option-description">Shortcuts are curated by you</div>
  </div>
  <div id="optionMostVisited" class$="option [[getMostVisitedSelected_(customLinksEnabled_, hide_)]]">
    <cr-button id="optionMostVisitedButton" class="option-image" tabindex="0" aria-pressed$="[[getMostVisitedAriaPressed_(customLinksEnabled_,
            hide_)]]" title="Most visited sites" on-click="onMostVisitedClick_" on-keydown="onMostVistedKey" noink="">
      <div class="option-icon"></div>
      <div class="option-mini">
        <ntp-mini-page single-colored-logo=""></ntp-mini-page>
      </div>
      <div class="selected-circle"></div>
      <div class="selected-check"></div>
    </cr-button>
    <div class="option-title">Most visited sites</div>
    <div class="option-description">Shortcuts are suggested based on websites you visit often</div>
  </div>
</div>
<div id="hide" class$="[[getHideClass_(hide_)]]">
  <div id="hideIcon" class="cr-icon icon-visibility-off"></div>
  <div id="hideTitleContainer">
    <div id="hideTitle">Hide shortcuts</div>
    <div id="hideDescription" class="option-description">
      Don&#39;t show shortcuts on this page
    </div>
  </div>
  <cr-toggle id="hideToggle" title="Hide shortcuts" checked="[[hide_]]" on-change="onHideChange_"></cr-toggle>
</div>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class CustomizeShortcutsElement extends PolymerElement{constructor(){super();const{handler:handler}=NewTabPageProxy.getInstance();this.pageHandler_=handler;this.pageHandler_.getMostVisitedSettings().then((({customLinksEnabled:customLinksEnabled,shortcutsVisible:shortcutsVisible})=>{this.customLinksEnabled_=customLinksEnabled;this.hide_=!shortcutsVisible}))}static get is(){return"ntp-customize-shortcuts"}static get template(){return getTemplate$g()}static get properties(){return{customLinksEnabled_:Boolean,hide_:Boolean}}connectedCallback(){super.connectedCallback();FocusOutlineManager.forDocument(document)}apply(){this.pageHandler_.setMostVisitedSettings(this.customLinksEnabled_,!this.hide_)}getCustomLinksAriaPressed_(){return!this.hide_&&this.customLinksEnabled_?"true":"false"}getCustomLinksSelected_(){return!this.hide_&&this.customLinksEnabled_?"selected":""}getHideClass_(){return this.hide_?"selected":""}getMostVisitedAriaPressed_(){return!this.hide_&&!this.customLinksEnabled_?"true":"false"}getMostVisitedSelected_(){return!this.hide_&&!this.customLinksEnabled_?"selected":""}onCustomLinksClick_(){if(!this.customLinksEnabled_){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kShortcutsCustomLinksClicked)}this.customLinksEnabled_=true;this.hide_=false}onHideChange_(e){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kShortcutsVisibilityToggleClicked);this.hide_=e.detail}onMostVisitedClick_(){if(this.customLinksEnabled_){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kShortcutsMostVisitedClicked)}this.customLinksEnabled_=false;this.hide_=false}}customElements.define(CustomizeShortcutsElement.is,CustomizeShortcutsElement);// Copyright 2018 The Chromium Authors. All rights reserved.
const CrRadioButtonBehaviorImpl={properties:{checked:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,notify:true},focusable:{type:Boolean,value:false,observer:"onFocusableChanged_"},label:{type:String,value:""},name:{type:String,notify:true,reflectToAttribute:true},buttonTabIndex_:{type:Number,computed:"getTabIndex_(focusable)"}},listeners:{blur:"hideRipple_",focus:"onFocus_",up:"hideRipple_"},focus(){this.$.button.focus()},onFocusableChanged_(){const links=this.querySelectorAll("a");links.forEach((link=>{link.tabIndex=this.checked?0:-1}))},onFocus_(){this.getRipple().showAndHoldDown()},hideRipple_(){this.getRipple().clear()},getAriaChecked_(){return this.checked?"true":"false"},getAriaDisabled_(){return this.disabled?"true":"false"},getTabIndex_(){return this.focusable?0:-1},onInputKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}},_createRipple(){this._rippleContainer=this.$$(".disc-wrapper");const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}};const CrRadioButtonBehavior=[PaperRippleBehavior,CrRadioButtonBehaviorImpl];const template=document.createElement("template");template.innerHTML=`<dom-module id="cr-radio-button-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-radio-button-style">:host {\n  --cr-radio-button-checked-color: var(--google-blue-600);\n        --cr-radio-button-checked-ripple-color:\n            rgba(var(--google-blue-600-rgb), .2);\n        --cr-radio-button-ink-size: 40px;\n        --cr-radio-button-size: 16px;\n        --cr-radio-button-unchecked-color: var(--google-grey-700);\n        --cr-radio-button-unchecked-ripple-color:\n            rgba(var(--google-grey-600-rgb), .15);\n\n        --ink-to-circle: calc((var(--cr-radio-button-ink-size) -\n                               var(--cr-radio-button-size)) / 2);\n        align-items: center;\n        display: flex;\n        flex-shrink: 0;\n        outline: none;\n}\n\n@media (prefers-color-scheme: dark) {\n:host {\n  --cr-radio-button-checked-color: var(--google-blue-300);\n          --cr-radio-button-checked-ripple-color:\n              rgba(var(--google-blue-300-rgb), .4);\n          --cr-radio-button-unchecked-color: var(--google-grey-500);\n          --cr-radio-button-unchecked-ripple-color:\n              rgba(var(--google-grey-300-rgb), .4);\n}\n\n}\n\n:host([disabled]) {\n  opacity: var(--cr-disabled-opacity);\n        \n        pointer-events: none;\n}\n\n:host(:not([disabled])) {\n  cursor: pointer;\n}\n\n#labelWrapper {\n  flex: 1;\n        margin-inline-start: var(--cr-radio-button-label-spacing, 20px);\n}\n\n#label {\n  color: inherit;\n}\n\n.disc-border, .disc, .disc-wrapper, paper-ripple {\n  border-radius: 50%;\n}\n\n.disc-wrapper {\n  height: var(--cr-radio-button-size);\n        margin-block-start: var(--cr-radio-button-disc-margin-block-start, 0);\n        position: relative;\n        width: var(--cr-radio-button-size);\n}\n\n.disc-border, .disc {\n  box-sizing: border-box;\n        height: var(--cr-radio-button-size);\n        width: var(--cr-radio-button-size);\n}\n\n.disc-border {\n  border: 2px solid var(--cr-radio-button-unchecked-color);\n}\n\n:host([checked]) .disc-border {\n  border-color: var(--cr-radio-button-checked-color);\n}\n\n#button:focus {\n  outline: none;\n}\n\n.disc {\n  background-color: transparent;\n        position: absolute;\n        top: 0;\n        transform: scale(0);\n        transition: border-color 200ms, transform 200ms;\n}\n\n:host([checked]) .disc {\n  background-color: var(--cr-radio-button-checked-color);\n        transform: scale(0.5);\n}\n\npaper-ripple {\n  --paper-ripple-opacity: 1;  \n        color: var(--cr-radio-button-unchecked-ripple-color);\n        height: var(--cr-radio-button-ink-size);\n        left: calc(-1 * var(--ink-to-circle));\n        pointer-events: none;\n        position: absolute;\n        top: calc(-1 * var(--ink-to-circle));\n        transition: color linear 80ms;\n        width: var(--cr-radio-button-ink-size);\n}\n\n:host-context([dir=rtl]) paper-ripple {\n  left: auto;\n        right: calc(-1 * var(--ink-to-circle));\n}\n\n:host([checked]) paper-ripple {\n  color: var(--cr-radio-button-checked-ripple-color);\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template.content.cloneNode(true));// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-radio-button-style cr-hidden-style" scope="cr-radio-button"></style>

    <div aria-checked$="[[getAriaChecked_(checked)]]" aria-describedby="slotted-content" aria-disabled$="[[getAriaDisabled_(disabled)]]" aria-labelledby="label" class="disc-wrapper" id="button" role="radio" tabindex$="[[buttonTabIndex_]]" on-keydown="onInputKeydown_">
      <div class="disc-border"></div>
      <div class="disc"></div>
    </div>

    <div id="labelWrapper">
      <span id="label" hidden$="[[!label]]" aria-hidden="true">[[label]]</span>
      <span id="slotted-content">
        <slot></slot>
      </span>
    </div>
<!--_html_template_end_-->`,is:"cr-radio-button",behaviors:[CrRadioButtonBehavior]});// Copyright 2018 The Chromium Authors. All rights reserved.
function isEnabled(radio){return radio.matches(":not([disabled]):not([hidden])")&&radio.style.display!=="none"&&radio.style.visibility!=="hidden"}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-radio-group">:host {
  display: inline-block;
}

:host ::slotted(*) {
  padding: var(--cr-radio-group-item-padding, 12px);
}

:host([disabled]) {
  cursor: initial;
        pointer-events: none;
        user-select: none;
}

:host([disabled]) ::slotted(*) {
  opacity: var(--cr-disabled-opacity);
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,is:"cr-radio-group",properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"update_"},selected:{type:String,notify:true,observer:"update_"},selectableElements:{type:String,value:"cr-radio-button, cr-card-radio-button, controlled-radio-button"},selectableRegExp_:{value:Object,computed:"computeSelectableRegExp_(selectableElements)"}},listeners:{keydown:"onKeyDown_",click:"onClick_"},hostAttributes:{"aria-disabled":"false",role:"radiogroup"},buttons_:null,buttonEventTracker_:null,deltaKeyMap_:null,isRtl_:false,observer_:null,populateBound_:null,attached(){this.isRtl_=this.matches(":host-context([dir=rtl]) cr-radio-group");this.deltaKeyMap_=new Map([["ArrowDown",1],["ArrowLeft",this.isRtl_?1:-1],["ArrowRight",this.isRtl_?-1:1],["ArrowUp",-1],["PageDown",1],["PageUp",-1]]);this.buttonEventTracker_=new EventTracker;this.populateBound_=()=>this.populate_();if(Polymer.DomIf){this.$$("slot").addEventListener("slotchange",this.populateBound_)}else{this.observer_=dom(this).observeNodes(this.populateBound_)}this.populate_()},detached(){if(Polymer.DomIf){this.$$("slot").removeEventListener("slotchange",this.populateBound_)}else if(this.observer_){dom(this).unobserveNodes(this.observer_)}this.buttonEventTracker_.removeAll()},focus(){if(this.disabled||!this.buttons_){return}const radio=this.buttons_.find((radio=>this.isButtonEnabledAndSelected_(radio)));if(radio){radio.focus()}},onKeyDown_(event){if(this.disabled){return}if(event.ctrlKey||event.shiftKey||event.metaKey||event.altKey){return}const targetElement=event.target;if(!this.buttons_.includes(targetElement)){return}if(event.key===" "||event.key==="Enter"){event.preventDefault();this.select_(event.target);return}const enabledRadios=this.buttons_.filter(isEnabled);if(enabledRadios.length===0){return}let selectedIndex;const max=enabledRadios.length-1;if(event.key==="Home"){selectedIndex=0}else if(event.key==="End"){selectedIndex=max}else if(this.deltaKeyMap_.has(event.key)){const delta=this.deltaKeyMap_.get(event.key);const lastSelection=enabledRadios.findIndex((radio=>radio.checked));selectedIndex=Math.max(0,lastSelection)+delta;if(selectedIndex>max){selectedIndex=0}else if(selectedIndex<0){selectedIndex=max}}else{return}const radio=enabledRadios[selectedIndex];const name=`${radio.name}`;if(this.selected!==name){event.preventDefault();this.selected=name;radio.focus()}},computeSelectableRegExp_(){const tags=this.selectableElements.split(", ").join("|");return new RegExp(`^(${tags})$`,"i")},onClick_(event){const path=event.composedPath();if(path.some((target=>/^a$/i.test(target.tagName)))){return}const target=path.find((n=>this.selectableRegExp_.test(n.tagName)));if(target&&this.buttons_.includes(target)){this.select_(target)}},populate_(){this.buttons_=Polymer.DomIf?this.$$("slot").assignedNodes({flatten:true}).filter((n=>this.selectableRegExp_.test(n.tagName))):this.queryAllEffectiveChildren(this.selectableElements);this.buttonEventTracker_.removeAll();this.buttons_.forEach((el=>{this.buttonEventTracker_.add(el,"disabled-changed",(()=>this.populate_()));this.buttonEventTracker_.add(el,"name-changed",(()=>this.populate_()))}));this.update_()},select_(button){if(!isEnabled(button)){return}const name=`${button.name}`;if(this.selected!==name){this.selected=name}},isButtonEnabledAndSelected_(button){return!this.disabled&&button.checked&&isEnabled(button)},update_(){if(!this.buttons_){return}let noneMadeFocusable=true;this.buttons_.forEach((radio=>{radio.checked=this.selected!==undefined&&`${radio.name}`===`${this.selected}`;const disabled=this.disabled||!isEnabled(radio);const canBeFocused=radio.checked&&!disabled;if(canBeFocused){radio.focusable=true;noneMadeFocusable=false}else{radio.focusable=false}radio.setAttribute("aria-disabled",`${disabled}`)}));this.setAttribute("aria-disabled",`${this.disabled}`);if(noneMadeFocusable&&!this.disabled){const radio=this.buttons_.find(isEnabled);if(radio){radio.focusable=true}}}});// Copyright 2015 The Chromium Authors. All rights reserved.
var CrPolicyStrings;const CrPolicyIndicatorType={DEVICE_POLICY:"devicePolicy",EXTENSION:"extension",NONE:"none",OWNER:"owner",PRIMARY_USER:"primary_user",RECOMMENDED:"recommended",USER_POLICY:"userPolicy",PARENT:"parent",CHILD_RESTRICTION:"childRestriction"};const CrPolicyIndicatorBehavior={properties:{indicatorType:{type:String,value:CrPolicyIndicatorType.NONE},indicatorSourceName:{type:String,value:""},indicatorVisible:{type:Boolean,computed:"getIndicatorVisible_(indicatorType)"},indicatorIcon:{type:String,computed:"getIndicatorIcon_(indicatorType)"}},getIndicatorVisible_(type){return type!==CrPolicyIndicatorType.NONE},getIndicatorIcon_(type){switch(type){case CrPolicyIndicatorType.EXTENSION:return"cr:extension";case CrPolicyIndicatorType.NONE:return"";case CrPolicyIndicatorType.PRIMARY_USER:return"cr:group";case CrPolicyIndicatorType.OWNER:return"cr:person";case CrPolicyIndicatorType.USER_POLICY:case CrPolicyIndicatorType.DEVICE_POLICY:case CrPolicyIndicatorType.RECOMMENDED:return"cr20:domain";case CrPolicyIndicatorType.PARENT:case CrPolicyIndicatorType.CHILD_RESTRICTION:return"cr20:kite";default:assertNotReached()}},getIndicatorTooltip(type,name,matches){if(!window["CrPolicyStrings"]){return""}CrPolicyStrings=window["CrPolicyStrings"];switch(type){case CrPolicyIndicatorType.EXTENSION:return name.length>0?CrPolicyStrings.controlledSettingExtension.replace("$1",name):CrPolicyStrings.controlledSettingExtensionWithoutName;case CrPolicyIndicatorType.PRIMARY_USER:return CrPolicyStrings.controlledSettingShared.replace("$1",name);case CrPolicyIndicatorType.OWNER:return name.length>0?CrPolicyStrings.controlledSettingWithOwner.replace("$1",name):CrPolicyStrings.controlledSettingNoOwner;case CrPolicyIndicatorType.USER_POLICY:case CrPolicyIndicatorType.DEVICE_POLICY:return CrPolicyStrings.controlledSettingPolicy;case CrPolicyIndicatorType.RECOMMENDED:return matches?CrPolicyStrings.controlledSettingRecommendedMatches:CrPolicyStrings.controlledSettingRecommendedDiffers;case CrPolicyIndicatorType.PARENT:return CrPolicyStrings.controlledSettingParent;case CrPolicyIndicatorType.CHILD_RESTRICTION:return CrPolicyStrings.controlledSettingChildRestriction}return""}};// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="cr-tooltip-icon">:host {
  display: flex;
}

iron-icon {
  --iron-icon-width: var(--cr-icon-size);
        --iron-icon-height: var(--cr-icon-size);
        --iron-icon-fill-color:
          var(--cr-tooltip-icon-fill-color, var(--google-grey-700));
}

</style>
    <iron-icon id="indicator" tabindex="0" aria-label$="[[iconAriaLabel]]" aria-describedby="tooltip" icon="[[iconClass]]" role="img"></iron-icon>
    <paper-tooltip id="tooltip" for="indicator" position="[[tooltipPosition]]" fit-to-visible-bounds="" part="tooltip">
      <slot name="tooltip-text">[[tooltipText]]</slot>
    </paper-tooltip>
<!--_html_template_end_-->`,is:"cr-tooltip-icon",properties:{iconAriaLabel:String,iconClass:String,tooltipText:String,tooltipPosition:{type:String,value:"top"}},getFocusableElement(){return this.$.indicator}});// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-policy-indicator"></style>
    <cr-tooltip-icon hidden$="[[!indicatorVisible]]" tooltip-text="[[indicatorTooltip_]]" icon-class="[[indicatorIcon]]" icon-aria-label="[[iconAriaLabel]]">
    </cr-tooltip-icon>
<!--_html_template_end_-->`,is:"cr-policy-indicator",behaviors:[CrPolicyIndicatorBehavior],properties:{iconAriaLabel:String,indicatorTooltip_:{type:String,computed:"getIndicatorTooltip_(indicatorType, indicatorSourceName)"}},getIndicatorTooltip_(indicatorType,indicatorSourceName){return this.getIndicatorTooltip(indicatorType,indicatorSourceName)}});function getTemplate$f(){return html`<!--_html_template_start_--><style>
  :host {
    line-height: 20px;
  }

  #show {
    align-items: center;
    display: flex;
    margin-bottom: 24px;
    margin-top: 14px;
  }

  cr-radio-button {
    height: 20px;
    padding: 0;
  }

  cr-radio-button + cr-radio-button {
    margin-top: 31px;
  }

  #show cr-policy-indicator {
    --cr-icon-size: 48px;
    margin-inline-start: 48px;
  }

  #toggles {
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    box-sizing: border-box;
    margin-inline-end: 51px;
    margin-inline-start: 36px;
    max-width: 544px;
  }

  .toggle-row,
  .discount-toggle-row {
    align-items: center;
    display: flex;
    height: 52px;
  }

  .toggle-section + .toggle-section {
    border-top: 1px solid var(--ntp-border-color);
  }

  .toggle-name {
    flex-grow: 1;
    margin-inline-start: 24px;
  }

  .toggle-row cr-policy-indicator {
    margin-inline-end: 24px;
  }

  cr-toggle {
    margin-inline-end: 20px;
  }
</style>
<div id="show">
  <cr-radio-group selected="[[radioSelection_(show_)]]" disabled="[[showManagedByPolicy_]]" on-selected-changed="onShowRadioSelectionChanged_">
    <cr-radio-button id="hideButton" name="hide" label="Hide all cards">
    </cr-radio-button>
    <cr-radio-button id="customizeButton" name="customize" label="Customize cards">
    </cr-radio-button>
  </cr-radio-group>
  <cr-policy-indicator indicator-type="devicePolicy" hidden="[[!showManagedByPolicy_]]">
  </cr-policy-indicator>
</div>
<div id="toggles">
  <template id="toggleRepeat" is="dom-repeat" items="[[modules_]]">
    <div class="toggle-section">
      <div class="toggle-row">
        <div class="toggle-name">[[item.name]]</div>
        <cr-policy-indicator indicator-type="devicePolicy" hidden="[[!showManagedByPolicy_]]">
        </cr-policy-indicator>
        <cr-toggle checked="{{item.checked}}" disabled="[[moduleToggleDisabled_(show_, showManagedByPolicy_)]]" title="[[item.name]]">
        </cr-toggle>
      </div>
      <!-- Discount toggle is a workaround for crbug.com/1199465 and will be
      removed after module customization is better defined. Please avoid
      using similar pattern for other features. -->
      <template is="dom-if" if="[[showDiscountToggle_(item.id, item.checked, discountToggleEligible_)]]">
        <div class="discount-toggle-row">
          <div class="toggle-name">
            Get discounts
          </div>
          <cr-toggle checked="{{discountToggle_.enabled}}" title="Get discounts"></cr-toggle>
        </div>
      </template>
    </div>
  </template>
</div>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
let handler$3=null;class ChromeCartProxy{static getHandler(){return handler$3||(handler$3=CartHandler.getRemote())}static setHandler(newHandler){handler$3=newHandler}constructor(){}}// Copyright 2014 The Chromium Authors. All rights reserved.
class FocusRow{constructor(root,boundary,delegate){this.root=root;this.boundary_=boundary||document.documentElement;this.delegate=delegate;this.eventTracker=new EventTracker}static isFocusable(element){if(!element||element.disabled){return false}let current=element;while(true){assertInstanceof(current,Element);const style=window.getComputedStyle(current);if(style.visibility==="hidden"||style.display==="none"){return false}const parent=current.parentNode;if(!parent){return false}if(parent===current.ownerDocument||parent instanceof DocumentFragment){return true}current=parent}}static getFocusableElement(element){if(element.getFocusableElement){return element.getFocusableElement()}return element}addItem(type,selectorOrElement){assert(type);let element;if(typeof selectorOrElement==="string"){element=this.root.querySelector(selectorOrElement)}else{element=selectorOrElement}if(!element){return false}element.setAttribute("focus-type",type);element.tabIndex=this.isActive()?0:-1;this.eventTracker.add(element,"blur",this.onBlur_.bind(this));this.eventTracker.add(element,"focus",this.onFocus_.bind(this));this.eventTracker.add(element,"keydown",this.onKeydown_.bind(this));this.eventTracker.add(element,"mousedown",this.onMousedown_.bind(this));return true}destroy(){this.eventTracker.removeAll()}getCustomEquivalent(sampleElement){return assert(this.getFirstFocusable())}getElements(){return Array.from(this.root.querySelectorAll("[focus-type]")).map(FocusRow.getFocusableElement)}getEquivalentElement(sampleElement){if(this.getFocusableElements().indexOf(sampleElement)>=0){return sampleElement}const sampleFocusType=this.getTypeForElement(sampleElement);if(sampleFocusType){const sameType=this.getFirstFocusable(sampleFocusType);if(sameType){return sameType}}return this.getCustomEquivalent(sampleElement)}getFirstFocusable(opt_type){const element=this.getFocusableElements().find((el=>!opt_type||el.getAttribute("focus-type")===opt_type));return element||null}getFocusableElements(){return this.getElements().filter(FocusRow.isFocusable)}getTypeForElement(element){return element.getAttribute("focus-type")||""}isActive(){return this.root.classList.contains(FocusRow.ACTIVE_CLASS)}makeActive(active){if(active===this.isActive()){return}this.getElements().forEach((function(element){element.tabIndex=active?0:-1}));this.root.classList.toggle(FocusRow.ACTIVE_CLASS,active)}onBlur_(e){if(!this.boundary_.contains(e.relatedTarget)){return}const currentTarget=e.currentTarget;if(this.getFocusableElements().indexOf(currentTarget)>=0){this.makeActive(false)}}onFocus_(e){if(this.delegate){this.delegate.onFocus(this,e)}}onMousedown_(e){if(e.button){return}if(!e.currentTarget.disabled){e.currentTarget.tabIndex=0}}onKeydown_(e){const elements=this.getFocusableElements();const currentElement=FocusRow.getFocusableElement(e.currentTarget);const elementIndex=elements.indexOf(currentElement);assert(elementIndex>=0);if(this.delegate&&this.delegate.onKeydown(this,e)){return}const isShiftTab=!e.altKey&&!e.ctrlKey&&!e.metaKey&&e.shiftKey&&e.key==="Tab";if(hasKeyModifiers(e)&&!isShiftTab){return}let index=-1;let shouldStopPropagation=true;if(isShiftTab){index=elementIndex-1;if(index<0){return}}else if(e.key==="ArrowLeft"){index=elementIndex+(isRTL()?1:-1)}else if(e.key==="ArrowRight"){index=elementIndex+(isRTL()?-1:1)}else if(e.key==="Home"){index=0}else if(e.key==="End"){index=elements.length-1}else{shouldStopPropagation=false}const elementToFocus=elements[index];if(elementToFocus){this.getEquivalentElement(elementToFocus).focus();e.preventDefault()}if(shouldStopPropagation){e.stopPropagation()}}}FocusRow.ACTIVE_CLASS="focus-row-active";// Copyright 2017 The Chromium Authors. All rights reserved.
let hideInk=false;assert(!isIOS,"pointerdown doesn't work on iOS");document.addEventListener("pointerdown",(function(){hideInk=true}),true);document.addEventListener("keydown",(function(){hideInk=false}),true);const focusWithoutInk=function(toFocus){if(!("noink"in toFocus)||!hideInk){toFocus.focus();return}assert(document===toFocus.ownerDocument);const{noink:noink}=toFocus;toFocus.noink=true;toFocus.focus();toFocus.noink=noink};// Copyright 2016 The Chromium Authors. All rights reserved.
var AnchorAlignment;(function(AnchorAlignment){AnchorAlignment[AnchorAlignment["BEFORE_START"]=-2]="BEFORE_START";AnchorAlignment[AnchorAlignment["AFTER_START"]=-1]="AFTER_START";AnchorAlignment[AnchorAlignment["CENTER"]=0]="CENTER";AnchorAlignment[AnchorAlignment["BEFORE_END"]=1]="BEFORE_END";AnchorAlignment[AnchorAlignment["AFTER_END"]=2]="AFTER_END"})(AnchorAlignment||(AnchorAlignment={}));const DROPDOWN_ITEM_CLASS="dropdown-item";const SELECTABLE_DROPDOWN_ITEM_QUERY=`.${DROPDOWN_ITEM_CLASS}:not([hidden]):not([disabled])`;const AFTER_END_OFFSET=10;function getStartPointWithAnchor(start,end,menuLength,anchorAlignment,min,max){let startPoint=0;switch(anchorAlignment){case AnchorAlignment.BEFORE_START:startPoint=-menuLength;break;case AnchorAlignment.AFTER_START:startPoint=start;break;case AnchorAlignment.CENTER:startPoint=(start+end-menuLength)/2;break;case AnchorAlignment.BEFORE_END:startPoint=end-menuLength;break;case AnchorAlignment.AFTER_END:startPoint=end;break}if(startPoint+menuLength>max){startPoint=end-menuLength}if(startPoint<min){startPoint=start}startPoint=Math.max(min,Math.min(startPoint,max-menuLength));return startPoint}function getDefaultShowConfig(){return{top:0,left:0,height:0,width:0,anchorAlignmentX:AnchorAlignment.AFTER_START,anchorAlignmentY:AnchorAlignment.AFTER_START,minX:0,minY:0,maxX:0,maxY:0}}class CrActionMenuElement extends PolymerElement{constructor(){super(...arguments);this.boundClose_=null;this.contentObserver_=null;this.resizeObserver_=null;this.hasMousemoveListener_=false;this.anchorElement_=null;this.lastConfig_=null}static get is(){return"cr-action-menu"}static get properties(){return{accessibilityLabel:String,autoReposition:{type:Boolean,value:false},open:{type:Boolean,notify:true,value:false},roleDescription:String}}ready(){super.ready();this.addEventListener("keydown",this.onKeyDown_.bind(this));this.addEventListener("mouseover",this.onMouseover_);this.addEventListener("click",this.onClick_)}disconnectedCallback(){super.disconnectedCallback();this.removeListeners_()}fire_(eventName,detail){this.dispatchEvent(new CustomEvent(eventName,{bubbles:true,composed:true,detail:detail}))}getDialog(){return this.$.dialog}removeListeners_(){window.removeEventListener("resize",this.boundClose_);window.removeEventListener("popstate",this.boundClose_);if(this.contentObserver_){this.contentObserver_.disconnect();this.contentObserver_=null}if(this.resizeObserver_){this.resizeObserver_.disconnect();this.resizeObserver_=null}}onNativeDialogClose_(e){if(e.target!==this.$.dialog){return}this.fire_("close")}onClick_(e){if(e.target===this){this.close();e.stopPropagation()}}onKeyDown_(e){e.stopPropagation();if(e.key==="Tab"||e.key==="Escape"){this.close();if(e.key==="Tab"){this.fire_("tabkeyclose",{shiftKey:e.shiftKey})}e.preventDefault();return}if(e.key!=="Enter"&&e.key!=="ArrowUp"&&e.key!=="ArrowDown"){return}const options=Array.from(this.querySelectorAll(SELECTABLE_DROPDOWN_ITEM_QUERY));if(options.length===0){return}const focused=getDeepActiveElement();const index=options.findIndex((option=>FocusRow.getFocusableElement(option)===focused));if(e.key==="Enter"){if(index!==-1){return}if(isWindows||isMac){this.close();e.preventDefault();return}}e.preventDefault();this.updateFocus_(options,index,e.key!=="ArrowUp");if(!this.hasMousemoveListener_){this.hasMousemoveListener_=true;this.addEventListener("mousemove",(e=>{this.onMouseover_(e);this.hasMousemoveListener_=false}),{once:true})}}onMouseover_(e){const item=e.composedPath().find((el=>el.matches&&el.matches(SELECTABLE_DROPDOWN_ITEM_QUERY)));(item||this.$.wrapper).focus()}updateFocus_(options,focusedIndex,next){const numOptions=options.length;assert(numOptions>0);let index;if(focusedIndex===-1){index=next?0:numOptions-1}else{const delta=next?1:-1;index=(numOptions+focusedIndex+delta)%numOptions}options[index].focus()}close(){this.removeListeners_();this.$.dialog.close();this.open=false;if(this.anchorElement_){focusWithoutInk(assert(this.anchorElement_));this.anchorElement_=null}if(this.lastConfig_){this.lastConfig_=null}}showAt(anchorElement,config){this.anchorElement_=anchorElement;this.anchorElement_.scrollIntoViewIfNeeded();const rect=this.anchorElement_.getBoundingClientRect();let height=rect.height;if(config&&!config.noOffset&&config.anchorAlignmentY===AnchorAlignment.AFTER_END){height-=AFTER_END_OFFSET}this.showAtPosition(Object.assign({top:rect.top,left:rect.left,height:height,width:rect.width,anchorAlignmentX:AnchorAlignment.BEFORE_END},config));this.$.wrapper.focus()}showAtPosition(config){const doc=document.scrollingElement;const scrollLeft=doc.scrollLeft;const scrollTop=doc.scrollTop;this.resetStyle_();this.$.dialog.showModal();this.open=true;config.top+=scrollTop;config.left+=scrollLeft;this.positionDialog_(Object.assign({minX:scrollLeft,minY:scrollTop,maxX:scrollLeft+doc.clientWidth,maxY:scrollTop+doc.clientHeight},config));doc.scrollTop=scrollTop;doc.scrollLeft=scrollLeft;this.addListeners_();const openedByKey=FocusOutlineManager.forDocument(document).visible;if(openedByKey){const firstSelectableItem=this.querySelector(SELECTABLE_DROPDOWN_ITEM_QUERY);if(firstSelectableItem){requestAnimationFrame((()=>{firstSelectableItem.focus()}))}}}resetStyle_(){this.$.dialog.style.left="";this.$.dialog.style.right="";this.$.dialog.style.top="0"}positionDialog_(config){this.lastConfig_=config;const c=Object.assign(getDefaultShowConfig(),config);const top=c.top;const left=c.left;const bottom=top+c.height;const right=left+c.width;const rtl=getComputedStyle(this).direction==="rtl";if(rtl){c.anchorAlignmentX*=-1}const offsetWidth=this.$.dialog.offsetWidth;const menuLeft=getStartPointWithAnchor(left,right,offsetWidth,c.anchorAlignmentX,c.minX,c.maxX);if(rtl){const menuRight=document.scrollingElement.clientWidth-menuLeft-offsetWidth;this.$.dialog.style.right=menuRight+"px"}else{this.$.dialog.style.left=menuLeft+"px"}const menuTop=getStartPointWithAnchor(top,bottom,this.$.dialog.offsetHeight,c.anchorAlignmentY,c.minY,c.maxY);this.$.dialog.style.top=menuTop+"px"}addListeners_(){this.boundClose_=this.boundClose_||(()=>{if(this.$.dialog.open){this.close()}});window.addEventListener("resize",this.boundClose_);window.addEventListener("popstate",this.boundClose_);this.contentObserver_=new FlattenedNodesObserver(this.$.contentNode,(info=>{info.addedNodes.forEach((node=>{if(node.classList&&node.classList.contains(DROPDOWN_ITEM_CLASS)&&!node.getAttribute("role")){node.setAttribute("role","menuitem")}}))}));if(this.autoReposition){this.resizeObserver_=new ResizeObserver((()=>{if(this.lastConfig_){this.positionDialog_(this.lastConfig_);this.fire_("cr-action-menu-repositioned")}}));this.resizeObserver_.observe(this.$.dialog)}}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-action-menu">:host dialog {
  background-color: var(--cr-menu-background-color);
        border: none;
        border-radius: 4px;
        box-shadow: var(--cr-menu-shadow);
        margin: 0;
        min-width: 128px;
        outline: none;
        padding: 0;
        position: absolute;
}

:host dialog::backdrop {
  background-color: transparent;
}

:host ::slotted(.dropdown-item) {
  -webkit-tap-highlight-color: transparent;
        background: none;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--cr-primary-text-color);
        font: inherit;
        min-height: 32px;
        padding: 0 24px;
        text-align: start;
        user-select: none;
        width: 100%;
}

:host ::slotted(.dropdown-item:not([hidden])) {
  align-items: center;
        display: flex;
}

:host ::slotted(.dropdown-item[disabled]) {
  opacity: var(--cr-action-menu-disabled-item-opacity, 0.65);
}

:host ::slotted(.dropdown-item:not([disabled])) {
  cursor: pointer;
}

:host ::slotted(.dropdown-item:focus) {
  background-color: var(--cr-menu-background-focus-color);
        outline: none;
}

.item-wrapper {
  background: var(--cr-menu-background-sheen);
        outline: none;
        padding: 8px 0;
}

</style>
    <dialog id="dialog" part="dialog" on-close="onNativeDialogClose_" role="application" aria-roledescription$="[[roleDescription]]">
      <div id="wrapper" class="item-wrapper" role="menu" tabindex="-1" aria-label$="[[accessibilityLabel]]">
        <slot id="contentNode"></slot>
      </div>
    </dialog>
<!--_html_template_end_-->`}}customElements.define(CrActionMenuElement.is,CrActionMenuElement);function getTemplate$e(){return html`<!--_html_template_start_--><style include="cr-icons">
  :host {
    display: flex;
    flex-direction: column;
    margin: 16px;
  }

  #titleContainer {
    align-items: center;
    display: flex;
    height: 22px;
  }

  .icon-background {
    align-items: center;
    background-color: var(--ntp-module-scroll-button-color);
    border-radius: 50%;
    display: flex;
    height: 18px;
    justify-content: center;
    margin-inline-end: 8px;
    width: 18px;
  }

  .module-icon {
    height: 10px;
    width: 10px;
  }

  #title {
    color: var(--cr-primary-text-color);
    font-size: 15px;
  }

  #chip {
    background-color: var(--ntp-chip-background-color);
    border-radius: 4px;
    color: var(--ntp-chip-text-color);
    font-size: 10px;
    height: 12px;
    margin-inline-start: 10px;
    padding: 2px 6px;
  }

  #headerSpacer {
    flex-grow: 1;
  }

  cr-icon-button {
    --cr-icon-button-icon-size: 16px;
    margin-inline-end: -4px;
    margin-inline-start: 0;
  }

  #infoButton {
    --cr-icon-image: url(./icons/info.svg);
  }

  #menuButton {
    margin-inline-end: -10px;
  }

  :host([modules-redesigned-enabled_]) #menuButton {
    background-color: var(--ntp-module-scroll-button-color);
    height: 18px;
    margin: 0;
    width: 18px;
  }

  :host([modules-redesigned-enabled_]) #menuButton:hover {
    background-color: var(--ntp-module-scroll-button-hover-color);
  }

  #description {
    color: var(--cr-secondary-text-color);
    font-size: 12px;
    height: 12px;
    margin-top: 3px;
  }
</style>
<div id="titleContainer">
  <template is="dom-if" if="[[iconSrc]]">
    <div class="icon-background">
      <img class="module-icon" src="[[iconSrc]]">
    </div>
  </template>
  <span id="title"><slot></slot></span>
  <template is="dom-if" if="[[chipText]]">
    <div id="chip">[[chipText]]</div>
  </template>
  <div id="headerSpacer"></div>
  <template is="dom-if" if="[[showInfoButton]]">
    <cr-icon-button id="infoButton" title="About this card" on-click="onInfoButtonClick_">
    </cr-icon-button>
  </template>
  <template is="dom-if" if="[[!hideMenuButton]]" restamp="">
    <cr-icon-button id="menuButton" title="More actions" class="icon-more-vert" on-click="onMenuButtonClick_">
    </cr-icon-button>
  </template>
</div>
<template is="dom-if" if="[[descriptionText]]">
  <span id="description">[[descriptionText]]</span>
</template>
<cr-action-menu id="actionMenu">
  <template is="dom-if" if="[[showDismissButton]]">
    <button id="dismissButton" class="dropdown-item" on-click="onDismissButtonClick_">
      [[dismissText]]
    </button>
  </template>
  <button id="disableButton" class="dropdown-item" on-click="onDisableButtonClick_">
    [[disableText]]
  </button>
  <button id="customizeButton" class="dropdown-item" on-click="onCustomizeButtonClick_">
    Customize cards
  </button>
  <template is="dom-if" if="[[showInfoButtonDropdown]]">
    <button id="infoButton" class="dropdown-item" on-click="onInfoButtonClick_">
      About this card
    </button>
  </template>
</cr-action-menu>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleHeaderElement extends PolymerElement{static get is(){return"ntp-module-header"}static get template(){return getTemplate$e()}static get properties(){return{iconSrc:String,chipText:String,descriptionText:String,showInfoButton:{type:Boolean,value:false},showInfoButtonDropdown:{type:Boolean,value:false},showDismissButton:{type:Boolean,value:false},hideMenuButton:{type:Boolean,value:false},dismissText:String,disableText:String,modulesRedesignedEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesRedesignedEnabled"),reflectToAttribute:true}}}onInfoButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("info-button-click",{bubbles:true,composed:true}))}onMenuButtonClick_(e){this.$.actionMenu.showAt(e.target)}onDismissButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("dismiss-button-click",{bubbles:true}))}onDisableButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("disable-button-click",{bubbles:true}))}onCustomizeButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("customize-module",{bubbles:true,composed:true}))}}customElements.define(ModuleHeaderElement.is,ModuleHeaderElement);// Copyright 2017 The Chromium Authors. All rights reserved.
class CrToastElement extends PolymerElement{constructor(){super(...arguments);this.hideTimeoutId_=null}static get is(){return"cr-toast"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-toast">:host {
  --cr-toast-background: #323232;
        --cr-toast-button-color: var(--google-blue-300);
        --cr-toast-text-color: #fff;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-toast-background: var(--google-grey-900)
              linear-gradient(rgba(255, 255, 255, .06), rgba(255, 255, 255, .06));
          --cr-toast-button-color: var(--google-blue-300);
          --cr-toast-text-color: var(--google-grey-200);
}

}

:host {
  align-items: center;
        background: var(--cr-toast-background);
        border-radius: 4px;
        bottom: 0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.28);
        box-sizing: border-box;
        display: flex;
        margin: 24px;
        max-width: 568px;
        min-height: 52px;
        min-width: 288px;
        opacity: 0;
        padding: 0 24px;
        position: fixed;
        transform: translateY(100px);
        transition: opacity 300ms, transform 300ms;
        visibility: hidden;
        z-index: 1;
}

:host-context([dir=ltr]) {
  left: 0;
}

:host-context([dir=rtl]) {
  right: 0;
}

:host([open]) {
  opacity: 1;
        transform: translateY(0);
        visibility: visible;
}

:host ::slotted(*) {
  color: var(--cr-toast-text-color);
}

:host ::slotted(cr-button) {
  background-color: transparent !important;
        border: none !important;
        color: var(--cr-toast-button-color) !important;
        margin-inline-start: 32px !important;
        min-width: 52px !important;
        padding: 8px !important;
}

:host ::slotted(cr-button:hover) {
  background-color: transparent !important;
}

</style>
    <slot></slot>
<!--_html_template_end_-->`}static get properties(){return{duration:{type:Number,value:0},open:{readOnly:true,type:Boolean,value:false,reflectToAttribute:true}}}static get observers(){return["resetAutoHide_(duration, open)"]}resetAutoHide_(){if(this.hideTimeoutId_!==null){window.clearTimeout(this.hideTimeoutId_);this.hideTimeoutId_=null}if(this.open&&this.duration!==0){this.hideTimeoutId_=window.setTimeout((()=>{this.hide()}),this.duration)}}show(){const shouldResetAutohide=this.open;this.removeAttribute("role");this.removeAttribute("aria-hidden");this._setOpen(true);this.setAttribute("role","alert");if(shouldResetAutohide){this.resetAutoHide_()}}hide(){this.setAttribute("aria-hidden","true");this._setOpen(false)}}customElements.define(CrToastElement.is,CrToastElement);// Copyright 2020 The Chromium Authors. All rights reserved.
var ModuleHeight;(function(ModuleHeight){ModuleHeight[ModuleHeight["DYNAMIC"]=-1]="DYNAMIC";ModuleHeight[ModuleHeight["SHORT"]=166]="SHORT";ModuleHeight[ModuleHeight["TALL"]=358]="TALL"})(ModuleHeight||(ModuleHeight={}));class ModuleDescriptor{constructor(id,name,initializeCallback){this.id_=id;this.name_=name;this.initializeCallback_=initializeCallback}get id(){return this.id_}get name(){return this.name_}get height(){return ModuleHeight.DYNAMIC}async initialize(timeout){const loadStartTime=WindowProxy.getInstance().now();const element=await Promise.race([this.initializeCallback_(),new Promise((resolve=>{WindowProxy.getInstance().setTimeout((()=>{resolve(null)}),timeout)}))]);if(!element){return null}const loadEndTime=WindowProxy.getInstance().now();const duration=loadEndTime-loadStartTime;recordLoadDuration("NewTabPage.Modules.Loaded",loadEndTime);recordLoadDuration(`NewTabPage.Modules.Loaded.${this.id_}`,loadEndTime);recordDuration("NewTabPage.Modules.LoadDuration",duration);recordDuration(`NewTabPage.Modules.LoadDuration.${this.id_}`,duration);return element}}class ModuleDescriptorV2 extends ModuleDescriptor{constructor(id,name,height,initializeCallback){super(id,name,initializeCallback);this.height_=height}get height(){return this.height_}async initialize(timeout){return await super.initialize(timeout)||document.createElement("div")}}function getTemplate$d(){return html`<!--_html_template_start_--><style include="cr-hidden-style cr-icons">
  :host {
    display: inline-flex;
    margin: 0 4px;
    vertical-align: top;
  }

  #consentCardContainer {
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    display: inline-flex;
    flex-direction: column;
    height: 140px;
    position: relative;
    width: 244px;
  }

  :host([color-consent-container_]) #consentCardContainer {
    background-color: var(--google-blue-100);
  }

  #faviconContainer {
    text-align: center;
    width: auto;
  }

  #faviconContainer ul {
    list-style-type: none;
    margin-block-end: 0;
    margin-block-start: 0;
    margin-inline-end: 6px;
    padding: 0;
  }

  #faviconContainer li {
    display: inline;
    margin: 2px;
  }

  .favicon-image {
    border-radius: 50%;
    height: 24px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 16px;
    width: 24px;
  }

  .content-container {
    color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: 400;
    height: 40px;
    line-height: 20px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    text-align: center;
    white-space: normal;
    width: 220px;
  }

  .truncate {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .button-container {
    display: inline-block;
    margin-block-end: 16px;
    margin-inline-end: 16px;
    margin-inline-start: 16px;
    margin-top: 8px;
  }

  .wide-button {
    width: 212px;
  }

  #close {
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-size: 24px;
    margin: 4px 4px;
    position: absolute;
    right: 0;
    top: 2px;
  }
</style>

<div id="consentCardContainer">
  <div id="faviconContainer">
    <ul class="favicon-list">
      <template id="favionRepeat" is="dom-repeat" items="[[merchants]]" as="merchant">
        <li class="favicon">
          <img class="favicon-image" is="cr-auto-img" auto-src="[[getFaviconUrl_(merchant.cartUrl.url)]]" alt="">
        </li>
      </template>
    </ul>
  </div>
  <div id="contentSteps">
    <iron-pages selected="[[currentStep]]">
      <template id="consentStepRepeat" is="dom-repeat" items="[[steps_]]" as="step">
        <div class="step-container" id="[[step.id]]">
          <div class="content-container truncate" tabindex="0">
            <span class="content">
              [[step.content]]
            </span>
          </div>
          <div class="button-container">
            <template id="oneButtonElement" is="dom-if" if="[[step.hasOneButton]]" restamp="">
              <cr-button class="action-button wide-button" onclick="[[step.actionButton.onClickHandler]]">
                [[step.actionButton.text]]
              </cr-button>
            </template>
            <template id="TwoButtonElement" is="dom-if" if="[[step.hasTwoButtons]]" restamp="">
              <cr-button id="cancelButton" class="cancel-button" onclick="[[step.cancelButton.onClickHandler]]">
                [[step.cancelButton.text]]
               </cr-button>
              <cr-button id="actionButton" class="action-button" onclick="[[step.actionButton.onClickHandler]]">
                [[step.actionButton.text]]
              </cr-button>
            </template>
          </div>
        </div>
      </template>
    </iron-pages>
  </div>
  <template is="dom-if" if="[[showCloseButton_]]" restamp="">
    <cr-icon-button id="close" class="icon-clear" aria-label="Close" on-click="onCloseClick_"></cr-icon-button>
  </template>
</div>
<template is="dom-if" if="[[showDiscountConsentDialog_]]" restamp="">
  <discount-consent-dialog id="discountConsentDialog" on-close="onDiscountConsentDialogClose_" ]=""></discount-consent-dialog>
</template>
<!--_html_template_end_-->`}// Copyright 2022 The Chromium Authors. All rights reserved.
var DiscountConsentVariation;(function(DiscountConsentVariation){DiscountConsentVariation[DiscountConsentVariation["Default"]=0]="Default";DiscountConsentVariation[DiscountConsentVariation["StringChange"]=1]="StringChange";DiscountConsentVariation[DiscountConsentVariation["Inline"]=2]="Inline";DiscountConsentVariation[DiscountConsentVariation["Dialog"]=3]="Dialog";DiscountConsentVariation[DiscountConsentVariation["NativeDialog"]=4]="NativeDialog"})(DiscountConsentVariation||(DiscountConsentVariation={}));class DiscountConsentCard extends(I18nMixin(PolymerElement)){static get is(){return"discount-consent-card"}static get template(){return getTemplate$d()}static get properties(){return{merchants:Array,currentStep:{type:Number,value:0},steps_:{type:Array,computed:"computeSteps_(showCloseButton_, stepOneContent_)"},colorConsentContainer_:{type:Boolean,computed:"computeColorConsentContainer_(currentStep)",reflectToAttribute:true},showCloseButton_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesCartDiscountInlineCardShowCloseButton")},stepOneContent_:{type:String,computed:"computeStepOneContent_(merchants)"},showDiscountConsentDialog_:{type:Boolean,value:false}}}getTotalStep_(){if(loadTimeData.getInteger("modulesCartDiscountConsentVariation")===DiscountConsentVariation.Inline){return 2}return 1}getStepTwoContent_(){return loadTimeData.getString("modulesCartConsentStepTwoContent")}computeColorConsentContainer_(currentStep){return loadTimeData.getBoolean("modulesCartConsentStepTwoDifferentColor")&&currentStep===1}computeSteps_(showCloseButton,stepOneContent){const steps=[];steps.push({id:"step1",content:stepOneContent,hasOneButton:true,actionButton:{text:loadTimeData.getString("modulesCartConsentStepOneButton"),onClickHandler:()=>{chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.ShowInterestInDiscountConsent");this.dispatchEvent(new CustomEvent("discount-consent-continued",{composed:true}));if(loadTimeData.getInteger("modulesCartDiscountConsentVariation")===DiscountConsentVariation.NativeDialog){return}if(this.currentStep+1<this.getTotalStep_()){this.currentStep++}else{this.showDiscountConsentDialog_=true}}}});if(this.getTotalStep_()===1){return steps}const step2={id:"step2",content:this.getStepTwoContent_(),actionButton:{text:loadTimeData.getString("modulesCartDiscountConsentAccept"),onClickHandler:()=>{this.dispatchEvent(new CustomEvent("discount-consent-accepted",{composed:true}))}}};if(showCloseButton){step2.hasOneButton=true}else{step2.hasTwoButtons=true;step2.cancelButton={text:loadTimeData.getString("modulesCartDiscountConsentReject"),onClickHandler:()=>{this.dispatchEvent(new CustomEvent("discount-consent-rejected",{composed:true}))}}}steps.push(step2);return steps}computeStepOneContent_(merchants){const stepOneUseStaticContent=loadTimeData.getBoolean("modulesCartStepOneUseStaticContent");if(!stepOneUseStaticContent){if(merchants.length===1){return loadTimeData.getStringF("modulesCartConsentStepOneOneMerchantContent",merchants[0].merchant)}else if(merchants.length===2){return loadTimeData.getStringF("modulesCartConsentStepOneTwoMerchantsContent",merchants[0].merchant,merchants[1].merchant)}else if(merchants.length>=3){return loadTimeData.getStringF("modulesCartConsentStepOneThreeMerchantsContent",merchants[0].merchant,merchants[1].merchant)}}return loadTimeData.getString("modulesCartStepOneStaticContent")}getFaviconUrl_(url){const faviconUrl=new URL("chrome://favicon2/");faviconUrl.searchParams.set("size","20");faviconUrl.searchParams.set("scale_factor","1x");faviconUrl.searchParams.set("show_fallback_monogram","");faviconUrl.searchParams.set("page_url",url);return faviconUrl.href}onCloseClick_(){if(this.currentStep===0){this.dispatchEvent(new CustomEvent("discount-consent-dismissed",{composed:true}))}else{this.dispatchEvent(new CustomEvent("discount-consent-rejected",{composed:true}))}}onDiscountConsentDialogClose_(){this.showDiscountConsentDialog_=false}}customElements.define(DiscountConsentCard.is,DiscountConsentCard);function getTemplate$c(){return html`<!--_html_template_start_--><style include="cr-hidden-style cr-icons">
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    --discount-chip-background: rgb(230, 244, 234);
    --discount-chip-text-color: var(--google-green-700);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --discount-chip-background: linear-gradient(0deg,
          rgba(129, 201, 149, 0.12), rgba(129, 201, 149, 0.12)), #202124;
      --discount-chip-text-color: rgb(129,201,149);
    }
  }

  #module:hover .side-scroll-button {
    visibility: visible;
  }

  /* Adjusting header margin and cartCarousel to make sure
   * the discount chip doesn't get clipped due to
   * overflow-x: hidden */
  ntp-module-header {
    margin-bottom: 0;
  }

  #moduleContent {
    display: flex;
    height: 166px;
    padding-bottom: 16px;
    position: relative;
  }

  :host([header-description-text]) #moduleContent {
    height: 158px;
  }

  #cartCarousel {
    display: inline-block;
    overflow: hidden;
    padding-top: 24px;
    white-space: nowrap;
    z-index: 0;
  }

  :host([header-description-text]) #cartCarousel {
    padding-top: 16px;
  }

  #consentCard,
  .cart-container {
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    display: inline-flex;
    flex-direction: column;
    height: 140px;
    margin: 0 4px;
  }

  .cart-container {
    outline: none;
    position: relative;
    width: 118px;
  }

  .cart-item {
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    text-decoration: none;
  }

  #consentContainer {
    display: inline-block;
    opacity: 0;
    overflow: hidden;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    vertical-align: top;
    width: 0;
  }

  :host([discount-consent-visible_]) #consentContainer {
    opacity: 1;
    width: 254px;
  }

  #consentCard {
    width: 244px;
  }

  #consentIconContainer {
    background: var(--discount-chip-background);
    border-radius: 4px;
    height: 24px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 16px;
    width: 24px;
  }

  #consentIcon {
    -webkit-mask-image: url(modules/cart/icons/consent_label.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--discount-chip-text-color);
    height: 15px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 4.5px;
    width: 15px;
  }

  #consentContent {
    color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: 400;
    height: 40px;
    line-height: 20px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 4px;
    text-align: center;
    white-space: normal;
    width: 220px;
  }

  #consentButtonContainer {
    display: inline-block;
    margin-inline-start: 16px;
    margin-top: 8px;
  }

  .discount-chip {
    background: var(--discount-chip-background);
    border-radius: 4px;
    color: var(--discount-chip-text-color);
    font-size: 12px;
    height: 24px;
    left: 50%;
    line-height: 24px;
    position: absolute;
    text-align: center;
    top: -18px;
    transform: translateX(-50%);
    width: 102px;
    z-index: 1;
  }

  :host-context(.focus-outline-visible) .cart-item:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .cart-title {
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: row;
    font-size: 13px;
    height: 20px;
    justify-content: center;
    margin: 4px 8px 0 8px;
    text-align: center;
  }

  .cart-title .merchant {
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: var(--ntp-theme-text-shadow);
    white-space: nowrap;
  }

  .cart-title .item-count {
    color: var(--cr-secondary-text-color);
  }

  .favicon-image {
    border-radius: 50%;
    display: block;
    height: 24px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 16px;
    width: 24px;
  }

  .thumbnail-container {
    margin-top: 4px;
    text-align: center;
    width: auto;
  }

  .thumbnail-container ul {
    list-style-type: none;
    margin-inline-end: 24px;
    padding: 0;
  }

  .thumbnail-container li {
    display: inline;
    margin-inline-end: -24px;
  }

  .thumbnail-img {
    border: 2px solid var(--ntp-background-override-color);
    border-radius: 50%;
    height: 44px;
    object-fit: cover;
    width: 44px;
  }

  .thumbnail-fallback {
    height: 48px;
    margin-top: 8px;
    position: relative;
    width: 102px;
  }

  :host-context([dir=rtl]) cr-icon-button {
    left: 0;
    right: unset;
  }

  .cart-container cr-icon-button {
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-size: 24px;
    margin: 4px 4px;
    position: absolute;
    right: 0;
    top: 2px;
  }

  .side-scroll-shadow {
    background-color: var(--ntp-background-override-color);
    display: flex;
    height: 160px;
    opacity: 0.38;
    pointer-events: none;
    position: absolute;
    width: 24px;
    z-index: 1;
  }

  #leftScrollShadow {
    left: 0;
  }

  #rightScrollShadow {
    right: 0;
  }

  .side-scroll-button {
    --cr-icon-button-fill-color: var(--ntp-icon-button-color);
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-margin-start: 0;
    --cr-icon-button-margin-end: 0;
    --cr-icon-image: url(icons/chevron.svg);
    background-color: var(--ntp-module-scroll-button-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    z-index: 2;
  }

  .side-scroll-button:hover {
    --cr-icon-button-fill-color: var(--ntp-icon-button-color-active);
    background-color: var(--ntp-module-scroll-button-hover-color);
  }

  #leftScrollButton {
    --cr-icon-image-transform: rotate(90deg);
    left: 0;
    margin-inline-start: 4px;
  }

  #rightScrollButton {
    --cr-icon-image-transform: rotate(270deg);
    margin-inline-end: 4px;
    right: 0;
  }

  .probe {
    display: inline-flex;
    width: 12px;
  }
</style>
<div id="module">
  <ntp-module-header chip-text="[[headerChipText]]" description-text="[[headerDescriptionText]]" dismiss-text="[[i18nRecursive('',
                                    'modulesDismissButtonText',
                                    'modulesCartLowerThese')]]" disable-text="[[i18nRecursive('',
                                    'modulesDisableButtonText',
                                    'modulesCartLower')]]" show-info-button="" on-info-button-click="onInfoButtonClick_" show-dismiss-button="" on-dismiss-button-click="onDismissButtonClick_" on-disable-button-click="onDisableButtonClick_">
    Your carts
  </ntp-module-header>
  <div id="moduleContent">
    <template is="dom-if" if="[[showLeftScrollButton_]]">
      <div id="leftScrollShadow" class="side-scroll-shadow"></div>
      <cr-icon-button id="leftScrollButton" class="side-scroll-button" on-click="onLeftScrollClick_">
      </cr-icon-button>
    </template>
    <div id="cartCarousel">
      <div id="leftProbe" class="probe"></div>
      <div id="consentContainer">
        <template id="consentCardElement" is="dom-if" if="[[showDiscountConsent]]">
          <!-- TODO(crbug.com/1298116): Move this template to
            discount_consent_card. -->
          <template is="dom-if" if="[[!discountConsentHasTwoSteps_]]" restamp="">
            <div id="consentCard">
              <div id="consentIconContainer">
                <div id="consentIcon"></div>
              </div>
              <span id="consentContent">
                Let Google find personalized discounts on your carts?
              </span>
              <div id="consentButtonContainer">
                <cr-button id="cancelButton" class="cancel-button" on-click="onDiscountConsentRejected_" on-auxclick="onDisallowDiscount_">
                  No thanks
                </cr-button>
                <cr-button id="actionButton" class="action-button" on-click="onDiscountConsentAccepted_" on-auxclick="onAllowDiscount_">
                  Get discounts
                </cr-button>
              </div>
            </div>
          </template>
          <template is="dom-if" if="[[discountConsentHasTwoSteps_]]" restamp="">
            <discount-consent-card id="consentCardV2" merchants="[[firstThreeCartItems_]]"></discount-consent-card>
          </template>
        </template>
      </div>
      <template id="cartItemRepeat" is="dom-repeat" items="[[cartItems]]">
        <div class="cart-container">
          <a class="cart-item" title="[[item.merchant]]" href="[[item.cartUrl.url]]" on-click="onCartItemClick_" on-auxclick="onCartItemClick_" on-contextmenu="onCartItemContextMenuClick_">
            <template is="dom-if" if="[[item.discountText]]">
              <div class="discount-chip">[[item.discountText]]</div>
            </template>
            <img class="favicon-image" is="cr-auto-img" auto-src="[[getFaviconUrl_(item.cartUrl.url)]]">
            <div class="cart-title">
              <span class="merchant">[[item.merchant]]</span>
              <template is="dom-if" if="[[item.productImageUrls.length]]">
                <span class="item-count">
                  &nbsp;•&nbsp;[[item.productImageUrls.length]]
                </span>
              </template>
            </div>
            <div class="thumbnail-container">
              <template is="dom-if" if="[[item.productImageUrls.length]]">
                <ul class="thumbnail-list">
                  <template is="dom-repeat" items="[[getImagesToShow_(item.productImageUrls)]]">
                    <li>
                      <img class="thumbnail-img" is="cr-auto-img" auto-src="[[item.url]]">
                    </li>
                  </template>
                </ul>
              </template>
              <template id="thumbnailFallback" is="dom-if" if="[[!item.productImageUrls.length]]">
                <img class="thumbnail-fallback" src="modules/cart/icons/cart_fallback.svg">
              </template>
            </div>
          </a>
          <cr-icon-button class="icon-more-vert" title="More actions" on-click="onCartMenuButtonClick_">
          </cr-icon-button>
        </div>
      </template>
      <div id="rightProbe" class="probe"></div>
    </div>
    <cr-action-menu id="cartActionMenu">
      <button id="hideCartButton" class="dropdown-item" on-click="onCartHide_">
        [[cartMenuHideItem_]]
      </button>
      <button id="removeCartButton" class="dropdown-item" on-click="onCartRemove_">
        [[cartMenuRemoveItem_]]
      </button>
    </cr-action-menu>
    <template is="dom-if" if="[[showRightScrollButton_]]">
      <div id="rightScrollShadow" class="side-scroll-shadow"> </div>
      <cr-icon-button id="rightScrollButton" class="side-scroll-button" on-click="onRightScrollClick_">
      </cr-icon-button>
    </template>
  </div>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesCartInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render>
<cr-toast id="dismissCartToast" duration="10000" tabindex="0">
  <div id="dismissCartToastMessage">
    [[dismissedCartData_.message]]
  </div>
  <cr-button id="undoDismissCartButton" on-click="onUndoDismissCartButtonClick_">
    Undo
  </cr-button>
</cr-toast>
<cr-toast id="confirmDiscountConsentToast" duration="10000" tabindex="0">
  <div id="confirmDiscountConsentMessage">
    [[confirmDiscountConsentString_]]
  </div>
  <cr-button id="confirmDiscountConsentButton" on-click="onConfirmDiscountConsentClick_">
    Got it
  </cr-button>
</cr-toast>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class ChromeCartModuleElement$1 extends(I18nMixin(PolymerElement)){constructor(){super(...arguments);this.scrollBehavior="smooth";this.intersectionObserver_=null;this.currentMenuIndex_=0;this.eventTracker_=new EventTracker}static get is(){return"ntp-chrome-cart-module"}static get template(){return getTemplate$c()}static get properties(){return{cartItems:Array,headerChipText:String,headerDescriptionText:{type:String,reflectToAttribute:true},showDiscountConsent:Boolean,showLeftScrollButton_:Boolean,showRightScrollButton_:Boolean,cartMenuHideItem_:String,cartMenuRemoveItem_:String,dismissedCartData_:{type:Object,value:null},confirmDiscountConsentString_:String,discountConsentHasTwoSteps_:{type:Boolean,value:()=>loadTimeData.getInteger("modulesCartDiscountConsentVariation")>DiscountConsentVariation.StringChange},firstThreeCartItems_:{type:Array,computed:"computeFirstThreeCartItems_(cartItems)"},discountConsentVisible_:{type:Boolean,reflectToAttribute:true}}}connectedCallback(){super.connectedCallback();const leftProbe=this.$.cartCarousel.querySelector("#leftProbe");const rightProbe=this.$.cartCarousel.querySelector("#rightProbe");this.intersectionObserver_=new IntersectionObserver((entries=>{entries.forEach((({target:target,intersectionRatio:intersectionRatio})=>{const show=intersectionRatio===0;if(target===leftProbe){this.showLeftScrollButton_=show;if(show){this.dispatchEvent(new Event("left-scroll-show"))}else{this.dispatchEvent(new Event("left-scroll-hide"))}}else if(target===rightProbe){this.showRightScrollButton_=show;if(show){this.dispatchEvent(new Event("right-scroll-show"))}else{this.dispatchEvent(new Event("right-scroll-hide"))}}}))}),{root:this.$.cartCarousel});this.shadowRoot.querySelectorAll(".probe").forEach((el=>this.intersectionObserver_.observe(el)));this.eventTracker_.add(this,"discount-consent-accepted",(()=>this.onDiscountConsentAccepted_()));this.eventTracker_.add(this,"discount-consent-rejected",(()=>this.onDiscountConsentRejected_()));this.eventTracker_.add(this,"discount-consent-dismissed",(()=>this.onDiscountConsentDismissed_()));this.eventTracker_.add(this,"discount-consent-continued",(()=>this.onDiscountConsentContinued_()));this.eventTracker_.add(this.$.consentContainer,"transitionend",(()=>this.onDiscountConsentHidden_()))}disconnectedCallback(){super.disconnectedCallback();this.intersectionObserver_.disconnect();this.eventTracker_.removeAll()}computeFirstThreeCartItems_(cartItems){return cartItems.slice(0,3)}getFaviconUrl_(url){const faviconUrl=new URL("chrome://favicon2/");faviconUrl.searchParams.set("size","24");faviconUrl.searchParams.set("scale_factor","1x");faviconUrl.searchParams.set("show_fallback_monogram","");faviconUrl.searchParams.set("page_url",url);return faviconUrl.href}getImagesToShow_(imageUrls){return imageUrls.slice(0,3)}onCartMenuButtonClick_(e){e.preventDefault();e.stopPropagation();this.currentMenuIndex_=e.model.index;const merchant=this.cartItems[this.currentMenuIndex_].merchant;this.cartMenuHideItem_=loadTimeData.getStringF("modulesCartCartMenuHideMerchant",merchant);this.cartMenuRemoveItem_=loadTimeData.getStringF("modulesCartCartMenuRemoveMerchant",merchant);this.$.cartActionMenu.showAt(e.target)}async onCartHide_(){this.$.cartActionMenu.close();const merchant=this.cartItems[this.currentMenuIndex_].merchant;const cartUrl=this.cartItems[this.currentMenuIndex_].cartUrl;await ChromeCartProxy.getHandler().hideCart(cartUrl);this.dismissedCartData_={message:loadTimeData.getStringF("modulesCartCartMenuHideMerchantToastMessage",merchant),restoreCallback:async()=>{await ChromeCartProxy.getHandler().restoreHiddenCart(cartUrl)}};const isModuleVisible=await this.resetCartData_();if(isModuleVisible){this.$.dismissCartToast.show()}}async onCartRemove_(){this.$.cartActionMenu.close();const merchant=this.cartItems[this.currentMenuIndex_].merchant;const cartUrl=this.cartItems[this.currentMenuIndex_].cartUrl;await ChromeCartProxy.getHandler().removeCart(cartUrl);this.dismissedCartData_={message:loadTimeData.getStringF("modulesCartCartMenuRemoveMerchantToastMessage",merchant),restoreCallback:async()=>{await ChromeCartProxy.getHandler().restoreRemovedCart(cartUrl)}};const isModuleVisible=await this.resetCartData_();if(isModuleVisible){this.$.dismissCartToast.show()}}async onUndoDismissCartButtonClick_(){await this.dismissedCartData_.restoreCallback();this.dismissedCartData_=null;this.resetCartData_();this.$.dismissCartToast.hide()}async resetCartData_(){const{carts:carts}=await ChromeCartProxy.getHandler().getMerchantCarts();this.cartItems=carts;const isModuleVisible=this.cartItems.length!==0;if(!isModuleVisible&&this.dismissedCartData_!==null){this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:this.dismissedCartData_.message,restoreCallback:async()=>{chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RestoreLastCartRestoresModule");await this.dismissedCartData_.restoreCallback();this.dismissedCartData_=null;const{carts:carts}=await ChromeCartProxy.getHandler().getMerchantCarts();this.cartItems=carts}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.DismissLastCartHidesModule")}return isModuleVisible}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}onDismissButtonClick_(){ChromeCartProxy.getHandler().hideCartModule();this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getString("modulesCartModuleMenuHideToastMessage"),restoreCallback:()=>{ChromeCartProxy.getHandler().restoreHiddenCartModule();chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.UndoHideModule")}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.HideModule")}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesCartLowerYour")),restoreCallback:()=>{chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.UndoRemoveModule")}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RemoveModule")}onRightScrollClick_(){const carts=this.$.cartCarousel.querySelectorAll(".cart-container");let lastVisibleIndex=0;for(let i=0;i<carts.length;i++){if(this.getVisibilityForIndex_(i)){lastVisibleIndex=i}}this.scrollToIndex_(lastVisibleIndex+1);chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RightScrollClick")}onLeftScrollClick_(){const carts=this.$.cartCarousel.querySelectorAll(".cart-container");let visibleRange=0,firstVisibleIndex=0;for(let i=carts.length-1;i>=0;i--){if(this.getVisibilityForIndex_(i)){visibleRange+=1;firstVisibleIndex=i}}this.scrollToIndex_(Math.max(0,firstVisibleIndex-visibleRange));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.LeftScrollClick")}scrollToIndex_(index){const carts=this.$.cartCarousel.querySelectorAll(".cart-container");const leftScrollShadow=this.shadowRoot.getElementById("leftScrollShadow");const rightScrollShadow=this.shadowRoot.getElementById("rightScrollShadow");const scrollOffset=Math.max(leftScrollShadow?leftScrollShadow.offsetWidth:0,rightScrollShadow?rightScrollShadow.offsetWidth:0);let leftPosition=carts[index].offsetLeft-scrollOffset;if(index===0){const consentCard=this.shadowRoot.getElementById(this.discountConsentHasTwoSteps_?"consentCardV2":"consentCard");if(consentCard){leftPosition-=consentCard.offsetWidth}}this.$.cartCarousel.scrollTo({top:0,left:leftPosition,behavior:this.scrollBehavior})}getVisibilityForIndex_(index){const cartCarousel=this.$.cartCarousel;const cart=cartCarousel.querySelectorAll(".cart-container")[index];return cart&&cart.offsetLeft>cartCarousel.scrollLeft&&cartCarousel.scrollLeft+cartCarousel.clientWidth>cart.offsetLeft+cart.offsetWidth}async onCartItemClick_(e){const index=this.$.cartItemRepeat.indexForElement(e.target);if(loadTimeData.getBoolean("ruleBasedDiscountEnabled")&&(e.shouldNavigate===undefined||e.shouldNavigate===false)){e.preventDefault();const{discountUrl:discountUrl}=await ChromeCartProxy.getHandler().getDiscountURL(this.cartItems[index].cartUrl);this.set(`cartItems.${index}.cartUrl`,discountUrl);const cloneEvent=new PointerEvent(e.type,e);cloneEvent.shouldNavigate=true;this.$.cartCarousel.querySelectorAll(".cart-item")[index].dispatchEvent(cloneEvent);return}ChromeCartProxy.getHandler().prepareForNavigation(this.cartItems[index].cartUrl,true);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}));chrome.metricsPrivate.recordSmallCount("NewTabPage.Carts.ClickCart",index)}onDiscountConsentHidden_(){if(this.showDiscountConsent&&!this.discountConsentVisible_&&this.consentStatus_!==undefined){this.showDiscountConsent=false;switch(this.consentStatus_){case ConsentStatus.DISMISSED:const firstCartLink=this.$.cartCarousel.querySelector(".cart-item");if(firstCartLink!==null&&!this.$.confirmDiscountConsentToast.open){firstCartLink.focus()}return;case ConsentStatus.ACCEPTED:this.confirmDiscountConsentString_=loadTimeData.getString("modulesCartDiscountConsentAcceptConfirmation");break;case ConsentStatus.REJECTED:this.confirmDiscountConsentString_=loadTimeData.getString("modulesCartDiscountConsentRejectConfirmation");break;default:assertNotReached$1()}this.$.confirmDiscountConsentToast.show();this.$.confirmDiscountConsentToast.focus()}}onDiscountConsentRejected_(){this.consentStatus_=ConsentStatus.REJECTED;this.discountConsentVisible_=false;ChromeCartProxy.getHandler().onDiscountConsentAcknowledged(false);chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RejectDiscountConsent")}onDiscountConsentAccepted_(){this.consentStatus_=ConsentStatus.ACCEPTED;this.discountConsentVisible_=false;ChromeCartProxy.getHandler().onDiscountConsentAcknowledged(true);chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.AcceptDiscountConsent")}onDiscountConsentDismissed_(){this.consentStatus_=ConsentStatus.DISMISSED;this.discountConsentVisible_=false;ChromeCartProxy.getHandler().onDiscountConsentDismissed();chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.DismissDiscountConsent")}async onDiscountConsentContinued_(){if(loadTimeData.getInteger("modulesCartDiscountConsentVariation")===DiscountConsentVariation.NativeDialog){const{consentStatus:consentStatus}=await ChromeCartProxy.getHandler().showNativeConsentDialog();switch(consentStatus){case ConsentStatus.ACCEPTED:this.onDiscountConsentAccepted_();break;case ConsentStatus.DISMISSED:this.onDiscountConsentDismissed_();break;case ConsentStatus.REJECTED:this.onDiscountConsentRejected_();break;default:assertNotReached$1()}}else{ChromeCartProxy.getHandler().onDiscountConsentContinued()}}onConfirmDiscountConsentClick_(){this.$.confirmDiscountConsentToast.hide()}onCartItemContextMenuClick_(e){const index=e.model.index;ChromeCartProxy.getHandler().prepareForNavigation(this.cartItems[index].cartUrl,false)}}customElements.define(ChromeCartModuleElement$1.is,ChromeCartModuleElement$1);async function createCartElement$1(){const{consentVisible:consentVisible}=await ChromeCartProxy.getHandler().getDiscountConsentCardVisible();const{welcomeVisible:welcomeVisible}=await ChromeCartProxy.getHandler().getWarmWelcomeVisible();const{carts:carts}=await ChromeCartProxy.getHandler().getMerchantCarts();chrome.metricsPrivate.recordSmallCount("NewTabPage.Carts.CartCount",carts.length);if(carts.length===0){return null}if(loadTimeData.getBoolean("ruleBasedDiscountEnabled")){if(consentVisible){recordOccurence("NewTabPage.Carts.DiscountConsentShow")}let discountedCartCount=0;for(let i=0;i<carts.length;i++){const cart=carts[i];if(cart.discountText){discountedCartCount++;chrome.metricsPrivate.recordSmallCount("NewTabPage.Carts.DiscountAt",i)}}chrome.metricsPrivate.recordSmallCount("NewTabPage.Carts.DiscountCountAtLoad",discountedCartCount)}const element=new ChromeCartModuleElement$1;if(welcomeVisible){element.headerChipText=loadTimeData.getString("modulesNewTagLabel");element.headerDescriptionText=loadTimeData.getString("modulesCartWarmWelcome")}element.cartItems=carts;element.showDiscountConsent=consentVisible;element.discountConsentVisible_=consentVisible;return element}const chromeCartDescriptor$1=new ModuleDescriptor("chrome_cart",loadTimeData.getString("modulesCartSentence"),createCartElement$1);function getTemplate$b(){return html`<!--_html_template_start_--><style include="cr-hidden-style cr-icons">
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    --discount-chip-background: rgb(230, 244, 234);
    --discount-chip-text-color: var(--google-green-700);
    --row-height: 63px;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --discount-chip-background: linear-gradient(0deg,
          rgba(129, 201, 149, 0.12), rgba(129, 201, 149, 0.12)), #202124;
      --discount-chip-text-color: rgb(129,201,149);
    }
  }

  #module {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Adjusting header margin and cartCarousel to make sure
   * the discount chip doesn't get clipped due to
   * overflow-x: hidden */
  ntp-module-header {
    margin-bottom: 0;
  }

  #moduleContent {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
  }

  #cartCarousel {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    overflow-x: hidden;
    padding-top: 24px;
    white-space: nowrap;
    z-index: 0;
  }

  #consentCard,
  .cart-item {
    margin-bottom: 24px;
    margin-top: 0;
    width: 328px;
  }

  .cart-item {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    height: var(--row-height);
    padding-inline: 15px 15px;
    position: relative;
    text-decoration: none;
  }

  #consentCard {
    align-items: center;
    border: 1px solid var(--ntp-border-color);
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 106px;
    margin-inline: 15px;
  }

  #consentContent {
    color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: 400;
    height: 40px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
    white-space: normal;
    width: 223px;
  }

  #consentButtonContainer {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  .discount-chip {
    background: var(--discount-chip-background);
    border-radius: 30px;
    color: var(--discount-chip-text-color);
    display: flex;
    font-size: 12px;
    justify-content: center;
    line-height: 20px;
    margin-top: 2px;
    padding-bottom: 2px;
    padding-inline-end: 8px;
    padding-inline-start: 8px;
    padding-top: 2px;
    width: max-content;
  }

  :host-context(.focus-outline-visible) .cart-item:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .cart-title {
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    font-size: 13px;
    width: 99px;
  }

  .merchant-container {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 91px;
  }

  .cart-title .merchant {
    display: inline-block;
    font-size: 18px;
    font-weight: 400;
    height: 24px;
    max-width: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: var(--ntp-theme-text-shadow);
    white-space: nowrap;
  }

  .cart-title .item-count {
    color: var(--cr-secondary-text-color);
  }

  .item-count {
    font-size: 10px;
    line-height: 16px;
  }

  .thumbnail-container {
    align-items: center;
    display: flex;
    height: var(--row-height);
    margin-inline-start: 16px;
    overflow-x: hidden;
    text-align: center;
  }

  .thumbnail-container ul {
    display: flex;
    height: var(--row-height);
    list-style-type: none;
    margin-block-end: 0;
    margin-block-start: 0;
    overflow: hidden;
    padding: 0;
  }

  .thumbnail-container li {
    display: inline;
    margin-inline-start: 8px;
  }

  .image-background {
    /* Mixes to Google Grey 100 underneath .image-container. */
    background-color: rgb(115, 135, 145);
    border-radius: 50%;
    height: var(--row-height);
    width: var(--row-height);
  }

  .image-container {
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 0.2px white;
    height: 100%;
    opacity: 90%;
  }

  .thumbnail-img {
    border-radius: 50%;
    height: var(--row-height);
    object-fit: cover;
    width: var(--row-height);
  }

  .fallback-background {
    align-items: center;
    background-color: var(--google-grey-100);
    border-radius: 50%;
    display: flex;
    height: var(--row-height);
    justify-content: center;
    margin-inline-start: 8px;
    position: relative;
    width: var(--row-height);
  }

  .thumbnail-fallback {
    height: 40px;
    width: 40px;
  }

  :host-context([dir=rtl]) cr-icon-button {
    left: 0;
    right: unset;
  }

  .cart-item cr-icon-button {
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-size: 24px;
    margin-inline-start: 8px;
    position: absolute;
  }

  #moduleFooter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    margin-inline-end: 16px;
  }

  .icon-more-vert {
    visibility: hidden;
  }

  .cart-item:hover .icon-more-vert {
    visibility: visible;
  }

  .side-scroll-button {
    --cr-icon-button-fill-color: var(--ntp-icon-button-color);
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-margin-start: 0;
    --cr-icon-button-margin-end: 0;
    --cr-icon-image: url(icons/chevron.svg);
    background-color: var(--ntp-module-scroll-button-color);
    border-radius: 50%;
    height: 24px;
    width: 24px;
    z-index: 2;
  }

  .side-scroll-button:hover {
    --cr-icon-button-fill-color: var(--ntp-icon-button-color-active);
    background-color: var(--ntp-module-scroll-button-hover-color);
  }

  #leftScrollButton {
    --cr-icon-image-transform: rotate(90deg);
    margin-inline-end: 16px;
  }

  #rightScrollButton {
    --cr-icon-image-transform: rotate(270deg);
  }

  .probe {
    display: inline-flex;
    width: 12px;
  }

  #rightProbe {
    margin-inline-start: 344px;
  }
</style>
<div id="module">
  <ntp-module-header chip-text="[[headerChipText]]" disable-text="[[i18nRecursive('',
                                    'modulesDisableButtonText',
                                    'modulesCartLower')]]" on-disable-button-click="onDisableButtonClick_" show-info-button="" on-info-button-click="onInfoButtonClick_" icon-src="modules/cart/icons/cart_logo.svg">
    In your shopping cart
  </ntp-module-header>
  <div id="moduleContent">
    <div id="cartCarousel">
      <div id="leftProbe" class="probe"></div>
      <template id="consentCardElement" is="dom-if" if="[[showDiscountConsent]]">
        <div id="consentCard">
          <span id="consentContent">
            Let Google find personalized discounts on your carts?
          </span>
          <div id="consentButtonContainer">
            <cr-button id="cancelButton" class="cancel-button" on-click="onDisallowDiscount_" on-auxclick="onDisallowDiscount_">
              No thanks
            </cr-button>
            <cr-button id="actionButton" class="action-button" on-click="onAllowDiscount_" on-auxclick="onAllowDiscount_">
              Get discounts
            </cr-button>
          </div>
        </div>
      </template>
      <template id="cartItemRepeat" is="dom-repeat" items="[[cartItems]]">
        <a class="cart-item" title="[[item.merchant]]" href="[[item.cartUrl.url]]" on-click="onCartItemClick_" on-auxclick="onCartItemClick_">
          <div class="cart-title">
            <div class="merchant-container">
              <span class="merchant">[[item.merchant]]</span>
              <cr-icon-button class="icon-more-vert" title="More actions" on-click="onCartMenuButtonClick_">
              </cr-icon-button>
            </div>
            <template is="dom-if" if="[[item.productImageUrls.length]]">
              <span class="item-count">
                <template is="dom-if" if="[[isOne_(item.productImageUrls.length)]]">
                  [[i18n('modulesCartItemCountSingular',
                    item.productImageUrls.length)]]
                </template>
                <template is="dom-if" if="[[!isOne_(item.productImageUrls.length)]]">
                  [[i18n('modulesCartItemCountMultiple',
                    item.productImageUrls.length)]]
                </template>
              </span>
            </template>
            <template is="dom-if" if="[[item.discountText]]">
              <div class="discount-chip">[[item.discountText]]</div>
            </template>
          </div>
          <div class="thumbnail-container">
            <template is="dom-if" if="[[item.productImageUrls.length]]">
              <ul class="thumbnail-list">
                <template is="dom-repeat" items="[[getImagesToShow_(item.productImageUrls)]]">
                  <li>
                    <div class="image-background">
                      <div class="image-container">
                        <img class="thumbnail-img" is="cr-auto-img" auto-src="[[item.url]]">
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </template>
            <template id="thumbnailFallback" is="dom-if" if="[[!item.productImageUrls.length]]">
              <div class="fallback-background">
                <img class="thumbnail-fallback" src="modules/cart/icons/cart_fallback.svg">
              </div>
            </template>
          </div>
        </a>
      </template>
      <div id="rightProbe" class="probe"></div>
    </div>
    <cr-action-menu id="cartActionMenu">
      <button id="hideCartButton" class="dropdown-item" on-click="onCartHide_">
        [[cartMenuHideItem_]]
      </button>
      <button id="removeCartButton" class="dropdown-item" on-click="onCartRemove_">
        [[cartMenuRemoveItem_]]
      </button>
    </cr-action-menu>
  </div>
  <div id="moduleFooter">
    <cr-icon-button id="leftScrollButton" class="side-scroll-button" disabled="[[!showLeftScrollButton_]]" on-click="onLeftScrollClick_">
    </cr-icon-button>
    <cr-icon-button id="rightScrollButton" class="side-scroll-button" disabled="[[!showRightScrollButton_]]" on-click="onRightScrollClick_">
    </cr-icon-button>
  </div>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesCartInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render>
<cr-toast id="dismissCartToast" duration="10000">
  <div id="dismissCartToastMessage">
    [[dismissedCartData_.message]]
  </div>
  <cr-button id="undoDismissCartButton" on-click="onUndoDismissCartButtonClick_">
    Undo
  </cr-button>
</cr-toast>
<cr-toast id="confirmDiscountConsentToast" duration="10000">
  <div id="confirmDiscountConsentMessage">
    [[confirmDiscountConsentString_]]
  </div>
  <cr-button id="confirmDiscountConsentButton" on-click="onConfirmDiscountConsentClick_">
    Got it
  </cr-button>
</cr-toast>
<!--_html_template_end_-->`}// Copyright 2021 The Chromium Authors. All rights reserved.
class ChromeCartModuleElement extends(I18nMixin(PolymerElement)){constructor(){super(...arguments);this.scrollBehavior="smooth";this.intersectionObserver_=null;this.currentMenuIndex_=0}static get is(){return"ntp-modules-redesigned"}static get template(){return getTemplate$b()}static get properties(){return{cartItems:Array,headerChipText:String,headerDescriptionText:{type:String,reflectToAttribute:true},showDiscountConsent:Boolean,showLeftScrollButton_:Boolean,showRightScrollButton_:Boolean,cartMenuHideItem_:String,cartMenuRemoveItem_:String,dismissedCartData_:{type:Object,value:null},confirmDiscountConsentString_:String}}connectedCallback(){super.connectedCallback();const leftProbe=this.$.cartCarousel.querySelector("#leftProbe");const rightProbe=this.$.cartCarousel.querySelector("#rightProbe");this.intersectionObserver_=new IntersectionObserver((entries=>{entries.forEach((({target:target,intersectionRatio:intersectionRatio})=>{const show=intersectionRatio===0;if(target===leftProbe){this.showLeftScrollButton_=show;if(show){this.dispatchEvent(new Event("left-scroll-show"))}else{this.dispatchEvent(new Event("left-scroll-hide"))}}else if(target===rightProbe){this.showRightScrollButton_=show;if(show){this.dispatchEvent(new Event("right-scroll-show"))}else{this.dispatchEvent(new Event("right-scroll-hide"))}}}))}),{root:this.$.cartCarousel});this.shadowRoot.querySelectorAll(".probe").forEach((el=>this.intersectionObserver_.observe(el)))}disconnectedCallback(){super.disconnectedCallback();this.intersectionObserver_.disconnect()}getImagesToShow_(imageUrls){return imageUrls.slice(0,3)}isOne_(length){return length===1}onCartMenuButtonClick_(e){e.preventDefault();e.stopPropagation();this.currentMenuIndex_=e.model.index;const merchant=this.cartItems[this.currentMenuIndex_].merchant;this.cartMenuHideItem_=loadTimeData.getStringF("modulesCartCartMenuHideMerchant",merchant);this.cartMenuRemoveItem_=loadTimeData.getStringF("modulesCartCartMenuRemoveMerchant",merchant);this.$.cartActionMenu.showAt(e.target)}async onCartHide_(){this.$.cartActionMenu.close();const merchant=this.cartItems[this.currentMenuIndex_].merchant;const cartUrl=this.cartItems[this.currentMenuIndex_].cartUrl;await ChromeCartProxy.getHandler().hideCart(cartUrl);this.dismissedCartData_={message:loadTimeData.getStringF("modulesCartCartMenuHideMerchantToastMessage",merchant),restoreCallback:async()=>{await ChromeCartProxy.getHandler().restoreHiddenCart(cartUrl)}};const isModuleVisible=await this.resetCartData_();if(isModuleVisible){this.$.dismissCartToast.show()}}async onCartRemove_(){this.$.cartActionMenu.close();const merchant=this.cartItems[this.currentMenuIndex_].merchant;const cartUrl=this.cartItems[this.currentMenuIndex_].cartUrl;await ChromeCartProxy.getHandler().removeCart(cartUrl);this.dismissedCartData_={message:loadTimeData.getStringF("modulesCartCartMenuRemoveMerchantToastMessage",merchant),restoreCallback:async()=>{await ChromeCartProxy.getHandler().restoreRemovedCart(cartUrl)}};const isModuleVisible=await this.resetCartData_();if(isModuleVisible){this.$.dismissCartToast.show()}}async onUndoDismissCartButtonClick_(){await this.dismissedCartData_.restoreCallback();this.dismissedCartData_=null;this.resetCartData_();this.$.dismissCartToast.hide()}async resetCartData_(){const{carts:carts}=await ChromeCartProxy.getHandler().getMerchantCarts();this.cartItems=carts;const isModuleVisible=this.cartItems.length!==0;if(!isModuleVisible&&this.dismissedCartData_!==null){this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:this.dismissedCartData_.message,restoreCallback:async()=>{chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RestoreLastCartRestoresModule");await this.dismissedCartData_.restoreCallback();this.dismissedCartData_=null;const{carts:carts}=await ChromeCartProxy.getHandler().getMerchantCarts();this.cartItems=carts}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.DismissLastCartHidesModule")}return isModuleVisible}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesCartLowerYour")),restoreCallback:()=>{chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.UndoRemoveModule")}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RemoveModule")}onRightScrollClick_(){const carts=this.$.cartCarousel.querySelectorAll(".cart-item");let lastVisibleIndex=0;for(let i=0;i<carts.length;i++){if(this.getVisibilityForIndex_(i)){lastVisibleIndex=i}}this.scrollToIndex_(lastVisibleIndex+1);chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RightScrollClick")}onLeftScrollClick_(){const carts=this.$.cartCarousel.querySelectorAll(".cart-item");let firstVisibleIndex=0;for(let i=carts.length-1;i>=0;i--){if(this.getVisibilityForIndex_(i)){firstVisibleIndex=i}}this.scrollToIndex_(Math.max(0,firstVisibleIndex-1));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.LeftScrollClick")}scrollToIndex_(index){const carts=this.$.cartCarousel.querySelectorAll(".cart-item");let leftPosition=carts[index].offsetLeft;if(index===0){const consentCard=this.shadowRoot.getElementById("consentCard");if(consentCard){leftPosition-=consentCard.offsetWidth}}this.$.cartCarousel.scrollTo({top:0,left:leftPosition,behavior:this.scrollBehavior})}getVisibilityForIndex_(index){const cartCarousel=this.$.cartCarousel;const cart=cartCarousel.querySelectorAll(".cart-item")[index];return cart&&cart.offsetLeft===cartCarousel.scrollLeft&&cartCarousel.clientWidth<=cart.offsetWidth}async onCartItemClick_(e){const index=this.$.cartItemRepeat.indexForElement(e.target);if(loadTimeData.getBoolean("ruleBasedDiscountEnabled")&&(e.shouldNavigate===undefined||e.shouldNavigate===false)){e.preventDefault();const{discountUrl:discountUrl}=await ChromeCartProxy.getHandler().getDiscountURL(this.cartItems[index].cartUrl);this.set(`cartItems.${index}.cartUrl`,discountUrl);const cloneEvent=new PointerEvent(e.type,e);cloneEvent.shouldNavigate=true;this.$.cartCarousel.querySelectorAll(".cart-item")[index].dispatchEvent(cloneEvent);return}this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}));chrome.metricsPrivate.recordSmallCount("NewTabPage.Carts.ClickCart",index)}onDisallowDiscount_(){this.showDiscountConsent=false;this.confirmDiscountConsentString_=loadTimeData.getString("modulesCartDiscountConsentRejectConfirmation");this.$.confirmDiscountConsentToast.show();ChromeCartProxy.getHandler().onDiscountConsentAcknowledged(false)}onAllowDiscount_(){this.showDiscountConsent=false;this.confirmDiscountConsentString_=loadTimeData.getString("modulesCartDiscountConsentAcceptConfirmation");this.$.confirmDiscountConsentToast.show();ChromeCartProxy.getHandler().onDiscountConsentAcknowledged(true)}onConfirmDiscountConsentClick_(){this.$.confirmDiscountConsentToast.hide()}}customElements.define(ChromeCartModuleElement.is,ChromeCartModuleElement);async function createCartElement(){const{consentVisible:consentVisible}=await ChromeCartProxy.getHandler().getDiscountConsentCardVisible();const{welcomeVisible:welcomeVisible}=await ChromeCartProxy.getHandler().getWarmWelcomeVisible();const{carts:carts}=await ChromeCartProxy.getHandler().getMerchantCarts();chrome.metricsPrivate.recordSmallCount("NewTabPage.Carts.CartCount",carts.length);const element=new ChromeCartModuleElement;if(welcomeVisible){element.headerChipText=loadTimeData.getString("modulesNewTagLabel");element.headerDescriptionText=loadTimeData.getString("modulesCartWarmWelcome")}element.cartItems=carts;element.showDiscountConsent=consentVisible;return element}const chromeCartDescriptor=new ModuleDescriptorV2("chrome_cart",loadTimeData.getString("modulesCartSentence"),ModuleHeight.TALL,createCartElement);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><slot></slot>
<!--_html_template_end_-->`,is:"cr-lazy-render",child_:null,instance_:null,get(){if(!this.child_){this.render_()}return this.child_},getIfExists(){return this.child_},render_(){const template=this.getContentChildren()[0];const TemplateClass=templatize(template,this,{mutableData:false,forwardHostProp:this._forwardHostPropV2});const parentNode=this.parentNode;if(parentNode&&!this.child_){this.instance_=new TemplateClass;this.child_=this.instance_.root.firstElementChild;parentNode.insertBefore(this.instance_.root,this)}},_forwardHostPropV2(prop,value){if(this.instance_){this.instance_.forwardHostProp(prop,value)}}});// Copyright 2021 The Chromium Authors. All rights reserved.
let handler$2=null;class DriveProxy{static getHandler(){return handler$2||(handler$2=DriveHandler.getRemote())}static setHandler(newHandler){handler$2=newHandler}constructor(){}}function getTemplate$a(){return html`<!--_html_template_start_--><style>
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  ntp-module-header {
    margin-bottom: 8px;
  }

  #files {
    display: flex;
    flex-direction: column;
    margin-bottom: 7px;
  }

  .file {
    box-sizing: border-box;
    color: var(--cr-primary-text-color);
    display: flex;
    flex-shrink: 0;
    height: 56px;
    outline: none;
    padding: 8px 18px;
    text-decoration: none;
  }

  .file:hover {
    background-color: var(--ntp-hover-background-color);
  }

  .file:active,
  :host-context(.focus-outline-visible) .file:focus {
    background-color: var(--ntp-active-background-color);
  }

  .file-icon {
    height: 19px;
    margin-inline-end: 19px;
    margin-top: 3px;
    object-fit: contain;
    width: 19px;
  }

  .file-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
  }

  .file-title,
  .file-description {
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-title {
    font-size: 13px;
  }

  .file-description {
    color: var(--cr-secondary-text-color);
    font-size: 12px;
  }

  ntp-info-dialog a {
    color: var(--cr-link-color);
    cursor: pointer;
    text-decoration: none;
  }

  ntp-info-dialog a:focus {
    border-radius: 2px;
    box-shadow: var(--ntp-focus-shadow);
    outline: none;
  }
</style>
<ntp-module-header dismiss-text="[[i18nRecursive('',
                                  'modulesDismissButtonText',
                                  'modulesDriveFilesLower')]]" disable-text="[[i18nRecursive('',
                                  'modulesDisableButtonText',
                                  'modulesDriveSentence2')]]" show-info-button="" on-info-button-click="onInfoButtonClick_" show-dismiss-button="" on-dismiss-button-click="onDismissButtonClick_" on-disable-button-click="onDisableButtonClick_">
  From your Google Drive
</ntp-module-header>
<div id="files">
  <template id="fileRepeat" is="dom-repeat" items="[[files]]">
    <a class="file" href="[[item.itemUrl.url]]" on-click="onFileClick_" on-auxclick="onFileClick_">
      <img is="cr-auto-img" class="file-icon" draggable="false" auto-src="[[getImageSrc_(item)]]">
      
      <div class="file-info">
        <div class="file-title">[[item.title]]</div>
        <div class="file-description">[[item.justificationText]]</div>
      </div>
    </a>
  </template>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesDriveInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class DriveModuleElement$1 extends(I18nMixin(PolymerElement)){static get is(){return"ntp-drive-module"}static get template(){return getTemplate$a()}static get properties(){return{files:Array}}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}onDismissButtonClick_(){DriveProxy.getHandler().dismissModule();this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("dismissModuleToastMessage",loadTimeData.getString("modulesDriveFilesSentence")),restoreCallback:()=>DriveProxy.getHandler().restoreModule()}}))}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesDriveSentence2"))}}))}getImageSrc_(file){return"https://drive-thirdparty.googleusercontent.com/32/type/"+file.mimeType}onFileClick_(e){this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}));const index=e.model.index;chrome.metricsPrivate.recordSmallCount("NewTabPage.Drive.FileClick",index)}}customElements.define(DriveModuleElement$1.is,DriveModuleElement$1);async function createDriveElement$1(){const{files:files}=await DriveProxy.getHandler().getFiles();if(files.length===0){return null}const element=new DriveModuleElement$1;element.files=files;return element}const driveDescriptor$1=new ModuleDescriptor("drive",loadTimeData.getString("modulesDriveSentence"),createDriveElement$1);function getTemplate$9(){return html`<!--_html_template_start_--><style>
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  ntp-module-header {
    margin-bottom: 8px;
  }

  #files {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }

  .file:hover {
    background-color: var(--google-grey-400);
  }

  .file {
    color: inherit;
    display: flex;
    height: 40px;
    padding-bottom: 8px;
    padding-top: 8px;
    text-decoration: none;
  }

  .file-info {
    display: flex;
    flex-direction: column;
    margin-inline-start: 16px;
    min-width: 0;
    padding-inline-end: 8px;
  }

  .file-title,
  .file-description {
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-description {
    color: var(--cr-secondary-text-color);
    font-size: 12px;
  }

  #iconBackground {
    align-items: center;
    background-color: var(--google-grey-100);
    border-radius: 4px;
    display: flex;
    flex-shrink: 0;
    height: 40px;
    justify-content: center;
    margin-inline-end: 16px;
    margin-inline-start: auto;
    width: 40px;
  }

  .file-icon {
    height: 24px;
    width: 24px;
  }
</style>
<ntp-module-header show-info-button-dropdown="" disable-text="[[i18nRecursive('',
                                  'modulesDisableButtonText',
                                  'modulesDriveSentence2')]]" icon-src="icons/drive_logo.svg" show-info-button="" on-info-button-click="onInfoButtonClick_" show-dismiss-button="" on-dismiss-button-click="onDismissButtonClick_" on-disable-button-click="onDisableButtonClick_">
  From your Google Drive
</ntp-module-header>
<div id="files">
  <template id="fileRepeat" is="dom-repeat" items="[[files]]">
    <a class="file" href="[[item.itemUrl.url]]" on-click="onFileClick_">
      <div class="file-info">
        <div class="file-title">[[item.title]]</div>
        <div class="file-description">[[item.justificationText]]</div>
      </div>
      <div id="iconBackground">
        <img is="cr-auto-img" class="file-icon" draggable="false" auto-src="[[getImageSrc_(item)]]">
        
      </div>
    </a>
  </template>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesDriveInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render>
<!--_html_template_end_-->`}// Copyright 2021 The Chromium Authors. All rights reserved.
class DriveModuleElement extends(I18nMixin(PolymerElement)){static get is(){return"ntp-drive-module-redesigned"}static get template(){return getTemplate$9()}static get properties(){return{files:Array}}getImageSrc_(file){return"https://drive-thirdparty.googleusercontent.com/32/type/"+file.mimeType}onDisableButtonClick_(){const disableEvent=new CustomEvent("disable-module",{composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesDriveSentence2"))}});this.dispatchEvent(disableEvent)}onFileClick_(e){const clickFileEvent=new Event("usage",{composed:true});this.dispatchEvent(clickFileEvent);chrome.metricsPrivate.recordSmallCount("NewTabPage.Drive.FileClick",e.model.index)}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}}customElements.define(DriveModuleElement.is,DriveModuleElement);async function createDriveElement(){const{files:files}=await DriveProxy.getHandler().getFiles();const element=new DriveModuleElement;element.files=files.slice(0,2);return element}const driveDescriptor=new ModuleDescriptorV2("drive",loadTimeData.getString("modulesDriveSentence"),ModuleHeight.SHORT,createDriveElement);function getTemplate$8(){return html`<!--_html_template_start_--><style>
  :host {
    /* Colors: */
    --memory-background-color: var(--google-grey-200);
    --memory-title-color: rgb(255, 255, 255);
    --shape-blue-color: var(--google-blue-500);
    --shape-green-color: var(--google-green-500);
    --shape-yellow-color: var(--google-yellow-500);
    /* Other: */
    --memory-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      /* Colors: */
      --memory-background-color: var(--google-grey-800);
      --shape-blue-color: var(--google-blue-400);
      --shape-green-color: var(--google-green-400);
      --shape-yellow-color: var(--google-yellow-400);
      /* Other: */
      --memory-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15),
          0px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }

  :host {
    display: block;
    height: 100%;
    width: 100%;
    z-index: 0;
  }

  ntp-module-header {
    margin-bottom: 8px;
  }

  #memories {
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    height: 164px;
    overflow: hidden;
    padding: 16px;
    padding-inline-end: 4px;
  }

  :host([show-opt-in-screen]) #memories {
    height: 190px;
    overflow: initial;
    padding: 0;
  }

  .card {
    border-radius: 8px;
    height: 164px;
    overflow: hidden;
    position: relative;
  }

  #memories > .card {
    border-radius: 8px;
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    margin-bottom: 16px;
    margin-inline-end: 12px;
    max-width: 258px;
    min-width: 123px;
  }

  .memory {
    background: var(--memory-background-color);
    box-shadow: var(--memory-shadow);
  }

  .memory:not(.no-title)::before {
    background: linear-gradient(180deg,
                              rgba(0, 0, 0, 0) 47.92%,
                              rgb(0, 0, 0) 100%);
    bottom: 0;
    content: ' ';
    left: 0;
    opacity: 0.54;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .memory-title {
    align-items: flex-end;
    bottom: 0;
    color: var(--memory-title-color);
    display: flex;
    font-size: 16px;
    left: 0;
    letter-spacing: 0.1px;
    line-height: 24px;
    margin: 5px 12px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }

  .memory-img {
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    pointer-events: none;
    position: relative;
  }

  #exploreCard {
    align-items: center;
    border: 1px solid var(--ntp-border-color);
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
  }

  #exploreIconContainer {
    align-content: center;
    background: var(--ntp-selected-light-background-color);
    border-radius: 4px;
    display: grid;
    height: 24px;
    justify-content: center;
    width: 24px;
  }

  #exploreIcon {
    -webkit-mask-image: url(modules/photos/icons/explore_icon.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background: var(--ntp-selected-border-color);
    height: 16px;
    width: 16px;
  }

  #exploreText {
    color: var(--cr-primary-text-color);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin: 8px 32px;
    text-align: center;
  }

  #optInCard {
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  #optInContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 16px;
    max-width: 288px;
  }

  #optInTitleText {
    color: var(--cr-primary-text-color);
    font-size: 22px;
    font-weight: normal;
    line-height: 26px;
    margin: 8px 0;
  }

  #optInTitleDesc {
    color: var(--cr-secondary-text-color);
    font-size: 12px;
    line-height: 20px;
  }

  #optInButton {
    margin-inline-end: 8px;
  }

  #optInArtwork {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    height: 236px;
    margin-top: -46px;
    max-width: 240px;
    overflow: hidden;
    position: relative;
    right: 0;
    z-index: -1;
  }

  #customArtWork {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    height: 236px;
    margin-top: -46px;
    max-width: 240px;
    overflow: hidden;
    position: relative;
    right: 0;
    z-index: -1;
  }

  #yellowShape {
    -webkit-mask-image: url(modules/photos/icons/shape_1.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background: var(--shape-yellow-color);
    height: 40px;
    left: 0;
    position: absolute;
    top: 16px;
    width: 20px;
  }

  :host-context([dir='rtl']) #yellowShape {
    left: auto;
    right: 0;
    transform: scaleX(-1);
  }

  #blueShape {
    -webkit-mask-image: url(modules/photos/icons/shape_2.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background: var(--shape-blue-color);
    height: 29px;
    left: 110px;
    position: absolute;
    top: 0;
    width: 80px;
  }

  :host-context([dir='rtl']) #blueShape {
    left: auto;
    right: 104px;
  }

  #greenShape {
    -webkit-mask-image: url(modules/photos/icons/shape_3.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background: var(--shape-green-color);
    bottom: 0;
    height: 26px;
    left: 108px;
    position: absolute;
    width: 40px;
  }

  :host-context([dir='rtl']) #greenShape {
    left: auto;
    right: 108px;
    transform: scaleX(-1);
  }

  #memoryMain {
    background: url(modules/photos/images/main_example_2x.webp);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 160px;
    left: 40px;
    position: absolute;
    top: 38px;
    width: 120px;
  }

  :host-context([dir='rtl']) #memoryMain {
    left: auto;
    right: 40px;
  }

  #memorySecond {
    background: url(modules/photos/images/second_example_2x.webp);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 132px;
    left: 176px;
    position: absolute;
    top: 126px;
    width: 99px;
  }

  :host-context([dir='rtl'])  #memorySecond {
    left: auto;
    right: 176px;
  }

  #memoryThird {
    background: url(modules/photos/images/third_example_2x.webp);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100px;
    left: 192px;
    position: absolute;
    top: 10px;
    width: 75px;
  }

  :host-context([dir='rtl']) #memoryThird {
    left: auto;
    right: 192px;
  }

  ntp-info-dialog a {
    color: var(--cr-link-color);
    cursor: pointer;
    text-decoration: none;
  }

  ntp-info-dialog a:focus {
    border-radius: 2px;
    box-shadow: var(--ntp-focus-shadow);
    outline: none;
  }
</style>
<ntp-module-header chip-text="[[headerChipText_]]" hide-menu-button="[[hideMenuButton]]" show-info-button="[[!showOptInScreen]]" on-info-button-click="onInfoButtonClick_" show-dismiss-button="[[!showSoftOptOutButton]]" on-dismiss-button-click="onDismissButtonClick_" dismiss-text="[[i18nRecursive('',
                                  'modulesDismissButtonText',
                                  'modulesPhotosMemoriesHideToday')]]" on-disable-button-click="onDisableButtonClick_" disable-text="[[i18nRecursive('',
                                  'modulesDisableButtonText',
                                  'modulesPhotosMemoriesDisable')]]">
  From your Google Photos
</ntp-module-header>
<div id="memories">
  <template id="welcomeCardElement" is="dom-if" if="[[showOptInScreen]]">
    <div id="optInCard">
      <div id="optInContent">
        <div>
          <h1 id="optInTitleText">
            [[optInTitleText]]
          </h1>
          <span id="optInTitleDesc">
            Start exploring your memories from Google Photos, whenever you’re signed in.
          </span>
        </div>
        <div>
          <cr-button id="optInButton" class="action-button" on-click="onOptInClick_">
            See memories
          </cr-button>
          <cr-button id="optOutButton" on-click="onOptOutClick_" hidden="[[showSoftOptOutButton]]">
            No thanks
          </cr-button>
          <cr-button id="softOptOutButton" on-click="onSoftOptOutClick_" hidden="[[!showSoftOptOutButton]]">
              Ask me later
          </cr-button>
        </div>
      </div>

      <template is="dom-if" if="[[!showCustomArtWork_]]">
        <div id="optInArtwork">
          <div id="yellowShape"></div>
          <div id="blueShape"></div>
          <div id="greenShape"></div>
          <div id="memoryMain" class="memory card">
            <div class="memory-title" dir="auto">
              2 years ago
            </div>
          </div>
          <div id="memorySecond" class="memory card no-title"></div>
          <div id="memoryThird" class="memory card no-title"></div>
        </div>
      </template>
      <template is="dom-if" if="[[showCustomArtWork_]]">
        <div id="customArtWork">
          <img src="[[customArtworkUrl_]]">
        </div>
      </template>
    </div>
  </template>
  <template id="memoriesElement" is="dom-if" if="[[!showOptInScreen]]">
    <template id="memoryRepeat" is="dom-repeat" items="[[memories]]">
      <a class="memory card" href="[[item.itemUrl.url]]" on-click="onMemoryClick_">
        <img class="memory-img" is="cr-auto-img" on-load="onImageLoadSuccess_" on-error="onImageLoadError_" auto-src="[[resizeImageUrl_(item.coverUrl.url, memories.length)]]" draggable="false">
        <div class="memory-title" dir="auto">[[item.title]]</div>
      </a>
    </template>
    <template id="exploreCardElement" is="dom-if" if="[[showExploreMore_]]">
      <a href="https://photos.google.com?referrer=CHROME_NTP" class="card" on-click="onMemoryClick_" target="_blank" id="exploreCard">
        <div id="exploreIconContainer">
          <div id="exploreIcon"></div>
        </div>
        <div id="exploreText">
          Explore more of your memories in Google Photos
        </div>
      </a>
    </template>
  </template>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesPhotosInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render>
<!--_html_template_end_-->`}// Copyright 2021 The Chromium Authors. All rights reserved.
let handler$1=null;class PhotosProxy{static getHandler(){return handler$1||(handler$1=PhotosHandler.getRemote())}static setHandler(newHandler){handler$1=newHandler}constructor(){}}// Copyright 2021 The Chromium Authors. All rights reserved.
var OptInStatus;(function(OptInStatus){OptInStatus[OptInStatus["kHardOptOut"]=0]="kHardOptOut";OptInStatus[OptInStatus["kOptIn"]=1]="kOptIn";OptInStatus[OptInStatus["kSoftOptOut"]=2]="kSoftOptOut"})(OptInStatus||(OptInStatus={}));function recordOptInStatus(optInStatus){chrome.metricsPrivate.recordEnumerationValue("NewTabPage.Photos.UserOptIn",optInStatus,Object.keys(OptInStatus).length)}class PhotosModuleElement extends(I18nMixin(PolymerElement)){static get is(){return"ntp-photos-module"}static get template(){return getTemplate$8()}static get properties(){return{memories:Array,showOptInScreen:{type:Boolean,reflectToAttribute:true},customArtworkUrl_:{type:String,value:()=>`chrome://new-tab-page/modules/photos/images/img0${loadTimeData.getString("photosModuleCustomArtWork")}_240x236.svg`},showCustomArtWork_:{type:Boolean,value:()=>loadTimeData.getString("photosModuleCustomArtWork")!==""},showSoftOptOutButton:Boolean,optInTitleText:String,hideMenuButton:Boolean,showExploreMore_:{type:Boolean,computed:"computeShowExploreMore_(memories)"},headerChipText_:{type:String,computed:"computeHeaderChipText_(showOptInScreen)"}}}ready(){super.ready();this.addEventListener("detect-impression",(()=>{chrome.metricsPrivate.recordBoolean("NewTabPage.Photos.ModuleShown",this.showOptInScreen)}))}computeShowExploreMore_(){return this.memories.length===1}computeHeaderChipText_(){return this.showOptInScreen?loadTimeData.getString("modulesPhotosNew"):""}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}onDismissButtonClick_(){PhotosProxy.getHandler().dismissModule();this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getString("modulesPhotosMemoriesHiddenToday"),restoreCallback:()=>PhotosProxy.getHandler().restoreModule()}}))}onSoftOptOutClick_(){recordOptInStatus(OptInStatus.kSoftOptOut);PhotosProxy.getHandler().softOptOut();this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getString("modulesPhotosMemoriesSoftOptOut"),restoreCallback:()=>PhotosProxy.getHandler().restoreModule()}}))}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesPhotosMemoriesDisabled"))}}))}onImageLoadError_(){chrome.metricsPrivate.recordBoolean("NewTabPage.Photos.ImageLoad",false)}onImageLoadSuccess_(){chrome.metricsPrivate.recordBoolean("NewTabPage.Photos.ImageLoad",true)}onOptInClick_(){recordOptInStatus(OptInStatus.kOptIn);PhotosProxy.getHandler().onUserOptIn(true);this.showOptInScreen=false;this.hideMenuButton=false;this.showSoftOptOutButton=false}onOptOutClick_(){recordOptInStatus(OptInStatus.kHardOptOut);PhotosProxy.getHandler().onUserOptIn(false);this.onDisableButtonClick_()}onMemoryClick_(){this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}));PhotosProxy.getHandler().onMemoryOpen()}resizeImageUrl_(url,numMemories){let imgSize="=w168-h164-p-k-rw-no";if(numMemories<3){imgSize="=w255-h164-p-k-rw-no"}return url.replace("?",imgSize+"?")}}customElements.define(PhotosModuleElement.is,PhotosModuleElement);async function createPhotosElement(){const numMemories=3;const{memories:memories}=await PhotosProxy.getHandler().getMemories();const{showOptInScreen:showOptInScreen}=await PhotosProxy.getHandler().shouldShowOptInScreen();const{showSoftOptOutButton:showSoftOptOutButton}=await PhotosProxy.getHandler().shouldShowSoftOptOutButton();const{optInTitleText:optInTitleText}=await PhotosProxy.getHandler().getOptInTitleText(memories.slice(0,numMemories));if(memories.length===0){return null}const element=new PhotosModuleElement;element.showOptInScreen=showOptInScreen;element.showSoftOptOutButton=showSoftOptOutButton;element.optInTitleText=optInTitleText;element.hideMenuButton=showOptInScreen&&!showSoftOptOutButton;element.memories=memories.slice(0,numMemories);return element}const photosDescriptor=new ModuleDescriptor("photos",loadTimeData.getString("modulesPhotosSentence"),createPhotosElement);// Copyright 2020 The Chromium Authors. All rights reserved.
let handler=null;class TaskModuleHandlerProxy{static getHandler(){return handler||(handler=TaskModuleHandler.getRemote())}static setHandler(newHandler){handler=newHandler}constructor(){}}function getTemplate$7(){return html`<!--_html_template_start_--><style>
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  #recipes {
    display: flex;
  }

  .recipe-item {
    display: flex;
    flex-direction: column;
  }

  .secondary-info {
    display: flex;
    flex-direction: row;
  }
</style>
<ntp-module-header icon-src="modules/recipes_v2/icons/recipes_logo.svg" show-info-button="" on-info-button-click="onInfoButtonClick_">
  Recipe ideas
</ntp-module-header>
<div id="moduleContent">
  <div id="recipes">
    <template is="dom-repeat" id="recipesRepeat" items="[[recipes]]">
      <a class="recipe-item">
        <img is="cr-auto-img" auto-src="[[item.imageUrl.url]]" draggable="false">
        
        <div class="name" title="[[item.name]]">[[item.name]]</div>
        <div class="secondary-info">
          <div class="site-name">[[item.siteName]]</div>
          &nbsp;•&nbsp;
          <div class="info">[[item.info]]</div>
        </div>
      </a>
    </template>
  </div>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesRecipeInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render><!--_html_template_end_-->`}// Copyright 2021 The Chromium Authors. All rights reserved.
class RecipeModuleElement extends(I18nMixin(PolymerElement)){static get is(){return"ntp-recipes-module-redesigned"}static get template(){return getTemplate$7()}static get properties(){return{recipes:Array}}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}}customElements.define(RecipeModuleElement.is,RecipeModuleElement);async function createModule$1(){const{task:task}=await TaskModuleHandlerProxy.getHandler().getPrimaryTask();const element=new RecipeModuleElement;element.recipes=task&&task.taskItems||[];return element}const recipeTasksDescriptor$1=new ModuleDescriptorV2("recipe_tasks",loadTimeData.getString("modulesRecipeTasksSentence"),ModuleHeight.TALL,createModule$1);function getTemplate$6(){return html`<!--_html_template_start_--><style include="cr-hidden-style">
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  #moduleContent {
    box-sizing: border-box;
    display: block;
    flex-grow: 1;
    padding-bottom: 15px;
    padding-inline-end: 15px;
    padding-inline-start: 15px;
    width: 100%;
  }

  #taskItems {
    display: flex;
    flex-direction: row;
  }

  .task-item {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    outline: none;
    position: relative;
    text-decoration: none;
    width: 165px;
  }

  :host-context(.focus-outline-visible) .task-item:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .task-item:not([hidden]) + .task-item {
    margin-inline-start: 16px;
  }

  .image-background {
    /* Mixes to Google Grey 50 underneath .image-container. */
    background-color: rgb(22, 55, 88);
    border-radius: 4px;
    height: 120px;
    margin-bottom: 8px;
    width: inherit;
  }

  .image-container {
    background-color: white;
    border-radius: 4px;
    /* Using box-shadow mimics proper rendering,
     * so the color of the image-background may not be seen
     * after rounding edges. */
    box-shadow: 0 0 0 0.2px white;
    box-sizing: border-box;
    height: 100%;
    opacity: 97%;
    padding: 10px;
  }

  .task-item img {
    border-radius: 4px;
    height: 136px;
    margin-bottom: 8px;
    object-fit: cover;
    width: inherit;
  }

  .tag {
    background: rgba(var(--ntp-background-override-color-rgb), .9);
    border-radius: 4px;
    color: var(--cr-primary-text-color);
    font-size: 9px;
    margin: 8px;
    padding:  8px;
    position: absolute;
  }

  :host-context([dir=rtl]) .tag {
    right: 0;
  }

  .price {
    color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: bold;
    height: 14px;
    line-height: 15px;
    margin-bottom: 8px;
  }

  .name {
    color: var(--cr-primary-text-color);
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .secondary {
    color: var(--cr-secondary-text-color);
    font-size: 11px;
    height: 13px;
    text-overflow: ellipsis;
  }

  #relatedSearches {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  }

  .pill {
    align-items: center;
    border: solid var(--ntp-border-color) 1px;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    height: 32px;
    outline: none;
    text-decoration: none;
  }

  .pill:hover {
    background-color: var(--ntp-hover-background-color);
  }

  .pill:active {
    background-color: var(--ntp-active-background-color);
  }

  :host-context(.focus-outline-visible) .pill:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .pill + .pill {
    margin-inline-start: 8px;
  }

  .clock {
    -webkit-mask-image: url(chrome://resources/images/icon_clock.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-secondary-text-color);
    height: 16px;
    margin-inline-start: 12px;
    width: 16px;
  }

  .search-text {
    color: var(--cr-primary-text-color);
    font-size: 13px;
    margin-inline-end: 12px;
    margin-inline-start: 8px;
  }

  ntp-info-dialog a {
    color: var(--cr-link-color);
    cursor: pointer;
    text-decoration: none;
  }

  ntp-info-dialog a:focus {
    border-radius: 2px;
    box-shadow: var(--ntp-focus-shadow);
    outline: none;
  }
</style>
<ntp-module-header dismiss-text="[[i18n('modulesDismissButtonText', dismissName_)]]" disable-text="[[i18n('modulesDisableButtonText', disableName_)]]" show-info-button="" on-info-button-click="onInfoButtonClick_" show-dismiss-button="" on-dismiss-button-click="onDismissButtonClick_" on-disable-button-click="onDisableButtonClick_">
  [[title_]]
</ntp-module-header>
<div id="moduleContent">
  <div id="taskItems">
    <template is="dom-repeat" id="taskItemsRepeat" items="[[task.taskItems]]" on-dom-change="onDomChange_">
      <a class="task-item" href="[[item.targetUrl.url]]" on-click="onTaskItemClick_" on-auxclick="onTaskItemClick_">
        <img is="cr-auto-img" auto-src="[[item.imageUrl.url]]" draggable="false">
        
        <div class="tag">[[item.info]]</div>
        <div class="name" title="[[item.name]]">[[item.name]]</div>
        <div class="secondary">[[item.siteName]]</div>
      </a>
    </template>
  </div>
  <div id="relatedSearches">
    <template is="dom-repeat" id="relatedSearchesRepeat" items="[[task.relatedSearches]]" on-dom-change="onDomChange_">
      <a class="pill" href="[[item.targetUrl.url]]" on-click="onPillClick_" on-auxclick="onPillClick_">
        <div class="clock"></div>
        <div class="search-text">[[item.text]]</div>
      </a>
    </template>
  </div>
</div>
<cr-lazy-render id="infoDialogRender">
  <template>
    <ntp-info-dialog inner-h-t-m-l="[[i18nAdvanced('modulesRecipeInfo')]]">
    </ntp-info-dialog>
  </template>
</cr-lazy-render>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class TaskModuleElement extends(I18nMixin(PolymerElement)){constructor(){super(...arguments);this.intersectionObserver_=null}static get is(){return"ntp-task-module"}static get template(){return getTemplate$6()}static get properties(){return{task:Object,title_:{type:String,computed:"computeTitle_(task)"},dismissName_:{type:String,computed:"computeDismissName_(task)"},disableName_:{type:String,computed:"computeDisableName_()"}}}computeTitle_(){return loadTimeData.getString("modulesRecipeTasksSentence")}computeDismissName_(){return loadTimeData.getString("modulesRecipeTasksLowerThese")}computeDisableName_(){return loadTimeData.getString("modulesRecipeTasksLower")}onTaskItemClick_(e){const index=e.model.index;TaskModuleHandlerProxy.getHandler().onTaskItemClicked(index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onPillClick_(e){const index=e.model.index;TaskModuleHandlerProxy.getHandler().onRelatedSearchClicked(index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onInfoButtonClick_(){this.$.infoDialogRender.get().showModal()}onDismissButtonClick_(){TaskModuleHandlerProxy.getHandler().dismissTask(this.task.name);const taskName=loadTimeData.getString("modulesRecipeTasksSentence");this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("dismissModuleToastMessage",taskName),restoreCallback:this.onRestore_.bind(this)}}))}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",this.disableName_)}}))}onRestore_(){TaskModuleHandlerProxy.getHandler().restoreTask(this.task.name)}onDomChange_(){if(!this.intersectionObserver_){this.intersectionObserver_=new IntersectionObserver((entries=>{entries.forEach((({intersectionRatio:intersectionRatio,target:target})=>{target.style.visibility=intersectionRatio<1?"hidden":"visible"}));this.dispatchEvent(new Event("visibility-update"))}),{root:this,threshold:1})}else{this.intersectionObserver_.disconnect()}this.shadowRoot.querySelectorAll(".task-item, .pill").forEach((el=>this.intersectionObserver_.observe(el)))}}customElements.define(TaskModuleElement.is,TaskModuleElement);async function createModule(){const{task:task}=await TaskModuleHandlerProxy.getHandler().getPrimaryTask();if(!task){return null}const element=new TaskModuleElement;element.task=task;return element}const recipeTasksDescriptor=new ModuleDescriptor("recipe_tasks",loadTimeData.getString("modulesRecipeTasksSentence"),createModule);// Copyright 2020 The Chromium Authors. All rights reserved.
const descriptors=[];const descriptorsV2=[];if(loadTimeData.getBoolean("recipeTasksModuleEnabled")){if(loadTimeData.getBoolean("modulesRedesignedEnabled")){descriptorsV2.push(recipeTasksDescriptor$1)}else{descriptors.push(recipeTasksDescriptor)}}if(loadTimeData.getBoolean("chromeCartModuleEnabled")){if(loadTimeData.getBoolean("modulesRedesignedEnabled")){descriptorsV2.push(chromeCartDescriptor)}else{descriptors.push(chromeCartDescriptor$1)}}if(loadTimeData.getBoolean("driveModuleEnabled")){if(loadTimeData.getBoolean("modulesRedesignedEnabled")){descriptorsV2.push(driveDescriptor)}else{descriptors.push(driveDescriptor$1)}}if(loadTimeData.getBoolean("photosModuleEnabled")){descriptors.push(photosDescriptor)}async function counterfactualLoad(){if(!loadTimeData.getBoolean("modulesEnabled")&&loadTimeData.getBoolean("modulesLoadEnabled")){const modules=await ModuleRegistry.getInstance().initializeModules(loadTimeData.getInteger("modulesLoadTimeout"));if(modules){NewTabPageProxy.getInstance().handler.onModulesLoadedWithData()}}}counterfactualLoad();// Copyright 2020 The Chromium Authors. All rights reserved.
let instance$2=null;class ModuleRegistry{constructor(descriptors){this.descriptors_=descriptors}static getInstance(){return instance$2||(instance$2=new ModuleRegistry(loadTimeData.getBoolean("modulesRedesignedEnabled")?descriptorsV2:descriptors))}static setInstance(newInstance){instance$2=newInstance}getDescriptors(){return this.descriptors_}async initializeModules(timeout){const disabledIds=await new Promise(((resolve,_)=>{const callbackRouter=NewTabPageProxy.getInstance().callbackRouter;const listenerId=callbackRouter.setDisabledModules.addListener(((all,ids)=>{callbackRouter.removeListener(listenerId);resolve(all?this.descriptors_.map((({id:id})=>id)):ids)}));NewTabPageProxy.getInstance().handler.updateDisabledModules()}));const descriptors=this.descriptors_.filter((d=>!disabledIds.includes(d.id)));const orderedIds=(await NewTabPageProxy.getInstance().handler.getModulesOrder()).moduleIds;if(orderedIds.length>0){descriptors.sort(((a,b)=>{const aHasOrder=orderedIds.includes(a.id);const bHasOrder=orderedIds.includes(b.id);if(aHasOrder&&bHasOrder){return orderedIds.indexOf(a.id)-orderedIds.indexOf(b.id)}if(!aHasOrder&&bHasOrder){return 1}if(aHasOrder&&!bHasOrder){return-1}return 0}))}const elements=await Promise.all(descriptors.map((d=>d.initialize(timeout))));return elements.map(((e,i)=>({element:e,descriptor:descriptors[i]}))).filter((m=>!!m.element))}}// Copyright 2020 The Chromium Authors. All rights reserved.
class CustomizeModulesElement extends(I18nMixin(PolymerElement)){constructor(){super(...arguments);this.setDisabledModulesListenerId_=null}static get is(){return"ntp-customize-modules"}static get template(){return getTemplate$f()}static get properties(){return{show_:{type:Boolean,observer:"onShowChange_"},showManagedByPolicy_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesVisibleManagedByPolicy")},modules_:{type:Array,value:()=>ModuleRegistry.getInstance().getDescriptors().map((d=>({name:d.name,id:d.id,checked:true,hidden:false})))},discountToggle_:{type:Object,value:{enabled:false,initiallyEnabled:false}},discountToggleEligible_:{type:Boolean,value:false}}}connectedCallback(){super.connectedCallback();this.setDisabledModulesListenerId_=NewTabPageProxy.getInstance().callbackRouter.setDisabledModules.addListener(((all,ids)=>{this.show_=!all;this.modules_.forEach((({id:id},i)=>{const checked=!all&&!ids.includes(id);this.set(`modules_.${i}.checked`,checked);this.set(`modules_.${i}.initiallyChecked`,checked);this.set(`modules_.${i}.disabled`,ids.includes(id))}))}));NewTabPageProxy.getInstance().handler.updateDisabledModules();if(this.modules_.some((module=>module.id==="chrome_cart"))){ChromeCartProxy.getHandler().getDiscountToggleVisible().then((({toggleVisible:toggleVisible})=>{this.set("discountToggleEligible_",toggleVisible)}));ChromeCartProxy.getHandler().getDiscountEnabled().then((({enabled:enabled})=>{this.set("discountToggle_.enabled",enabled);this.discountToggle_.initiallyEnabled=enabled}))}}disconnectedCallback(){super.disconnectedCallback();NewTabPageProxy.getInstance().callbackRouter.removeListener(this.setDisabledModulesListenerId_)}ready(){window.CrPolicyStrings={controlledSettingPolicy:loadTimeData.getString("controlledSettingPolicy")};super.ready()}apply(){const handler=NewTabPageProxy.getInstance().handler;handler.setModulesVisible(this.show_);this.modules_.filter((({checked:checked,initiallyChecked:initiallyChecked})=>checked!==initiallyChecked)).forEach((({id:id,checked:checked})=>{if(this.show_){handler.setModuleDisabled(id,!checked)}const base=`NewTabPage.Modules.${checked?"Enabled":"Disabled"}`;chrome.metricsPrivate.recordSparseHashable(base,id);chrome.metricsPrivate.recordSparseHashable(`${base}.Customize`,id)}));if(this.discountToggleEligible_&&this.discountToggle_.enabled!==this.discountToggle_.initiallyEnabled){ChromeCartProxy.getHandler().setDiscountEnabled(this.discountToggle_.enabled);chrome.metricsPrivate.recordUserAction(`NewTabPage.Carts.${this.discountToggle_.enabled?"EnableDiscount":"DisableDiscount"}`)}}onShowRadioSelectionChanged_(e){this.show_=e.detail.value==="customize"}onShowChange_(){this.modules_.forEach(((m,i)=>this.set(`modules_.${i}.checked`,this.show_&&!m.disabled)))}radioSelection_(){return this.show_?"customize":"hide"}moduleToggleDisabled_(){return this.showManagedByPolicy_||!this.show_}showDiscountToggle_(id,checked,eligible){return id==="chrome_cart"&&checked&&eligible}}customElements.define(CustomizeModulesElement.is,CustomizeModulesElement);function getTemplate$5(){return html`<!--_html_template_start_--><style include="cr-hidden-style cr-icons">
  cr-dialog::part(dialog) {
    height: 100%;
    max-height: 520px;
    min-width: 800px;
  }

  cr-dialog::part(wrapper) {
    height: 100%;
  }

  cr-dialog::part(body-container) {
    flex-grow: 1;
  }

  div[slot=title] {
    align-items: center;
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: row;
    height: 64px;
    margin-top: 16px;
    padding: 0;
  }

  div[slot=body] {
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
  }

  #bodyContainer {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  div[slot=button-container] {
    padding-top: 16px;
  }

  #leftTitleSpacer,
  #menu {
    width: 218px;
  }

  #title {
    line-height: 1.5;
    margin-bottom: -2px;
    padding-inline-end: 24px;
    user-select: none;
  }

  /* We pad the pages to allow content to overflow horizontally. We can't use
   * overflow-x: visible since that will be ignored if overflow-y: auto. */
  #title,
  #pages {
    flex-grow: 1;
    padding-inline-start: 14px;
  }

  #menu,
  #pages {
    height: 100%;
    overflow: auto;
  }

  #pages > iron-pages {
    /* Margin is for focus outline. */
    margin: 2px;
  }

  div[scroll-border] {
    border-bottom: 1px solid transparent;
  }

  div[scroll-border][show-1],
  div[scroll-border][show-2] {
    border-bottom-color: var(--ntp-border-color);
  }

  #menu {
    display: flex;
    flex-direction: column;
  }

  #menuSelector {
    margin-bottom: 2px;
    margin-top: 2px;
  }

  .menu-item {
    align-items: center;
    border-radius: 0 16px 16px 0;
    color: var(--cr-primary-text-color);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    font-size: 14px;
    height: 32px;
    outline: none;
    width: 192px;
  }

  .menu-item + .menu-item {
    margin-top: 16px;
  }

  :host-context([dir=rtl]) .menu-item {
    border-radius: 16px 0 0 16px;
  }

  .menu-item:hover {
    background-color: var(--ntp-hover-background-color);
  }

  :host-context(.focus-outline-visible) .menu-item:focus {
    box-shadow: var(--ntp-focus-shadow);
  }

  .menu-item:active {
    background-color: var(--ntp-active-background-color);
  }

  .menu-item[selected] {
    background-color: var(--ntp-selected-background-color);
    color: var(--ntp-selected-primary-text-color);
  }

  .menu-item-icon {
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-primary-text-color);
    height: 20px;
    margin-inline-end: 16px;
    margin-inline-start: 24px;
    width: 20px;
  }

  .menu-item[selected] .menu-item-icon {
    background-color: var(--ntp-selected-primary-text-color);
  }

  #backgroundsIcon {
    -webkit-mask-image: url(icons/backgrounds.svg);
  }

  #shortcutsIcon {
    -webkit-mask-image: url(icons/link.svg);
  }

  #modulesIcon {
    -webkit-mask-image: url(icons/cards.svg);
  }

  #themesIcon {
    -webkit-mask-image: url(icons/colors.svg);
  }

  #backButton {
    --cr-icon-button-fill-color: var(--cr-primary-text-color);
    margin-inline-end: 4px;
    /* So that the arrow aligns with the grid. */
    margin-inline-start: -12px;
  }

  #titleNavigation {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  cr-toggle {
    margin-inline-end: 12px;
  }

  #collectionTitle {
    flex-grow: 1;
  }
</style>
<cr-dialog id="dialog" on-cancel="onCancel_" show-on-attach="">
  <div slot="title">
    <div id="leftTitleSpacer"></div>
    <div id="title">
      <div id="titleText" hidden="[[showTitleNavigation_]]">
        Customize this page
      </div>
      <div id="titleNavigation" hidden="[[!showTitleNavigation_]]">
        <cr-icon-button id="backButton" class="icon-arrow-back" on-click="onBackClick_" title="Back">
        </cr-icon-button>
        <div id="collectionTitle">[[selectedCollection_.label]]</div>
        <cr-toggle id="refreshToggle" checked="[[isRefreshToggleChecked_]]" on-change="onBackgroundDailyRefreshToggleChange_">
        </cr-toggle>
        Refresh daily
      </div>
    </div>
  </div>
  <div slot="body">
    <div id="topPageScrollBorder" scroll-border=""></div>
    <div id="bodyContainer">
      <div id="menu">
        <iron-selector id="menuSelector" selected-attribute="selected" attr-for-selected="page-name" selected="{{selectedPage}}" on-keydown="onMenuItemKeyDown_" fallback-selection="backgrounds">
          <div class="menu-item" page-name="backgrounds" tabindex="0">
            <div id="backgroundsIcon" class="menu-item-icon"></div>
            Background
          </div>
          <div class="menu-item" page-name="shortcuts" tabindex="0" hidden$="[[!shortcutsEnabled_]]">
            <div id="shortcutsIcon" class="menu-item-icon"></div>
            Shortcuts
          </div>
          <div class="menu-item" page-name="modules" tabindex="0" hidden$="[[!modulesEnabled_]]">
            <div id="modulesIcon" class="menu-item-icon"></div>
            Cards
          </div>
          <div class="menu-item" page-name="themes" tabindex="0">
            <div id="themesIcon" class="menu-item-icon"></div>
            Color and theme
          </div>
        </iron-selector>
      </div>
      <div id="pages">
        <iron-pages selected="[[selectedPage]]" attr-for-selected="page-name">
          <ntp-customize-backgrounds id="backgrounds" page-name="backgrounds" selected-collection="{{selectedCollection_}}" theme="[[theme]]" background-selection="{{backgroundSelection}}">
          </ntp-customize-backgrounds>
          <ntp-customize-shortcuts page-name="shortcuts">
          </ntp-customize-shortcuts>
          <ntp-customize-modules page-name="modules" hidden$="[[!modulesEnabled_]]">
          </ntp-customize-modules>
          <cr-customize-themes id="customizeThemes" page-name="themes">
          </cr-customize-themes>
        </iron-pages>
      </div>
    </div>
    <div id="bottomPageScrollBorder" scroll-border=""></div>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancelClick_">
      Cancel
    </cr-button>
    <cr-button class="action-button" on-click="onDoneClick_">
      Done
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}// Copyright 2019 The Chromium Authors. All rights reserved.
class CustomizeDialogElement extends PolymerElement{constructor(){super();this.intersectionObservers_=[];this.pageHandler_=NewTabPageProxy.getInstance().handler}static get is(){return"ntp-customize-dialog"}static get template(){return getTemplate$5()}static get properties(){return{theme:Object,selectedPage:{type:String,observer:"onSelectedPageChange_"},selectedCollection_:Object,showTitleNavigation_:{type:Boolean,computed:"computeShowTitleNavigation_(selectedPage, selectedCollection_)",value:false},isRefreshToggleChecked_:{type:Boolean,computed:`computeIsRefreshToggleChecked_(theme, selectedCollection_)`},shortcutsEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("shortcutsEnabled")},modulesEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesEnabled")}}}disconnectedCallback(){super.disconnectedCallback();this.intersectionObservers_.forEach((observer=>{observer.disconnect()}));this.intersectionObservers_=[]}ready(){super.ready();this.intersectionObservers_=[createScrollBorders(this.$.menu,this.$.topPageScrollBorder,this.$.bottomPageScrollBorder,"show-1"),createScrollBorders(this.$.pages,this.$.topPageScrollBorder,this.$.bottomPageScrollBorder,"show-2")];this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kOpenClicked)}onCancel_(){this.$.backgrounds.revertBackgroundChanges();this.$.customizeThemes.revertThemeChanges()}onCancelClick_(){this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kCancelClicked);this.$.dialog.cancel()}onDoneClick_(){this.$.backgrounds.confirmBackgroundChanges();this.$.customizeThemes.confirmThemeChanges();this.shadowRoot.querySelector("ntp-customize-shortcuts").apply();if(this.modulesEnabled_){this.shadowRoot.querySelector("ntp-customize-modules").apply()}this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kDoneClicked);this.$.dialog.close()}onMenuItemKeyDown_(e){if(!["Enter"," "].includes(e.key)){return}e.preventDefault();e.stopPropagation();this.selectedPage=e.target.getAttribute("page-name")}onSelectedPageChange_(){this.$.pages.scrollTop=0}computeIsRefreshToggleChecked_(){if(!this.selectedCollection_){return false}return!!this.theme&&this.selectedCollection_.id===this.theme.dailyRefreshCollectionId}computeShowTitleNavigation_(){return this.selectedPage===CustomizeDialogPage.BACKGROUNDS&&!!this.selectedCollection_}onBackClick_(){this.selectedCollection_=null;this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kBackgroundsBackClicked);this.$.pages.scrollTop=0}onBackgroundDailyRefreshToggleChange_(){if(this.$.refreshToggle.checked){this.pageHandler_.setDailyRefreshCollectionId(this.selectedCollection_.id)}else{this.pageHandler_.setDailyRefreshCollectionId("")}this.pageHandler_.onCustomizeDialogAction(CustomizeDialogAction.kBackgroundsRefreshToggleClicked)}}customElements.define(CustomizeDialogElement.is,CustomizeDialogElement);function getTemplate$4(){return html`<!--_html_template_start_--><style>
  :host {
    font-size: 12px;
    max-width: 537px;
    white-space: pre;
  }

  #container {
    align-items: center;
    background-color: var(--ntp-background-override-color);
    border: solid var(--ntp-border-color) 1px;
    border-radius: 24px;
    box-sizing: border-box;
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: center;
    padding-inline-end: 8px;
    padding-inline-start: 8px;
  }

  a {
    color: var(--cr-link-color);
    cursor: pointer;
    text-decoration: none;
  }

  a:focus {
    border-radius: 2px;
    box-shadow: var(--ntp-focus-shadow);
    outline: none;
  }

  * + .image {
    margin-inline-start: 8px;
  }

  .image + * {
    margin-inline-start: 8px;
  }

  img {
    border-radius: 50%;
    height: 24px;
    pointer-events: none;
    width: 24px;
  }

  @media (prefers-color-scheme: dark) {
    img {
      background-color: var(--google-grey-200);
    }
  }

  #container > :last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<!-- Promo parts are added by JS. -->
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
async function renderPromo(){const browserHandler=NewTabPageProxy.getInstance().handler;const promoBrowserCommandHandler=BrowserCommandProxy.getInstance().handler;const{promo:promo}=await browserHandler.getPromo();if(!promo){return null}const commandIds=[];function createAnchor(target){const commandIdMatch=/^command:(\d+)$/.exec(target.url);if(!commandIdMatch&&!target.url.startsWith("https://")){return null}const el=document.createElement("a");let commandId=null;if(!commandIdMatch){el.href=target.url}else{commandId=+commandIdMatch[1];if(!Object.values(Command).includes(commandId)){commandId=Command.kUnknownCommand}commandIds.push(commandId)}function onClick(event){if(commandId!==null){promoBrowserCommandHandler.executeCommand(commandId,{middleButton:event.button===1,altKey:event.altKey,ctrlKey:event.ctrlKey,metaKey:event.metaKey,shiftKey:event.shiftKey})}browserHandler.onPromoLinkClicked()}el.addEventListener("auxclick",onClick);el.addEventListener("click",onClick);return el}let hasContent=false;const container=document.createElement("div");container.id="container";promo.middleSlotParts.forEach((({image:image,link:link,text:text})=>{let el;if(image){el=new CrAutoImgElement;el.autoSrc=image.imageUrl.url;if(image.target){const anchor=createAnchor(image.target);if(anchor){anchor.appendChild(el);el=anchor}}el.classList.add("image")}else if(link){el=createAnchor(link.url)}else if(text){el=document.createElement("span")}const linkOrText=link||text;if(el&&linkOrText){el.innerText=linkOrText.text;if(linkOrText.color){el.style.color=linkOrText.color}}if(el){hasContent=true;container.appendChild(el)}}));const canShow=(await Promise.all(commandIds.map((commandId=>promoBrowserCommandHandler.canExecuteCommand(commandId))))).every((({canExecute:canExecute})=>canExecute));if(hasContent&&canShow){browserHandler.onPromoRendered(WindowProxy.getInstance().now(),promo.logUrl||null);return container}return null}class MiddleSlotPromoElement extends PolymerElement{static get is(){return"ntp-middle-slot-promo"}static get template(){return getTemplate$4()}ready(){super.ready();renderPromo().then((container=>{if(container){this.shadowRoot.appendChild(container)}this.dispatchEvent(new Event("ntp-middle-slot-promo-loaded",{bubbles:true,composed:true}))}))}}customElements.define(MiddleSlotPromoElement.is,MiddleSlotPromoElement);// Copyright 2021 The Chromium Authors. All rights reserved.
class MostVisitedBrowserProxy{constructor(handler,callbackRouter){this.handler=handler;this.callbackRouter=callbackRouter}static getInstance(){if(instance$1){return instance$1}const callbackRouter=new MostVisitedPageCallbackRouter;const handler=new MostVisitedPageHandlerRemote;const factory=MostVisitedPageHandlerFactory.getRemote();factory.createPageHandler(callbackRouter.$.bindNewPipeAndPassRemote(),handler.$.bindNewPipeAndPassReceiver());instance$1=new MostVisitedBrowserProxy(handler,callbackRouter);return instance$1}static setInstance(obj){instance$1=obj}}let instance$1=null;// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class MostVisitedWindowProxy{matchMedia(query){return window.matchMedia(query)}now(){return Date.now()}static getInstance(){return instance||(instance=new MostVisitedWindowProxy)}static setInstance(obj){instance=obj}}let instance=null;// Copyright 2019 The Chromium Authors. All rights reserved.
var ScreenWidth;(function(ScreenWidth){ScreenWidth[ScreenWidth["NARROW"]=0]="NARROW";ScreenWidth[ScreenWidth["MEDIUM"]=1]="MEDIUM";ScreenWidth[ScreenWidth["WIDE"]=2]="WIDE"})(ScreenWidth||(ScreenWidth={}));function resetTilePosition(tile){tile.style.position="";tile.style.left="";tile.style.top=""}function setTilePosition(tile,{x:x,y:y}){tile.style.position="fixed";tile.style.left=`${x}px`;tile.style.top=`${y}px`}function getHitIndex(rects,x,y){return rects.findIndex((r=>x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom))}function normalizeUrl(urlString){try{const url=new URL(urlString.includes("://")?urlString:`https://${urlString}/`);if(["http:","https:"].includes(url.protocol)){return url}}catch(e){}return null}const MostVisitedElementBase=I18nMixin(PolymerElement);class MostVisitedElement extends MostVisitedElementBase{constructor(){performance.mark("most-visited-creation-start");super();this.adding_=false;this.setMostVisitedInfoListenerId_=null;this.actionMenuTargetIndex_=-1;this.tileRects_=[];this.callbackRouter_=MostVisitedBrowserProxy.getInstance().callbackRouter;this.pageHandler_=MostVisitedBrowserProxy.getInstance().handler;this.windowProxy_=MostVisitedWindowProxy.getInstance();this.dragOffset_=null}static get is(){return"cr-most-visited"}static get properties(){return{theme:Object,useWhiteTileIcon_:{type:Boolean,reflectToAttribute:true,computed:`computeUseWhiteTileIcon_(theme)`},useTitlePill_:{type:Boolean,reflectToAttribute:true,computed:`computeUseTitlePill_(theme)`},columnCount_:{type:Number,computed:`computeColumnCount_(tiles_, screenWidth_, maxTiles_)`},rowCount_:{type:Number,computed:"computeRowCount_(columnCount_, tiles_)"},customLinksEnabled_:{type:Boolean,reflectToAttribute:true},dialogTileTitle_:String,dialogTileUrl_:{type:String,observer:"onDialogTileUrlChange_"},dialogTileUrlInvalid_:{type:Boolean,value:false},dialogTitle_:String,dialogSaveDisabled_:{type:Boolean,computed:`computeDialogSaveDisabled_(dialogTitle_, dialogTileUrl_,\n            dialogShortcutAlreadyExists_)`},dialogShortcutAlreadyExists_:{type:Boolean,computed:"computeDialogShortcutAlreadyExists_(tiles_, dialogTileUrl_)"},dialogTileUrlError_:{type:String,computed:`computeDialogTileUrlError_(dialogTileUrl_,\n            dialogShortcutAlreadyExists_)`},isDark_:{type:Boolean,reflectToAttribute:true,computed:`computeIsDark_(theme)`},reordering_:{type:Boolean,value:false,reflectToAttribute:true},maxTiles_:{type:Number,computed:"computeMaxTiles_(customLinksEnabled_)"},maxVisibleTiles_:{type:Number,computed:"computeMaxVisibleTiles_(columnCount_, rowCount_)"},showAdd_:{type:Boolean,value:false,computed:"computeShowAdd_(tiles_, maxVisibleTiles_, customLinksEnabled_)"},showToastButtons_:Boolean,screenWidth_:Number,tiles_:Array,toastContent_:String,visible_:{type:Boolean,reflectToAttribute:true}}}get tileElements_(){return Array.from(this.shadowRoot.querySelectorAll(".tile:not([hidden])"))}connectedCallback(){super.connectedCallback();this.isRtl_=window.getComputedStyle(this)["direction"]==="rtl";this.eventTracker_=new EventTracker;this.setMostVisitedInfoListenerId_=this.callbackRouter_.setMostVisitedInfo.addListener((info=>{performance.measure("most-visited-mojo","most-visited-mojo-start");this.visible_=info.visible;this.customLinksEnabled_=info.customLinksEnabled;this.tiles_=info.tiles.slice(0,assert(this.maxTiles_))}));performance.mark("most-visited-mojo-start");this.eventTracker_.add(document,"visibilitychange",(()=>{if(document.visibilityState==="visible"){this.pageHandler_.updateMostVisitedInfo()}}));this.pageHandler_.updateMostVisitedInfo();FocusOutlineManager.forDocument(document)}disconnectedCallback(){super.disconnectedCallback();this.mediaListenerWideWidth_.removeListener(assert(this.boundOnWidthChange_));this.mediaListenerMediumWidth_.removeListener(assert(this.boundOnWidthChange_));this.ownerDocument.removeEventListener("keydown",this.boundOnDocumentKeyDown_);this.eventTracker_.removeAll()}ready(){super.ready();this.boundOnWidthChange_=this.updateScreenWidth_.bind(this);this.mediaListenerWideWidth_=this.windowProxy_.matchMedia("(min-width: 672px)");this.mediaListenerWideWidth_.addListener(this.boundOnWidthChange_);this.mediaListenerMediumWidth_=this.windowProxy_.matchMedia("(min-width: 560px)");this.mediaListenerMediumWidth_.addListener(this.boundOnWidthChange_);this.updateScreenWidth_();this.boundOnDocumentKeyDown_=e=>this.onDocumentKeyDown_(e);this.ownerDocument.addEventListener("keydown",this.boundOnDocumentKeyDown_);performance.measure("most-visited-creation","most-visited-creation-start")}rgbaOrInherit_(skColor){return skColor?skColorToRgba(skColor):"inherit"}clearForceHover_(){const forceHover=this.shadowRoot.querySelector(".force-hover");if(forceHover){forceHover.classList.remove("force-hover")}}computeColumnCount_(){let maxColumns=3;if(this.screenWidth_===ScreenWidth.WIDE){maxColumns=5}else if(this.screenWidth_===ScreenWidth.MEDIUM){maxColumns=4}const shortcutCount=this.tiles_?this.tiles_.length:0;const canShowAdd=this.maxTiles_>shortcutCount;const tileCount=Math.min(this.maxTiles_,shortcutCount+(canShowAdd?1:0));const columnCount=tileCount<=maxColumns?tileCount:Math.min(maxColumns,Math.ceil(tileCount/2));return columnCount||3}computeRowCount_(){if(this.columnCount_===0){return 0}const shortcutCount=this.tiles_?this.tiles_.length:0;return this.columnCount_<=shortcutCount?2:1}computeMaxTiles_(){return this.customLinksEnabled_?10:8}computeMaxVisibleTiles_(){return this.columnCount_*this.rowCount_}computeShowAdd_(){return this.customLinksEnabled_&&this.tiles_&&this.tiles_.length<this.maxVisibleTiles_}computeDialogSaveDisabled_(){return!this.dialogTileUrl_.trim()||normalizeUrl(this.dialogTileUrl_)===null||this.dialogShortcutAlreadyExists_}computeDialogShortcutAlreadyExists_(){const dialogTileHref=(normalizeUrl(this.dialogTileUrl_)||{}).href;if(!dialogTileHref){return false}return(this.tiles_||[]).some((({url:{url:url}},index)=>{if(index===this.actionMenuTargetIndex_){return false}const otherUrl=normalizeUrl(url);return otherUrl&&otherUrl.href===dialogTileHref}))}computeDialogTileUrlError_(){return loadTimeData.getString(this.dialogShortcutAlreadyExists_?"shortcutAlreadyExists":"invalidUrl")}computeIsDark_(){return this.theme?this.theme.isDark:false}computeUseWhiteTileIcon_(){return this.theme?this.theme.useWhiteTileIcon:false}computeUseTitlePill_(){return this.theme?this.theme.useTitlePill:false}dragEnd_(x,y){if(!this.customLinksEnabled_){this.reordering_=false;return}this.dragOffset_=null;const dragElement=this.shadowRoot.querySelector(".tile.dragging");if(!dragElement){this.reordering_=false;return}const dragIndex=this.$.tiles.modelForElement(dragElement).index;dragElement.classList.remove("dragging");this.tileElements_.forEach((el=>resetTilePosition(el)));resetTilePosition(this.$.addShortcut);const dropIndex=getHitIndex(this.tileRects_,x,y);if(dragIndex!==dropIndex&&dropIndex>-1){const[draggingTile]=this.tiles_.splice(dragIndex,1);this.tiles_.splice(dropIndex,0,draggingTile);this.notifySplices("tiles_",[{index:dragIndex,removed:[draggingTile],addedCount:0,object:this.tiles_,type:"splice"},{index:dropIndex,removed:[],addedCount:1,object:this.tiles_,type:"splice"}]);this.pageHandler_.reorderMostVisitedTile(draggingTile.url,dropIndex)}}dragOver_(x,y){const dragElement=this.shadowRoot.querySelector(".tile.dragging");if(!dragElement){this.reordering_=false;return}const dragIndex=this.$.tiles.modelForElement(dragElement).index;setTilePosition(dragElement,{x:x-this.dragOffset_.x,y:y-this.dragOffset_.y});const dropIndex=getHitIndex(this.tileRects_,x,y);this.tileElements_.forEach(((element,i)=>{let positionIndex;if(i===dragIndex){return}else if(dropIndex===-1){positionIndex=i}else if(dragIndex<dropIndex&&dragIndex<=i&&i<=dropIndex){positionIndex=i-1}else if(dragIndex>dropIndex&&dragIndex>=i&&i>=dropIndex){positionIndex=i+1}else{positionIndex=i}setTilePosition(element,this.tileRects_[positionIndex])}))}dragStart_(dragElement,x,y){this.clearForceHover_();dragElement.classList.add("dragging");const dragElementRect=dragElement.getBoundingClientRect();this.dragOffset_={x:x-dragElementRect.x,y:y-dragElementRect.y};const tileElements=this.tileElements_;this.tileRects_=tileElements.map((t=>t.getBoundingClientRect()));if(this.showAdd_){const element=this.$.addShortcut;setTilePosition(element,element.getBoundingClientRect())}tileElements.forEach(((tile,i)=>{setTilePosition(tile,this.tileRects_[i])}));this.reordering_=true}getFaviconUrl_(url){const faviconUrl=new URL("chrome://favicon2/");faviconUrl.searchParams.set("size","24");faviconUrl.searchParams.set("scale_factor","1x");faviconUrl.searchParams.set("show_fallback_monogram","");faviconUrl.searchParams.set("page_url",url.url);return faviconUrl.href}getRestoreButtonText_(){return loadTimeData.getString(this.customLinksEnabled_?"restoreDefaultLinks":"restoreThumbnailsShort")}getTileTitleDirectionClass_(tile){return tile.titleDirection===TextDirection.RIGHT_TO_LEFT?"title-rtl":"title-ltr"}isHidden_(index){return index>=this.maxVisibleTiles_}onAdd_(){this.dialogTitle_=loadTimeData.getString("addLinkTitle");this.dialogTileTitle_="";this.dialogTileUrl_="";this.dialogTileUrlInvalid_=false;this.adding_=true;this.$.dialog.showModal()}onAddShortcutKeyDown_(e){if(hasKeyModifiers(e)){return}if(!this.tiles_||this.tiles_.length===0){return}const backKey=this.isRtl_?"ArrowRight":"ArrowLeft";if(e.key===backKey||e.key==="ArrowUp"){this.tileFocus_(this.tiles_.length-1)}}onDialogCancel_(){this.actionMenuTargetIndex_=-1;this.$.dialog.cancel()}onDialogClose_(){this.dialogTileUrl_="";if(this.adding_){this.$.addShortcut.focus()}this.adding_=false}onDialogTileUrlBlur_(){if(this.dialogTileUrl_.length>0&&(normalizeUrl(this.dialogTileUrl_)===null||this.dialogShortcutAlreadyExists_)){this.dialogTileUrlInvalid_=true}}onDialogTileUrlChange_(){this.dialogTileUrlInvalid_=false}onDocumentKeyDown_(e){if(e.altKey||e.shiftKey){return}const modifier=isMac?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey;if(modifier&&e.key==="z"){e.preventDefault();this.onUndoClick_()}}onDragStart_(e){if(!this.customLinksEnabled_){return}if(e.dataTransfer){e.dataTransfer.setDragImage(new Image,0,0)}this.dragStart_(e.target,e.x,e.y);const dragOver=e=>{e.preventDefault();e.dataTransfer.dropEffect="move";this.dragOver_(e.x,e.y)};this.ownerDocument.addEventListener("dragover",dragOver);this.ownerDocument.addEventListener("dragend",(e=>{this.ownerDocument.removeEventListener("dragover",dragOver);this.dragEnd_(e.x,e.y);const dropIndex=getHitIndex(this.tileRects_,e.x,e.y);if(dropIndex!==-1){this.tileElements_[dropIndex].classList.add("force-hover")}this.addEventListener("pointermove",(()=>{this.clearForceHover_();this.reordering_=false}),{once:true})}),{once:true})}onEdit_(){this.$.actionMenu.close();this.dialogTitle_=loadTimeData.getString("editLinkTitle");const tile=this.tiles_[this.actionMenuTargetIndex_];this.dialogTileTitle_=tile.title;this.dialogTileUrl_=tile.url.url;this.dialogTileUrlInvalid_=false;this.$.dialog.showModal()}onRestoreDefaultsClick_(){if(!this.$.toast.open||!this.showToastButtons_){return}this.$.toast.hide();this.pageHandler_.restoreMostVisitedDefaults()}async onRemove_(){this.$.actionMenu.close();await this.tileRemove_(this.actionMenuTargetIndex_);this.actionMenuTargetIndex_=-1}async onSave_(){const newUrl={url:normalizeUrl(this.dialogTileUrl_).href};this.$.dialog.close();let newTitle=this.dialogTileTitle_.trim();if(newTitle.length===0){newTitle=this.dialogTileUrl_}if(this.adding_){const{success:success}=await this.pageHandler_.addMostVisitedTile(newUrl,newTitle);this.toast_(success?"linkAddedMsg":"linkCantCreate",success)}else{const{url:url,title:title}=this.tiles_[this.actionMenuTargetIndex_];if(url.url!==newUrl.url||title!==newTitle){const{success:success}=await this.pageHandler_.updateMostVisitedTile(url,newUrl,newTitle);this.toast_(success?"linkEditedMsg":"linkCantEdit",success)}this.actionMenuTargetIndex_=-1}}onTileActionButtonClick_(e){e.preventDefault();this.actionMenuTargetIndex_=e.model.index;this.$.actionMenu.showAt(e.target)}onTileRemoveButtonClick_(e){e.preventDefault();this.tileRemove_(e.model.index)}onTileClick_(e){if(e.defaultPrevented){return}if(loadTimeData.getBoolean("handleMostVisitedNavigationExplicitly")){e.preventDefault()}this.pageHandler_.onMostVisitedTileNavigation(e.model.item,e.model.index,e.button||0,e.altKey,e.ctrlKey,e.metaKey,e.shiftKey)}onTileKeyDown_(e){if(hasKeyModifiers(e)){return}if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight"&&e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Delete"){return}const index=e.model.index;if(e.key==="Delete"){this.tileRemove_(index);return}const advanceKey=this.isRtl_?"ArrowLeft":"ArrowRight";const delta=e.key===advanceKey||e.key==="ArrowDown"?1:-1;this.tileFocus_(Math.max(0,index+delta))}onUndoClick_(){if(!this.$.toast.open||!this.showToastButtons_){return}this.$.toast.hide();this.pageHandler_.undoMostVisitedTileAction()}onTouchStart_(e){if(this.reordering_||!this.customLinksEnabled_){return}const tileElement=e.composedPath().find((el=>el.classList&&el.classList.contains("tile")));if(!tileElement){return}const{clientX:clientX,clientY:clientY}=e.changedTouches[0];this.dragStart_(tileElement,clientX,clientY);const touchMove=e=>{const{clientX:clientX,clientY:clientY}=e.changedTouches[0];this.dragOver_(clientX,clientY)};const touchEnd=e=>{this.ownerDocument.removeEventListener("touchmove",touchMove);tileElement.removeEventListener("touchend",touchEnd);tileElement.removeEventListener("touchcancel",touchEnd);const{clientX:clientX,clientY:clientY}=e.changedTouches[0];this.dragEnd_(clientX,clientY);this.reordering_=false};this.ownerDocument.addEventListener("touchmove",touchMove);tileElement.addEventListener("touchend",touchEnd,{once:true});tileElement.addEventListener("touchcancel",touchEnd,{once:true})}tileFocus_(index){if(index<0){return}const tileElements=this.tileElements_;if(index<tileElements.length){tileElements[index].focus()}else if(this.showAdd_&&index===tileElements.length){this.$.addShortcut.focus()}}toast_(msgId,showButtons){this.toastContent_=loadTimeData.getString(msgId);this.showToastButtons_=showButtons;this.$.toast.show()}tileRemove_(index){const{url:url,isQueryTile:isQueryTile}=this.tiles_[index];this.pageHandler_.deleteMostVisitedTile(url);this.toast_("linkRemovedMsg",this.customLinksEnabled_||!isQueryTile);this.tileFocus_(index)}updateScreenWidth_(){if(this.mediaListenerWideWidth_.matches){this.screenWidth_=ScreenWidth.WIDE}else if(this.mediaListenerMediumWidth_.matches){this.screenWidth_=ScreenWidth.MEDIUM}else{this.screenWidth_=ScreenWidth.NARROW}}onTilesRendered_(){performance.measure("most-visited-rendered");this.pageHandler_.onMostVisitedTilesRendered(this.tiles_.slice(0,assert(this.maxVisibleTiles_)),this.windowProxy_.now())}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons" scope="cr-most-visited">:host {
  --icon-button-color-active: var(--google-grey-700);
    --icon-button-color: var(--google-grey-600);
    --icon-size: 48px;
    --tile-background-color: rgb(229, 231, 232);
    --tile-hover-color: rgba(var(--google-grey-900-rgb), .1);
    --tile-size: 112px;
    --title-height: 32px;
}

@media (prefers-color-scheme: dark) {
:host {
  --tile-background-color: var(--google-grey-100);
}

}

:host([is-dark_]) {
  --icon-button-color-active: var(--google-grey-300);
    --icon-button-color: white;
    --tile-hover-color: rgba(255, 255, 255, .1);
}

#container {
  --content-width: calc(var(--column-count) * var(--tile-size)
      
      + 1px);
    display: flex;
    flex-wrap: wrap;
    height: calc(var(--row-count) * var(--tile-size));
    justify-content: center;
    margin-bottom: 8px;
    opacity: 0;
    overflow: hidden;
    padding: 2px;  
    transition: opacity 300ms ease-in-out;
    width: calc(var(--content-width) + 12px);
}

:host([visible_]) #container {
  opacity: 1;
}

#addShortcutIcon, .query-tile-icon {
  -webkit-mask-image: url(chrome://resources/images/add.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--google-grey-900);
    height: 24px;
    width: 24px;
}

.query-tile-icon {
  -webkit-mask-image: url(chrome://resources/images/icon_search.svg);
    background-color: var(--google-grey-700);
}

:host([use-white-tile-icon_]) #addShortcutIcon {
  background-color: white;
}

:host([use-white-tile-icon_]) .query-tile-icon {
  background-color: var(--google-grey-400);
}

.tile, #addShortcut {
  -webkit-tap-highlight-color: transparent;
    align-items: center;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: var(--tile-size);
    opacity: 1;
    outline: none;
    position: relative;
    text-decoration: none;
    transition-duration: 300ms;
    transition-property: left, top;
    transition-timing-function: ease-in-out;
    user-select: none;
    width: var(--tile-size);
}

.tile {
  touch-action: none;
}

:host-context(.focus-outline-visible) .tile:focus, :host-context(.focus-outline-visible) #addShortcut:focus {
  box-shadow: var(--most-visited-focus-shadow);
}

#addShortcut {
  background-color: transparent;
    border: none;
    box-shadow: none;
    justify-content: unset;
    padding: 0;
}

:host(:not([reordering_])) .tile:hover, :host(:not([reordering_])) #addShortcut:hover, .force-hover {
  background-color: var(--tile-hover-color);
}

.tile-icon {
  align-items: center;
    background-color: var(--tile-background-color);
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    height: var(--icon-size);
    justify-content: center;
    margin-top: 16px;
    width: var(--icon-size);
}

.tile-icon img {
  height: 24px;
    width: 24px;
}

.tile-title {
  align-items: center;
    border-radius: calc(var(--title-height) / 2 + 2px);
    color: var(--most-visited-text-color);
    display: flex;
    height: var(--title-height);
    line-height: calc(var(--title-height) / 2);
    margin-top: 6px;
    padding: 2px 8px;
    width: 88px;
}

:host([use-title-pill_]) .tile-title {
  background-color: white;
    color: var(--google-grey-800);
}

.tile-title span {
  font-weight: 400;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    text-shadow: var(--most-visited-text-shadow);
    white-space: nowrap;
    width: 100%;
}

.tile[query-tile] .tile-title span {
  -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    white-space: initial;
}

:host([use-title-pill_]) .tile-title span {
  text-shadow: none;
}

.title-rtl {
  direction: rtl;
}

.title-ltr {
  direction: ltr;
}

.tile.dragging {
  background-color: var(--tile-hover-color);
    transition-property: none;
    z-index: 2;
}

cr-icon-button {
  --cr-icon-button-fill-color: var(--icon-button-color);
    --cr-icon-button-size: 28px;
    --cr-icon-button-transition: none;
    margin: 4px 2px;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 100ms ease-in-out;
}

:host-context([dir=rtl]) cr-icon-button {
  left: 0;
    right: unset;
}

:host(:not([reordering_])) .tile:hover cr-icon-button, .force-hover cr-icon-button {
  opacity: 1;
    transition-delay: 400ms;
}

:host(:not([reordering_])) cr-icon-button:active, :host-context(.focus-outline-visible):host(:not([reordering_])) cr-icon-button:focus, :host(:not([reordering_])) cr-icon-button:hover {
  --cr-icon-button-fill-color: var(--icon-button-color-active);
    opacity: 1;
    transition-delay: 0s;
}

</style>
<div id="container" hidden$="[[!visible_]]" style="--tile-background-color: [[rgbaOrInherit_(theme.backgroundColor)]];
           --column-count: [[columnCount_]]; --row-count: [[rowCount_]];">
  <dom-repeat id="tiles" items="[[tiles_]]" on-dom-change="onTilesRendered_">
    <template>
      <a class="tile" href$="[[item.url.url]]" title$="[[item.title]]" aria-label="[[item.title]]" on-dragstart="onDragStart_" on-touchstart="onTouchStart_" hidden$="[[isHidden_(index, maxVisibleTiles_)]]" on-click="onTileClick_" on-keydown="onTileKeyDown_" query-tile$="[[item.isQueryTile]]">
        <cr-icon-button id="actionMenuButton" class="icon-more-vert" title="[[i18n('moreActions')]]" on-click="onTileActionButtonClick_" tabindex="0" hidden$="[[!customLinksEnabled_]]"></cr-icon-button>
        <cr-icon-button id="removeButton" class="icon-clear" title="[[i18n('linkRemove')]]" on-click="onTileRemoveButtonClick_" tabindex="0" hidden$="[[customLinksEnabled_]]"></cr-icon-button>
        <div class="tile-icon">
          <img src$="[[getFaviconUrl_(item.url)]]" draggable="false" hidden$="[[item.isQueryTile]]" alt="">
          <div class="query-tile-icon" draggable="false" hidden$="[[!item.isQueryTile]]"></div>
        </div>
        <div class$="tile-title [[getTileTitleDirectionClass_(item)]]">
          <span>[[item.title]]</span>
        </div>
      </a>
    </template>
  </dom-repeat>
  <cr-button id="addShortcut" tabindex="0" on-click="onAdd_" hidden$="[[!showAdd_]]" on-keydown="onAddShortcutKeyDown_" noink="">
    <div class="tile-icon">
      <div id="addShortcutIcon" draggable="false"></div>
    </div>
    <div class="tile-title">
      <span>[[i18n('addLinkTitle')]]</span>
    </div>
  </cr-button>
  <cr-dialog id="dialog" on-close="onDialogClose_">
    <div slot="title">[[dialogTitle_]]</div>
    <div slot="body">
      <cr-input id="dialogInputName" label="[[i18n('nameField')]]" value="{{dialogTileTitle_}}" spellcheck="false" autofocus=""></cr-input>
      <cr-input id="dialogInputUrl" label="[[i18n('urlField')]]" value="{{dialogTileUrl_}}" invalid="[[dialogTileUrlInvalid_]]" error-message="[[dialogTileUrlError_]]" spellcheck="false" type="url" on-blur="onDialogTileUrlBlur_">
      </cr-input>
    </div>
    <div slot="button-container">
      <cr-button class="cancel-button" on-click="onDialogCancel_">
        [[i18n('linkCancel')]]
      </cr-button>
      <cr-button class="action-button" on-click="onSave_" disabled$="[[dialogSaveDisabled_]]">
        [[i18n('linkDone')]]
      </cr-button>
    </div>
  </cr-dialog>
  <cr-action-menu id="actionMenu">
    <button id="actionMenuEdit" class="dropdown-item" on-click="onEdit_">
      [[i18n('editLinkTitle')]]
    </button>
    <button id="actionMenuRemove" class="dropdown-item" on-click="onRemove_">
      [[i18n('linkRemove')]]
    </button>
  </cr-action-menu>
</div>
<cr-toast id="toast" duration="10000">
  <div>[[toastContent_]]</div>
  <dom-if if="[[showToastButtons_]]">
    <template>
      <cr-button id="undo" aria-label="[[i18n('undoDescription')]]" on-click="onUndoClick_">
        [[i18n('undo')]]
      </cr-button>
      <cr-button id="restore" aria-label$="[[getRestoreButtonText_(customLinksEnabled_)]]" on-click="onRestoreDefaultsClick_">
        [[getRestoreButtonText_(customLinksEnabled_)]]
      </cr-button>
    </template>
  </dom-if>
</cr-toast>
<!--_html_template_end_-->`}}customElements.define(MostVisitedElement.is,MostVisitedElement);function getTemplate$3(){return html`<!--_html_template_start_--><style>
  ::part(dialog) {
    height: 250px;
    min-width: 560px;
  }

  ::part(wrapper) {
    height: 100%;
    justify-content: space-between;
  }

  div[slot=body] {
    display: flex;
    justify-content: space-between;
  }

  div[slot=button-container] {
    justify-content: flex-start;
  }

  #content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #content-title {
    color: var(--cr-primary-text-color);
    font-family: 'Google Sans';
    font-size: 22px;
    line-height: 28px;
    margin-inline-end: auto;
    white-space: normal;
  }

  #content {
    color: var(--cr-secondary-text-color);
    font-size: 13px;
    line-height: 20px;
    margin-inline-end: auto;
    margin-top: 4px;
    white-space: normal;
  }

  #icon-container {
    margin-inline-end: 20px;
  }
</style>

<cr-dialog id="dialog" show-close-button="" on-cancel="onDismissClick_" show-on-attach="" close-text="Close">
  <div slot="title">Your carts</div>
  <div slot="body">
    <div id="content-container" tabindex="0">
      <div id="content-title">Get discounts?</div>
      <div id="content">Let Google use your cart to find available discounts?</div>
    </div>
    <div id="icon-container">
      <img id="icon" src="modules/cart/icons/consent_icon.svg" alt="">
    </div>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" id="cancelButton" on-click="onRejectClick_">
      No thanks
    </cr-button>
    <cr-button class="action-button" id="confirmButton" on-click="onAcceptClick_">
      Get discounts
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}// Copyright 2022 The Chromium Authors. All rights reserved.
class DiscountConsentDialog extends PolymerElement{static get is(){return"discount-consent-dialog"}static get template(){return getTemplate$3()}onRejectClick_(){this.$.dialog.close();this.dispatchEvent(new CustomEvent("discount-consent-rejected",{composed:true}))}onAcceptClick_(){this.$.dialog.close();this.dispatchEvent(new CustomEvent("discount-consent-accepted",{composed:true}))}onDismissClick_(){this.dispatchEvent(new CustomEvent("discount-consent-dismissed",{composed:true}))}}customElements.define(DiscountConsentDialog.is,DiscountConsentDialog);function getTemplate$2(){return html`<!--_html_template_start_--><style>
  cr-dialog::part(dialog) {
    position: fixed;
    width: 459px;
  }

  cr-dialog [slot='body'] {
    line-height: 20px;
  }
</style>
<cr-dialog id="dialog" consume-keydown-event="">
  <div slot="title">About this card</div>
  <div slot="body">
    <slot></slot>
  </div>
  <div slot="button-container">
    <cr-button id="closeButton" class="action-button" on-click="onCloseClick_">
      Close
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}// Copyright 2021 The Chromium Authors. All rights reserved.
class InfoDialogElement extends PolymerElement{static get is(){return"ntp-info-dialog"}static get template(){return getTemplate$2()}showModal(){this.$.dialog.showModal()}onCloseClick_(){this.$.dialog.close()}}customElements.define(InfoDialogElement.is,InfoDialogElement);function getTemplate$1(){return html`<!--_html_template_start_--><style>
  :host {
    background-color: var(--ntp-background-override-color);
    border: solid var(--ntp-border-color) 1px;
    border-radius: var(--ntp-module-border-radius);
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    position: relative;
  }

  #impressionProbe {
    height: 27px;
    pointer-events: none;
    position: absolute;
    width: 100%;
  }

  #moduleElement {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }
</style>
<div id="impressionProbe"></div>
<div id="moduleElement"></div>
<!--_html_template_end_-->`}// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleWrapperElement extends PolymerElement{static get is(){return"ntp-module-wrapper"}static get template(){return getTemplate$1()}static get properties(){return{module:{observer:"onModuleChange_",type:Object}}}onModuleChange_(_newValue,oldValue){assert(!oldValue);this.$.moduleElement.appendChild(this.module.element);if(this.module.descriptor.height!==ModuleHeight.DYNAMIC){this.style.height=`${this.module.descriptor.height}px`}this.module.element.addEventListener("usage",(()=>{recordOccurence("NewTabPage.Modules.Usage");recordOccurence(`NewTabPage.Modules.Usage.${this.module.descriptor.id}`)}),{once:true});this.module.element.addEventListener("info-button-click",(()=>{chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.InfoButtonClicked",this.module.descriptor.id)}),{once:true});const headerObserver=new IntersectionObserver((([{intersectionRatio:intersectionRatio}])=>{if(intersectionRatio>=1){headerObserver.disconnect();const time=WindowProxy.getInstance().now();recordLoadDuration("NewTabPage.Modules.Impression",time);recordLoadDuration(`NewTabPage.Modules.Impression.${this.module.descriptor.id}`,time);this.dispatchEvent(new Event("detect-impression"));this.module.element.dispatchEvent(new Event("detect-impression"))}}),{threshold:1});let intersectionPerdecage=0;const moduleObserver=new IntersectionObserver((([{intersectionRatio:intersectionRatio}])=>{intersectionPerdecage=Math.floor(Math.max(intersectionPerdecage,intersectionRatio*10))}),{threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});window.addEventListener("unload",(()=>{recordPerdecage("NewTabPage.Modules.ImpressionRatio",intersectionPerdecage);recordPerdecage(`NewTabPage.Modules.ImpressionRatio.${this.module.descriptor.id}`,intersectionPerdecage)}));microTask.run((()=>{headerObserver.observe(this.$.impressionProbe);moduleObserver.observe(this)}));this.addEventListener("mouseover",(()=>{chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Hover",this.module.descriptor.id)}),{capture:true,once:true})}}customElements.define(ModuleWrapperElement.is,ModuleWrapperElement);function getTemplate(){return html`<!--_html_template_start_--><style include="cr-hidden-style">
  :host {
    display: flex;
    justify-content: center;
    --ntp-module-container-padding-top: 16px;
  }

  @media (min-width: 672px) {
    #firstRunExperience {
      background-image: url(./modules/chromefetti.svg);
      background-position: top center;
      background-repeat: no-repeat;
    }
  }

  :host([modules-fre-shown]) #freAndModulesContainer {
    background-color: var(--ntp-background-override-color);
    border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    padding: 20px;
  }

  #firstRunExperience {
    box-sizing: border-box;
    padding-bottom: 24px;
    padding-top: 32px;
    text-align: center;
  }

  #firstRunExperienceTitle {
    color: var(--cr-primary-text-color);
    display: inline-block;
    font-size: 22px;
    line-height: 22px;
    padding-bottom: 16px;
    padding-inline-end: 9px;
  }

  #newTag {
    background: var(--ntp-chip-background-color);
    border-radius: 4px;
    color: var(--ntp-chip-text-color);
    display: inline-block;
    font-size: 10px;
    height: 12px;
    padding: 2px 6px;
    vertical-align: 4px;
  }

  .first-run-experience-body {
    color: var(--cr-primary-text-color);
    font-size: 13px;
    line-height: 20px;
  }

  #customizeChromeLink {
    color: var(--ntp-chip-background-color);
    cursor: pointer;
    font-weight: 700;
  }

  .action-button {
    margin-inline-end: 8px;
    margin-top: 18px;
  }

  ntp-module-wrapper {
    width: var(--ntp-module-width);
  }

  :host([modules-redesigned-layout-enabled_]) .module-container {
    --ntp-module-container-padding-top: 0;
    margin-bottom: 30px;
    margin-inline-end: 30px;
  }

  .module-container + .module-container {
    padding-top: var(--ntp-module-container-padding-top);
  }

  #modules {
    max-width: 100%;
    width: fit-content;
  }

  :host([modules-redesigned-layout-enabled_]) #modules {
    display: flex;
    flex-flow: row wrap;
  }

  #removeModuleToastMessage {
    flex-grow: 1;
  }

  #removeModuleFreToastMessage {
    flex-grow: 1;
  }

  :host([drag-enabled_]) ntp-module-wrapper {
    cursor: grab;
  }

  [dragging] {
    pointer-events: none;
    position: fixed;
    z-index: 2;
  }
</style>
<div id="freAndModulesContainer">
  <template is="dom-if" if="[[modulesFreShown]]">
    <div id="firstRunExperience">
      <header id="firstRunExperienceTitle">
        Your page, your way
      </header>
      <div id="newTag">New</div>
      <div class="first-run-experience-body">
        Pick cards that keep you updated on things that matter to you
      </div>
      <div class="first-run-experience-body">
        See all card options in <a is="action-link" id="customizeChromeLink" tabIndex=0 on-click="onCustomizeModuleFre_">Customize Chrome</a>
      </div>
      <cr-button class="action-button" on-click="onModulesFreOptIn_">
        Got it
      </cr-button>
      <cr-button class="cancel-button" on-click="onModulesFreOptOut_">
        Don&#39;t show
      </cr-button>
    </div>
  </template>
  <div id="modules"></div>
</div>
<cr-toast id="removeModuleToast" duration="10000">
  <div id="removeModuleToastMessage">[[removedModuleData_.message]]</div>
  <cr-button id="undoRemoveModuleButton" aria-label="Press Ctrl+Z to undo" on-click="onUndoRemoveModuleButtonClick_">
    Undo
  </cr-button>
</cr-toast>
<cr-toast id="removeModuleFreToast" duration="10000">
  <div id="removeModuleFreToastMessage">
    You won&#39;t see cards on this page again
  </div>
  <cr-button id="undoRemoveModuleFreButton" aria-label="Press Ctrl+Z to undo" on-click="onUndoRemoveModuleFreButtonClick_">
    Undo
  </cr-button>
</cr-toast>
<!--_html_template_end_-->`}// Copyright 2021 The Chromium Authors. All rights reserved.
const SHORT_CLASS_NAME="short";const TALL_CLASS_NAME="tall";class ModulesElement extends PolymerElement{constructor(){super(...arguments);this.setDisabledModulesListenerId_=null;this.setModulesFreVisibilityListenerId_=null;this.eventTracker_=new EventTracker}static get is(){return"ntp-modules"}static get template(){return getTemplate()}static get properties(){return{dismissedModules_:{type:Array,value:()=>[]},disabledModules_:{type:Object,value:()=>({all:true,ids:[]})},modulesFreRemoved_:{type:Boolean,value:false},modulesFreShown:{type:Boolean,computed:`computeModulesFreShown_(modulesLoaded_, modulesFreVisible_, modulesShownToUser)`,observer:"onModulesFreShownChange_",notify:true,reflectToAttribute:true},modulesFreVisible_:{type:Boolean,value:false},removedModuleData_:{type:Object,value:null},moduleImpressionDetected_:Boolean,modulesLoaded_:Boolean,modulesVisibilityDetermined_:Boolean,modulesLoadedAndVisibilityDetermined_:{type:Boolean,computed:`computeModulesLoadedAndVisibilityDetermined_(\n          modulesLoaded_,\n          modulesVisibilityDetermined_)`,observer:"onModulesLoadedAndVisibilityDeterminedChange_"},modulesShownToUser:{type:Boolean,notify:true},modulesRedesignedLayoutEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesRedesignedLayoutEnabled"),reflectToAttribute:true},dragEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesDragAndDropEnabled"),reflectToAttribute:true}}}static get observers(){return["onRemovedModulesChange_(dismissedModules_.*, disabledModules_)"]}connectedCallback(){super.connectedCallback();this.setDisabledModulesListenerId_=NewTabPageProxy.getInstance().callbackRouter.setDisabledModules.addListener(((all,ids)=>{this.disabledModules_={all:all,ids:ids};this.modulesVisibilityDetermined_=true}));this.setModulesFreVisibilityListenerId_=NewTabPageProxy.getInstance().callbackRouter.setModulesFreVisibility.addListener((visible=>{this.modulesFreVisible_=visible}));NewTabPageProxy.getInstance().handler.updateDisabledModules();NewTabPageProxy.getInstance().handler.updateModulesFreVisibility();this.eventTracker_.add(window,"keydown",this.onWindowKeydown_.bind(this))}disconnectedCallback(){super.disconnectedCallback();NewTabPageProxy.getInstance().callbackRouter.removeListener(assert(this.setDisabledModulesListenerId_));NewTabPageProxy.getInstance().callbackRouter.removeListener(assert(this.setModulesFreVisibilityListenerId_));this.eventTracker_.removeAll()}ready(){super.ready();this.renderModules_()}appendModuleContainers_(moduleContainers){this.$.modules.innerHTML="";let shortModuleSiblingsContainer=null;this.modulesShownToUser=false;moduleContainers.forEach(((moduleContainer,index)=>{let moduleContainerParent=this.$.modules;if(!moduleContainer.hidden){this.modulesShownToUser=!moduleContainer.hidden}if(loadTimeData.getBoolean("modulesRedesignedLayoutEnabled")){if((moduleContainer.classList.contains(SHORT_CLASS_NAME)||moduleContainer.hidden)&&shortModuleSiblingsContainer){moduleContainerParent=shortModuleSiblingsContainer;this.$.modules.appendChild(shortModuleSiblingsContainer);if(!moduleContainer.hidden||index+1!==moduleContainers.length&&moduleContainers[index+1].classList.contains(TALL_CLASS_NAME)&&!moduleContainers[index+1].hidden||index+1===moduleContainers.length){shortModuleSiblingsContainer=null}}else if(!moduleContainer.hidden&&moduleContainer.classList.contains(SHORT_CLASS_NAME)&&index+1!==moduleContainers.length&&moduleContainers[index+1].classList.contains(SHORT_CLASS_NAME)){shortModuleSiblingsContainer=this.ownerDocument.createElement("div");shortModuleSiblingsContainer.classList.add("short-module-siblings-container");moduleContainerParent=shortModuleSiblingsContainer}}moduleContainerParent.appendChild(moduleContainer)}))}async renderModules_(){this.moduleImpressionDetected_=false;const modules=await ModuleRegistry.getInstance().initializeModules(loadTimeData.getInteger("modulesLoadTimeout"));if(modules){NewTabPageProxy.getInstance().handler.onModulesLoadedWithData();const moduleContainers=modules.map((module=>{const moduleWrapper=new ModuleWrapperElement;moduleWrapper.module=module;if(this.dragEnabled_){moduleWrapper.addEventListener("mousedown",(e=>this.onDragStart_(e)))}if(!loadTimeData.getBoolean("modulesRedesignedEnabled")){moduleWrapper.addEventListener("dismiss-module",(e=>this.onDismissModule_(e)))}moduleWrapper.addEventListener("disable-module",(e=>this.onDisableModule_(e)));moduleWrapper.addEventListener("detect-impression",(()=>{if(!this.moduleImpressionDetected_){NewTabPageProxy.getInstance().handler.incrementModulesShownCount();if(this.modulesFreShown){chrome.metricsPrivate.recordBoolean(`NewTabPage.Modules.FreImpression`,this.modulesFreShown)}}this.moduleImpressionDetected_=true}));const moduleContainer=this.ownerDocument.createElement("div");moduleContainer.classList.add("module-container");if(loadTimeData.getBoolean("modulesRedesignedLayoutEnabled")){if(module.descriptor.height===ModuleHeight.SHORT){moduleContainer.classList.add(SHORT_CLASS_NAME)}if(module.descriptor.height===ModuleHeight.TALL){moduleContainer.classList.add(TALL_CLASS_NAME)}}moduleContainer.hidden=this.moduleDisabled_(module.descriptor.id);moduleContainer.appendChild(moduleWrapper);return moduleContainer}));chrome.metricsPrivate.recordSmallCount("NewTabPage.Modules.LoadedModulesCount",modules.length);this.logModuleLoadedWithModules_(modules);this.appendModuleContainers_(moduleContainers);this.onModulesLoaded_()}}logModuleLoadedWithModules_(modules){const moduleDescriptorIds=modules.map((m=>m.descriptor.id));for(const moduleDescriptorId of moduleDescriptorIds){moduleDescriptorIds.forEach((id=>{if(id!==moduleDescriptorId){chrome.metricsPrivate.recordSparseHashable(`NewTabPage.Modules.LoadedWith.${moduleDescriptorId}`,id)}}))}}onWindowKeydown_(e){let ctrlKeyPressed=e.ctrlKey;if(ctrlKeyPressed&&e.key==="z"){this.onUndoRemoveModuleButtonClick_();this.onUndoRemoveModuleFreButtonClick_()}}onModulesLoaded_(){this.modulesLoaded_=true}computeModulesLoadedAndVisibilityDetermined_(){return this.modulesLoaded_&&this.modulesVisibilityDetermined_}onModulesLoadedAndVisibilityDeterminedChange_(){if(this.modulesLoadedAndVisibilityDetermined_){ModuleRegistry.getInstance().getDescriptors().forEach((({id:id})=>{chrome.metricsPrivate.recordBoolean(`NewTabPage.Modules.EnabledOnNTPLoad.${id}`,!this.disabledModules_.all&&!this.disabledModules_.ids.includes(id))}));chrome.metricsPrivate.recordBoolean("NewTabPage.Modules.VisibleOnNTPLoad",!this.disabledModules_.all);this.dispatchEvent(new Event("modules-loaded"))}}onDismissModule_(e){const id=e.target.module.descriptor.id;const restoreCallback=e.detail.restoreCallback;this.removedModuleData_={message:e.detail.message,undo:()=>{this.splice("dismissedModules_",this.dismissedModules_.indexOf(id),1);restoreCallback();NewTabPageProxy.getInstance().handler.onRestoreModule(id)}};if(!this.dismissedModules_.includes(id)){this.push("dismissedModules_",id)}this.$.removeModuleToast.show();NewTabPageProxy.getInstance().handler.onDismissModule(id)}onDisableModule_(e){const id=e.target.module.descriptor.id;const restoreCallback=e.detail.restoreCallback;this.removedModuleData_={message:e.detail.message,undo:()=>{if(restoreCallback){restoreCallback()}NewTabPageProxy.getInstance().handler.setModuleDisabled(id,false);chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Enabled",id);chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Enabled.Toast",id)}};NewTabPageProxy.getInstance().handler.setModuleDisabled(id,true);this.$.removeModuleToast.show();chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Disabled",id);chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Disabled.ModuleRequest",id)}moduleDisabled_(id){return this.disabledModules_.all||this.dismissedModules_.includes(id)||this.disabledModules_.ids.includes(id)}onUndoRemoveModuleButtonClick_(){if(!this.removedModuleData_){return}this.removedModuleData_.undo();this.$.removeModuleToast.hide();this.removedModuleData_=null;this.modulesFreRemoved_=false}onRemovedModulesChange_(){this.shadowRoot.querySelectorAll("ntp-module-wrapper").forEach((moduleWrapper=>{moduleWrapper.parentElement.hidden=this.moduleDisabled_(moduleWrapper.module.descriptor.id)}));const moduleContainers=[...this.shadowRoot.querySelectorAll(".module-container")];this.appendModuleContainers_(moduleContainers)}computeModulesFreShown_(){return loadTimeData.getBoolean("modulesFirstRunExperienceEnabled")&&this.modulesLoaded_&&this.modulesFreVisible_&&this.modulesShownToUser}onModulesFreShownChange_(){chrome.metricsPrivate.recordBoolean(`NewTabPage.Modules.FreLoaded`,this.modulesFreShown)}onCustomizeModuleFre_(){this.dispatchEvent(new Event("customize-module",{bubbles:true,composed:true}))}hideFre_(){NewTabPageProxy.getInstance().handler.setModulesFreVisible(false)}onModulesFreOptIn_(){this.hideFre_();NewTabPageProxy.getInstance().handler.logModulesFreOptInStatus(OptInStatus$1.kExplicitOptIn)}onModulesFreOptOut_(){this.hideFre_();NewTabPageProxy.getInstance().handler.setModulesVisible(false);this.$.removeModuleToast.hide();this.removedModuleData_=null;this.modulesFreRemoved_=true;this.$.removeModuleFreToast.show();NewTabPageProxy.getInstance().handler.logModulesFreOptInStatus(OptInStatus$1.kOptOut)}onUndoRemoveModuleFreButtonClick_(){if(!this.modulesFreRemoved_){return}NewTabPageProxy.getInstance().handler.setModulesFreVisible(true);NewTabPageProxy.getInstance().handler.setModulesVisible(true);this.$.removeModuleFreToast.hide();this.modulesFreRemoved_=false}onDragStart_(e){assert(loadTimeData.getBoolean("modulesDragAndDropEnabled"));const dragElement=e.target;const dragElementRect=dragElement.getBoundingClientRect();const dragOffset={x:e.x-dragElementRect.x,y:e.y-dragElementRect.y};dragElement.parentElement.style.width=`${dragElementRect.width}px`;dragElement.parentElement.style.height=`${dragElementRect.height}px`;const undraggedModuleWrappers=[...this.shadowRoot.querySelectorAll("ntp-module-wrapper")].filter((moduleWrapper=>moduleWrapper!==dragElement));const dragOver=e=>{e.preventDefault();dragElement.setAttribute("dragging","");dragElement.style.left=`${e.x-dragOffset.x}px`;dragElement.style.top=`${e.y-dragOffset.y}px`};const dragEnter=e=>{const moduleContainers=[...this.shadowRoot.querySelectorAll(".module-container")];const dragIndex=moduleContainers.indexOf(dragElement.parentElement);const dropIndex=moduleContainers.indexOf(e.target.parentElement);const dragContainer=moduleContainers[dragIndex];const firstRects=undraggedModuleWrappers.map((moduleWrapper=>moduleWrapper.getBoundingClientRect()));moduleContainers.splice(dragIndex,1);moduleContainers.splice(dropIndex,0,dragContainer);this.appendModuleContainers_(moduleContainers);undraggedModuleWrappers.forEach(((moduleWrapper,i)=>{const lastRect=moduleWrapper.getBoundingClientRect();const invertX=firstRects[i].left-lastRect.left;const invertY=firstRects[i].top-lastRect.top;moduleWrapper.animate([{transform:`translate(${invertX}px, ${invertY}px)`,zIndex:0},{transform:"translate(0)",zIndex:0}],{duration:800,easing:"ease"})}))};undraggedModuleWrappers.forEach((moduleWrapper=>{moduleWrapper.addEventListener("mouseover",dragEnter)}));this.ownerDocument.addEventListener("mousemove",dragOver);this.ownerDocument.addEventListener("mouseup",(()=>{this.ownerDocument.removeEventListener("mousemove",dragOver);undraggedModuleWrappers.forEach((moduleWrapper=>{moduleWrapper.removeEventListener("mouseover",dragEnter)}));const firstRect=dragElement.getBoundingClientRect();dragElement.removeAttribute("dragging");dragElement.style.removeProperty("left");dragElement.style.removeProperty("top");const lastRect=dragElement.getBoundingClientRect();const invertX=firstRect.left-lastRect.left;const invertY=firstRect.top-lastRect.top;dragElement.animate([{transform:`translate(${invertX}px, ${invertY}px)`,zIndex:2},{transform:"translate(0)",zIndex:2}],{duration:800,easing:"ease"});const moduleIds=[...this.shadowRoot.querySelectorAll("ntp-module-wrapper")].map((moduleWrapper=>moduleWrapper.module.descriptor.id));NewTabPageProxy.getInstance().handler.setModulesOrder(moduleIds)}),{once:true})}}customElements.define(ModulesElement.is,ModulesElement);export{ChromeCartModuleElement$1 as ChromeCartModuleElement,ChromeCartProxy,ChromeCartModuleElement as ChromeCartV2ModuleElement,CustomizeBackgroundsElement,CustomizeDialogElement,CustomizeModulesElement,CustomizeShortcutsElement,DiscountConsentCard,DiscountConsentDialog,DiscountConsentVariation,DriveModuleElement$1 as DriveModuleElement,DriveProxy,DriveModuleElement as DriveV2ModuleElement,InfoDialogElement,MiddleSlotPromoElement,ModuleDescriptor,ModuleDescriptorV2,ModuleHeaderElement,ModuleHeight,ModuleRegistry,ModuleWrapperElement,ModulesElement,PhotosModuleElement,PhotosProxy,RecipeModuleElement,TaskModuleElement,TaskModuleHandlerProxy,chromeCartDescriptor$1 as chromeCartDescriptor,chromeCartDescriptor as chromeCartV2Descriptor,counterfactualLoad,driveDescriptor$1 as driveDescriptor,driveDescriptor as driveV2Descriptor,photosDescriptor,recipeTasksDescriptor,recipeTasksDescriptor$1 as recipeTasksV2Descriptor};