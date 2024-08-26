/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PromptOptions } from './PromptOptions';
/**
 * Defines the elements of the device passcode prompt (title and description).
 *
 * @see {@link DevicePasscodeUserVerificationHandler.listenForOsCredentials}
 */
export declare abstract class DevicePasscodePromptOptions extends PromptOptions {
    /**
     * Default constructor for {@link DevicePasscodePromptOptions}.
     *
     * @param title the title to be used to prompt the user.
     * @param description the optional description to be used to prompt the user.
     * @returns the created {@link DevicePasscodePromptOptions} instance.
     */
    static create(title: string, description?: string): DevicePasscodePromptOptions;
}
export declare class DevicePasscodePromptOptionsImpl extends DevicePasscodePromptOptions {
    title: string;
    description?: string;
    constructor(title: string, description?: string);
}
//# sourceMappingURL=DevicePasscodePromptOptions.d.ts.map