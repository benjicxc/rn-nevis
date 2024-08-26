/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Operation } from './Operation';
import type { RequestHeaders } from './RequestHeaders';

/**
 * An operation that requires sending HTTP requests to the backend.
 */
export abstract class HttpOperation<T extends HttpOperation<T>> extends Operation {
	/**
	 * Specifies the additional request headers that must be included in the HTTP requests sent by
	 * the operation.
	 *
	 * @param requestHeaders the HTTP headers.
	 * @returns an {@link HttpOperation} object.
	 */
	abstract requestHeaders(requestHeaders: RequestHeaders): T;
}

export abstract class HttpOperationImpl<T extends HttpOperation<T>> implements HttpOperation<T> {
	httpRequestHeaders?: RequestHeaders;

	requestHeaders(requestHeaders: RequestHeaders) {
		this.httpRequestHeaders = requestHeaders;
		return this as unknown as T;
	}

	execute(): Promise<void> {
		return Promise.reject(new Error('Method not implemented.'));
	}
}
