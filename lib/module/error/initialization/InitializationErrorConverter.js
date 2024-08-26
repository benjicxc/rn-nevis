/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';
import { InitializationHardwareError } from './InitializationHardwareError';
import { InitializationLockScreenHasChangedError } from './InitializationLockScreenHasChangedError';
import { InitializationNoDeviceLockError } from './InitializationNoDeviceLockError';
import { InitializationRootedError } from './InitializationRootedError';
import { InitializationUnknownError } from './InitializationUnknownError';
import { ErrorConverter } from '../ErrorConverter';
var InitializationErrorType = /*#__PURE__*/function (InitializationErrorType) {
  InitializationErrorType[InitializationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  InitializationErrorType[InitializationErrorType["HardwareError"] = 1] = "HardwareError";
  InitializationErrorType[InitializationErrorType["LockScreenHasChangedError"] = 2] = "LockScreenHasChangedError";
  InitializationErrorType[InitializationErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  InitializationErrorType[InitializationErrorType["RootedError"] = 4] = "RootedError";
  InitializationErrorType[InitializationErrorType["Unknown"] = 5] = "Unknown";
  return InitializationErrorType;
}(InitializationErrorType || {});
export class InitializationErrorConverter extends ErrorConverter {
  convert() {
    const subtype = InitializationErrorType[this.error.type];
    switch (subtype) {
      case InitializationErrorType.DeviceProtectionError:
        return new InitializationDeviceProtectionError(this.error.description, this.error.cause);
      case InitializationErrorType.HardwareError:
        return new InitializationHardwareError(this.error.description, this.error.cause);
      case InitializationErrorType.LockScreenHasChangedError:
        return new InitializationLockScreenHasChangedError(this.error.description, this.error.cause);
      case InitializationErrorType.NoDeviceLockError:
        return new InitializationNoDeviceLockError(this.error.description, this.error.cause);
      case InitializationErrorType.RootedError:
        return new InitializationRootedError(this.error.description, this.error.cause);
      case InitializationErrorType.Unknown:
        return new InitializationUnknownError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=InitializationErrorConverter.js.map