/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { MobileAuthenticationClientError } from '../../MobileAuthenticationClientError';

/**
 * The error returned when the PIN change failed.
 */
export abstract class PinChangeError extends MobileAuthenticationClientError {}
