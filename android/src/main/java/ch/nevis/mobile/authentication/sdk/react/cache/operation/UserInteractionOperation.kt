/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache.operation

import ch.nevis.mobile.authentication.sdk.react.userinteraction.changer.PinChangerImpl
import ch.nevis.mobile.authentication.sdk.react.cache.state.NoOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.OperationState
import ch.nevis.mobile.authentication.sdk.react.cache.state.PinChange
import ch.nevis.mobile.authentication.sdk.react.cache.state.UserInteractionState
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.userinteraction.enroller.PinEnrollerImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.onerror.DefaultOnErrorImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.onsuccess.DefaultOnSuccessImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.selector.AccountSelectorImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.selector.AuthenticatorSelectorImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.selector.DeregistrationAuthenticatorSelectorImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.verifier.BiometricUserVerifierImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.verifier.DevicePasscodeUserVerifierImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.verifier.FingerprintUserVerifierImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.verifier.PinUserVerifierImpl
import ch.nevis.mobile.sdk.api.MobileAuthenticationClientError
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandAuthentication
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandRegistration
import ch.nevis.mobile.sdk.api.operation.pin.PinChanger
import ch.nevis.mobile.sdk.api.operation.pin.PinEnroller
import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelector
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelector
import ch.nevis.mobile.sdk.api.operation.userverification.BiometricUserVerifier
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodeUserVerifier
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerifier
import ch.nevis.mobile.sdk.api.operation.userverification.PinUserVerifier

sealed class UserInteractionOperation(
  open val pinEnroller: PinEnroller,
  open val authenticatorSelector: AuthenticatorSelector,
  open val accountSelector: AccountSelector,
  open val biometricUserVerifier: BiometricUserVerifier,
  open val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
  open val fingerprintUserVerifier: FingerprintUserVerifier,
  open val pinUserVerifier: PinUserVerifier,
  override var state: OperationState,
  override val onSuccess: (AuthorizationProvider?) -> Unit,
  override val onError: (MobileAuthenticationClientError) -> Unit
) : Operation<AuthorizationProvider>() {
    constructor(operationId: String, pinPolicy: PinPolicy?) : this(
        pinEnroller = PinEnrollerImpl(operationId, pinPolicy),
        authenticatorSelector = AuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        state = NoOperation,
        onSuccess = {},
        onError = {}
    )

    override fun cancel() {
        state.cancel()
    }

    fun update(userInteractionState: UserInteractionState): UserInteractionOperation {
        this.state = userInteractionState
        return this
    }
}

data class OutOfBandRegistrationOperation(
        override var pinEnroller: PinEnroller,
        override val authenticatorSelector: AuthenticatorSelector,
        override val accountSelector: AccountSelector,
        override val biometricUserVerifier: BiometricUserVerifier,
        override val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
        override val fingerprintUserVerifier: FingerprintUserVerifier,
        override val pinUserVerifier: PinUserVerifier,
        override var state: OperationState,
        override val onSuccess: (AuthorizationProvider?) -> Unit,
        override val onError: (MobileAuthenticationClientError) -> Unit,
        val registration: OutOfBandRegistration
) : UserInteractionOperation(
    pinEnroller,
    authenticatorSelector,
    accountSelector,
    biometricUserVerifier,
    devicePasscodeUserVerifier,
    fingerprintUserVerifier,
    pinUserVerifier,
    state,
    onSuccess,
    onError
) {
    constructor(operationId: String, registration: OutOfBandRegistration) : this(
        pinEnroller = PinEnrollerImpl(operationId, null),
        authenticatorSelector = AuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        onSuccess = { DefaultOnSuccessImpl(operationId, ReactMethodName.OOB_REGISTER).onSuccess() },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.OOB_REGISTER).onError(it)
        },
        state = NoOperation,
        registration = registration
    )

    fun update(operationId: String, pinPolicy: PinPolicy?): OutOfBandRegistrationOperation {
        pinEnroller = PinEnrollerImpl(operationId, pinPolicy)
        return this
    }
}

data class OutOfBandAuthenticationOperation(
    override var pinEnroller: PinEnroller,
    override val authenticatorSelector: AuthenticatorSelector,
    override val accountSelector: AccountSelector,
    override val biometricUserVerifier: BiometricUserVerifier,
    override val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
    override val fingerprintUserVerifier: FingerprintUserVerifier,
    override val pinUserVerifier: PinUserVerifier,
    override var state: OperationState,
    override val onSuccess: (AuthorizationProvider?) -> Unit,
    override val onError: (MobileAuthenticationClientError) -> Unit,
    val authentication: OutOfBandAuthentication
) : UserInteractionOperation(
    pinEnroller,
    authenticatorSelector,
    accountSelector,
    biometricUserVerifier,
    devicePasscodeUserVerifier,
    fingerprintUserVerifier,
    pinUserVerifier,
    state,
    onSuccess,
    onError
) {
    constructor(operationId: String, authentication: OutOfBandAuthentication) : this(
        pinEnroller = PinEnrollerImpl(operationId, null),
        authenticatorSelector = AuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        onSuccess = { DefaultOnSuccessImpl(operationId, ReactMethodName.OOB_AUTHENTICATE).onSuccess(it) },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.OOB_AUTHENTICATE).onError(it)
        },
        state = NoOperation,
        authentication = authentication
    )
}

data class RegistrationOperation(
    override val pinEnroller: PinEnroller,
    override val authenticatorSelector: AuthenticatorSelector,
    override val accountSelector: AccountSelector,
    override val biometricUserVerifier: BiometricUserVerifier,
    override val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
    override val fingerprintUserVerifier: FingerprintUserVerifier,
    override val pinUserVerifier: PinUserVerifier,
    override var state: OperationState,
    override var onSuccess: (AuthorizationProvider?) -> Unit,
    override var onError: (MobileAuthenticationClientError) -> Unit
) : UserInteractionOperation(
    pinEnroller,
    authenticatorSelector,
    accountSelector,
    biometricUserVerifier,
    devicePasscodeUserVerifier,
    fingerprintUserVerifier,
    pinUserVerifier,
    state,
    onSuccess,
    onError
) {
    constructor(operationId: String, pinPolicy: PinPolicy?) : this(
        pinEnroller = PinEnrollerImpl(operationId, pinPolicy),
        authenticatorSelector = AuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        onSuccess = {
            DefaultOnSuccessImpl(operationId, ReactMethodName.REGISTER).onSuccess()
        },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.REGISTER).onError(it)
        },
        state = NoOperation
    )
}

data class AuthenticationOperation(
    override val pinEnroller: PinEnroller,
    override val authenticatorSelector: AuthenticatorSelector,
    override val accountSelector: AccountSelector,
    override val biometricUserVerifier: BiometricUserVerifier,
    override val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
    override val fingerprintUserVerifier: FingerprintUserVerifier,
    override val pinUserVerifier: PinUserVerifier,
    override var state: OperationState,
    override var onSuccess: (AuthorizationProvider?) -> Unit,
    override var onError: (MobileAuthenticationClientError) -> Unit
) : UserInteractionOperation(
    pinEnroller,
    authenticatorSelector,
    accountSelector,
    biometricUserVerifier,
    devicePasscodeUserVerifier,
    fingerprintUserVerifier,
    pinUserVerifier,
    state,
    onSuccess,
    onError
) {
    constructor(operationId: String, pinPolicy: PinPolicy?) : this(
        pinEnroller = PinEnrollerImpl(operationId, pinPolicy),
        authenticatorSelector = AuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        onSuccess = {
            DefaultOnSuccessImpl(operationId, ReactMethodName.AUTHENTICATE).onSuccess(it)
        },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.AUTHENTICATE).onError(it)
        },
        state = NoOperation
    )
}

data class DeregistrationOperation(
    override val pinEnroller: PinEnroller,
    override val authenticatorSelector: AuthenticatorSelector,
    override val accountSelector: AccountSelector,
    override val biometricUserVerifier: BiometricUserVerifier,
    override val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
    override val fingerprintUserVerifier: FingerprintUserVerifier,
    override val pinUserVerifier: PinUserVerifier,
    override var state: OperationState,
    override var onSuccess: (AuthorizationProvider?) -> Unit,
    override var onError: (MobileAuthenticationClientError) -> Unit
) : UserInteractionOperation(
    pinEnroller,
    authenticatorSelector,
    accountSelector,
    biometricUserVerifier,
    devicePasscodeUserVerifier,
    fingerprintUserVerifier,
    pinUserVerifier,
    state,
    onSuccess,
    onError,
) {
    constructor(operationId: String) : this(
        pinEnroller = PinEnrollerImpl(operationId, null),
        authenticatorSelector = DeregistrationAuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        onSuccess = {
            DefaultOnSuccessImpl(operationId, ReactMethodName.DEREGISTER).onSuccess()
        },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.DEREGISTER).onError(it)
        },
        state = NoOperation
    )

    override fun cancel() {
        state.cancel()
    }
}

class AuthCloudApiRegistrationOperation(
    override val pinEnroller: PinEnroller,
    override val authenticatorSelector: AuthenticatorSelector,
    override val accountSelector: AccountSelector,
    override val biometricUserVerifier: BiometricUserVerifier,
    override val devicePasscodeUserVerifier: DevicePasscodeUserVerifier,
    override val fingerprintUserVerifier: FingerprintUserVerifier,
    override val pinUserVerifier: PinUserVerifier,
    override var state: OperationState,
    override var onSuccess: (AuthorizationProvider?) -> Unit,
    override var onError: (MobileAuthenticationClientError) -> Unit
) : UserInteractionOperation(
    pinEnroller,
    authenticatorSelector,
    accountSelector,
    biometricUserVerifier,
    devicePasscodeUserVerifier,
    fingerprintUserVerifier,
    pinUserVerifier,
    state,
    onSuccess,
    onError
) {

    constructor(operationId: String, pinPolicy: PinPolicy?) : this(
        pinEnroller = PinEnrollerImpl(operationId, pinPolicy),
        authenticatorSelector = AuthenticatorSelectorImpl(operationId),
        accountSelector = AccountSelectorImpl(operationId),
        biometricUserVerifier = BiometricUserVerifierImpl(operationId),
        devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId),
        fingerprintUserVerifier = FingerprintUserVerifierImpl(operationId),
        pinUserVerifier = PinUserVerifierImpl(operationId),
        onSuccess = {
            DefaultOnSuccessImpl(operationId, ReactMethodName.AUTH_CLOUD_API_REGISTER).onSuccess(it)
        },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.AUTH_CLOUD_API_REGISTER).onError(it)
        },
        state = NoOperation
    )
}

data class PinChangeOperation(
	val pinChanger: PinChanger,
	override var state: OperationState,
	override var onSuccess: (Unit?) -> Unit,
	override var onError: (MobileAuthenticationClientError) -> Unit
) : Operation<Unit>() {
	constructor(operationId: String, pinPolicy: PinPolicy?) : this(
		pinChanger = PinChangerImpl(operationId, pinPolicy),
		onSuccess = {
			DefaultOnSuccessImpl(operationId, ReactMethodName.PIN_CHANGE).onSuccess()
		},
		onError = {
			DefaultOnErrorImpl(operationId, ReactMethodName.PIN_CHANGE).onError(it)
		},
		state = NoOperation
	)

	override fun cancel() {
		state.cancel()
	}

	fun update(pinChangeState: PinChange): PinChangeOperation {
		this.state = pinChangeState
		return this
	}
}
