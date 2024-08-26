/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PlatformOperation } from './operation/PlatformOperation';

export class PlatformOperationCache {
	private static instance: PlatformOperationCache;
	private cache: Map<string, PlatformOperation> = new Map<string, PlatformOperation>();

	private constructor() {}

	static getInstance(): PlatformOperationCache {
		if (!PlatformOperationCache.instance) {
			PlatformOperationCache.instance = new PlatformOperationCache();
		}

		return PlatformOperationCache.instance;
	}

	put(operation: PlatformOperation) {
		this.cache.set(operation.operationId, operation);
	}

	read(key: string): PlatformOperation | undefined {
		return this.cache.get(key);
	}

	update(operation: PlatformOperation) {
		this.cache.set(operation.operationId, operation);
	}

	delete(key: string): void {
		this.cache.delete(key);
	}
}
