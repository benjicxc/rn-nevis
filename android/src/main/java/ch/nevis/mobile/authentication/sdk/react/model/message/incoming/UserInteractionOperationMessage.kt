/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import kotlinx.serialization.Serializable

@Serializable
sealed class UserInteractionOperationMessage : OperationMessage() {
    abstract val accountSelectorProvided: Boolean
    abstract val authenticatorSelectorProvided: Boolean
    abstract val pinEnrollerProvided: Boolean
    abstract val pinUserVerifierProvided: Boolean
    abstract val biometricUserVerifierProvided: Boolean
    abstract val devicePasscodeUserVerifierProvided: Boolean
    abstract val fingerprintUserVerifierProvided: Boolean
}
