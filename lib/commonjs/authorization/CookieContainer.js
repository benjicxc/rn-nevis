"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieContainer = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * A container that holds a cookie and an uri that belongs to the cookie.
 */
class CookieContainer {
  /**
   * The string representation of the request URL.
   */

  /**
   * The cookie for the URL in string format.
   */

  /**
   * Default constructor for {@link CookieContainer}.
   *
   * @param uri the string representation of the request URL.
   * @param properties the cookie for the URL.
   */
  constructor(uri, properties) {
    this.uri = uri;
    this.properties = properties;
  }

  /**
   * Alternate constructor that creates a {@link CookieContainer} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link CookieContainer} instance.
   */
  static fromJson(json) {
    return new CookieContainer(json.uri, json.properties);
  }
}
exports.CookieContainer = CookieContainer;
//# sourceMappingURL=CookieContainer.js.map