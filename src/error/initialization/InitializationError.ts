/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { MobileAuthenticationClientError } from '../MobileAuthenticationClientError';

/**
 * Collection of {@link MobileAuthenticationClient} initialization error codes.
 */
export abstract class InitializationError extends MobileAuthenticationClientError {}
