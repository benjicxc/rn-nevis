/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react

import com.facebook.react.bridge.ReactApplicationContext
abstract class NevisMobileAuthenticationSdkReactSpec internal constructor(context: ReactApplicationContext) :
  NativeNevisMobileAuthenticationSdkReactSpec(context) {
}
