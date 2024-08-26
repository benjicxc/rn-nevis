/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object defining a server. Each {@link Account} is defined in a given {@link Server} object.
 */
export class Server {
  /**
   * The base URL for the server. This is the base URL for the HTTP endpoints the SDK must interact
   * with when dealing with the {@link Account}s associated with this server.
   *
   * The endpoints are built using this URL and the paths specified in {@link Configuration}
   * (like {@link Configuration.getAuthenticationRequestPath}).
   */

  /**
   * Alternate constructor that creates a {@link Server} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link Server} instance.
   */
  static fromJson(json) {
    return ServerImpl.fromJson(json);
  }
}
export class ServerImpl extends Server {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }
  static fromJson(json) {
    return new ServerImpl(json.baseUrl);
  }
}
//# sourceMappingURL=Server.js.map