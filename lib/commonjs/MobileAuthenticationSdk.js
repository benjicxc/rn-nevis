"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

const LINKING_ERROR = `The package 'nevis-mobile-authentication-sdk-react' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// @ts-expect-error error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const NevisMobileAuthenticationSdkReactModule = isTurboModuleEnabled ? require('./NativeNevisMobileAuthenticationSdkReact').default : _reactNative.NativeModules.NevisMobileAuthenticationSdkReact;
const NevisMobileAuthenticationSdkReact = NevisMobileAuthenticationSdkReactModule ? NevisMobileAuthenticationSdkReactModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
}
// eslint-disable-next-line no-mixed-spaces-and-tabs
);
var _default = exports.default = NevisMobileAuthenticationSdkReact;
//# sourceMappingURL=MobileAuthenticationSdk.js.map