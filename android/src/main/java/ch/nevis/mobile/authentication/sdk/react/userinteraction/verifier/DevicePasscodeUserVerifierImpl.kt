/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.verifier

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.OnValidCredentialsProvided
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerifyUser
import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.OnValidCredentialsProvidedMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.UserVerificationMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodeUserVerificationContext
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodeUserVerificationHandler
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodeUserVerifier

class DevicePasscodeUserVerifierImpl(
    private val operationId: String
) : DevicePasscodeUserVerifier {
    override fun verifyDevicePasscode(
        devicePasscodeUserVerificationContext: DevicePasscodeUserVerificationContext?,
        devicePasscodeUserVerificationHandler: DevicePasscodeUserVerificationHandler?
    ) {
        val operation = OperationCache.getOperation<UserInteractionOperation>(operationId)
        OperationCache.updateOperation(
            operationId,
            operation.update(
                VerifyUser(
                    verificationMode = VerificationMode.DEVICE_PASSCODE,
                    userVerificationContext = devicePasscodeUserVerificationContext,
                    devicePasscodeUserVerificationHandler = devicePasscodeUserVerificationHandler
                )
            )
        )

        devicePasscodeUserVerificationContext?.also {
            val message = UserVerificationMessage(operationId, it.toDto(operationId))
            EventEmitter.dispatch(ReactMethodName.VERIFY_USER, message)
        } ?: throw IllegalStateException("DevicePasscodeUserVerificationContext cannot be null.")
    }

    override fun onValidCredentialsProvided() {
        val operation = OperationCache.getOperation<UserInteractionOperation>(operationId)
        val previousState = operation.state as VerifyUser
        val authenticator = previousState.userVerificationContext?.authenticator()
        OperationCache.updateOperation(
            operationId,
            operation.update(OnValidCredentialsProvided(authenticator))
        )

        authenticator?.also {
            val message = OnValidCredentialsProvidedMessage(operationId, it.toDto(operationId))
            EventEmitter.dispatch(ReactMethodName.ON_VALID_CREDENTIALS_PROVIDED, message)
        } ?: throw IllegalStateException("Authenticator cannot be null.")
    }
}
