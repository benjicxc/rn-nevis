"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitializationLockScreenHasChangedError = void 0;
var _InitializationDeviceProtectionError = require("./InitializationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * User has changed the lock screen configuration of the device and the credentials were created using an SDK
 * previous to 1.7. The data no longer accessible. This happens for example when the user created fingerprint
 * credentials with an application using an SDK previous to 1.7 and the fingerprints were modified. On credentials
 * created with an SDK 1.7 or later, changing the screen lock protection does not result in this error.
 */
class InitializationLockScreenHasChangedError extends _InitializationDeviceProtectionError.InitializationDeviceProtectionError {
  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(description, cause) {
    super(description, cause);
  }
}
exports.InitializationLockScreenHasChangedError = InitializationLockScreenHasChangedError;
//# sourceMappingURL=InitializationLockScreenHasChangedError.js.map