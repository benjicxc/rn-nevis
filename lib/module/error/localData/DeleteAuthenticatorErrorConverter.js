/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { DeleteAuthenticatorInvalidAaidError } from './DeleteAuthenticatorInvalidAaidError';
import { DeleteAuthenticatorUnknownError } from './DeleteAuthenticatorUnknownError';
import { ErrorConverter } from '../ErrorConverter';
var DeleteAuthenticatorErrorType = /*#__PURE__*/function (DeleteAuthenticatorErrorType) {
  DeleteAuthenticatorErrorType[DeleteAuthenticatorErrorType["InvalidAaid"] = 0] = "InvalidAaid";
  DeleteAuthenticatorErrorType[DeleteAuthenticatorErrorType["Unknown"] = 1] = "Unknown";
  return DeleteAuthenticatorErrorType;
}(DeleteAuthenticatorErrorType || {});
export class DeleteAuthenticatorErrorConverter extends ErrorConverter {
  convert() {
    const subtype = DeleteAuthenticatorErrorType[this.error.type];
    switch (subtype) {
      case DeleteAuthenticatorErrorType.InvalidAaid:
        return new DeleteAuthenticatorInvalidAaidError(this.error.description, this.error.cause);
      case DeleteAuthenticatorErrorType.Unknown:
        return new DeleteAuthenticatorUnknownError(this.error.description, this.error.cause);
    }
  }
}
//# sourceMappingURL=DeleteAuthenticatorErrorConverter.js.map