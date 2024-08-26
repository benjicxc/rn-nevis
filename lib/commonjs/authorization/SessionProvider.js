"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionProvider = exports.JwtSessionProviderImpl = exports.JwtSessionProvider = exports.CookieSessionProviderImpl = exports.CookieSessionProvider = void 0;
var _CookieContainer = require("./CookieContainer");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var SessionProviderType = /*#__PURE__*/function (SessionProviderType) {
  SessionProviderType[SessionProviderType["CookieSessionProvider"] = 0] = "CookieSessionProvider";
  SessionProviderType[SessionProviderType["JwtSessionProvider"] = 1] = "JwtSessionProvider";
  return SessionProviderType;
}(SessionProviderType || {});
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
class SessionProvider {
  /**
   * Alternate constructor that creates a {@link SessionProvider} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link SessionProvider} instance.
   */
  static fromJson(json) {
    const subtype = SessionProviderType[json.type];
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
exports.SessionProvider = SessionProvider;
class CookieSessionProvider extends SessionProvider {
  /**
   * List of containers that hold cookies that can be used to do authorization.
   */

  /**
   * Default constructor for {@link CookieSessionProvider}.
   *
   * @param cookies List of containers that hold cookies that can be used
   * to do authorization.
   * @returns the created {@link CookieSessionProvider} instance.
   */
  static create(cookies) {
    return new CookieSessionProviderImpl(cookies);
  }

  /**
   * Alternate constructor that creates a {@link CookieSessionProvider} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link CookieSessionProvider} instance.
   */
  static fromJson(json) {
    return CookieSessionProviderImpl.fromJson(json);
  }
}
exports.CookieSessionProvider = CookieSessionProvider;
class CookieSessionProviderImpl extends CookieSessionProvider {
  constructor(cookies) {
    super();
    this.cookies = cookies;
  }
  static fromJson(json) {
    const cookies = json.cookies.map(element => _CookieContainer.CookieContainer.fromJson(element));
    return new CookieSessionProviderImpl(cookies);
  }
}

/**
 * A JWT based session provider.
 *
 * The JWT is sent to the backend to be able to track the authentication session.
 */
exports.CookieSessionProviderImpl = CookieSessionProviderImpl;
class JwtSessionProvider extends SessionProvider {
  /**
   * The JWT.
   */

  /**
   * Default constructor for {@link JwtSessionProvider}.
   *
   * @param jwt The JWT.
   * @returns the created {@link JwtSessionProvider} instance.
   */
  static create(jwt) {
    return new JwtSessionProviderImpl(jwt);
  }

  /**
   * Alternate constructor that creates a {@link JwtSessionProvider} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link JwtSessionProvider} instance.
   */
  static fromJson(json) {
    return JwtSessionProviderImpl.fromJson(json);
  }
}
exports.JwtSessionProvider = JwtSessionProvider;
class JwtSessionProviderImpl extends JwtSessionProvider {
  constructor(jwt) {
    super();
    this.jwt = jwt;
  }
  static fromJson(json) {
    return new JwtSessionProviderImpl(json.jwt);
  }
}
exports.JwtSessionProviderImpl = JwtSessionProviderImpl;
//# sourceMappingURL=SessionProvider.js.map