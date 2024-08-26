"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevicePasscodePromptOptionsImpl = exports.DevicePasscodePromptOptions = void 0;
var _PromptOptions = require("./PromptOptions");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Defines the elements of the device passcode prompt (title and description).
 *
 * @see {@link DevicePasscodeUserVerificationHandler.listenForOsCredentials}
 */
class DevicePasscodePromptOptions extends _PromptOptions.PromptOptions {
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
exports.DevicePasscodePromptOptions = DevicePasscodePromptOptions;
class DevicePasscodePromptOptionsImpl extends DevicePasscodePromptOptions {
  constructor(title, description) {
    super();
    this.title = title;
    this.description = description;
  }
}
exports.DevicePasscodePromptOptionsImpl = DevicePasscodePromptOptionsImpl;
//# sourceMappingURL=DevicePasscodePromptOptions.js.map