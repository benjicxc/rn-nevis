/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinPolicyProvider } from './PinPolicyProvider';

/**
 * The object in charge of PIN enrollment.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see
 * - {@link Registration.pinEnroller}
 * - {@link AuthCloudApiRegistration.pinEnroller}
 * - {@link OutOfBandRegistration.pinEnroller}
 */
export class PinEnroller extends PinPolicyProvider {}
//# sourceMappingURL=PinEnroller.js.map