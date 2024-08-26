/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { CookieContainer } from './CookieContainer';

enum SessionProviderType {
	CookieSessionProvider,
	JwtSessionProvider,
}

/**
 * Provides the elements required to run an operation in a session.
 *
 * For example assume that FIDO UAF is used as second factor with nevisAuth. In this case the user must first provide a
 * password and then authenticate using FIDO UAF. When the user provides the password, nevisProxy will generate a
 * cookie that is used to track the authentication session. The HTTP client authenticating must provide this cookie on
 * all the HTTP requests that are sent while authenticating. Thus, the cookie (associated with the authentication
 * session) must also be provided during the FIDO UAF authentication, the HTTP client must authenticate to obtain some
 * authorization tokens (HTTP cookies, JWT, etc.). The client can access the protected resource (the FIDO UAF
 * registration endpoints in this case) by providing these authorization elements.
 *
 * @see
 *  - {@link Authentication.onSuccess}
 *  - {@link AuthenticationError.sessionProvider}
 */
export abstract class SessionProvider {
	/**
	 * Alternate constructor that creates a {@link SessionProvider} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns a {@link SessionProvider} instance.
	 */
	static fromJson(json: any): SessionProvider {
		const subtype = SessionProviderType[json.type as keyof typeof SessionProviderType];
		switch (subtype) {
			case SessionProviderType.CookieSessionProvider:
				return CookieSessionProvider.fromJson(json.data);
			case SessionProviderType.JwtSessionProvider:
				return JwtSessionProvider.fromJson(json.data);
			default:
				throw new Error(`Unknown session provider (${json.type}).`);
		}
	}
}

/**
 * An  HTTP cookie based session provider.
 *
 * The cookies are sent to the backend to be able to track the authentication
 * session.
 */
export abstract class CookieSessionProvider extends SessionProvider {
	/**
	 * List of containers that hold cookies that can be used to do authorization.
	 */
	abstract cookies: Array<CookieContainer>;

	/**
	 * Default constructor for {@link CookieSessionProvider}.
	 *
	 * @param cookies List of containers that hold cookies that can be used
	 * to do authorization.
	 * @returns the created {@link CookieSessionProvider} instance.
	 */
	static create(cookies: Array<CookieContainer>): CookieSessionProvider {
		return new CookieSessionProviderImpl(cookies);
	}

	/**
	 * Alternate constructor that creates a {@link CookieSessionProvider} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link CookieSessionProvider} instance.
	 */
	static fromJson(json: any): CookieSessionProvider {
		return CookieSessionProviderImpl.fromJson(json);
	}
}

export class CookieSessionProviderImpl extends CookieSessionProvider {
	cookies: Array<CookieContainer>;

	constructor(cookies: Array<CookieContainer>) {
		super();
		this.cookies = cookies;
	}

	static fromJson(json: any): CookieSessionProviderImpl {
		const cookies: CookieContainer[] = json.cookies.map((element: any) =>
			CookieContainer.fromJson(element)
		);

		return new CookieSessionProviderImpl(cookies);
	}
}

/**
 * A JWT based session provider.
 *
 * The JWT is sent to the backend to be able to track the authentication session.
 */
export abstract class JwtSessionProvider extends SessionProvider {
	/**
	 * The JWT.
	 */
	abstract jwt: string;

	/**
	 * Default constructor for {@link JwtSessionProvider}.
	 *
	 * @param jwt The JWT.
	 * @returns the created {@link JwtSessionProvider} instance.
	 */
	static create(jwt: string): JwtSessionProvider {
		return new JwtSessionProviderImpl(jwt);
	}

	/**
	 * Alternate constructor that creates a {@link JwtSessionProvider} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link JwtSessionProvider} instance.
	 */
	static fromJson(json: any): JwtSessionProvider {
		return JwtSessionProviderImpl.fromJson(json);
	}
}

export class JwtSessionProviderImpl extends JwtSessionProvider {
	jwt: string;

	constructor(jwt: string) {
		super();
		this.jwt = jwt;
	}

	static fromJson(json: any): JwtSessionProviderImpl {
		return new JwtSessionProviderImpl(json.jwt);
	}
}
