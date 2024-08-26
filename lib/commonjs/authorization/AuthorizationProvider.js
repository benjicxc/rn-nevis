"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtAuthorizationProviderImpl = exports.JwtAuthorizationProvider = exports.CookieAuthorizationProviderImpl = exports.CookieAuthorizationProvider = exports.AuthorizationProvider = void 0;
var _CookieContainer = require("./CookieContainer");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var AuthorizationProviderType = /*#__PURE__*/function (AuthorizationProviderType) {
  AuthorizationProviderType[AuthorizationProviderType["CookieAuthorizationProvider"] = 0] = "CookieAuthorizationProvider";
  AuthorizationProviderType[AuthorizationProviderType["JwtAuthorizationProvider"] = 1] = "JwtAuthorizationProvider";
  return AuthorizationProviderType;
}(AuthorizationProviderType || {});
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
class AuthorizationProvider {
  /**
   * Alternate constructor that creates an {@link AuthorizationProvider} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns an {@link AuthorizationProvider} instance.
   */
  static fromJson(json) {
    const subtype = AuthorizationProviderType[json.type];
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
exports.AuthorizationProvider = AuthorizationProvider;
class CookieAuthorizationProvider extends AuthorizationProvider {
  /**
   * List of containers that hold cookies that can be used to do authorization.
   */

  /**
   * Default constructor for {@link CookieAuthorizationProvider}.
   *
   * @param cookies List of containers that hold cookies that can be used to do authorization.
   * @returns the created {@link CookieAuthorizationProvider} instance.
   */
  static create(cookies) {
    return new CookieAuthorizationProviderImpl(cookies);
  }

  /**
   * Alternate constructor that creates a {@link CookieAuthorizationProvider} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link CookieAuthorizationProvider} instance.
   */
  static fromJson(json) {
    return CookieAuthorizationProviderImpl.fromJson(json);
  }
}
exports.CookieAuthorizationProvider = CookieAuthorizationProvider;
class CookieAuthorizationProviderImpl extends CookieAuthorizationProvider {
  constructor(cookies) {
    super();
    this.cookies = cookies;
  }
  static fromJson(json) {
    const cookies = json.cookies.map(element => _CookieContainer.CookieContainer.fromJson(element));
    return new CookieAuthorizationProviderImpl(cookies);
  }
}

/**
 * A JWT based authorization provider.
 *
 * The JWT is sent to the backend to be able to do operations requiring
 * authorization such as FIDO UAF registration or de-registration.
 */
exports.CookieAuthorizationProviderImpl = CookieAuthorizationProviderImpl;
class JwtAuthorizationProvider extends AuthorizationProvider {
  /**
   * The JWT.
   */

  /**
   * Default constructor for {@link JwtAuthorizationProvider}.
   *
   * @param jwt The JWT.
   * @returns the created {@link JwtAuthorizationProvider} instance.
   */
  static create(jwt) {
    return new JwtAuthorizationProviderImpl(jwt);
  }

  /**
   * Alternate constructor that creates a {@link JwtAuthorizationProvider} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link JwtAuthorizationProvider} instance.
   */
  static fromJson(json) {
    return JwtAuthorizationProviderImpl.fromJson(json);
  }
}
exports.JwtAuthorizationProvider = JwtAuthorizationProvider;
class JwtAuthorizationProviderImpl extends JwtAuthorizationProvider {
  constructor(jwt) {
    super();
    this.jwt = jwt;
  }
  static fromJson(json) {
    return new JwtAuthorizationProviderImpl(json.jwt);
  }
}
exports.JwtAuthorizationProviderImpl = JwtAuthorizationProviderImpl;
//# sourceMappingURL=AuthorizationProvider.js.map