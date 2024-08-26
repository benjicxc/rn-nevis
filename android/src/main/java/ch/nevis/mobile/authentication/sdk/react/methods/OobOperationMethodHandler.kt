/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.OutOfBandAuthenticationOperation
import ch.nevis.mobile.authentication.sdk.react.cache.operation.OutOfBandOperation
import ch.nevis.mobile.authentication.sdk.react.cache.operation.OutOfBandRegistrationOperation
import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.OobOperationMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.OperationTypeMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandAuthentication
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandRegistration

class OobOperationMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val message = validate<OobOperationMessage>(channelInMessage)
        val operation = OutOfBandOperation(message.operationId)
        OperationCache.createOperation(message.operationId, operation)

        val outOfBandOperation = client.operations().outOfBandOperation()
        message.payload?.let {
            outOfBandOperation.payload(it)
        }

        message.requestHeaders?.let {
            outOfBandOperation.requestHeaders(it)
        }

        if (message.onRegistrationProvided) {
            outOfBandOperation.onRegistration { registration ->
                registration.register(message.operationId, message.subOperationId)
            }
        }

        if (message.onAuthenticationProvided) {
            outOfBandOperation.onAuthentication { authentication ->
                authentication.authenticate(message.operationId, message.subOperationId)
            }
        }

        if (message.onErrorProvided) {
            outOfBandOperation.onError(operation.onError)
        }

        outOfBandOperation.execute()
    }

    private fun OutOfBandRegistration.register(operationId: String, subOperationId: String) {
        selectOperation(operationId, OutOfBandOperationType.REGISTRATION)
        val operation = OutOfBandRegistrationOperation(subOperationId, this)
        OperationCache.createOperation(subOperationId, operation)
    }

    private fun OutOfBandAuthentication.authenticate(operationId: String, subOperationId: String) {
        selectOperation(operationId, OutOfBandOperationType.AUTHENTICATION)
        val operation = OutOfBandAuthenticationOperation(subOperationId, this)
        OperationCache.createOperation(subOperationId, operation)
    }

    private fun selectOperation(operationId: String, type: OutOfBandOperationType) {
        val message = OperationTypeMessage(operationId, type.name)
        EventEmitter.dispatch(ReactMethodName.OPERATION_TYPE, message)
    }

    private enum class OutOfBandOperationType {
        REGISTRATION, AUTHENTICATION
    }
}
