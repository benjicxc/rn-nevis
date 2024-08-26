/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeDeviceProtectionError } from './PinChangeDeviceProtectionError';
import { PinChangeNoDeviceLockError } from './PinChangeNoDeviceLockError';
import { PinChangePinLocked } from './PinChangePinLocked';
import { PinChangePinNotEnrolled } from './PinChangePinNotEnrolled';
import { PinChangeUnknownError } from './PinChangeUnknownError';
import { PinChangeUserCanceled } from './PinChangeUserCanceled';
import { ErrorConverter } from '../../ErrorConverter';
var PinChangeErrorType = /*#__PURE__*/function (PinChangeErrorType) {
  PinChangeErrorType[PinChangeErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  PinChangeErrorType[PinChangeErrorType["NoDeviceLockError"] = 1] = "NoDeviceLockError";
  PinChangeErrorType[PinChangeErrorType["PinLocked"] = 2] = "PinLocked";
  PinChangeErrorType[PinChangeErrorType["PinNotEnrolled"] = 3] = "PinNotEnrolled";
  PinChangeErrorType[PinChangeErrorType["Unknown"] = 4] = "Unknown";
  PinChangeErrorType[PinChangeErrorType["UserCanceled"] = 5] = "UserCanceled";
  return PinChangeErrorType;
}(PinChangeErrorType || {});
export class PinChangeErrorConverter extends ErrorConverter {
  convert() {
    const subtype = PinChangeErrorType[this.error.type];
    switch (subtype) {
      case PinChangeErrorType.DeviceProtectionError:
        return new PinChangeDeviceProtectionError(this.error.description, this.error.cause);
      case PinChangeErrorType.NoDeviceLockError:
        return new PinChangeNoDeviceLockError(this.error.description, this.error.cause);
      case PinChangeErrorType.PinLocked:
        return new PinChangePinLocked(this.error.description, this.error.cause);
      case PinChangeErrorType.PinNotEnrolled:
        return new PinChangePinNotEnrolled(this.error.description, this.error.cause);
      case PinChangeErrorType.Unknown:
        return new PinChangeUnknownError(this.error.description, this.error.cause);
      case PinChangeErrorType.UserCanceled:
        return new PinChangeUserCanceled(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=PinChangeErrorConverter.js.map