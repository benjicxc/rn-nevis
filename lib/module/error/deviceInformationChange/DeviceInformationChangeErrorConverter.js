/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { DeviceInformationChangeDeviceProtectionError } from './DeviceInformationChangeDeviceProtectionError';
import { DeviceInformationChangeNameAlreadyExists } from './DeviceInformationChangeNameAlreadyExists';
import { DeviceInformationChangeNetworkError } from './DeviceInformationChangeNetworkError';
import { DeviceInformationChangeNoDeviceLockError } from './DeviceInformationChangeNoDeviceLockError';
import { DeviceInformationChangeNotFound } from './DeviceInformationChangeNotFound';
import { DeviceInformationChangeSigningError } from './DeviceInformationChangeSigningError';
import { DeviceInformationChangeUnknownError } from './DeviceInformationChangeUnknownError';
import { ErrorConverter } from '../ErrorConverter';
var DeviceInformationChangeErrorType = /*#__PURE__*/function (DeviceInformationChangeErrorType) {
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NameAlreadyExists"] = 1] = "NameAlreadyExists";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NetworkError"] = 2] = "NetworkError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NotFound"] = 4] = "NotFound";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["SigningError"] = 5] = "SigningError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["Unknown"] = 6] = "Unknown";
  return DeviceInformationChangeErrorType;
}(DeviceInformationChangeErrorType || {});
export class DeviceInformationChangeErrorConverter extends ErrorConverter {
  convert() {
    const subtype = DeviceInformationChangeErrorType[this.error.type];
    switch (subtype) {
      case DeviceInformationChangeErrorType.DeviceProtectionError:
        return new DeviceInformationChangeDeviceProtectionError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NameAlreadyExists:
        return new DeviceInformationChangeNameAlreadyExists(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NetworkError:
        return new DeviceInformationChangeNetworkError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NoDeviceLockError:
        return new DeviceInformationChangeNoDeviceLockError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NotFound:
        return new DeviceInformationChangeNotFound(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.SigningError:
        return new DeviceInformationChangeSigningError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.Unknown:
        return new DeviceInformationChangeUnknownError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=DeviceInformationChangeErrorConverter.js.map