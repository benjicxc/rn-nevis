/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { RecoverableError } from '../../RecoverableError';
/**
 * The recoverable error that can occur when changing a PIN. When this error
 * occurs, the {@link PinChanger.changePin} method will be invoked again.
 * This error will be returned by the {@link PinChangeContext.lastRecoverableError}.
 */
export declare abstract class PinChangeRecoverableError extends RecoverableError {
}
//# sourceMappingURL=PinChangeRecoverableError.d.ts.map