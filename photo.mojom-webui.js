// mojom-webui/chrome/browser/new_tab_page/modules/photos/photos.mojom-webui.js is auto generated by mojom_bindings_generator.py, do not edit
// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { mojo } from '//resources/mojo/mojo/public/js/bindings.js';
import { UrlSpec as url_mojom_UrlSpec } from 'chrome://resources/mojo/url/mojom/url.mojom-webui.js';
/**
 * @implements {mojo.internal.interfaceSupport.PendingReceiver}
 */
export class PhotosHandlerPendingReceiver {
    /**
     * @param {!MojoHandle|!mojo.internal.interfaceSupport.Endpoint} handle
     */
    constructor(handle) {
        /** @public {!mojo.internal.interfaceSupport.Endpoint} */
        this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle);
    }
    /** @param {string=} scope */
    bindInBrowser(scope = 'context') {
        mojo.internal.interfaceSupport.bind(this.handle, 'photos.mojom.PhotosHandler', scope);
    }
}
/** @interface */
export class PhotosHandlerInterface {
    /**
     * @return {!Promise<{
          memories: !Array<!Memory>,
     *  }>}
     */
    getMemories() { }
    /**
     */
    dismissModule() { }
    /**
     */
    restoreModule() { }
    /**
     * @return {!Promise<{
          showOptInScreen: !boolean,
     *  }>}
     */
    shouldShowOptInScreen() { }
    /**
     * @param { !boolean } accept
     */
    onUserOptIn(accept) { }
    /**
     */
    onMemoryOpen() { }
    /**
     * @return {!Promise<{
          showSoftOptOutButton: !boolean,
     *  }>}
     */
    shouldShowSoftOptOutButton() { }
    /**
     */
    softOptOut() { }
    /**
     * @param { !Array<!Memory> } memories
     * @return {!Promise<{
          optInTitleText: !string,
     *  }>}
     */
    getOptInTitleText(memories) { }
}
/**
 * @implements { PhotosHandlerInterface }
 */
export class PhotosHandlerRemote {
    /** @param {MojoHandle|mojo.internal.interfaceSupport.Endpoint=} handle */
    constructor(handle = undefined) {
        /**
         * @private {!mojo.internal.interfaceSupport.InterfaceRemoteBase<!PhotosHandlerPendingReceiver>}
         */
        this.proxy =
            new mojo.internal.interfaceSupport.InterfaceRemoteBase(PhotosHandlerPendingReceiver, handle);
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper<!PhotosHandlerPendingReceiver>}
         */
        this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);
        /** @public {!mojo.internal.interfaceSupport.ConnectionErrorEventRouter} */
        this.onConnectionError = this.proxy.getConnectionErrorEventRouter();
    }
    /**
     * @return {!Promise<{
          memories: !Array<!Memory>,
     *  }>}
     */
    getMemories() {
        return this.proxy.sendMessage(839079564, PhotosHandler_GetMemories_ParamsSpec.$, PhotosHandler_GetMemories_ResponseParamsSpec.$, []);
    }
    /**
     */
    dismissModule() {
        this.proxy.sendMessage(1240241280, PhotosHandler_DismissModule_ParamsSpec.$, null, []);
    }
    /**
     */
    restoreModule() {
        this.proxy.sendMessage(1725227089, PhotosHandler_RestoreModule_ParamsSpec.$, null, []);
    }
    /**
     * @return {!Promise<{
          showOptInScreen: !boolean,
     *  }>}
     */
    shouldShowOptInScreen() {
        return this.proxy.sendMessage(77678181, PhotosHandler_ShouldShowOptInScreen_ParamsSpec.$, PhotosHandler_ShouldShowOptInScreen_ResponseParamsSpec.$, []);
    }
    /**
     * @param { !boolean } accept
     */
    onUserOptIn(accept) {
        this.proxy.sendMessage(1505975677, PhotosHandler_OnUserOptIn_ParamsSpec.$, null, [
            accept
        ]);
    }
    /**
     */
    onMemoryOpen() {
        this.proxy.sendMessage(76110729, PhotosHandler_OnMemoryOpen_ParamsSpec.$, null, []);
    }
    /**
     * @return {!Promise<{
          showSoftOptOutButton: !boolean,
     *  }>}
     */
    shouldShowSoftOptOutButton() {
        return this.proxy.sendMessage(1663233814, PhotosHandler_ShouldShowSoftOptOutButton_ParamsSpec.$, PhotosHandler_ShouldShowSoftOptOutButton_ResponseParamsSpec.$, []);
    }
    /**
     */
    softOptOut() {
        this.proxy.sendMessage(582395258, PhotosHandler_SoftOptOut_ParamsSpec.$, null, []);
    }
    /**
     * @param { !Array<!Memory> } memories
     * @return {!Promise<{
          optInTitleText: !string,
     *  }>}
     */
    getOptInTitleText(memories) {
        return this.proxy.sendMessage(1372607811, PhotosHandler_GetOptInTitleText_ParamsSpec.$, PhotosHandler_GetOptInTitleText_ResponseParamsSpec.$, [
            memories
        ]);
    }
}
/**
 * An object which receives request messages for the PhotosHandler
 * mojom interface. Must be constructed over an object which implements that
 * interface.
 */
export class PhotosHandlerReceiver {
    /**
     * @param {!PhotosHandlerInterface } impl
     */
    constructor(impl) {
        /** @private {!mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal<!PhotosHandlerRemote>} */
        this.helper_internal_ = new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(PhotosHandlerRemote);
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceReceiverHelper<!PhotosHandlerRemote>}
         */
        this.$ = new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);
        this.helper_internal_.registerHandler(839079564, PhotosHandler_GetMemories_ParamsSpec.$, PhotosHandler_GetMemories_ResponseParamsSpec.$, impl.getMemories.bind(impl));
        this.helper_internal_.registerHandler(1240241280, PhotosHandler_DismissModule_ParamsSpec.$, null, impl.dismissModule.bind(impl));
        this.helper_internal_.registerHandler(1725227089, PhotosHandler_RestoreModule_ParamsSpec.$, null, impl.restoreModule.bind(impl));
        this.helper_internal_.registerHandler(77678181, PhotosHandler_ShouldShowOptInScreen_ParamsSpec.$, PhotosHandler_ShouldShowOptInScreen_ResponseParamsSpec.$, impl.shouldShowOptInScreen.bind(impl));
        this.helper_internal_.registerHandler(1505975677, PhotosHandler_OnUserOptIn_ParamsSpec.$, null, impl.onUserOptIn.bind(impl));
        this.helper_internal_.registerHandler(76110729, PhotosHandler_OnMemoryOpen_ParamsSpec.$, null, impl.onMemoryOpen.bind(impl));
        this.helper_internal_.registerHandler(1663233814, PhotosHandler_ShouldShowSoftOptOutButton_ParamsSpec.$, PhotosHandler_ShouldShowSoftOptOutButton_ResponseParamsSpec.$, impl.shouldShowSoftOptOutButton.bind(impl));
        this.helper_internal_.registerHandler(582395258, PhotosHandler_SoftOptOut_ParamsSpec.$, null, impl.softOptOut.bind(impl));
        this.helper_internal_.registerHandler(1372607811, PhotosHandler_GetOptInTitleText_ParamsSpec.$, PhotosHandler_GetOptInTitleText_ResponseParamsSpec.$, impl.getOptInTitleText.bind(impl));
        /** @public {!mojo.internal.interfaceSupport.ConnectionErrorEventRouter} */
        this.onConnectionError = this.helper_internal_.getConnectionErrorEventRouter();
    }
}
export class PhotosHandler {
    /**
     * @return {!string}
     */
    static get $interfaceName() {
        return "photos.mojom.PhotosHandler";
    }
    /**
     * Returns a remote for this interface which sends messages to the browser.
     * The browser must have an interface request binder registered for this
     * interface and accessible to the calling document's frame.
     *
     * @return {!PhotosHandlerRemote}
     */
    static getRemote() {
        let remote = new PhotosHandlerRemote;
        remote.$.bindNewPipeAndPassReceiver().bindInBrowser();
        return remote;
    }
}
/**
 * An object which receives request messages for the PhotosHandler
 * mojom interface and dispatches them as callbacks. One callback receiver exists
 * on this object for each message defined in the mojom interface, and each
 * receiver can have any number of listeners added to it.
 */
export class PhotosHandlerCallbackRouter {
    constructor() {
        this.helper_internal_ = new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(PhotosHandlerRemote);
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceReceiverHelper<!PhotosHandlerRemote>}
         */
        this.$ = new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);
        this.router_ = new mojo.internal.interfaceSupport.CallbackRouter;
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.getMemories =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(839079564, PhotosHandler_GetMemories_ParamsSpec.$, PhotosHandler_GetMemories_ResponseParamsSpec.$, this.getMemories.createReceiverHandler(true /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.dismissModule =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(1240241280, PhotosHandler_DismissModule_ParamsSpec.$, null, this.dismissModule.createReceiverHandler(false /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.restoreModule =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(1725227089, PhotosHandler_RestoreModule_ParamsSpec.$, null, this.restoreModule.createReceiverHandler(false /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.shouldShowOptInScreen =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(77678181, PhotosHandler_ShouldShowOptInScreen_ParamsSpec.$, PhotosHandler_ShouldShowOptInScreen_ResponseParamsSpec.$, this.shouldShowOptInScreen.createReceiverHandler(true /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.onUserOptIn =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(1505975677, PhotosHandler_OnUserOptIn_ParamsSpec.$, null, this.onUserOptIn.createReceiverHandler(false /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.onMemoryOpen =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(76110729, PhotosHandler_OnMemoryOpen_ParamsSpec.$, null, this.onMemoryOpen.createReceiverHandler(false /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.shouldShowSoftOptOutButton =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(1663233814, PhotosHandler_ShouldShowSoftOptOutButton_ParamsSpec.$, PhotosHandler_ShouldShowSoftOptOutButton_ResponseParamsSpec.$, this.shouldShowSoftOptOutButton.createReceiverHandler(true /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.softOptOut =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(582395258, PhotosHandler_SoftOptOut_ParamsSpec.$, null, this.softOptOut.createReceiverHandler(false /* expectsResponse */));
        /**
         * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
         */
        this.getOptInTitleText =
            new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(1372607811, PhotosHandler_GetOptInTitleText_ParamsSpec.$, PhotosHandler_GetOptInTitleText_ResponseParamsSpec.$, this.getOptInTitleText.createReceiverHandler(true /* expectsResponse */));
        /** @public {!mojo.internal.interfaceSupport.ConnectionErrorEventRouter} */
        this.onConnectionError = this.helper_internal_.getConnectionErrorEventRouter();
    }
    /**
     * @param {number} id An ID returned by a prior call to addListener.
     * @return {boolean} True iff the identified listener was found and removed.
     */
    removeListener(id) {
        return this.router_.removeListener(id);
    }
}
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const MemorySpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_GetMemories_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_GetMemories_ResponseParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_DismissModule_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_RestoreModule_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_ShouldShowOptInScreen_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_ShouldShowOptInScreen_ResponseParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_OnUserOptIn_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_OnMemoryOpen_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_ShouldShowSoftOptOutButton_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_ShouldShowSoftOptOutButton_ResponseParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_SoftOptOut_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_GetOptInTitleText_ParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const PhotosHandler_GetOptInTitleText_ResponseParamsSpec = { $: /** @type {!mojo.internal.MojomType} */ ({}) };
mojo.internal.Struct(MemorySpec.$, 'Memory', [
    mojo.internal.StructField('id', 0, 0, mojo.internal.String, null, false /* nullable */, 0),
    mojo.internal.StructField('title', 8, 0, mojo.internal.String, null, false /* nullable */, 0),
    mojo.internal.StructField('itemUrl', 16, 0, url_mojom_UrlSpec.$, null, false /* nullable */, 0),
    mojo.internal.StructField('coverUrl', 24, 0, url_mojom_UrlSpec.$, null, false /* nullable */, 0),
], [[0, 40],]);
/**
 * @record
 */
export class Memory {
    constructor() {
        /** @type { !string } */
        this.id;
        /** @type { !string } */
        this.title;
        /** @type { !url_mojom_Url } */
        this.itemUrl;
        /** @type { !url_mojom_Url } */
        this.coverUrl;
    }
}
mojo.internal.Struct(PhotosHandler_GetMemories_ParamsSpec.$, 'PhotosHandler_GetMemories_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_GetMemories_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_GetMemories_ResponseParamsSpec.$, 'PhotosHandler_GetMemories_ResponseParams', [
    mojo.internal.StructField('memories', 0, 0, mojo.internal.Array(MemorySpec.$, false), null, false /* nullable */, 0),
], [[0, 16],]);
/**
 * @record
 */
export class PhotosHandler_GetMemories_ResponseParams {
    constructor() {
        /** @type { !Array<!Memory> } */
        this.memories;
    }
}
mojo.internal.Struct(PhotosHandler_DismissModule_ParamsSpec.$, 'PhotosHandler_DismissModule_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_DismissModule_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_RestoreModule_ParamsSpec.$, 'PhotosHandler_RestoreModule_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_RestoreModule_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_ShouldShowOptInScreen_ParamsSpec.$, 'PhotosHandler_ShouldShowOptInScreen_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_ShouldShowOptInScreen_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_ShouldShowOptInScreen_ResponseParamsSpec.$, 'PhotosHandler_ShouldShowOptInScreen_ResponseParams', [
    mojo.internal.StructField('showOptInScreen', 0, 0, mojo.internal.Bool, false, false /* nullable */, 0),
], [[0, 16],]);
/**
 * @record
 */
export class PhotosHandler_ShouldShowOptInScreen_ResponseParams {
    constructor() {
        /** @type { !boolean } */
        this.showOptInScreen;
    }
}
mojo.internal.Struct(PhotosHandler_OnUserOptIn_ParamsSpec.$, 'PhotosHandler_OnUserOptIn_Params', [
    mojo.internal.StructField('accept', 0, 0, mojo.internal.Bool, false, false /* nullable */, 0),
], [[0, 16],]);
/**
 * @record
 */
export class PhotosHandler_OnUserOptIn_Params {
    constructor() {
        /** @type { !boolean } */
        this.accept;
    }
}
mojo.internal.Struct(PhotosHandler_OnMemoryOpen_ParamsSpec.$, 'PhotosHandler_OnMemoryOpen_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_OnMemoryOpen_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_ShouldShowSoftOptOutButton_ParamsSpec.$, 'PhotosHandler_ShouldShowSoftOptOutButton_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_ShouldShowSoftOptOutButton_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_ShouldShowSoftOptOutButton_ResponseParamsSpec.$, 'PhotosHandler_ShouldShowSoftOptOutButton_ResponseParams', [
    mojo.internal.StructField('showSoftOptOutButton', 0, 0, mojo.internal.Bool, false, false /* nullable */, 0),
], [[0, 16],]);
/**
 * @record
 */
export class PhotosHandler_ShouldShowSoftOptOutButton_ResponseParams {
    constructor() {
        /** @type { !boolean } */
        this.showSoftOptOutButton;
    }
}
mojo.internal.Struct(PhotosHandler_SoftOptOut_ParamsSpec.$, 'PhotosHandler_SoftOptOut_Params', [], [[0, 8],]);
/**
 * @record
 */
export class PhotosHandler_SoftOptOut_Params {
    constructor() {
    }
}
mojo.internal.Struct(PhotosHandler_GetOptInTitleText_ParamsSpec.$, 'PhotosHandler_GetOptInTitleText_Params', [
    mojo.internal.StructField('memories', 0, 0, mojo.internal.Array(MemorySpec.$, false), null, false /* nullable */, 0),
], [[0, 16],]);
/**
 * @record
 */
export class PhotosHandler_GetOptInTitleText_Params {
    constructor() {
        /** @type { !Array<!Memory> } */
        this.memories;
    }
}
mojo.internal.Struct(PhotosHandler_GetOptInTitleText_ResponseParamsSpec.$, 'PhotosHandler_GetOptInTitleText_ResponseParams', [
    mojo.internal.StructField('optInTitleText', 0, 0, mojo.internal.String, null, false /* nullable */, 0),
], [[0, 16],]);
/**
 * @record
 */
export class PhotosHandler_GetOptInTitleText_ResponseParams {
    constructor() {
        /** @type { !string } */
        this.optInTitleText;
    }
}
