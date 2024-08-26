/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.enroller

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.EnrollPinState
import ch.nevis.mobile.authentication.sdk.react.cache.state.OnValidCredentialsProvided
import ch.nevis.mobile.authentication.sdk.react.cache.state.SelectAuthenticator
import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.OnValidCredentialsProvidedMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.PinEnrollerMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.localdata.Authenticator
import ch.nevis.mobile.sdk.api.operation.pin.PinEnroller
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentContext
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentHandler
import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy

class PinEnrollerImpl(
    private val operationId: String,
    private val pinPolicy: PinPolicy?
) : PinEnroller {
    private val pinAuthenticatorMissing =
        IllegalStateException("Pin authenticator is missing from pin enrollment context!")
    private val wrongOperationStateException =
        IllegalStateException("State is not SelectAuthenticator or EnrollPinState during pin enrollment")

    override fun enrollPin(
        pinEnrollmentContext: PinEnrollmentContext?,
        pinEnrollmentHandler: PinEnrollmentHandler?
    ) {
        val operation = OperationCache.getOperation<UserInteractionOperation>(operationId)
        val pinAuthenticator = when (operation.state) {
            is SelectAuthenticator -> {
                (operation.state as SelectAuthenticator)
                    .authenticatorSelectionContext?.authenticators()
                    ?.find { it.aaid() == Authenticator.PIN_AUTHENTICATOR_AAID }
                    ?: throw pinAuthenticatorMissing
            }
            is EnrollPinState -> {
                (operation.state as EnrollPinState).pinAuthenticator
            }
            else -> throw wrongOperationStateException
        }
        OperationCache.updateOperation(
            operationId,
            operation.update(
                EnrollPinState(
                    pinEnrollmentContext,
                    pinEnrollmentHandler,
                    pinAuthenticator
                )
            )
        )

        pinEnrollmentContext?.also {
            val message = PinEnrollerMessage(operationId, it.toDto(operationId))
            EventEmitter.dispatch(ReactMethodName.PIN_ENROLL, message)
        } ?: throw IllegalStateException("PinEnrollmentContext cannot be null.")
    }

    override fun onValidCredentialsProvided() {
        val operation = OperationCache.getOperation<UserInteractionOperation>(operationId)
        val previousState = operation.state as EnrollPinState
        val authenticator = previousState.pinAuthenticator

        OperationCache.updateOperation(
            operationId,
            operation.update(OnValidCredentialsProvided(authenticator))
        )

        val message =
            OnValidCredentialsProvidedMessage(operationId, authenticator.toDto(operationId))
        EventEmitter.dispatch(ReactMethodName.ON_VALID_CREDENTIALS_PROVIDED, message)
    }

    override fun pinPolicy(): PinPolicy {
        return pinPolicy ?: super.pinPolicy()
    }
}
