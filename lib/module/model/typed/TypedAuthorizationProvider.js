/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import { CookieAuthorizationProvider, JwtAuthorizationProvider } from '../../authorization/AuthorizationProvider';
class AuthorizationProviderData {
  constructor(cookies, jwt) {
    this.cookies = cookies;
    this.jwt = jwt;
  }
}
export class TypedAuthorizationProvider extends TypedData {
  static create(authorizationProvider) {
    if (authorizationProvider instanceof CookieAuthorizationProvider) {
      return new TypedCookieAuthorizationProvider(authorizationProvider);
    } else if (authorizationProvider instanceof JwtAuthorizationProvider) {
      return new TypedJwtAuthorizationProvider(authorizationProvider);
    } else {
      throw new Error(`Unknown authorization provider (${authorizationProvider.constructor.name}).`);
    }
  }
}
export class TypedCookieAuthorizationProvider extends TypedAuthorizationProvider {
  type = 'CookieAuthorizationProvider';
  constructor(wrapped) {
    super();
    this.data = new AuthorizationProviderData(wrapped.cookies);
  }
}
export class TypedJwtAuthorizationProvider extends TypedAuthorizationProvider {
  type = 'JwtAuthorizationProvider';
  constructor(wrapped) {
    super();
    this.data = new AuthorizationProviderData(undefined, wrapped.jwt);
  }
}
//# sourceMappingURL=TypedAuthorizationProvider.js.map