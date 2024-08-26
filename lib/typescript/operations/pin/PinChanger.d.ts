/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { PinChangeContext } from './PinChangeContext';
import type { PinChangeHandler } from './PinChangeHandler';
import { PinPolicyProvider } from './PinPolicyProvider';
/**
 * The object in charge of PIN change.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see {@link PinChange.pinChanger}
 */
export declare abstract class PinChanger extends PinPolicyProvider {
    /**
     * The method that will be invoked till either the user provides the old PIN
     * and a new PIN that conforms to the format expected by the SDK (i.e. a
     * 6 digit PIN), or till the operation is cancelled (through the {@link PinChangeHandler.cancel}),
     * or till the PIN authenticator is permanently locked because the user provided
     * too many times an invalid PIN.
     *
     * @param context the context.
     * @param handler the object that must be invoked with the new and old PINs.
     */
    abstract changePin(context: PinChangeContext, handler: PinChangeHandler): void;
}
//# sourceMappingURL=PinChanger.d.ts.map