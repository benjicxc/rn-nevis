/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PlatformOperation } from './PlatformOperation';
/**
 * Represents the eligible types of an out-of-band operation.
 */
export declare enum OutOfBandPlatformOperationType {
    /**
     * Out-of-band registration.
     */
    registration = "REGISTRATION",
    /**
     * Out-of-band authentication.
     */
    authentication = "AUTHENTICATION"
}
/**
 * Helps in following the states of out of band operations during method channel calls.
 */
export declare class OutOfBandPlatformOperation extends PlatformOperation {
    operationId: string;
    onOperationType?: (type: OutOfBandPlatformOperationType) => void;
    constructor(operationId: string, onOperationType?: (type: OutOfBandPlatformOperationType) => void);
    /**
     * Provides a way to update the current operation type.
     * When an out-of-band operation is started at first we cannot know whether it will be an
     * authentication or a registration operation. This information is provided once the native sdk
     * reaches either the authentication or the registration callback.
     *
     * @param type the new operation type.
     */
    updateOperationType(type: OutOfBandPlatformOperationType): void;
}
//# sourceMappingURL=OutOfBandPlatformOperation.d.ts.map