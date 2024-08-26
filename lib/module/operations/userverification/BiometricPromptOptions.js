/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PromptOptions } from './PromptOptions';

/**
 * Defines the elements of the biometric prompt (title, description and cancel button text).
 *
 * @see {@link BiometricUserVerificationHandler.listenForOsCredentials}
 */
export class BiometricPromptOptions extends PromptOptions {
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
export class BiometricPromptOptionsImpl extends BiometricPromptOptions {
  constructor(title, cancelButtonText, description) {
    super();
    this.title = title;
    this.description = description;
    this.cancelButtonText = cancelButtonText;
  }
}
//# sourceMappingURL=BiometricPromptOptions.js.map