"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypedJwtAuthorizationProvider = exports.TypedCookieAuthorizationProvider = exports.TypedAuthorizationProvider = void 0;
var _TypedData = require("./TypedData");
var _AuthorizationProvider = require("../../authorization/AuthorizationProvider");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class AuthorizationProviderData {
  constructor(cookies, jwt) {
    this.cookies = cookies;
    this.jwt = jwt;
  }
}
class TypedAuthorizationProvider extends _TypedData.TypedData {
  static create(authorizationProvider) {
    if (authorizationProvider instanceof _AuthorizationProvider.CookieAuthorizationProvider) {
      return new TypedCookieAuthorizationProvider(authorizationProvider);
    } else if (authorizationProvider instanceof _AuthorizationProvider.JwtAuthorizationProvider) {
      return new TypedJwtAuthorizationProvider(authorizationProvider);
    } else {
      throw new Error(`Unknown authorization provider (${authorizationProvider.constructor.name}).`);
    }
  }
}
exports.TypedAuthorizationProvider = TypedAuthorizationProvider;
class TypedCookieAuthorizationProvider extends TypedAuthorizationProvider {
  type = 'CookieAuthorizationProvider';
  constructor(wrapped) {
    super();
    this.data = new AuthorizationProviderData(wrapped.cookies);
  }
}
exports.TypedCookieAuthorizationProvider = TypedCookieAuthorizationProvider;
class TypedJwtAuthorizationProvider extends TypedAuthorizationProvider {
  type = 'JwtAuthorizationProvider';
  constructor(wrapped) {
    super();
    this.data = new AuthorizationProviderData(undefined, wrapped.jwt);
  }
}
exports.TypedJwtAuthorizationProvider = TypedJwtAuthorizationProvider;
//# sourceMappingURL=TypedAuthorizationProvider.js.map