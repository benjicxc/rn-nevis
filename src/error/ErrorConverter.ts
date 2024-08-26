/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelError } from './ChannelError';

export class ErrorConverter<T> {
	error: ChannelError;

	constructor(input: any) {
		// The first condition is for RecoverableErrors
		// The second is for error thrown by the native plugins
		if (!(input instanceof Error) || 'userInfo' in input) {
			this.error = ChannelError.fromJson(input);
			return;
		}

		// Error thrown by the RN plugin, convert it to an Unknown error
		this.error = new ChannelError('Unknown', input.message);
	}

	convert(): T {
		throw new Error('Must override.');
	}
}
