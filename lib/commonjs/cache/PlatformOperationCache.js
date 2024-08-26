"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformOperationCache = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class PlatformOperationCache {
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
exports.PlatformOperationCache = PlatformOperationCache;
//# sourceMappingURL=PlatformOperationCache.js.map