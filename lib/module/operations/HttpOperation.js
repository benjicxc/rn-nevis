/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Operation } from './Operation';
/**
 * An operation that requires sending HTTP requests to the backend.
 */
export class HttpOperation extends Operation {}
export class HttpOperationImpl {
  requestHeaders(requestHeaders) {
    this.httpRequestHeaders = requestHeaders;
    return this;
  }
  execute() {
    return Promise.reject(new Error('Method not implemented.'));
  }
}
//# sourceMappingURL=HttpOperation.js.map