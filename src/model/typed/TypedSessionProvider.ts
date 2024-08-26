/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import { CookieContainer } from '../../authorization/CookieContainer';
import {
	CookieSessionProvider,
	JwtSessionProvider,
	SessionProvider,
} from '../../authorization/SessionProvider';

class SessionProviderData {
	cookies?: Array<CookieContainer>;
	jwt?: string;

	constructor(cookies?: Array<CookieContainer>, jwt?: string) {
		this.cookies = cookies;
		this.jwt = jwt;
	}
}

export abstract class TypedSessionProvider extends TypedData<SessionProviderData> {
	abstract data: SessionProviderData;

	static create(sessionProvider: SessionProvider): TypedSessionProvider {
		if (sessionProvider instanceof CookieSessionProvider) {
			return new TypedCookieSessionProvider(sessionProvider as CookieSessionProvider);
		} else if (sessionProvider instanceof JwtSessionProvider) {
			return new TypedJwtSessionProvider(sessionProvider as JwtSessionProvider);
		} else {
			throw new Error(`Unknown session provider (${sessionProvider.constructor.name}).`);
		}
	}
}

export class TypedCookieSessionProvider extends TypedSessionProvider {
	type = 'CookieSessionProvider';
	data: SessionProviderData;

	constructor(wrapped: CookieSessionProvider) {
		super();
		this.data = new SessionProviderData(wrapped.cookies);
	}
}

export class TypedJwtSessionProvider extends TypedSessionProvider {
	type = 'JwtSessionProvider';
	data: SessionProviderData;

	constructor(wrapped: JwtSessionProvider) {
		super();
		this.data = new SessionProviderData(undefined, wrapped.jwt);
	}
}
