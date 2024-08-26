"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypedSessionProvider = exports.TypedJwtSessionProvider = exports.TypedCookieSessionProvider = void 0;
var _TypedData = require("./TypedData");
var _SessionProvider = require("../../authorization/SessionProvider");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class SessionProviderData {
  constructor(cookies, jwt) {
    this.cookies = cookies;
    this.jwt = jwt;
  }
}
class TypedSessionProvider extends _TypedData.TypedData {
  static create(sessionProvider) {
    if (sessionProvider instanceof _SessionProvider.CookieSessionProvider) {
      return new TypedCookieSessionProvider(sessionProvider);
    } else if (sessionProvider instanceof _SessionProvider.JwtSessionProvider) {
      return new TypedJwtSessionProvider(sessionProvider);
    } else {
      throw new Error(`Unknown session provider (${sessionProvider.constructor.name}).`);
    }
  }
}
exports.TypedSessionProvider = TypedSessionProvider;
class TypedCookieSessionProvider extends TypedSessionProvider {
  type = 'CookieSessionProvider';
  constructor(wrapped) {
    super();
    this.data = new SessionProviderData(wrapped.cookies);
  }
}
exports.TypedCookieSessionProvider = TypedCookieSessionProvider;
class TypedJwtSessionProvider extends TypedSessionProvider {
  type = 'JwtSessionProvider';
  constructor(wrapped) {
    super();
    this.data = new SessionProviderData(undefined, wrapped.jwt);
  }
}
exports.TypedJwtSessionProvider = TypedJwtSessionProvider;
//# sourceMappingURL=TypedSessionProvider.js.map