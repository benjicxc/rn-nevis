/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { MobileAuthenticationClientError } from '../MobileAuthenticationClientError';

/**
 * An error occurred during registration or deregistration.
 */
export abstract class OperationError extends MobileAuthenticationClientError {}
