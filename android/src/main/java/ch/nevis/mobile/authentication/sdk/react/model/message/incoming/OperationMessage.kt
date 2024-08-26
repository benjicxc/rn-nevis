/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import kotlinx.serialization.Serializable

@Serializable
sealed class OperationMessage : ChannelInMessage() {
    abstract val onSuccessProvided: Boolean
    abstract val onErrorProvided: Boolean
    // please note that the custom serializer must be applied in the data class!
    abstract val requestHeaders: RequestHeaders?
}
