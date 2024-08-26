/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinEnrollmentInvalidPinFormat } from './PinEnrollmentInvalidPinFormat';
import { ErrorConverter } from '../../ErrorConverter';
var PinEnrollmentErrorType = /*#__PURE__*/function (PinEnrollmentErrorType) {
  PinEnrollmentErrorType[PinEnrollmentErrorType["InvalidPinFormat"] = 0] = "InvalidPinFormat";
  return PinEnrollmentErrorType;
}(PinEnrollmentErrorType || {});
export class PinEnrollmentErrorConverter extends ErrorConverter {
  convert() {
    const subtype = PinEnrollmentErrorType[this.error.type];
    switch (subtype) {
      case PinEnrollmentErrorType.InvalidPinFormat:
        return new PinEnrollmentInvalidPinFormat(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=PinEnrollmentErrorConverter.js.map