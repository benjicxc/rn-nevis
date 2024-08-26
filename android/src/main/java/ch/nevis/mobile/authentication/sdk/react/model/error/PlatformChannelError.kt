/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.error

enum class DeleteAuthenticatorError(val type: String) {
    INVALID_AAID("InvalidAaid"),
    UNKNOWN("Unknown")
}
