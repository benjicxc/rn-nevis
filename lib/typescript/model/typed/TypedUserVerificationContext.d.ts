/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { UserVerificationContext } from '../../operations/userverification/UserVerificationContext';
export declare class TypedUserVerificationContext {
    wrapped: UserVerificationContext;
    constructor(userVerificationContext: UserVerificationContext);
    static fromJson(json: any): TypedUserVerificationContext;
}
//# sourceMappingURL=TypedUserVerificationContext.d.ts.map