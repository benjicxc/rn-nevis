/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { CancellableHandler } from '../CancellableHandler';
/**
 * The object handling the old and new PIN provided by the end-user.
 *
 * @see {@link PinChanger.changePin}
 */
export declare abstract class PinChangeHandler extends CancellableHandler {
    /**
     * Specify the old PIN and the new PIN.
     *
     * To change a PIN, the SDK requires to provide the old PIN.
     * When this method is invoked, the SDK will validate the provided PINs.
     *
     * @param oldPin the old PIN.
     * @param newPin the new PIN.
     */
    abstract pins(oldPin: string, newPin: string): Promise<void>;
}
export declare class PinChangeHandlerImpl extends PinChangeHandler {
    private readonly _operationId;
    constructor(operationId: string);
    pins(oldPin: string, newPin: string): Promise<void>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=PinChangeHandler.d.ts.map