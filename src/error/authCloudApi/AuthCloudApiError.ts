/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { MobileAuthenticationClientError } from '../MobileAuthenticationClientError';

/**
 * An error occurred during auth cloud api registration.
 */
export abstract class AuthCloudApiError extends MobileAuthenticationClientError {}
