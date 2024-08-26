/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.util

import android.app.Application

/**
 * An object/singleton provider the makes available the current [Application] instance for
 * method handlers, serializers, data transfer objects, etc.
 * The application property is managed by [ch.nevis.mobile.authentication.sdk.react.NevisMobileAuthenticationSdkReactModule] class.
 */
object ApplicationProvider {
    /**
     * The current [Application] instance or null if the provider has not been initialized.
     */
    var application: Application? = null
}
