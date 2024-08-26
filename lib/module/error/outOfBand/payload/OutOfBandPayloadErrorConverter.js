/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandPayloadDecryptionError } from './OutOfBandPayloadDecryptionError';
import { OutOfBandPayloadDeviceProtectionError } from './OutOfBandPayloadDeviceProtectionError';
import { OutOfBandPayloadMalformedPayload } from './OutOfBandPayloadMalformedPayload';
import { OutOfBandPayloadNoDeviceLockError } from './OutOfBandPayloadNoDeviceLockError';
import { OutOfBandPayloadUnknownError } from './OutOfBandPayloadUnknownError';
import { ErrorConverter } from '../../ErrorConverter';
var OutOfBandPayloadErrorType = /*#__PURE__*/function (OutOfBandPayloadErrorType) {
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["DecryptionError"] = 0] = "DecryptionError";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["DeviceProtectionError"] = 1] = "DeviceProtectionError";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["MalformedPayload"] = 2] = "MalformedPayload";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["Unknown"] = 4] = "Unknown";
  return OutOfBandPayloadErrorType;
}(OutOfBandPayloadErrorType || {});
export class OutOfBandPayloadErrorConverter extends ErrorConverter {
  convert() {
    const subtype = OutOfBandPayloadErrorType[this.error.type];
    switch (subtype) {
      case OutOfBandPayloadErrorType.DecryptionError:
        return new OutOfBandPayloadDecryptionError(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.DeviceProtectionError:
        return new OutOfBandPayloadDeviceProtectionError(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.MalformedPayload:
        return new OutOfBandPayloadMalformedPayload(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.NoDeviceLockError:
        return new OutOfBandPayloadNoDeviceLockError(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.Unknown:
        return new OutOfBandPayloadUnknownError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=OutOfBandPayloadErrorConverter.js.map