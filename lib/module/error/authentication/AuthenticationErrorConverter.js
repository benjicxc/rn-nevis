/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticationDeviceProtectionError } from './AuthenticationDeviceProtectionError';
import { AuthenticationFidoError } from './AuthenticationFidoError';
import { AuthenticationNetworkError } from './AuthenticationNetworkError';
import { AuthenticationNoDeviceLockError } from './AuthenticationNoDeviceLockError';
import { AuthenticationUnknownError } from './AuthenticationUnknownError';
import { ErrorConverter } from '../ErrorConverter';
var AuthenticationErrorType = /*#__PURE__*/function (AuthenticationErrorType) {
  AuthenticationErrorType[AuthenticationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  AuthenticationErrorType[AuthenticationErrorType["FidoError"] = 1] = "FidoError";
  AuthenticationErrorType[AuthenticationErrorType["NetworkError"] = 2] = "NetworkError";
  AuthenticationErrorType[AuthenticationErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  AuthenticationErrorType[AuthenticationErrorType["Unknown"] = 4] = "Unknown";
  return AuthenticationErrorType;
}(AuthenticationErrorType || {});
export class AuthenticationErrorConverter extends ErrorConverter {
  convert() {
    const subtype = AuthenticationErrorType[this.error.type];
    switch (subtype) {
      case AuthenticationErrorType.DeviceProtectionError:
        return new AuthenticationDeviceProtectionError(this.error.description, this.error.cause, this.error.sessionProvider);
      case AuthenticationErrorType.FidoError:
        {
          if (this.error.errorCode) {
            return new AuthenticationFidoError(this.error.errorCode, this.error.description, this.error.cause, this.error.sessionProvider);
          }
          return new AuthenticationUnknownError(this.error.description, this.error.cause, this.error.sessionProvider);
        }
      case AuthenticationErrorType.NetworkError:
        return new AuthenticationNetworkError(this.error.description, this.error.cause, this.error.sessionProvider);
      case AuthenticationErrorType.NoDeviceLockError:
        return new AuthenticationNoDeviceLockError(this.error.description, this.error.cause, this.error.sessionProvider);
      case AuthenticationErrorType.Unknown:
        return new AuthenticationUnknownError(this.error.description, this.error.cause, this.error.sessionProvider);
    }
  }
}
//# sourceMappingURL=AuthenticationErrorConverter.js.map