/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

export class PlatformOperationCache {
  cache = new Map();
  constructor() {}
  static getInstance() {
    if (!PlatformOperationCache.instance) {
      PlatformOperationCache.instance = new PlatformOperationCache();
    }
    return PlatformOperationCache.instance;
  }
  put(operation) {
    this.cache.set(operation.operationId, operation);
  }
  read(key) {
    return this.cache.get(key);
  }
  update(operation) {
    this.cache.set(operation.operationId, operation);
  }
  delete(key) {
    this.cache.delete(key);
  }
}
//# sourceMappingURL=PlatformOperationCache.js.map