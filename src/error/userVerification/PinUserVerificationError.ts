/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { RecoverableError } from '../RecoverableError';

/**
 * The recoverable error that can occur when verifying the user with a PIN.
 *
 * When this error occurs, the {@link PinUserVerifier.verifyPin} method will be invoked again.
 * This error will be returned by the {@link PinUserVerificationContext.lastRecoverableError}.
 *
 * Currently, this is always a {@link PinUserVerificationInvalidPin}.
 */
export abstract class PinUserVerificationError extends RecoverableError {}
