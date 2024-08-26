/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.userverification.BiometricPromptOptions
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodePromptOptions
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

enum class PromptOptionsType(val type: String) {
    BIOMETRIC(BiometricPromptOptions::class.java.simpleName),
    DEVICE_PASSCODE(DevicePasscodePromptOptions::class.java.simpleName),
}

interface PromptOptions {
    val title: String
    val description: String?
}

@Serializable
data class BiometricPromptOptionsImpl(
    override val title: String,
    override val description: String? = null,
    val cancelButtonText: String
) : BiometricPromptOptions, PromptOptions {
    override fun title(): String = title

    override fun description(): Optional<String> = Optional.ofNullable(description)

    override fun cancelButtonText(): String = cancelButtonText
}

fun BiometricPromptOptions.toDto(): BiometricPromptOptionsImpl {
    return BiometricPromptOptionsImpl(
        title(),
        description().orElse(null),
        cancelButtonText()
    )
}

@Serializable
data class DevicePasscodePromptOptionsImpl(
    override val title: String,
    override val description: String? = null
) : DevicePasscodePromptOptions, PromptOptions {
    override fun title(): String = title

    override fun description(): Optional<String> = Optional.ofNullable(description)
}

fun DevicePasscodePromptOptions.toDto(): DevicePasscodePromptOptionsImpl {
    return DevicePasscodePromptOptionsImpl(
        title(),
        description().orElse(null)
    )
}
