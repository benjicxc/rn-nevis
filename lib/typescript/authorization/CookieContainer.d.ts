/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * A container that holds a cookie and an uri that belongs to the cookie.
 */
export declare class CookieContainer {
    /**
     * The string representation of the request URL.
     */
    uri: string;
    /**
     * The cookie for the URL in string format.
     */
    properties: string;
    /**
     * Default constructor for {@link CookieContainer}.
     *
     * @param uri the string representation of the request URL.
     * @param properties the cookie for the URL.
     */
    constructor(uri: string, properties: string);
    /**
     * Alternate constructor that creates a {@link CookieContainer} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created {@link CookieContainer} instance.
     */
    static fromJson(json: any): CookieContainer;
}
//# sourceMappingURL=CookieContainer.d.ts.map