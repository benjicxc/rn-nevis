/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { TypedData } from './TypedData';
import { BiometricPromptOptions } from '../../operations/userverification/BiometricPromptOptions';
import { DevicePasscodePromptOptions } from '../../operations/userverification/DevicePasscodePromptOptions';
declare class PromptOptionsData {
    title?: string;
    description?: string;
    cancelButtonText?: string;
    constructor(title?: string, description?: string, cancelButtonText?: string);
}
export declare abstract class TypedPromptOptions extends TypedData<PromptOptionsData> {
    abstract data: PromptOptionsData;
}
export declare class TypedBiometricPromptOptions extends TypedPromptOptions {
    type: string;
    data: PromptOptionsData;
    constructor(wrapped?: BiometricPromptOptions);
}
export declare class TypedDevicePasscodePromptOptions extends TypedPromptOptions {
    type: string;
    data: PromptOptionsData;
    constructor(wrapped?: DevicePasscodePromptOptions);
}
export {};
//# sourceMappingURL=TypedPromptOptions.d.ts.map