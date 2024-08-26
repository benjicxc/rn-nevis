/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { type Account } from './Account';
import { type Authenticator } from './Authenticator';
import { type DeviceInformation } from './DeviceInformation';
/**
 * An interface that provides information about the information that is stored locally in the SDK.
 * This includes authenticator and device information. The interface also allows to delete
 * the data locally.
 *
 * @see {@link MobileAuthenticationClient.localData}
 */
export declare abstract class LocalData {
    /**
     * Convenience method that returns all the registered accounts.
     *
     * @returns all the registered accounts.
     */
    abstract accounts(): Promise<Array<Account>>;
    /**
     * Returns information about the authenticators. This information can be used for instance
     * to know whether there is a registered authenticator or not, and thus if the user must
     * register an authenticator or if authentication is possible.
     *
     * @returns all the authenticators.
     */
    abstract authenticators(): Promise<Array<Authenticator>>;
    /**
     * Returns information about the configured {@link DeviceInformation} (if any).
     *
     * @returns information about the device.
     */
    abstract deviceInformation(): Promise<DeviceInformation | undefined>;
    /**
     * Deletes all the data managed by the SDK regarding the provided authenticator.
     *
     * If the authenticator is registered, it will delete the associated FIDO UAF
     * credentials of the provided user.
     * If the authenticator is managed by the SDK (PIN authenticator), and the
     * specified user is the only registered user, it will also delete the PIN
     * definition (i.e. the authenticator will no longer be enrolled).
     * f the username is not specified the authenticator deletion will be performed
     * for all user.
     *
     * **NOTE** \
     * This method will only delete data locally. The FIDO UAF credentials will
     * not be deleted from the server. This method should only be used when going
     * through the protocol to delete authenticator information is not possible.
     * For instance when the PIN authenticator is locked, which may be due to a
     * security attack, and then it is desirable to delete the credentials locally.
     * Using the {@link Deregistration} operation is the recommended way of deleting
     * the FIDO UAF credentials.
     *
     * **NOTE** \
     * If no AAID is provided then all authenticators will be deleted.
     *
     * @param username the username whose authenticator must be deleted.
     * @param aaid the AAID of the {@link Authenticator} whose data must be deleted.
     */
    abstract deleteAuthenticator(username: string, aaid?: string): Promise<void>;
}
/**
 * Default implementation of {@link LocalData}.
 */
export declare class LocalDataImpl extends LocalData {
    accounts(): Promise<Array<Account>>;
    authenticators(): Promise<Array<Authenticator>>;
    deviceInformation(): Promise<DeviceInformation | undefined>;
    deleteAuthenticator(username: string, aaid?: string): Promise<void>;
}
//# sourceMappingURL=LocalData.d.ts.map