/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandOperationError } from '../operation/OutOfBandOperationError';

/**
 * The error returned when there is a problem with the out-of-band payload: it cannot be decrypted
 * or the provided JSON is not properly formatted.
 */
export abstract class OutOfBandPayloadError extends OutOfBandOperationError {}
