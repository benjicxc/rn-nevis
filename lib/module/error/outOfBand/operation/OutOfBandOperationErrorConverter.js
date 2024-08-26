/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandOperationDeviceProtectionError } from './OutOfBandOperationDeviceProtectionError';
import { OutOfBandOperationNetworkError } from './OutOfBandOperationNetworkError';
import { OutOfBandOperationNoDeviceLockError } from './OutOfBandOperationNoDeviceLockError';
import { OutOfBandOperationTokenAlreadyRedeemed } from './OutOfBandOperationTokenAlreadyRedeemed';
import { OutOfBandOperationTokenExpired } from './OutOfBandOperationTokenExpired';
import { OutOfBandOperationUnknownError } from './OutOfBandOperationUnknownError';
import { ErrorConverter } from '../../ErrorConverter';
var OutOfBandOperationErrorType = /*#__PURE__*/function (OutOfBandOperationErrorType) {
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["NetworkError"] = 1] = "NetworkError";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["NoDeviceLockError"] = 2] = "NoDeviceLockError";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["TokenAlreadyRedeemed"] = 3] = "TokenAlreadyRedeemed";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["TokenExpired"] = 4] = "TokenExpired";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["Unknown"] = 5] = "Unknown";
  return OutOfBandOperationErrorType;
}(OutOfBandOperationErrorType || {});
export class OutOfBandOperationErrorConverter extends ErrorConverter {
  convert() {
    const subtype = OutOfBandOperationErrorType[this.error.type];
    switch (subtype) {
      case OutOfBandOperationErrorType.DeviceProtectionError:
        return new OutOfBandOperationDeviceProtectionError(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.NetworkError:
        return new OutOfBandOperationNetworkError(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.NoDeviceLockError:
        return new OutOfBandOperationNoDeviceLockError(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.TokenAlreadyRedeemed:
        return new OutOfBandOperationTokenAlreadyRedeemed(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.TokenExpired:
        return new OutOfBandOperationTokenExpired(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.Unknown:
        return new OutOfBandOperationUnknownError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=OutOfBandOperationErrorConverter.js.map