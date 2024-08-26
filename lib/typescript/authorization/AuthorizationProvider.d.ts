/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { CookieContainer } from './CookieContainer';
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
export declare abstract class AuthorizationProvider {
    /**
     * Alternate constructor that creates an {@link AuthorizationProvider} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns an {@link AuthorizationProvider} instance.
     */
    static fromJson(json: any): AuthorizationProvider;
}
/**
 * An HTTP cookie based authorization provider.
 *
 * The cookies are sent to the backend to be able to do operations requiring
 * authorization such as FIDO UAF registration or de-registration.
 */
export declare abstract class CookieAuthorizationProvider extends AuthorizationProvider {
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
    static create(cookies: Array<CookieContainer>): CookieAuthorizationProvider;
    /**
     * Alternate constructor that creates a {@link CookieAuthorizationProvider} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created {@link CookieAuthorizationProvider} instance.
     */
    static fromJson(json: any): CookieAuthorizationProvider;
}
export declare class CookieAuthorizationProviderImpl extends CookieAuthorizationProvider {
    cookies: Array<CookieContainer>;
    constructor(cookies: Array<CookieContainer>);
    static fromJson(json: any): CookieAuthorizationProviderImpl;
}
/**
 * A JWT based authorization provider.
 *
 * The JWT is sent to the backend to be able to do operations requiring
 * authorization such as FIDO UAF registration or de-registration.
 */
export declare abstract class JwtAuthorizationProvider extends AuthorizationProvider {
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
    static create(jwt: string): JwtAuthorizationProvider;
    /**
     * Alternate constructor that creates a {@link JwtAuthorizationProvider} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created {@link JwtAuthorizationProvider} instance.
     */
    static fromJson(json: any): JwtAuthorizationProvider;
}
export declare class JwtAuthorizationProviderImpl extends JwtAuthorizationProvider {
    jwt: string;
    constructor(jwt: string);
    static fromJson(json: any): JwtAuthorizationProviderImpl;
}
//# sourceMappingURL=AuthorizationProvider.d.ts.map