/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { UserVerificationContext } from './UserVerificationContext';
import { Authenticator } from '../../localData/Authenticator';
/**
 * The object providing information about the device passcode user verification (i.e. the user
 * credential validation) operation to be done.
 *
 * @see {@link DevicePasscodeUserVerifier.verifyDevicePasscode}
 */
export declare abstract class DevicePasscodeUserVerificationContext extends UserVerificationContext {
    /**
     * Alternate constructor that creates a {@link DevicePasscodeUserVerificationContext} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns a {@link DevicePasscodeUserVerificationContext} instance.
     */
    static fromJson(json: any): DevicePasscodeUserVerificationContext;
}
export declare class DevicePasscodeUserVerificationContextImpl extends DevicePasscodeUserVerificationContext {
    authenticator: Authenticator;
    constructor(authenticator: Authenticator);
    static fromJson(json: any): DevicePasscodeUserVerificationContextImpl;
}
//# sourceMappingURL=DevicePasscodeUserVerificationContext.d.ts.map