/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { TypedData } from './TypedData';
import { ConstantRetryPolicy, ExponentialRetryPolicy, RetryPolicy } from '../../operations/RetryPolicy';
declare class RetryPolicyData {
    maxRetries?: number;
    delayInSeconds?: number;
    initialDelayInSeconds?: number;
    maximumDelayInSeconds?: number;
    multiplier?: number;
    constructor(maxRetries?: number, delayInSeconds?: number, initialDelayInSeconds?: number, maximumDelayInSeconds?: number, multiplier?: number);
}
export declare abstract class TypedRetryPolicy extends TypedData<RetryPolicyData> {
    abstract data: RetryPolicyData;
    static create(retryPolicy: RetryPolicy): TypedRetryPolicy;
}
export declare class TypedNoRetryPolicy extends TypedRetryPolicy {
    type: string;
    data: RetryPolicyData;
    constructor();
}
export declare class TypedConstantRetryPolicy extends TypedRetryPolicy {
    type: string;
    data: RetryPolicyData;
    constructor(wrapped: ConstantRetryPolicy);
}
export declare class TypedExponentialRetryPolicy extends TypedRetryPolicy {
    type: string;
    data: RetryPolicyData;
    constructor(wrapped: ExponentialRetryPolicy);
}
export {};
//# sourceMappingURL=TypedRetryPolicy.d.ts.map