"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FidoErrorCodeType = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * Collection error codes based on the {@link https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-uaf-client-api-transport-v1.1-ps-20170202.html#errorcode-interface | FIDO UAF client error codes}.
 */
let FidoErrorCodeType = exports.FidoErrorCodeType = /*#__PURE__*/function (FidoErrorCodeType) {
  FidoErrorCodeType["NoError"] = "NO_ERROR";
  FidoErrorCodeType["WaitUserAction"] = "WAIT_USER_ACTION";
  FidoErrorCodeType["InsecureTransport"] = "INSECURE_TRANSPORT";
  FidoErrorCodeType["UserCanceled"] = "USER_CANCELED";
  FidoErrorCodeType["UnsupportedVersion"] = "UNSUPPORTED_VERSION";
  FidoErrorCodeType["NoSuitableAuthenticator"] = "NO_SUITABLE_AUTHENTICATOR";
  FidoErrorCodeType["ProtocolError"] = "PROTOCOL_ERROR";
  FidoErrorCodeType["UntrustedFacetId"] = "UNTRUSTED_FACET_ID";
  FidoErrorCodeType["KeyDisappearedPermanently"] = "KEY_DISAPPEARED_PERMANENTLY";
  FidoErrorCodeType["AuthenticatorAccessDenied"] = "AUTHENTICATOR_ACCESS_DENIED";
  FidoErrorCodeType["InvalidTransactionContent"] = "INVALID_TRANSACTION_CONTENT";
  FidoErrorCodeType["UserNotResponsive"] = "USER_NOT_RESPONSIVE";
  FidoErrorCodeType["InsufficientAuthenticatorResources"] = "INSUFFICIENT_AUTHENTICATOR_RESOURCES";
  FidoErrorCodeType["UserLockout"] = "USER_LOCKOUT";
  FidoErrorCodeType["UserNotEnrolled"] = "USER_NOT_ENROLLED";
  FidoErrorCodeType["Unknown"] = "UNKNOWN";
  return FidoErrorCodeType;
}({});
//# sourceMappingURL=FidoErrorCodeType.js.map