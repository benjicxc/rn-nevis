/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode.BIOMETRIC
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode.DEVICE_PASSCODE
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode.FINGERPRINT
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerifyUser
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ListenForOsCredentialsMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient
import ch.nevis.mobile.sdk.api.operation.userverification.OsAuthenticationListenHandler

class ListenForOsCredentialsMethodHandler : MethodHandler() {

    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<ListenForOsCredentialsMessage>(channelInMessage)
        val operation = OperationCache.getOperation<UserInteractionOperation>(message.operationId)
        val state = operation.state as? VerifyUser
            ?: throw IllegalStateException("Operation state is missing or not a Verify User state!")
        // the block emits the listenable event again because of the os popup
        // so we need to check whether the osHandler was set beforehand
        // as calling the listenForOsCredentials again results in an exception
        if (state.osAuthenticationListenHandler == null) {
            val handler = when (state.verificationMode) {
                BIOMETRIC, DEVICE_PASSCODE -> {
                    state.listenForOsCredentials(message.promptOptions)
                }
                FINGERPRINT -> {
                    state.listenForOsCredentials(null)
                }
                else -> {
                    throw IllegalStateException("ListenForOsCredentials can be only called during fingerprint or biometric authentication!")
                }
            }
            updateState(
                operationId = message.operationId,
                operation = operation,
                state = state,
                handler = handler
            )
        }

        MethodChannelHandler.resolve(ReactMethodName.LISTEN_FOR_OS_CREDENTIALS, null)
    }

    private fun updateState(
        operationId: String,
        operation: UserInteractionOperation,
        state: VerifyUser,
        handler: OsAuthenticationListenHandler?
    ) {
        OperationCache.updateOperation(
            operationId,
            operation.update(state.copy(osAuthenticationListenHandler = handler))
        )
    }
}
