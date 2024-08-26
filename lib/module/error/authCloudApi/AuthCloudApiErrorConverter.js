/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiDecryptionError } from './AuthCloudApiDecryptionError';
import { AuthCloudApiDeviceProtectionError } from './AuthCloudApiDeviceProtectionError';
import { AuthCloudApiFidoError } from './AuthCloudApiFidoError';
import { AuthCloudApiMalformedPayload } from './AuthCloudApiMalformedPayload';
import { AuthCloudApiNetworkError } from './AuthCloudApiNetworkError';
import { AuthCloudApiNoDeviceLockError } from './AuthCloudApiNoDeviceLockError';
import { AuthCloudApiTokenAlreadyRedeemed } from './AuthCloudApiTokenAlreadyRedeemed';
import { AuthCloudApiTokenExpired } from './AuthCloudApiTokenExpired';
import { AuthCloudApiUnknownError } from './AuthCloudApiUnknownError';
import { AuthCloudApiUserAlreadyRegisteredInAnotherServerError } from './AuthCloudApiUserAlreadyRegisteredInAnotherServerError';
import { ErrorConverter } from '../ErrorConverter';
var AuthCloudApiErrorType = /*#__PURE__*/function (AuthCloudApiErrorType) {
  AuthCloudApiErrorType[AuthCloudApiErrorType["DecryptionError"] = 0] = "DecryptionError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["DeviceProtectionError"] = 1] = "DeviceProtectionError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["FidoError"] = 2] = "FidoError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["MalformedPayload"] = 3] = "MalformedPayload";
  AuthCloudApiErrorType[AuthCloudApiErrorType["NetworkError"] = 4] = "NetworkError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["NoDeviceLockError"] = 5] = "NoDeviceLockError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["TokenAlreadyRedeemed"] = 6] = "TokenAlreadyRedeemed";
  AuthCloudApiErrorType[AuthCloudApiErrorType["TokenExpired"] = 7] = "TokenExpired";
  AuthCloudApiErrorType[AuthCloudApiErrorType["Unknown"] = 8] = "Unknown";
  AuthCloudApiErrorType[AuthCloudApiErrorType["UserAlreadyRegisteredInAnotherServer"] = 9] = "UserAlreadyRegisteredInAnotherServer";
  return AuthCloudApiErrorType;
}(AuthCloudApiErrorType || {});
export class AuthCloudApiErrorConverter extends ErrorConverter {
  convert() {
    const subtype = AuthCloudApiErrorType[this.error.type];
    switch (subtype) {
      case AuthCloudApiErrorType.DecryptionError:
        return new AuthCloudApiDecryptionError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.DeviceProtectionError:
        return new AuthCloudApiDeviceProtectionError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.FidoError:
        {
          if (this.error.errorCode) {
            return new AuthCloudApiFidoError(this.error.errorCode, this.error.description, this.error.cause);
          }
          return new AuthCloudApiUnknownError(this.error.description, this.error.cause);
        }
      case AuthCloudApiErrorType.MalformedPayload:
        return new AuthCloudApiMalformedPayload(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.NetworkError:
        return new AuthCloudApiNetworkError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.NoDeviceLockError:
        return new AuthCloudApiNoDeviceLockError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.TokenAlreadyRedeemed:
        return new AuthCloudApiTokenAlreadyRedeemed(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.TokenExpired:
        return new AuthCloudApiTokenExpired(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.Unknown:
        return new AuthCloudApiUnknownError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.UserAlreadyRegisteredInAnotherServer:
        return new AuthCloudApiUserAlreadyRegisteredInAnotherServerError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=AuthCloudApiErrorConverter.js.map