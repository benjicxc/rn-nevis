"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationsImpl = exports.Operations = void 0;
var _AuthCloudApiRegistration = require("./AuthCloudApiRegistration");
var _Authentication = require("./Authentication");
var _Deregistration = require("./Deregistration");
var _DeviceInformationChange = require("./DeviceInformationChange");
var _OutOfBandOperation = require("./outOfBand/OutOfBandOperation");
var _OutOfBandPayloadDecode = require("./outOfBand/OutOfBandPayloadDecode");
var _PinChange = require("./pin/PinChange");
var _Registration = require("./Registration");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The interface used to obtain operation objects (registration, deregistration, authentication...).
 *
 * @see {@link MobileAuthenticationClient.operations}
 */
class Operations {}
exports.Operations = Operations;
class OperationsImpl extends Operations {
  outOfBandOperation = new _OutOfBandOperation.OutOfBandOperationImpl();
  outOfBandPayloadDecode = new _OutOfBandPayloadDecode.OutOfBandPayloadDecodeImpl();
  registration = new _Registration.RegistrationImpl();
  authCloudApiRegistration = new _AuthCloudApiRegistration.AuthCloudApiRegistrationImpl();
  authentication = new _Authentication.AuthenticationImpl();
  deregistration = new _Deregistration.DeregistrationImpl();
  deviceInformationChange = new _DeviceInformationChange.DeviceInformationChangeImpl();
  pinChange = new _PinChange.PinChangeImpl();
}
exports.OperationsImpl = OperationsImpl;
//# sourceMappingURL=Operations.js.map