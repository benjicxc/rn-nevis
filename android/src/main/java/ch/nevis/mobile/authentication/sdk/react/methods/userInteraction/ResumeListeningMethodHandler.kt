/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode.BIOMETRIC
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode.FINGERPRINT
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerifyUser
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ResumeListeningMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class ResumeListeningMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<ResumeListeningMessage>(channelInMessage)
        val operation = OperationCache.getOperation<UserInteractionOperation>(message.operationId)
        val state = operation.state as? VerifyUser
            ?: throw IllegalStateException("Operation state is missing or not a Verify User state!")
        when (state.verificationMode) {
            BIOMETRIC, FINGERPRINT -> resumeListening(
                message.operationId,
                operation,
                state
            )
            else -> throw IllegalStateException("ResumeListening can be only called during fingerprint or biometric authentication!")
        }

        MethodChannelHandler.resolve(ReactMethodName.RESUME_LISTENING, null)
    }

    private fun resumeListening(
        operationId: String,
        operation: UserInteractionOperation,
        state: VerifyUser
    ) {
        if (state.osAuthenticationListenHandler != null) {
            val updatedHandler = state.osAuthenticationListenHandler.resumeListening()
            OperationCache.updateOperation(
                operationId,
                operation.update(state.copy(osAuthenticationListenHandler = updatedHandler))
            )
        }
    }
}
