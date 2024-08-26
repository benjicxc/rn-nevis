/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * The object defining the minimum and maximum length of the PIN.
 */
export declare abstract class PinPolicy {
    /**
     * The minimum length of the PIN.
     */
    abstract minLength: number;
    /**
     * The maximum length of the PIN.
     */
    abstract maxLength: number;
    /**
     * Default constructor for {@link PinPolicy}.
     *
     * @param minLength the minimum length of the PIN.
     * @param maxLength the maximum length of the PIN.
     * @returns an {@link PinPolicy} instance.
     */
    static create(minLength: number, maxLength: number): PinPolicy;
    /**
     * Alternate constructor that creates an instance from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): PinPolicy;
}
export declare class PinPolicyImpl extends PinPolicy {
    minLength: number;
    maxLength: number;
    constructor(minLength: number, maxLength: number);
    static fromJson(json: any): PinPolicyImpl;
}
//# sourceMappingURL=PinPolicy.d.ts.map