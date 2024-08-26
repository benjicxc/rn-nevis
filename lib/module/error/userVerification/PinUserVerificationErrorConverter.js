/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinUserVerificationInvalidPin } from './PinUserVerificationInvalidPin';
import { ErrorConverter } from '../ErrorConverter';
var PinUserVerificationErrorType = /*#__PURE__*/function (PinUserVerificationErrorType) {
  PinUserVerificationErrorType[PinUserVerificationErrorType["InvalidPin"] = 0] = "InvalidPin";
  return PinUserVerificationErrorType;
}(PinUserVerificationErrorType || {});
export class PinUserVerificationErrorConverter extends ErrorConverter {
  convert() {
    const subtype = PinUserVerificationErrorType[this.error.type];
    switch (subtype) {
      case PinUserVerificationErrorType.InvalidPin:
        return new PinUserVerificationInvalidPin(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=PinUserVerificationErrorConverter.js.map