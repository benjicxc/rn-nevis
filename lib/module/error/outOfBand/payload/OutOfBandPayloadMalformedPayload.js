/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandPayloadError } from './OutOfBandPayloadError';

/**
 * A violation of the out-of-band payload (contents of {@link OutOfBandPayload} occurred. The
 * message was malformed.
 */
export class OutOfBandPayloadMalformedPayload extends OutOfBandPayloadError {
  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(description, cause) {
    super();
    this.description = description;
    this.cause = cause;
  }
}
//# sourceMappingURL=OutOfBandPayloadMalformedPayload.js.map