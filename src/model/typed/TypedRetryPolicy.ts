/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import {
	ConstantRetryPolicy,
	ExponentialRetryPolicy,
	NoRetryPolicy,
	RetryPolicy,
} from '../../operations/RetryPolicy';

class RetryPolicyData {
	maxRetries?: number;
	delayInSeconds?: number;
	initialDelayInSeconds?: number;
	maximumDelayInSeconds?: number;
	multiplier?: number;

	constructor(
		maxRetries?: number,
		delayInSeconds?: number,
		initialDelayInSeconds?: number,
		maximumDelayInSeconds?: number,
		multiplier?: number
	) {
		this.maxRetries = maxRetries;
		this.delayInSeconds = delayInSeconds;
		this.initialDelayInSeconds = initialDelayInSeconds;
		this.maximumDelayInSeconds = maximumDelayInSeconds;
		this.multiplier = multiplier;
	}
}

export abstract class TypedRetryPolicy extends TypedData<RetryPolicyData> {
	abstract data: RetryPolicyData;

	static create(retryPolicy: RetryPolicy): TypedRetryPolicy {
		if (retryPolicy instanceof NoRetryPolicy) {
			return new TypedNoRetryPolicy();
		} else if (retryPolicy instanceof ConstantRetryPolicy) {
			return new TypedConstantRetryPolicy(retryPolicy as ConstantRetryPolicy);
		} else if (retryPolicy instanceof ExponentialRetryPolicy) {
			return new TypedExponentialRetryPolicy(retryPolicy as ExponentialRetryPolicy);
		} else {
			throw new Error(`Unknown retry policy (${retryPolicy.constructor.name}).`);
		}
	}
}

export class TypedNoRetryPolicy extends TypedRetryPolicy {
	type = 'NoRetryPolicy';
	data: RetryPolicyData;

	constructor() {
		super();
		this.data = new RetryPolicyData();
	}
}

export class TypedConstantRetryPolicy extends TypedRetryPolicy {
	type = 'ConstantRetryPolicy';
	data: RetryPolicyData;

	constructor(wrapped: ConstantRetryPolicy) {
		super();
		this.data = new RetryPolicyData(wrapped.maxRetries, wrapped.delayInSeconds);
	}
}

export class TypedExponentialRetryPolicy extends TypedRetryPolicy {
	type = 'ExponentialRetryPolicy';
	data: RetryPolicyData;

	constructor(wrapped: ExponentialRetryPolicy) {
		super();
		this.data = new RetryPolicyData(
			wrapped.maxRetries,
			undefined,
			wrapped.initialDelayInSeconds,
			wrapped.maximumDelayInSeconds,
			wrapped.multiplier
		);
	}
}
