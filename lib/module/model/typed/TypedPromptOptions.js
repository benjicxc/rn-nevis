/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
class PromptOptionsData {
  constructor(title, description, cancelButtonText) {
    this.title = title;
    this.description = description;
    this.cancelButtonText = cancelButtonText;
  }
}
export class TypedPromptOptions extends TypedData {}
export class TypedBiometricPromptOptions extends TypedPromptOptions {
  type = 'BiometricPromptOptions';
  constructor(wrapped) {
    super();
    this.data = new PromptOptionsData(wrapped === null || wrapped === void 0 ? void 0 : wrapped.title, wrapped === null || wrapped === void 0 ? void 0 : wrapped.description, wrapped === null || wrapped === void 0 ? void 0 : wrapped.cancelButtonText);
  }
}
export class TypedDevicePasscodePromptOptions extends TypedPromptOptions {
  type = 'DevicePasscodePromptOptions';
  constructor(wrapped) {
    super();
    this.data = new PromptOptionsData(wrapped === null || wrapped === void 0 ? void 0 : wrapped.title, wrapped === null || wrapped === void 0 ? void 0 : wrapped.description);
  }
}
//# sourceMappingURL=TypedPromptOptions.js.map