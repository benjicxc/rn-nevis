/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PromptOptions } from './PromptOptions';

/**
 * Defines the elements of the device passcode prompt (title and description).
 *
 * @see {@link DevicePasscodeUserVerificationHandler.listenForOsCredentials}
 */
export class DevicePasscodePromptOptions extends PromptOptions {
  /**
   * Default constructor for {@link DevicePasscodePromptOptions}.
   *
   * @param title the title to be used to prompt the user.
   * @param description the optional description to be used to prompt the user.
   * @returns the created {@link DevicePasscodePromptOptions} instance.
   */
  static create(title, description) {
    return new DevicePasscodePromptOptionsImpl(title, description);
  }
}
export class DevicePasscodePromptOptionsImpl extends DevicePasscodePromptOptions {
  constructor(title, description) {
    super();
    this.title = title;
    this.description = description;
  }
}
//# sourceMappingURL=DevicePasscodePromptOptions.js.map