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
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerificationContext
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerificationHandler
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerifier

class FingerprintUserVerifierImpl(
    private val operationId: String
) : FingerprintUserVerifier {

    override fun verifyFingerprint(
        fingerprintUserVerificationContext: FingerprintUserVerificationContext?,
        fingerprintUserVerificationHandler: FingerprintUserVerificationHandler?
    ) {
        val operation = OperationCache.getOperation<UserInteractionOperation>(operationId)
        OperationCache.updateOperation(
            operationId,
            operation.update(
                VerifyUser(
                    verificationMode = VerificationMode.FINGERPRINT,
                    userVerificationContext = fingerprintUserVerificationContext,
                    fingerprintUserVerificationHandler = fingerprintUserVerificationHandler
                )
            )
        )

        fingerprintUserVerificationContext?.also {
            val message = UserVerificationMessage(operationId, it.toDto(operationId))
            EventEmitter.dispatch(ReactMethodName.VERIFY_USER, message)
        } ?: throw IllegalStateException("FingerprintUserVerificationContext cannot be null.")
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
