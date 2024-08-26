/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { InitializationError } from './InitializationError';

/**
 * An error that indicates that some form of tampering was found in the application.
 */
export class InitializationDeviceProtectionError extends InitializationError {
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
//# sourceMappingURL=InitializationDeviceProtectionError.js.map