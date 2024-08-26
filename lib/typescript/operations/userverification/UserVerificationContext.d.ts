/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { Authenticator } from '../../localData/Authenticator';
/**
 * The object describing the user verification (i.e. the user credential validation) operation to be
 * done.
 *
 * This object contains the information required to ask the user to authenticate: the authenticator
 * to be used, whether there were previous errors authenticating, etc.
 */
export declare abstract class UserVerificationContext {
    /**
     * The authenticator to be used to do the user verification.
     */
    abstract authenticator: Authenticator;
}
//# sourceMappingURL=UserVerificationContext.d.ts.map