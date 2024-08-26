/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The interface defining the HTTP headers that can be provided to {@link HttpOperation}.
 * The headers can be used for example to correlate multiple operations in the backend:
 * a header with an identifier can be provided to the {@link HttpOperation}, and the header
 * will be included in the HTTP request. If the identifier can be associated with a more general
 * operation (like a user enrollment), the backend will be able to link the requests made by the
 * SDK with that more generic operation.
 *
 * This interface tracks header values line-by-line. A field with multiple comma-separated values
 * on the same line will be treated as a field with a single value by this class.
 * It is the caller's responsibility to detect and split on commas if their field permits multiple
 * values. This simplifies use of single-valued fields whose values routinely contain commas, such
 * as dates.
 *
 * @see HttpOperation
 */
export abstract class RequestHeaders {
	/**
	 * A list containing the name of the headers and the associated values.
	 *
	 * The even indexes contain the name of the header and the odd indexes the value.
	 * The total size is guaranteed to be an even number.
	 * For example: "Accept","text/html","Accept","application/xhtml+xml"
	 */
	abstract namesAndValues: Array<string>;

	/**
	 * Creates a {@link RequestHeaders} objects from a list of strings.
	 *
	 * @param namesAndValues list containing the name of the headers and the associated values.
	 * @returns a {@link RequestHeaders} instance.
	 */
	static create(namesAndValues: Array<string>): RequestHeaders {
		return new RequestHeadersImpl(namesAndValues);
	}
}

export class RequestHeadersImpl extends RequestHeaders {
	namesAndValues: Array<string>;

	constructor(namesAndValues: Array<string>) {
		super();
		this.namesAndValues = namesAndValues;
	}
}
