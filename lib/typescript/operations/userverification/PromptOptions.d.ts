/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * Defines the elements of a user prompt (title and description).
 *
 * Depending on the nature of the user prompt, this object will be either a {@link BiometricPromptOptions}
 * or a {@link DevicePasscodePromptOptions}.
 */
export declare abstract class PromptOptions {
    /**
     * The title to be used to prompt the user.
     */
    abstract title: string;
    /**
     * The optional description to be used to prompt the user.
     */
    abstract description?: string;
}
//# sourceMappingURL=PromptOptions.d.ts.map