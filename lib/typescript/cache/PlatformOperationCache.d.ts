/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PlatformOperation } from './operation/PlatformOperation';
export declare class PlatformOperationCache {
    private static instance;
    private cache;
    private constructor();
    static getInstance(): PlatformOperationCache;
    put(operation: PlatformOperation): void;
    read(key: string): PlatformOperation | undefined;
    update(operation: PlatformOperation): void;
    delete(key: string): void;
}
//# sourceMappingURL=PlatformOperationCache.d.ts.map