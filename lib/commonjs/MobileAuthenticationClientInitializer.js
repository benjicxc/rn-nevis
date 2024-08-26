"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileAuthenticationClientInitializer = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _InitializationErrorConverter = require("./error/initialization/InitializationErrorConverter");
var _MobileAuthenticationClient = require("./MobileAuthenticationClient");
var _MobileAuthenticationSdk = _interopRequireDefault(require("./MobileAuthenticationSdk"));
var _InitClientMessage = require("./model/messages/out/InitClientMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The class that creates and initializes asynchronously an instance of {@link MobileAuthenticationClient}.
 */
class MobileAuthenticationClientInitializer {
  /**
   * Sets the configuration of the {@link MobileAuthenticationClient}.
   *
   * **IMPORTANT** \
   * Providing the configuration is required.
   *
   * @param configuration the {@link MobileAuthenticationClient} configuration.
   * @returns an initializer
   */
  configuration(configuration) {
    this._configuration = configuration;
    return this;
  }

  /**
   * The method invoked when the {@link MobileAuthenticationClient} could be successfully built after
   * invoking {@link execute}.
   *
   * **IMPORTANT** \
   * Providing the callback handling the {@link MobileAuthenticationClient} is required.
   *
   * @param onSuccess the callback handling the {@link MobileAuthenticationClient}.
   * @returns an initializer.
   */
  onSuccess(onSuccess) {
    this._onSuccess = onSuccess;
    return this;
  }

  /**
   * The method invoked when an error occurs after invoking {@link execute}.
   *
   * **IMPORTANT** \
   * Providing the callback handling the error is required.
   *
   * @param onError the callback handling the error.
   * @returns an initializer.
   */
  onError(onError) {
    this._onError = onError;
    return this;
  }

  /**
   * Starts the creation of an instance of the {@link MobileAuthenticationClient}. If an error
   * occurs, it is provided through {@link onError}, if the {@link MobileAuthenticationClient}
   * can be successfully built and initialized, it is provided through {@link onSuccess}.
   */
  async execute() {
    const message = new _InitClientMessage.InitClientMessage(_reactNativeUuid.default.v4(), this._onSuccess !== undefined, this._onError !== undefined, this._configuration);
    return _MobileAuthenticationSdk.default.initClient(message).then(() => {
      var _this$_onSuccess;
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this, new _MobileAuthenticationClient.MobileAuthenticationClientImpl());
    }).catch(error => {
      var _this$_onError;
      const initializationError = new _InitializationErrorConverter.InitializationErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, initializationError);
    });
  }
}
exports.MobileAuthenticationClientInitializer = MobileAuthenticationClientInitializer;
//# sourceMappingURL=MobileAuthenticationClientInitializer.js.map