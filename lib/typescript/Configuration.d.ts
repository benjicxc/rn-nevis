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
export declare abstract class Configuration {
    /**
     * The default base URL for the HTTP endpoints the SDK must interact with.
     *
     * @returns the base URL.
     */
    abstract getBaseUrl(): string;
    /**
     * The registration request URL path used to send the FIDO UAF registration GetUafRequest.
     *
     * The registration request URL is the result of combining the `baseUrl` and this path.
     *
     * @returns the registration request path.
     */
    abstract getRegistrationRequestPath(): string;
    /**
     * The registration response URL path used to send the final FIDO UAF registration response.
     *
     * The registration response URL is the result of combining the `baseUrl` and this path.
     *
     * @returns registration response path.
     */
    abstract getRegistrationResponsePath(): string;
    /**
     * The authentication request URL path used to send the FIDO UAF authentication GetUafRequest.
     *
     * The authentication request URL is the result of combining the `baseUrl` and this path.
     *
     * @returns the authentication request path.
     */
    abstract getAuthenticationRequestPath(): string;
    /***
     * The authentication response URL path used to send the final FIDO UAF authentication response.
     *
     * The authentication response URL is the result of combining the `baseUrl` and this path.
     *
     * @returns the authentication response path.
     */
    abstract getAuthenticationResponsePath(): string;
    /**
     * Returns the URL path used to obtain the FIDO UAF deregistration request.
     *
     * The deregistration request URL is the result of combining the `baseUrl` and this path.
     *
     * @returns the deregistration request path.
     */
    abstract getDeregistrationRequestPath(): string;
    /**
     * The dispatch target resource URL path.
     *
     * The dispatch target resource URL is the result of combining the `baseUrl` and this path.
     *
     * @returns the dispatch target resource path.
     */
    abstract getDispatchTargetResourcePath(): string;
    /**
     * The maximum number of retries for authentication. The authentication retries will fail
     * after this count is exceeded.
     *
     * @deprecated use {@link Authentication.retryPolicyObtainingAuthorizationProvider} instead.
     * The value returned by this method will be ignored.
     *
     * @returns the maximum number of retries.
     */
    abstract getAuthenticationMaxRetries(): number;
    /**
     * Time interval for authentication in seconds. The authentication retries will fail after
     * this time is exceeded.
     *
     * @deprecated use {@link Authentication.retryPolicyObtainingAuthorizationProvider} instead.
     * The value returned by this method will be ignored.
     *
     * @returns the time interval for authentication.
     */
    abstract getAuthenticationRetryIntervalInSeconds(): number;
    /**
     * Time interval for network calls in seconds. Any network request that takes longer than this
     * value, will result in a timeout.
     *
     * @returns the time interval for network requests.
     */
    abstract getNetworkTimeoutInSeconds(): number;
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
    abstract getUserInteractionTimeoutInSeconds(): number;
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
    abstract getFacetId(): string | undefined;
    /**
     * Returns a new {@link ConfigurationBuilder}.
     *
     * @returns a new {@link ConfigurationBuilder}.
     */
    static builder(): ConfigurationBuilder;
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
    static authCloudBuilder(): ConfigurationAuthCloudBuilder;
}
export declare const ConfigurationConstants: {
    RegistrationRequestPath: string;
    RegistrationResponsePath: string;
    AuthenticationRequestPath: string;
    AuthenticationResponsePath: string;
    DeregistrationRequestPath: string;
    DispatchTargetResourcePath: string;
    AuthenticationMaxRetries: number;
    AuthenticationRetryIntervalInSeconds: number;
    NetworkTimeoutInSeconds: number;
    UserInteractionTimeoutInSeconds: number;
};
/**
 * A builder for {@link Configuration}.
 */
export declare abstract class ConfigurationBuilder {
    /**
     * Sets the base URL.
     *
     * **IMPORTANT** \
     * Providing the base URL is required.
     *
     * @param baseUrl the base URL.
     * @returns a builder.
     */
    abstract baseUrl(baseUrl: string): ConfigurationBuilder;
    /**
     * Sets the registration request URL path.
     *
     * If not provided, `/uaf/1.1/request/registration/` will be used.
     *
     * @param registrationRequestPath the registration request path URL.
     * @returns a builder.
     */
    abstract registrationRequestPath(registrationRequestPath: string): ConfigurationBuilder;
    /**
     * Sets the registration response path URL.
     *
     * If not provided, `/uaf/1.1/registration/` will be used.
     *
     * @param registrationResponsePath the registration response path URL.
     * @returns a builder.
     */
    abstract registrationResponsePath(registrationResponsePath: string): ConfigurationBuilder;
    /**
     * Sets the authentication request path URL.
     *
     * If not provided, `/uaf/1.1/request/authentication/` will be used.
     *
     * @param authenticationRequestPath the authentication request path URL.
     * @returns a builder.
     */
    abstract authenticationRequestPath(authenticationRequestPath: string): ConfigurationBuilder;
    /**
     * Sets the authentication response path URL.
     *
     * If not provided, `/uaf/1.1/authentication/` will be used.
     *
     * @param authenticationResponsePath the authentication response path URL.
     * @returns a builder.
     */
    abstract authenticationResponsePath(authenticationResponsePath: string): ConfigurationBuilder;
    /**
     * Sets the deregistration path URL.
     *
     * If not provided, `/uaf/1.1/request/deregistration/` will be used.
     *
     * @param deregistrationRequestPath the deregistration path URL.
     * @returns a builder.
     */
    abstract deregistrationRequestPath(deregistrationRequestPath: string): ConfigurationBuilder;
    /**
     * Sets the dispatch target resource path URL.
     *
     * If not provided, `/token/dispatch/targets/` will be used.
     *
     * @param dispatchTargetResourcePath the dispatch target resource path URL.
     * @returns a builder.
     */
    abstract dispatchTargetResourcePath(dispatchTargetResourcePath: string): ConfigurationBuilder;
    /**
     * Sets the maximum number of retries for authentication.
     *
     * If not provided, 3 will be used.
     *
     * @param authenticationMaxRetries the maximum number of retries for authentication.
     * @returns a builder.
     */
    abstract authenticationMaxRetries(authenticationMaxRetries: number): ConfigurationBuilder;
    /**
     * Sets the time interval for authentication in seconds.
     *
     * If not provided, 1 second will be used.
     *
     * @param authenticationRetryIntervalInSeconds the time interval for authentication.
     * @returns a builder.
     */
    abstract authenticationRetryIntervalInSeconds(authenticationRetryIntervalInSeconds: number): ConfigurationBuilder;
    /**
     * Sets the time interval for network timeouts in seconds.
     *
     * If not provided, 60 seconds will be used.
     *
     * @param networkTimeoutInSeconds the network timeout.
     * @returns a builder.
     */
    abstract networkTimeoutInSeconds(networkTimeoutInSeconds: number): ConfigurationBuilder;
    /**
     * Sets the maximum time that the SDK will wait during user interaction to receive the
     * user input.
     *
     * If not provided, 4 minutes (240 seconds) will be used.
     *
     * @param userInteractionTimeoutInSeconds the user interaction timeout in seconds.
     * @returns a builder.
     */
    abstract userInteractionTimeoutInSeconds(userInteractionTimeoutInSeconds: number): ConfigurationBuilder;
    /**
     * Sets the facet ID.
     *
     * **IMPORTANT** \
     * This property is Android specific and will be ignored by iOS native plugin.
     *
     * @param facetId the facet ID.
     * @returns a builder.
     */
    abstract facetId(facetId: string): ConfigurationBuilder;
    /**
     * Creates a {@link Configuration}.
     *
     * @returns a {@link Configuration}.
     */
    abstract build(): Configuration;
}
/**
 * A simplified builder that can be used to configure an SDK when your application works with the
 * Nevis Authentication Cloud. With this builder, you do not need to provide the relative paths of
 * the endpoints for each operation.
 */
export declare abstract class ConfigurationAuthCloudBuilder {
    /**
     * Sets the hostname of your Nevis Authentication Cloud.
     *
     * @param hostname the of your Nevis Authentication Cloud.
     * @returns a builder.
     */
    abstract hostname(hostname: string): ConfigurationAuthCloudBuilder;
    /**
     * Sets the maximum number of retries for authentication.
     *
     * If not provided, 3 will be used.
     *
     * @param authenticationMaxRetries the maximum number of retries for authentication.
     * @returns a builder.
     */
    abstract authenticationMaxRetries(authenticationMaxRetries: number): ConfigurationAuthCloudBuilder;
    /**
     * Sets the time interval for authentication in seconds.
     *
     * If not provided, 1 second will be used.
     *
     * @param authenticationRetryIntervalInSeconds the time interval for authentication.
     * @returns a builder.
     */
    abstract authenticationRetryIntervalInSeconds(authenticationRetryIntervalInSeconds: number): ConfigurationAuthCloudBuilder;
    /**
     * Sets the time interval for network timeouts in seconds.
     *
     * If not provided, 60 seconds will be used.
     *
     * @param networkTimeoutInSeconds the network timeout.
     * @returns a builder.
     */
    abstract networkTimeoutInSeconds(networkTimeoutInSeconds: number): ConfigurationAuthCloudBuilder;
    /**
     * Sets the maximum time that the SDK will wait during user interaction to receive the user input.
     *
     * If not provided, 4 minutes (240 seconds) will be used.
     *
     * @param userInteractionTimeoutInSeconds the user interaction timeout in seconds.
     * @returns a builder.
     */
    abstract userInteractionTimeoutInSeconds(userInteractionTimeoutInSeconds: number): ConfigurationAuthCloudBuilder;
    /**
     * Sets the facet ID.
     *
     * **IMPORTANT** \
     * This property is Android specific and will be ignored by iOS native plugin.
     *
     * @param facetId the facet ID.
     * @returns a builder.
     */
    abstract facetId(facetId: string): ConfigurationAuthCloudBuilder;
    /**
     * Creates a {@link Configuration}.
     *
     * @returns a {@link Configuration}.
     */
    abstract build(): Configuration;
}
//# sourceMappingURL=Configuration.d.ts.map