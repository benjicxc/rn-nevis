/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { TypedData } from './TypedData';
import { AuthorizationProvider, CookieAuthorizationProvider, JwtAuthorizationProvider } from '../../authorization/AuthorizationProvider';
import { CookieContainer } from '../../authorization/CookieContainer';
declare class AuthorizationProviderData {
    cookies?: Array<CookieContainer>;
    jwt?: string;
    constructor(cookies?: Array<CookieContainer>, jwt?: string);
}
export declare abstract class TypedAuthorizationProvider extends TypedData<AuthorizationProviderData> {
    abstract data: AuthorizationProviderData;
    static create(authorizationProvider: AuthorizationProvider): TypedAuthorizationProvider;
}
export declare class TypedCookieAuthorizationProvider extends TypedAuthorizationProvider {
    type: string;
    data: AuthorizationProviderData;
    constructor(wrapped: CookieAuthorizationProvider);
}
export declare class TypedJwtAuthorizationProvider extends TypedAuthorizationProvider {
    type: string;
    data: AuthorizationProviderData;
    constructor(wrapped: JwtAuthorizationProvider);
}
export {};
//# sourceMappingURL=TypedAuthorizationProvider.d.ts.map