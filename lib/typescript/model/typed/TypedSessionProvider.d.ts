/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { TypedData } from './TypedData';
import { CookieContainer } from '../../authorization/CookieContainer';
import { CookieSessionProvider, JwtSessionProvider, SessionProvider } from '../../authorization/SessionProvider';
declare class SessionProviderData {
    cookies?: Array<CookieContainer>;
    jwt?: string;
    constructor(cookies?: Array<CookieContainer>, jwt?: string);
}
export declare abstract class TypedSessionProvider extends TypedData<SessionProviderData> {
    abstract data: SessionProviderData;
    static create(sessionProvider: SessionProvider): TypedSessionProvider;
}
export declare class TypedCookieSessionProvider extends TypedSessionProvider {
    type: string;
    data: SessionProviderData;
    constructor(wrapped: CookieSessionProvider);
}
export declare class TypedJwtSessionProvider extends TypedSessionProvider {
    type: string;
    data: SessionProviderData;
    constructor(wrapped: JwtSessionProvider);
}
export {};
//# sourceMappingURL=TypedSessionProvider.d.ts.map