/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { Operation } from './Operation';
import type { RequestHeaders } from './RequestHeaders';
/**
 * An operation that requires sending HTTP requests to the backend.
 */
export declare abstract class HttpOperation<T extends HttpOperation<T>> extends Operation {
    /**
     * Specifies the additional request headers that must be included in the HTTP requests sent by
     * the operation.
     *
     * @param requestHeaders the HTTP headers.
     * @returns an {@link HttpOperation} object.
     */
    abstract requestHeaders(requestHeaders: RequestHeaders): T;
}
export declare abstract class HttpOperationImpl<T extends HttpOperation<T>> implements HttpOperation<T> {
    httpRequestHeaders?: RequestHeaders;
    requestHeaders(requestHeaders: RequestHeaders): T;
    execute(): Promise<void>;
}
//# sourceMappingURL=HttpOperation.d.ts.map