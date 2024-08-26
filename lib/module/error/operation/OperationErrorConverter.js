/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationDeviceProtectionError } from './OperationDeviceProtectionError';
import { OperationFidoError } from './OperationFidoError';
import { OperationNetworkError } from './OperationNetworkError';
import { OperationNoDeviceLockError } from './OperationNoDeviceLockError';
import { OperationUnknownError } from './OperationUnknownError';
import { OperationUserAlreadyRegisteredInAnotherServerError } from './OperationUserAlreadyRegisteredInAnotherServerError';
import { OperationUserNotRegisteredInServerError } from './OperationUserNotRegisteredInServerError';
import { ErrorConverter } from '../ErrorConverter';
var OperationErrorType = /*#__PURE__*/function (OperationErrorType) {
  OperationErrorType[OperationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  OperationErrorType[OperationErrorType["FidoError"] = 1] = "FidoError";
  OperationErrorType[OperationErrorType["NetworkError"] = 2] = "NetworkError";
  OperationErrorType[OperationErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  OperationErrorType[OperationErrorType["Unknown"] = 4] = "Unknown";
  OperationErrorType[OperationErrorType["UserAlreadyRegisteredInAnotherServer"] = 5] = "UserAlreadyRegisteredInAnotherServer";
  OperationErrorType[OperationErrorType["UserNotRegisteredInServer"] = 6] = "UserNotRegisteredInServer";
  return OperationErrorType;
}(OperationErrorType || {});
export class OperationErrorConverter extends ErrorConverter {
  convert() {
    const subtype = OperationErrorType[this.error.type];
    switch (subtype) {
      case OperationErrorType.DeviceProtectionError:
        return new OperationDeviceProtectionError(this.error.description, this.error.cause);
      case OperationErrorType.FidoError:
        {
          if (this.error.errorCode) {
            return new OperationFidoError(this.error.errorCode, this.error.description, this.error.cause);
          }
          return new OperationUnknownError(this.error.description, this.error.cause);
        }
      case OperationErrorType.NetworkError:
        return new OperationNetworkError(this.error.description, this.error.cause);
      case OperationErrorType.NoDeviceLockError:
        return new OperationNoDeviceLockError(this.error.description, this.error.cause);
      case OperationErrorType.Unknown:
        return new OperationUnknownError(this.error.description, this.error.cause);
      case OperationErrorType.UserAlreadyRegisteredInAnotherServer:
        return new OperationUserAlreadyRegisteredInAnotherServerError(this.error.description, this.error.cause);
      case OperationErrorType.UserNotRegisteredInServer:
        return new OperationUserNotRegisteredInServerError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=OperationErrorConverter.js.map