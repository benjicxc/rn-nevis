"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationConstants = exports.ConfigurationBuilder = exports.ConfigurationAuthCloudBuilder = exports.Configuration = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The {@link MobileAuthenticationClient} configuration.
 *
 * The {@link Configuration} is used to build and initialize the {@link MobileAuthenticationClient}.
 *
 * @see {@link MobileAuthenticationClientInitializer.configuration}
 */
class Configuration {
  /**
   * The default base URL for the HTTP endpoints the SDK must interact with.
   *
   * @returns the base URL.
   */

  /**
   * The registration request URL path used to send the FIDO UAF registration GetUafRequest.
   *
   * The registration request URL is the result of combining the `baseUrl` and this path.
   *
   * @returns the registration request path.
   */

  /**
   * The registration response URL path used to send the final FIDO UAF registration response.
   *
   * The registration response URL is the result of combining the `baseUrl` and this path.
   *
   * @returns registration response path.
   */

  /**
   * The authentication request URL path used to send the FIDO UAF authentication GetUafRequest.
   *
   * The authentication request URL is the result of combining the `baseUrl` and this path.
   *
   * @returns the authentication request path.
   */

  /***
   * The authentication response URL path used to send the final FIDO UAF authentication response.
   *
   * The authentication response URL is the result of combining the `baseUrl` and this path.
   *
   * @returns the authentication response path.
   */

  /**
   * Returns the URL path used to obtain the FIDO UAF deregistration request.
   *
   * The deregistration request URL is the result of combining the `baseUrl` and this path.
   *
   * @returns the deregistration request path.
   */

  /**
   * The dispatch target resource URL path.
   *
   * The dispatch target resource URL is the result of combining the `baseUrl` and this path.
   *
   * @returns the dispatch target resource path.
   */

  /**
   * The maximum number of retries for authentication. The authentication retries will fail
   * after this count is exceeded.
   *
   * @deprecated use {@link Authentication.retryPolicyObtainingAuthorizationProvider} instead.
   * The value returned by this method will be ignored.
   *
   * @returns the maximum number of retries.
   */

  /**
   * Time interval for authentication in seconds. The authentication retries will fail after
   * this time is exceeded.
   *
   * @deprecated use {@link Authentication.retryPolicyObtainingAuthorizationProvider} instead.
   * The value returned by this method will be ignored.
   *
   * @returns the time interval for authentication.
   */

  /**
   * Time interval for network calls in seconds. Any network request that takes longer than this
   * value, will result in a timeout.
   *
   * @returns the time interval for network requests.
   */

  /**
   * The user interaction timeout in seconds. This is the maximum time that the SDK will wait to
   * obtain a result when {@link AccountSelector.selectAccount}, {@link AuthenticatorSelector.selectAuthenticator},
   * {@link PinUserVerifier.verifyPin}, {@link FingerprintUserVerifier.verifyFingerprint},
   * or {@link BiometricUserVerifier.verifyBiometric} are invoked (i.e. the maximum time to wait
   * before any of the methods of the provided consumer in any of those methods is invoked).
   *
   * If the timeout occurs, then the operation delegate failure method ({@link Registration.onError},
   * {@link OutOfBandRegistration.onError}, {@link Authentication.onError}
   * or {@link OutOfBandAuthentication.onError}, depending on the operation being executed) will
   * be invoked. The provided exception will contain an {@link FidoErrorCodeType.UserNotResponsive}
   * error code.
   *
   * @returns the timeout for user interaction.
   */

  /**
   * Specifies the [facet ID](https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-appid-and-facets-v1.1-ps-20170202.html)
   * of the application.
   *
   * The FIDO server (i.e. nevisFIDO) must be configured with the facet ID(s) of your application(s).
   * If the facet ID of your application is not referenced by the nevisFIDO configuration, the
   * operations will fail with a {@link FidoErrorCodeType.UntrustedFacetId} error.
   *
   * **IMPORTANT** \
   * This property is Android specific and will be ignored by iOS native plugin.
   *
   * @returns the facet ID of the application. Undefined if the SDK should figure out the facet ID
   * following the FIDO UAF specification.
   */

  /**
   * Returns a new {@link ConfigurationBuilder}.
   *
   * @returns a new {@link ConfigurationBuilder}.
   */
  static builder() {
    return new ConfigurationBuilderImpl();
  }

  /**
   * Returns a new {@link ConfigurationAuthCloudBuilder}. This is a simpler version of
   * {@link ConfigurationBuilder} that can only be used when your application interacts with
   * the Nevis Authentication Cloud.
   *
   * If you are fine with the default network parameters of the builder, you just need to provide
   * the hostname of your application to build a {@link Configuration} object:
   *
   * @example
   * ```ts
   * const configuration = Configuration.authCloudBuilder()
   *     .hostname(hostname)
   *     .build();
   * ```
   *
   * @returns a new {@link ConfigurationAuthCloudBuilder}.
   */
  static authCloudBuilder() {
    return new ConfigurationAuthCloudBuilderImpl();
  }
}
exports.Configuration = Configuration;
const ConfigurationConstants = exports.ConfigurationConstants = {
  RegistrationRequestPath: '/uaf/1.1/request/registration/',
  RegistrationResponsePath: '/uaf/1.1/registration/',
  AuthenticationRequestPath: '/uaf/1.1/request/authentication/',
  AuthenticationResponsePath: '/uaf/1.1/authentication/',
  DeregistrationRequestPath: '/uaf/1.1/request/deregistration/',
  DispatchTargetResourcePath: '/token/dispatch/targets/',
  AuthenticationMaxRetries: 3,
  AuthenticationRetryIntervalInSeconds: 1,
  NetworkTimeoutInSeconds: 60,
  UserInteractionTimeoutInSeconds: 240
};
class ConfigurationImpl extends Configuration {
  constructor(baseUrl, hostname, registrationRequestPath, registrationResponsePath, authenticationRequestPath, authenticationResponsePath, deregistrationRequestPath, dispatchTargetResourcePath, authenticationMaxRetries, authenticationRetryIntervalInSeconds, networkTimeoutInSeconds, userInteractionTimeoutInSeconds, facetId) {
    super();
    this.baseUrl = baseUrl ?? `https://${hostname}/_app`;
    this.hostname = hostname;
    this.registrationRequestPath = registrationRequestPath ?? ConfigurationConstants.RegistrationRequestPath;
    this.registrationResponsePath = registrationResponsePath ?? ConfigurationConstants.RegistrationResponsePath;
    this.authenticationRequestPath = authenticationRequestPath ?? ConfigurationConstants.AuthenticationRequestPath;
    this.authenticationResponsePath = authenticationResponsePath ?? ConfigurationConstants.AuthenticationResponsePath;
    this.deregistrationRequestPath = deregistrationRequestPath ?? ConfigurationConstants.DeregistrationRequestPath;
    this.dispatchTargetResourcePath = dispatchTargetResourcePath ?? ConfigurationConstants.DispatchTargetResourcePath;
    this.authenticationMaxRetries = authenticationMaxRetries ?? ConfigurationConstants.AuthenticationMaxRetries;
    this.authenticationRetryIntervalInSeconds = authenticationRetryIntervalInSeconds ?? ConfigurationConstants.AuthenticationRetryIntervalInSeconds;
    this.networkTimeoutInSeconds = networkTimeoutInSeconds ?? ConfigurationConstants.NetworkTimeoutInSeconds;
    this.userInteractionTimeoutInSeconds = userInteractionTimeoutInSeconds ?? ConfigurationConstants.UserInteractionTimeoutInSeconds;
    this.facetId = facetId;
  }
  static authCloud(hostname, authenticationMaxRetries, authenticationRetryIntervalInSeconds, networkTimeoutInSeconds, userInteractionTimeoutInSeconds, facetId) {
    return new ConfigurationImpl(undefined, hostname, undefined, undefined, undefined, undefined, undefined, undefined, authenticationMaxRetries, authenticationRetryIntervalInSeconds, networkTimeoutInSeconds, userInteractionTimeoutInSeconds, facetId);
  }
  getBaseUrl() {
    return this.baseUrl;
  }
  getRegistrationRequestPath() {
    return this.registrationRequestPath;
  }
  getRegistrationResponsePath() {
    return this.registrationResponsePath;
  }
  getAuthenticationRequestPath() {
    return this.authenticationRequestPath;
  }
  getAuthenticationResponsePath() {
    return this.authenticationResponsePath;
  }
  getDeregistrationRequestPath() {
    return this.deregistrationRequestPath;
  }
  getDispatchTargetResourcePath() {
    return this.dispatchTargetResourcePath;
  }
  getAuthenticationMaxRetries() {
    return this.authenticationMaxRetries;
  }
  getAuthenticationRetryIntervalInSeconds() {
    return this.authenticationRetryIntervalInSeconds;
  }
  getNetworkTimeoutInSeconds() {
    return this.networkTimeoutInSeconds;
  }
  getUserInteractionTimeoutInSeconds() {
    return this.userInteractionTimeoutInSeconds;
  }
  getFacetId() {
    return this.facetId;
  }
}

/**
 * A builder for {@link Configuration}.
 */
class ConfigurationBuilder {}
exports.ConfigurationBuilder = ConfigurationBuilder;
class ConfigurationBuilderImpl extends ConfigurationBuilder {
  baseUrl(baseUrl) {
    this._baseUrl = baseUrl;
    return this;
  }
  registrationRequestPath(registrationRequestPath) {
    this._registrationRequestPath = registrationRequestPath;
    return this;
  }
  registrationResponsePath(registrationResponsePath) {
    this._registrationResponsePath = registrationResponsePath;
    return this;
  }
  authenticationRequestPath(authenticationRequestPath) {
    this._authenticationRequestPath = authenticationRequestPath;
    return this;
  }
  authenticationResponsePath(authenticationResponsePath) {
    this._authenticationResponsePath = authenticationResponsePath;
    return this;
  }
  deregistrationRequestPath(deregistrationRequestPath) {
    this._deregistrationRequestPath = deregistrationRequestPath;
    return this;
  }
  dispatchTargetResourcePath(dispatchTargetResourcePath) {
    this._dispatchTargetResourcePath = dispatchTargetResourcePath;
    return this;
  }
  authenticationMaxRetries(authenticationMaxRetries) {
    this._authenticationMaxRetries = authenticationMaxRetries;
    return this;
  }
  authenticationRetryIntervalInSeconds(authenticationRetryIntervalInSeconds) {
    this._authenticationRetryIntervalInSeconds = authenticationRetryIntervalInSeconds;
    return this;
  }
  networkTimeoutInSeconds(networkTimeoutInSeconds) {
    this._networkTimeoutInSeconds = networkTimeoutInSeconds;
    return this;
  }
  userInteractionTimeoutInSeconds(userInteractionTimeoutInSeconds) {
    this._userInteractionTimeoutInSeconds = userInteractionTimeoutInSeconds;
    return this;
  }
  facetId(facetId) {
    this._facetId = facetId;
    return this;
  }
  build() {
    return new ConfigurationImpl(this._baseUrl, undefined, this._registrationRequestPath, this._registrationResponsePath, this._authenticationRequestPath, this._authenticationResponsePath, this._deregistrationRequestPath, this._dispatchTargetResourcePath, this._authenticationMaxRetries, this._authenticationRetryIntervalInSeconds, this._networkTimeoutInSeconds, this._userInteractionTimeoutInSeconds, this._facetId);
  }
}

/**
 * A simplified builder that can be used to configure an SDK when your application works with the
 * Nevis Authentication Cloud. With this builder, you do not need to provide the relative paths of
 * the endpoints for each operation.
 */
class ConfigurationAuthCloudBuilder {}
exports.ConfigurationAuthCloudBuilder = ConfigurationAuthCloudBuilder;
class ConfigurationAuthCloudBuilderImpl {
  hostname(hostname) {
    this._hostname = hostname;
    return this;
  }
  authenticationMaxRetries(authenticationMaxRetries) {
    this._authenticationMaxRetries = authenticationMaxRetries;
    return this;
  }
  authenticationRetryIntervalInSeconds(authenticationRetryIntervalInSeconds) {
    this._authenticationRetryIntervalInSeconds = authenticationRetryIntervalInSeconds;
    return this;
  }
  networkTimeoutInSeconds(networkTimeoutInSeconds) {
    this._networkTimeoutInSeconds = networkTimeoutInSeconds;
    return this;
  }
  userInteractionTimeoutInSeconds(userInteractionTimeoutInSeconds) {
    this._userInteractionTimeoutInSeconds = userInteractionTimeoutInSeconds;
    return this;
  }
  facetId(facetId) {
    this._facetId = facetId;
    return this;
  }
  build() {
    return ConfigurationImpl.authCloud(this._hostname, this._authenticationMaxRetries, this._authenticationRetryIntervalInSeconds, this._networkTimeoutInSeconds, this._userInteractionTimeoutInSeconds, this._facetId);
  }
}
//# sourceMappingURL=Configuration.js.map