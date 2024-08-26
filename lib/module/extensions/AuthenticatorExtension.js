/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Aaid } from '../localData/Aaid';
import { BiometricUserVerificationHandlerImpl } from '../operations/userverification/BiometricUserVerificationHandler';
import { DevicePasscodeUserVerificationHandlerImpl } from '../operations/userverification/DevicePasscodeUserVerificationHandler';
import { FingerprintUserVerificationHandlerImpl } from '../operations/userverification/FingerprintUserVerificationHandler';
import { PinUserVerificationHandlerImpl } from '../operations/userverification/PinUserVerificationHandler';
export class AuthenticatorExtension {
  static handlerByAuthenticator(aaid, operationId) {
    switch (aaid) {
      case Aaid.PIN.rawValue():
        return new PinUserVerificationHandlerImpl(operationId);
      case Aaid.BIOMETRIC.rawValue():
        return new BiometricUserVerificationHandlerImpl(operationId);
      case Aaid.DEVICE_PASSCODE.rawValue():
        return new DevicePasscodeUserVerificationHandlerImpl(operationId);
      case Aaid.FINGERPRINT.rawValue():
        return new FingerprintUserVerificationHandlerImpl(operationId);
    }
    throw new Error(`No handler for Authenticator aaid ${aaid}.`);
  }
}
//# sourceMappingURL=AuthenticatorExtension.js.map