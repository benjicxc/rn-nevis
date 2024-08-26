/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeRecoverableInvalidPin } from './PinChangeRecoverableInvalidPin';
import { PinChangeRecoverableInvalidPinFormat } from './PinChangeRecoverableInvalidPinFormat';
import { PinChangeRecoverableOldPinEqualsNewPin } from './PinChangeRecoverableOldPinEqualsNewPin';
import { ErrorConverter } from '../../ErrorConverter';
var PinChangeRecoverableErrorType = /*#__PURE__*/function (PinChangeRecoverableErrorType) {
  PinChangeRecoverableErrorType[PinChangeRecoverableErrorType["InvalidPin"] = 0] = "InvalidPin";
  PinChangeRecoverableErrorType[PinChangeRecoverableErrorType["InvalidPinFormat"] = 1] = "InvalidPinFormat";
  PinChangeRecoverableErrorType[PinChangeRecoverableErrorType["OldPinEqualsNewPin"] = 2] = "OldPinEqualsNewPin";
  return PinChangeRecoverableErrorType;
}(PinChangeRecoverableErrorType || {});
export class PinChangeRecoverableErrorConverter extends ErrorConverter {
  convert() {
    const subtype = PinChangeRecoverableErrorType[this.error.type];
    switch (subtype) {
      case PinChangeRecoverableErrorType.InvalidPin:
        return new PinChangeRecoverableInvalidPin(this.error.description, this.error.cause);
      case PinChangeRecoverableErrorType.InvalidPinFormat:
        return new PinChangeRecoverableInvalidPinFormat(this.error.description, this.error.cause);
      case PinChangeRecoverableErrorType.OldPinEqualsNewPin:
        return new PinChangeRecoverableOldPinEqualsNewPin(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=PinChangeRecoverableErrorConverter.js.map