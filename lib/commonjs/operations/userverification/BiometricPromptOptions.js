"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BiometricPromptOptionsImpl = exports.BiometricPromptOptions = void 0;
var _PromptOptions = require("./PromptOptions");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Defines the elements of the biometric prompt (title, description and cancel button text).
 *
 * @see {@link BiometricUserVerificationHandler.listenForOsCredentials}
 */
class BiometricPromptOptions extends _PromptOptions.PromptOptions {
  /**
   * The cancel button text.
   */

  /**
   * Default constructor for {@link BiometricPromptOptions}.
   *
   * @param title the title to be used to prompt the user.
   * @param cancelButtonText the cancel button text.
   * @param description the optional description to be used to prompt the user.
   * @returns the created {@link BiometricPromptOptions} instance.
   */
  static create(title, cancelButtonText, description) {
    return new BiometricPromptOptionsImpl(title, cancelButtonText, description);
  }
}
exports.BiometricPromptOptions = BiometricPromptOptions;
class BiometricPromptOptionsImpl extends BiometricPromptOptions {
  constructor(title, cancelButtonText, description) {
    super();
    this.title = title;
    this.description = description;
    this.cancelButtonText = cancelButtonText;
  }
}
exports.BiometricPromptOptionsImpl = BiometricPromptOptionsImpl;
//# sourceMappingURL=BiometricPromptOptions.js.map