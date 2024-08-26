/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache.state

import ch.nevis.mobile.authentication.sdk.react.cache.state.VerificationMode.*
import ch.nevis.mobile.authentication.sdk.react.model.sdk.BiometricPromptOptionsImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.DevicePasscodePromptOptionsImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.PromptOptions
import ch.nevis.mobile.sdk.api.localdata.Authenticator
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentContext
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentHandler
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelectionContext
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelectionHandler
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelectionContext
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelectionHandler
import ch.nevis.mobile.sdk.api.operation.userverification.*

sealed class UserInteractionState : OperationState {
    open fun isPolicyCompliant(aaid: String, username: String?): Boolean {
        throw IllegalStateException("isPolicyCompliant cannot be called in the current state!")
    }
}

data class SelectAccount(
    val accountSelectionContext: AccountSelectionContext?,
    val accountSelectionHandler: AccountSelectionHandler?
) : UserInteractionState() {
    override fun cancel() {
        accountSelectionHandler?.cancel()
    }

    override fun isPolicyCompliant(aaid: String, username: String?): Boolean {
        return accountSelectionContext?.isPolicyCompliant(username, aaid) ?: false
    }
}

data class SelectAuthenticator(
    val authenticatorSelectionContext: AuthenticatorSelectionContext?,
    val authenticatorSelectionHandler: AuthenticatorSelectionHandler?
) : UserInteractionState() {
    override fun cancel() {
        authenticatorSelectionHandler?.cancel()
    }

    override fun isPolicyCompliant(aaid: String, username: String?): Boolean {
        return authenticatorSelectionContext?.isPolicyCompliant(aaid) ?: false
    }
}

data class VerifyUser(
  val verificationMode: VerificationMode,
  val userVerificationContext: UserVerificationContext?,
  private val pinUserVerificationHandler: PinUserVerificationHandler? = null,
  private val biometricUserVerificationHandler: BiometricUserVerificationHandler? = null,
  private val devicePasscodeUserVerificationHandler: DevicePasscodeUserVerificationHandler? = null,
  private val fingerprintUserVerificationHandler: FingerprintUserVerificationHandler? = null,
  val osAuthenticationListenHandler: OsAuthenticationListenHandler? = null,
) : UserInteractionState() {

    fun verifyPin(username: String) {
        when (verificationMode) {
            PIN -> pinUserVerificationHandler?.verifyPin(username.toCharArray())
            FINGERPRINT, BIOMETRIC, DEVICE_PASSCODE -> throw IllegalStateException("Cannot use pin verification during biometric verification!")
        }
    }

    fun listenForOsCredentials(promptOptions: PromptOptions?): OsAuthenticationListenHandler? {
        return when (verificationMode) {
            PIN -> throw IllegalStateException("Cannot use OS credential listening during pin verification!")
            FINGERPRINT -> fingerprintUserVerificationHandler?.listenForOsCredentials()
            BIOMETRIC -> {
                val biometricPromptOptions = promptOptions as? BiometricPromptOptionsImpl
                    ?: throw IllegalArgumentException("BiometricPromptOptions is required for biometric user verification.")
                biometricUserVerificationHandler?.listenForOsCredentials(biometricPromptOptions)
            }
            DEVICE_PASSCODE -> {
                val devicePasscodePromptOptions = promptOptions as? DevicePasscodePromptOptionsImpl
                    ?: throw IllegalArgumentException("DevicePasscodePromptOptions is required for device passcode user verification.")
                devicePasscodeUserVerificationHandler?.listenForOsCredentials(
                    devicePasscodePromptOptions
                )
            }
        }
    }

    override fun cancel() {
        when (verificationMode) {
            PIN -> pinUserVerificationHandler?.cancel()
            FINGERPRINT -> fingerprintUserVerificationHandler?.cancel()
            BIOMETRIC -> biometricUserVerificationHandler?.cancel()
            DEVICE_PASSCODE -> devicePasscodeUserVerificationHandler?.cancel()
        }
        osAuthenticationListenHandler?.cancelAuthentication()
    }
}

enum class VerificationMode {
    PIN, FINGERPRINT, BIOMETRIC, DEVICE_PASSCODE
}

data class OnValidCredentialsProvided(val authenticator: Authenticator?) :
    UserInteractionState()

data class EnrollPinState(
    val pinEnrollmentContext: PinEnrollmentContext?,
    val pinEnrollmentHandler: PinEnrollmentHandler?,
    val pinAuthenticator: Authenticator,
) : UserInteractionState() {
    fun enrollPin(pin: String) {
        pinEnrollmentHandler?.pin(pin.toCharArray())
    }

    override fun cancel() {
        pinEnrollmentHandler?.cancel()
    }
}
