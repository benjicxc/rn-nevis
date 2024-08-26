/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { type FidoErrorCodeType } from './FidoErrorCodeType';
/**
 * Error class indicating that a problem during a FIDO UAF operation occurred.
 */
export declare class FidoErrorCode {
    /**
     * The underlying FIDO UAF error type.
     */
    type: FidoErrorCodeType;
    /**
     * The description of the error.
     */
    description: string;
    /**
     * Default constructor for {@link FidoErrorCode}.
     *
     * @param type the underlying FIDO UAF error type.
     * @param description the description of the error.
     */
    constructor(type: FidoErrorCodeType, description: string);
}
//# sourceMappingURL=FidoErrorCode.d.ts.map