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
export abstract class Configuration {
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
	static builder(): ConfigurationBuilder {
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
	static authCloudBuilder(): ConfigurationAuthCloudBuilder {
		return new ConfigurationAuthCloudBuilderImpl();
	}
}

export const ConfigurationConstants = {
	RegistrationRequestPath: '/uaf/1.1/request/registration/',
	RegistrationResponsePath: '/uaf/1.1/registration/',
	AuthenticationRequestPath: '/uaf/1.1/request/authentication/',
	AuthenticationResponsePath: '/uaf/1.1/authentication/',
	DeregistrationRequestPath: '/uaf/1.1/request/deregistration/',
	DispatchTargetResourcePath: '/token/dispatch/targets/',
	AuthenticationMaxRetries: 3,
	AuthenticationRetryIntervalInSeconds: 1,
	NetworkTimeoutInSeconds: 60,
	UserInteractionTimeoutInSeconds: 240,
};

class ConfigurationImpl extends Configuration {
	baseUrl: string;
	hostname?: string;
	registrationRequestPath: string;
	registrationResponsePath: string;
	authenticationRequestPath: string;
	authenticationResponsePath: string;
	deregistrationRequestPath: string;
	dispatchTargetResourcePath: string;
	authenticationMaxRetries: number;
	authenticationRetryIntervalInSeconds: number;
	networkTimeoutInSeconds: number;
	userInteractionTimeoutInSeconds: number;
	facetId?: string;

	constructor(
		baseUrl?: string,
		hostname?: string,
		registrationRequestPath?: string,
		registrationResponsePath?: string,
		authenticationRequestPath?: string,
		authenticationResponsePath?: string,
		deregistrationRequestPath?: string,
		dispatchTargetResourcePath?: string,
		authenticationMaxRetries?: number,
		authenticationRetryIntervalInSeconds?: number,
		networkTimeoutInSeconds?: number,
		userInteractionTimeoutInSeconds?: number,
		facetId?: string
	) {
		super();
		this.baseUrl = baseUrl ?? `https://${hostname}/_app`;
		this.hostname = hostname;
		this.registrationRequestPath =
			registrationRequestPath ?? ConfigurationConstants.RegistrationRequestPath;
		this.registrationResponsePath =
			registrationResponsePath ?? ConfigurationConstants.RegistrationResponsePath;
		this.authenticationRequestPath =
			authenticationRequestPath ?? ConfigurationConstants.AuthenticationRequestPath;
		this.authenticationResponsePath =
			authenticationResponsePath ?? ConfigurationConstants.AuthenticationResponsePath;
		this.deregistrationRequestPath =
			deregistrationRequestPath ?? ConfigurationConstants.DeregistrationRequestPath;
		this.dispatchTargetResourcePath =
			dispatchTargetResourcePath ?? ConfigurationConstants.DispatchTargetResourcePath;
		this.authenticationMaxRetries =
			authenticationMaxRetries ?? ConfigurationConstants.AuthenticationMaxRetries;
		this.authenticationRetryIntervalInSeconds =
			authenticationRetryIntervalInSeconds ??
			ConfigurationConstants.AuthenticationRetryIntervalInSeconds;
		this.networkTimeoutInSeconds =
			networkTimeoutInSeconds ?? ConfigurationConstants.NetworkTimeoutInSeconds;
		this.userInteractionTimeoutInSeconds =
			userInteractionTimeoutInSeconds ??
			ConfigurationConstants.UserInteractionTimeoutInSeconds;
		this.facetId = facetId;
	}

	static authCloud(
		hostname?: string,
		authenticationMaxRetries?: number,
		authenticationRetryIntervalInSeconds?: number,
		networkTimeoutInSeconds?: number,
		userInteractionTimeoutInSeconds?: number,
		facetId?: string
	): ConfigurationImpl {
		return new ConfigurationImpl(
			undefined,
			hostname,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			authenticationMaxRetries,
			authenticationRetryIntervalInSeconds,
			networkTimeoutInSeconds,
			userInteractionTimeoutInSeconds,
			facetId
		);
	}

	getBaseUrl(): string {
		return this.baseUrl;
	}

	getRegistrationRequestPath(): string {
		return this.registrationRequestPath;
	}

	getRegistrationResponsePath(): string {
		return this.registrationResponsePath;
	}

	getAuthenticationRequestPath(): string {
		return this.authenticationRequestPath;
	}

	getAuthenticationResponsePath(): string {
		return this.authenticationResponsePath;
	}

	getDeregistrationRequestPath(): string {
		return this.deregistrationRequestPath;
	}

	getDispatchTargetResourcePath(): string {
		return this.dispatchTargetResourcePath;
	}

	getAuthenticationMaxRetries(): number {
		return this.authenticationMaxRetries;
	}

	getAuthenticationRetryIntervalInSeconds(): number {
		return this.authenticationRetryIntervalInSeconds;
	}

	getNetworkTimeoutInSeconds(): number {
		return this.networkTimeoutInSeconds;
	}

	getUserInteractionTimeoutInSeconds(): number {
		return this.userInteractionTimeoutInSeconds;
	}

	getFacetId(): string | undefined {
		return this.facetId;
	}
}

/**
 * A builder for {@link Configuration}.
 */
export abstract class ConfigurationBuilder {
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
	abstract authenticationRetryIntervalInSeconds(
		authenticationRetryIntervalInSeconds: number
	): ConfigurationBuilder;

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
	abstract userInteractionTimeoutInSeconds(
		userInteractionTimeoutInSeconds: number
	): ConfigurationBuilder;

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

class ConfigurationBuilderImpl extends ConfigurationBuilder {
	_baseUrl?: string;
	_registrationRequestPath?: string;
	_registrationResponsePath?: string;
	_authenticationRequestPath?: string;
	_authenticationResponsePath?: string;
	_deregistrationRequestPath?: string;
	_dispatchTargetResourcePath?: string;
	_authenticationMaxRetries?: number;
	_authenticationRetryIntervalInSeconds?: number;
	_networkTimeoutInSeconds?: number;
	_userInteractionTimeoutInSeconds?: number;
	_facetId?: string;

	baseUrl(baseUrl: string): ConfigurationBuilder {
		this._baseUrl = baseUrl;
		return this;
	}

	registrationRequestPath(registrationRequestPath: string): ConfigurationBuilder {
		this._registrationRequestPath = registrationRequestPath;
		return this;
	}

	registrationResponsePath(registrationResponsePath: string): ConfigurationBuilder {
		this._registrationResponsePath = registrationResponsePath;
		return this;
	}

	authenticationRequestPath(authenticationRequestPath: string): ConfigurationBuilder {
		this._authenticationRequestPath = authenticationRequestPath;
		return this;
	}

	authenticationResponsePath(authenticationResponsePath: string): ConfigurationBuilder {
		this._authenticationResponsePath = authenticationResponsePath;
		return this;
	}

	deregistrationRequestPath(deregistrationRequestPath: string): ConfigurationBuilder {
		this._deregistrationRequestPath = deregistrationRequestPath;
		return this;
	}

	dispatchTargetResourcePath(dispatchTargetResourcePath: string): ConfigurationBuilder {
		this._dispatchTargetResourcePath = dispatchTargetResourcePath;
		return this;
	}

	authenticationMaxRetries(authenticationMaxRetries: number): ConfigurationBuilder {
		this._authenticationMaxRetries = authenticationMaxRetries;
		return this;
	}

	authenticationRetryIntervalInSeconds(
		authenticationRetryIntervalInSeconds: number
	): ConfigurationBuilder {
		this._authenticationRetryIntervalInSeconds = authenticationRetryIntervalInSeconds;
		return this;
	}

	networkTimeoutInSeconds(networkTimeoutInSeconds: number): ConfigurationBuilder {
		this._networkTimeoutInSeconds = networkTimeoutInSeconds;
		return this;
	}

	userInteractionTimeoutInSeconds(userInteractionTimeoutInSeconds: number): ConfigurationBuilder {
		this._userInteractionTimeoutInSeconds = userInteractionTimeoutInSeconds;
		return this;
	}

	facetId(facetId: string): ConfigurationBuilder {
		this._facetId = facetId;
		return this;
	}

	build(): Configuration {
		return new ConfigurationImpl(
			this._baseUrl,
			undefined,
			this._registrationRequestPath,
			this._registrationResponsePath,
			this._authenticationRequestPath,
			this._authenticationResponsePath,
			this._deregistrationRequestPath,
			this._dispatchTargetResourcePath,
			this._authenticationMaxRetries,
			this._authenticationRetryIntervalInSeconds,
			this._networkTimeoutInSeconds,
			this._userInteractionTimeoutInSeconds,
			this._facetId
		);
	}
}

/**
 * A simplified builder that can be used to configure an SDK when your application works with the
 * Nevis Authentication Cloud. With this builder, you do not need to provide the relative paths of
 * the endpoints for each operation.
 */
export abstract class ConfigurationAuthCloudBuilder {
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
	abstract authenticationMaxRetries(
		authenticationMaxRetries: number
	): ConfigurationAuthCloudBuilder;

	/**
	 * Sets the time interval for authentication in seconds.
	 *
	 * If not provided, 1 second will be used.
	 *
	 * @param authenticationRetryIntervalInSeconds the time interval for authentication.
	 * @returns a builder.
	 */
	abstract authenticationRetryIntervalInSeconds(
		authenticationRetryIntervalInSeconds: number
	): ConfigurationAuthCloudBuilder;

	/**
	 * Sets the time interval for network timeouts in seconds.
	 *
	 * If not provided, 60 seconds will be used.
	 *
	 * @param networkTimeoutInSeconds the network timeout.
	 * @returns a builder.
	 */
	abstract networkTimeoutInSeconds(
		networkTimeoutInSeconds: number
	): ConfigurationAuthCloudBuilder;

	/**
	 * Sets the maximum time that the SDK will wait during user interaction to receive the user input.
	 *
	 * If not provided, 4 minutes (240 seconds) will be used.
	 *
	 * @param userInteractionTimeoutInSeconds the user interaction timeout in seconds.
	 * @returns a builder.
	 */
	abstract userInteractionTimeoutInSeconds(
		userInteractionTimeoutInSeconds: number
	): ConfigurationAuthCloudBuilder;

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

class ConfigurationAuthCloudBuilderImpl implements ConfigurationAuthCloudBuilder {
	_hostname?: string;
	_authenticationMaxRetries?: number;
	_authenticationRetryIntervalInSeconds?: number;
	_networkTimeoutInSeconds?: number;
	_userInteractionTimeoutInSeconds?: number;
	_facetId?: string;

	hostname(hostname: string): ConfigurationAuthCloudBuilder {
		this._hostname = hostname;
		return this;
	}

	authenticationMaxRetries(authenticationMaxRetries: number): ConfigurationAuthCloudBuilder {
		this._authenticationMaxRetries = authenticationMaxRetries;
		return this;
	}

	authenticationRetryIntervalInSeconds(
		authenticationRetryIntervalInSeconds: number
	): ConfigurationAuthCloudBuilder {
		this._authenticationRetryIntervalInSeconds = authenticationRetryIntervalInSeconds;
		return this;
	}

	networkTimeoutInSeconds(networkTimeoutInSeconds: number): ConfigurationAuthCloudBuilder {
		this._networkTimeoutInSeconds = networkTimeoutInSeconds;
		return this;
	}

	userInteractionTimeoutInSeconds(
		userInteractionTimeoutInSeconds: number
	): ConfigurationAuthCloudBuilder {
		this._userInteractionTimeoutInSeconds = userInteractionTimeoutInSeconds;
		return this;
	}

	facetId(facetId: string): ConfigurationAuthCloudBuilder {
		this._facetId = facetId;
		return this;
	}

	build(): Configuration {
		return ConfigurationImpl.authCloud(
			this._hostname,
			this._authenticationMaxRetries,
			this._authenticationRetryIntervalInSeconds,
			this._networkTimeoutInSeconds,
			this._userInteractionTimeoutInSeconds,
			this._facetId
		);
	}
}
