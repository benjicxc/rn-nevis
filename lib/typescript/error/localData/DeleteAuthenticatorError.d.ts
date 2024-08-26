/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { MobileAuthenticationClientError } from '../MobileAuthenticationClientError';
/**
 * The error which is thrown by {@link LocalData.deleteAuthenticator} in case of any error occurs.
 * For instance if the provided AAID is not known, or if an error occurred during deleting the associated
 * FIDO UAF credentials.
 */
export declare abstract class DeleteAuthenticatorError extends MobileAuthenticationClientError {
}
//# sourceMappingURL=DeleteAuthenticatorError.d.ts.map