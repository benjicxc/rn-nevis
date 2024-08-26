/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { CookieContainer } from './CookieContainer';

enum AuthorizationProviderType {
	CookieAuthorizationProvider,
	JwtAuthorizationProvider,
}

/**
 * Provides the authorization elements required to perform protected operations.
 *
 * For instance, when registering FIDO UAF credentials, the HTTP client must
 * authenticate to obtain some authorization tokens (HTTP cookies, JWT, etc.).
 * The client can access the protected resource (the FIDO UAF registration
 * endpoints in this case) by providing these authorization elements.
 *
 * Some operations can also can generate {@link AuthorizationProvider} that the
 * application can use to access protected resources. This is the case typically
 * of authentication: once the authentication is completed, some authorization
 * tokens might have been granted.
 *
 * @see
 *  - {@link Registration.authorizationProvider}
 *  - {@link Deregistration.authorizationProvider}
 *  - {@link Authentication.onSuccess}
 *  - {@link OutOfBandAuthentication.onSuccess}
 */
export abstract class AuthorizationProvider {
	/**
	 * Alternate constructor that creates an {@link AuthorizationProvider} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns an {@link AuthorizationProvider} instance.
	 */
	static fromJson(json: any): AuthorizationProvider {
		const subtype =
			AuthorizationProviderType[json.type as keyof typeof AuthorizationProviderType];
		switch (subtype) {
			case AuthorizationProviderType.CookieAuthorizationProvider:
				return CookieAuthorizationProvider.fromJson(json.data);
			case AuthorizationProviderType.JwtAuthorizationProvider:
				return JwtAuthorizationProvider.fromJson(json.data);
			default:
				throw new Error(`Unknown authorization provider (${json.type}).`);
		}
	}
}

/**
 * An HTTP cookie based authorization provider.
 *
 * The cookies are sent to the backend to be able to do operations requiring
 * authorization such as FIDO UAF registration or de-registration.
 */
export abstract class CookieAuthorizationProvider extends AuthorizationProvider {
	/**
	 * List of containers that hold cookies that can be used to do authorization.
	 */
	abstract cookies: Array<CookieContainer>;

	/**
	 * Default constructor for {@link CookieAuthorizationProvider}.
	 *
	 * @param cookies List of containers that hold cookies that can be used to do authorization.
	 * @returns the created {@link CookieAuthorizationProvider} instance.
	 */
	static create(cookies: Array<CookieContainer>): CookieAuthorizationProvider {
		return new CookieAuthorizationProviderImpl(cookies);
	}

	/**
	 * Alternate constructor that creates a {@link CookieAuthorizationProvider} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link CookieAuthorizationProvider} instance.
	 */
	static fromJson(json: any): CookieAuthorizationProvider {
		return CookieAuthorizationProviderImpl.fromJson(json);
	}
}

export class CookieAuthorizationProviderImpl extends CookieAuthorizationProvider {
	cookies: Array<CookieContainer>;

	constructor(cookies: Array<CookieContainer>) {
		super();
		this.cookies = cookies;
	}

	static fromJson(json: any): CookieAuthorizationProviderImpl {
		const cookies: CookieContainer[] = json.cookies.map((element: any) =>
			CookieContainer.fromJson(element)
		);
		return new CookieAuthorizationProviderImpl(cookies);
	}
}

/**
 * A JWT based authorization provider.
 *
 * The JWT is sent to the backend to be able to do operations requiring
 * authorization such as FIDO UAF registration or de-registration.
 */
export abstract class JwtAuthorizationProvider extends AuthorizationProvider {
	/**
	 * The JWT.
	 */
	abstract jwt: string;

	/**
	 * Default constructor for {@link JwtAuthorizationProvider}.
	 *
	 * @param jwt The JWT.
	 * @returns the created {@link JwtAuthorizationProvider} instance.
	 */
	static create(jwt: string): JwtAuthorizationProvider {
		return new JwtAuthorizationProviderImpl(jwt);
	}

	/**
	 * Alternate constructor that creates a {@link JwtAuthorizationProvider} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link JwtAuthorizationProvider} instance.
	 */
	static fromJson(json: any): JwtAuthorizationProvider {
		return JwtAuthorizationProviderImpl.fromJson(json);
	}
}

export class JwtAuthorizationProviderImpl extends JwtAuthorizationProvider {
	jwt: string;

	constructor(jwt: string) {
		super();
		this.jwt = jwt;
	}

	static fromJson(json: any): JwtAuthorizationProviderImpl {
		return new JwtAuthorizationProviderImpl(json.jwt);
	}
}
