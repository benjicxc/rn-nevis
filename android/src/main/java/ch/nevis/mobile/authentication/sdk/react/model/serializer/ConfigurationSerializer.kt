/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.ConfigurationImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.Configuration
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import java.net.URI

object ConfigurationSerializer : KSerializer<Configuration> {
    private val serializer = ConfigurationImpl.serializer()

    override val descriptor: SerialDescriptor = serializer.descriptor

    override fun serialize(encoder: Encoder, value: Configuration) {
        encoder.encodeSerializableValue(serializer, value.toDto())
    }

    override fun deserialize(decoder: Decoder): Configuration {
        val configImpl = decoder.decodeSerializableValue(serializer)
        val builder = Configuration.builder()
            .packageInfo(configImpl.packageInfo())
            .baseUrl(URI.create(configImpl.baseUrl))
            .registrationRequestPath(configImpl.registrationRequestPath)
            .registrationResponsePath(configImpl.registrationResponsePath)
            .authenticationRequestPath(configImpl.authenticationRequestPath)
            .authenticationResponsePath(configImpl.authenticationResponsePath)
            .dispatchTargetResourcePath(configImpl.dispatchTargetResourcePath)
            .deregistrationRequestPath(configImpl.deregistrationRequestPath)
            .networkTimeoutInSeconds(configImpl.networkTimeoutInSeconds)
            .authenticationRetryIntervalInSeconds(configImpl.authenticationRetryIntervalInSeconds)
            .authenticationMaxRetries(configImpl.authenticationMaxRetries)
            .userInteractionTimeoutInSeconds(configImpl.userInteractionTimeoutInSeconds)
            .facetId(configImpl.facetId)
        return builder.build()
    }
}
