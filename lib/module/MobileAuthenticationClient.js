/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { LocalDataImpl } from './localData/LocalData';
import { OperationsImpl } from './operations/Operations';

/**
 * The `MobileAuthenticationClient` interface represents the entry point to the SDK. Your
 * application should generally create an application scoped `MobileAuthenticationClient` instance,
 * by passing in a {@link Configuration} to the {@link MobileAuthenticationClientInitializer} that
 * specifies the `MobileAuthenticationClient` behavior. The configuration defines the URLs used to
 * perform operations with a NEVIS Mobile Authentication backend.
 *
 * To create the `MobileAuthenticationClient`, assuming that the {@link Configuration} has already been
 * created, here is an example using {@link MobileAuthenticationClientInitializer} to setup the SDK
 * during application startup:
 *
 * ```ts
 *   async function createMobileAuthenticationClient(
 *       configuration: Configuration
 *   ): Promise<void> {
 *       await new MobileAuthenticationClientInitializer()
 *           .configuration(configuration)
 *           .onSuccess(client) => {
 *               // handle the MobileAuthenticationClient
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *    }
 * ```
 */

export class MobileAuthenticationClientImpl {
  get operations() {
    return new OperationsImpl();
  }
  get localData() {
    return new LocalDataImpl();
  }
}
//# sourceMappingURL=MobileAuthenticationClient.js.map