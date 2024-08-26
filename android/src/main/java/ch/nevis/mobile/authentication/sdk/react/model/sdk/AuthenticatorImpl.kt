/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.UserEnrollmentSerializer
import ch.nevis.mobile.sdk.api.localdata.Authenticator
import ch.nevis.mobile.sdk.api.localdata.RegistrationInfo
import ch.nevis.mobile.sdk.api.localdata.UserEnrollment
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class AuthenticatorImpl(
    val operationId: String?,
    val aaid: String,
    val registration: RegistrationInfoImpl,
    @Serializable(with = UserEnrollmentSerializer::class)
    val userEnrollment: UserEnrollment,
    @SerialName("isSupportedByHardware")
    val supportedByHardware: Boolean,
    @SerialName("isSupportedByOs")
    val supportedByOs: Boolean,
) : Authenticator {
    override fun aaid(): String = aaid

    override fun registration(): RegistrationInfo = registration

    override fun userEnrollment(): UserEnrollment = userEnrollment

    override fun isSupportedByHardware(): Boolean = supportedByHardware

    override fun isSupportedByOs(): Boolean = supportedByOs
}

fun Authenticator.toDto(operationId: String?): AuthenticatorImpl {
    return AuthenticatorImpl(
        operationId,
        this.aaid(),
        this.registration().toDto(),
        this.userEnrollment(),
        this.isSupportedByHardware,
        this.isSupportedByOs
    )
}

fun Set<Authenticator>.toDto(operationId: String?): Set<AuthenticatorImpl> {
    return this.map { it.toDto(operationId) }.toSet()
}
