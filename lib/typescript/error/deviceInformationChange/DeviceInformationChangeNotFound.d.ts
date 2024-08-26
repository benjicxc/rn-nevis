/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { DeviceInformationChangeError } from './DeviceInformationChangeError';
/**
 * The device information to be updated could not be found.
 */
export declare class DeviceInformationChangeNotFound extends DeviceInformationChangeError {
    /**
     * Provides details about the error that occurred.
     */
    description: string;
    /**
     * The exception (if any) that caused this error.
     */
    cause?: string;
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=DeviceInformationChangeNotFound.d.ts.map