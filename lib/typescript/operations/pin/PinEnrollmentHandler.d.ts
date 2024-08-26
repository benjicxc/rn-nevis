/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { CancellableHandler } from '../CancellableHandler';
/**
 * The object handling the PIN to be enrolled.
 *
 * @see {@link PinEnroller.enrollPin}
 */
export declare abstract class PinEnrollmentHandler extends CancellableHandler {
    /**
     * Specify the PIN to be enrolled.
     *
     * When this method is invoked, the SDK will validate the PIN and, if valid, will enroll it.
     *
     * @param pin the PIN.
     */
    abstract pin(pin: string): Promise<void>;
}
export declare class PinEnrollmentHandlerImpl extends PinEnrollmentHandler {
    private readonly _operationId;
    constructor(operationId: string);
    pin(pin: string): Promise<void>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=PinEnrollmentHandler.d.ts.map