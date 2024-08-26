/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { MobileAuthenticationClientError } from '../../MobileAuthenticationClientError';

/**
 * The error that can occur when the processing of an {@link OutOfBandPayload} fails.
 */
export abstract class OutOfBandOperationError extends MobileAuthenticationClientError {}
