"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypedPromptOptions = exports.TypedDevicePasscodePromptOptions = exports.TypedBiometricPromptOptions = void 0;
var _TypedData = require("./TypedData");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class PromptOptionsData {
  constructor(title, description, cancelButtonText) {
    this.title = title;
    this.description = description;
    this.cancelButtonText = cancelButtonText;
  }
}
class TypedPromptOptions extends _TypedData.TypedData {}
exports.TypedPromptOptions = TypedPromptOptions;
class TypedBiometricPromptOptions extends TypedPromptOptions {
  type = 'BiometricPromptOptions';
  constructor(wrapped) {
    super();
    this.data = new PromptOptionsData(wrapped === null || wrapped === void 0 ? void 0 : wrapped.title, wrapped === null || wrapped === void 0 ? void 0 : wrapped.description, wrapped === null || wrapped === void 0 ? void 0 : wrapped.cancelButtonText);
  }
}
exports.TypedBiometricPromptOptions = TypedBiometricPromptOptions;
class TypedDevicePasscodePromptOptions extends TypedPromptOptions {
  type = 'DevicePasscodePromptOptions';
  constructor(wrapped) {
    super();
    this.data = new PromptOptionsData(wrapped === null || wrapped === void 0 ? void 0 : wrapped.title, wrapped === null || wrapped === void 0 ? void 0 : wrapped.description);
  }
}
exports.TypedDevicePasscodePromptOptions = TypedDevicePasscodePromptOptions;
//# sourceMappingURL=TypedPromptOptions.js.map