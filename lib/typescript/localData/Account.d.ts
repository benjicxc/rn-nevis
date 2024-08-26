/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { Server } from './Server';
/**
 * The object representing a user account.
 *
 * An `Account` is created when a FIDO UAF registration is completed successfully.
 */
export declare abstract class Account {
    /**
     * The username associated with the {@link Account}. This is a unique identifier.
     * Depending on the backend, the username can be a UUID, an email or a login ID.
     * `username` is used because it matches the nomenclature used in the FIDO UAF
     * specification to refer to a user unique identifier.
     *
     * The SDK does not support having identities with the same `username` defined
     * in different servers. So, the `username` is unique among the identities in
     * all servers.
     */
    abstract username: string;
    /**
     * The object describing the server where the account is defined.
     */
    abstract server: Server;
    /**
     * Alternate constructor that creates an {@link Account} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns an {@link Account} instance.
     */
    static fromJson(json: any): Account;
}
//# sourceMappingURL=Account.d.ts.map