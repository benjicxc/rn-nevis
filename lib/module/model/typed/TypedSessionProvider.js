/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import { CookieSessionProvider, JwtSessionProvider } from '../../authorization/SessionProvider';
class SessionProviderData {
  constructor(cookies, jwt) {
    this.cookies = cookies;
    this.jwt = jwt;
  }
}
export class TypedSessionProvider extends TypedData {
  static create(sessionProvider) {
    if (sessionProvider instanceof CookieSessionProvider) {
      return new TypedCookieSessionProvider(sessionProvider);
    } else if (sessionProvider instanceof JwtSessionProvider) {
      return new TypedJwtSessionProvider(sessionProvider);
    } else {
      throw new Error(`Unknown session provider (${sessionProvider.constructor.name}).`);
    }
  }
}
export class TypedCookieSessionProvider extends TypedSessionProvider {
  type = 'CookieSessionProvider';
  constructor(wrapped) {
    super();
    this.data = new SessionProviderData(wrapped.cookies);
  }
}
export class TypedJwtSessionProvider extends TypedSessionProvider {
  type = 'JwtSessionProvider';
  constructor(wrapped) {
    super();
    this.data = new SessionProviderData(undefined, wrapped.jwt);
  }
}
//# sourceMappingURL=TypedSessionProvider.js.map