/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { Configuration } from './Configuration';
import { InitializationError } from './error/initialization/InitializationError';
import { type MobileAuthenticationClient } from './MobileAuthenticationClient';
/**
 * The class that creates and initializes asynchronously an instance of {@link MobileAuthenticationClient}.
 */
export declare class MobileAuthenticationClientInitializer {
    private _configuration?;
    private _onSuccess?;
    private _onError?;
    /**
     * Sets the configuration of the {@link MobileAuthenticationClient}.
     *
     * **IMPORTANT** \
     * Providing the configuration is required.
     *
     * @param configuration the {@link MobileAuthenticationClient} configuration.
     * @returns an initializer
     */
    configuration(configuration: Configuration): this;
    /**
     * The method invoked when the {@link MobileAuthenticationClient} could be successfully built after
     * invoking {@link execute}.
     *
     * **IMPORTANT** \
     * Providing the callback handling the {@link MobileAuthenticationClient} is required.
     *
     * @param onSuccess the callback handling the {@link MobileAuthenticationClient}.
     * @returns an initializer.
     */
    onSuccess(onSuccess: (client: MobileAuthenticationClient) => void): this;
    /**
     * The method invoked when an error occurs after invoking {@link execute}.
     *
     * **IMPORTANT** \
     * Providing the callback handling the error is required.
     *
     * @param onError the callback handling the error.
     * @returns an initializer.
     */
    onError(onError: (error: InitializationError) => void): this;
    /**
     * Starts the creation of an instance of the {@link MobileAuthenticationClient}. If an error
     * occurs, it is provided through {@link onError}, if the {@link MobileAuthenticationClient}
     * can be successfully built and initialized, it is provided through {@link onSuccess}.
     */
    execute(): Promise<void>;
}
//# sourceMappingURL=MobileAuthenticationClientInitializer.d.ts.map