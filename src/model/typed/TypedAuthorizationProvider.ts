/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import {
	AuthorizationProvider,
	CookieAuthorizationProvider,
	JwtAuthorizationProvider,
} from '../../authorization/AuthorizationProvider';
import { CookieContainer } from '../../authorization/CookieContainer';

class AuthorizationProviderData {
	cookies?: Array<CookieContainer>;
	jwt?: string;

	constructor(cookies?: Array<CookieContainer>, jwt?: string) {
		this.cookies = cookies;
		this.jwt = jwt;
	}
}

export abstract class TypedAuthorizationProvider extends TypedData<AuthorizationProviderData> {
	abstract data: AuthorizationProviderData;

	static create(authorizationProvider: AuthorizationProvider): TypedAuthorizationProvider {
		if (authorizationProvider instanceof CookieAuthorizationProvider) {
			return new TypedCookieAuthorizationProvider(
				authorizationProvider as CookieAuthorizationProvider
			);
		} else if (authorizationProvider instanceof JwtAuthorizationProvider) {
			return new TypedJwtAuthorizationProvider(
				authorizationProvider as JwtAuthorizationProvider
			);
		} else {
			throw new Error(
				`Unknown authorization provider (${authorizationProvider.constructor.name}).`
			);
		}
	}
}

export class TypedCookieAuthorizationProvider extends TypedAuthorizationProvider {
	type = 'CookieAuthorizationProvider';
	data: AuthorizationProviderData;

	constructor(wrapped: CookieAuthorizationProvider) {
		super();
		this.data = new AuthorizationProviderData(wrapped.cookies);
	}
}

export class TypedJwtAuthorizationProvider extends TypedAuthorizationProvider {
	type = 'JwtAuthorizationProvider';
	data: AuthorizationProviderData;

	constructor(wrapped: JwtAuthorizationProvider) {
		super();
		this.data = new AuthorizationProviderData(undefined, wrapped.jwt);
	}
}
