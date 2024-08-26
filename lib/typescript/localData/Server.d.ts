/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * The object defining a server. Each {@link Account} is defined in a given {@link Server} object.
 */
export declare abstract class Server {
    /**
     * The base URL for the server. This is the base URL for the HTTP endpoints the SDK must interact
     * with when dealing with the {@link Account}s associated with this server.
     *
     * The endpoints are built using this URL and the paths specified in {@link Configuration}
     * (like {@link Configuration.getAuthenticationRequestPath}).
     */
    abstract baseUrl: string;
    /**
     * Alternate constructor that creates a {@link Server} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns a {@link Server} instance.
     */
    static fromJson(json: any): Server;
}
export declare class ServerImpl extends Server {
    baseUrl: string;
    constructor(baseUrl: string);
    static fromJson(json: any): ServerImpl;
}
//# sourceMappingURL=Server.d.ts.map