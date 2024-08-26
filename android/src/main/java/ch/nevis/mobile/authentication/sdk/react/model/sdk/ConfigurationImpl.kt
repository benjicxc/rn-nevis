/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import android.annotation.SuppressLint
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import ch.nevis.mobile.authentication.sdk.react.util.ApplicationProvider
import ch.nevis.mobile.sdk.api.Configuration
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable
import java.net.URI

@Serializable
data class ConfigurationImpl(
    val baseUrl: String,
    val registrationRequestPath: String,
    val registrationResponsePath: String,
    val authenticationRequestPath: String,
    val authenticationResponsePath: String,
    val dispatchTargetResourcePath: String,
    val deregistrationRequestPath: String,
    val networkTimeoutInSeconds: Long,
    val authenticationRetryIntervalInSeconds: Long,
    val authenticationMaxRetries: Int,
    val userInteractionTimeoutInSeconds: Long,
    val facetId: String? = null
) : Configuration {

    @Suppress("DEPRECATION")
    @SuppressLint("PackageManagerGetSignatures")
    override fun packageInfo(): PackageInfo {
        val application = ApplicationProvider.application
            ?: throw IllegalStateException("Application provider has not been initialized properly.")
        return application.packageManager.getPackageInfo(
            application.packageName,
            PackageManager.GET_SIGNATURES
        )
    }

    override fun baseUrl(): URI = URI.create(baseUrl)

    override fun registrationRequestPath(): String = registrationRequestPath

    override fun registrationResponsePath(): String = registrationResponsePath

    override fun authenticationRequestPath(): String = authenticationRequestPath

    override fun authenticationResponsePath(): String = authenticationResponsePath

    override fun dispatchTargetResourcePath(): String = dispatchTargetResourcePath

    override fun deregistrationRequestPath(): String = deregistrationRequestPath

    override fun networkTimeoutInSeconds(): Long = networkTimeoutInSeconds

    @Deprecated("Deprecated since 3.2.0", ReplaceWith("Authentication.retryPolicyObtainingAuthorizationProvider(RetryPolicy)"))
    override fun authenticationRetryIntervalInSeconds(): Long = authenticationRetryIntervalInSeconds

    @Deprecated("Deprecated since 3.2.0", ReplaceWith("Authentication.retryPolicyObtainingAuthorizationProvider(RetryPolicy)"))
    override fun authenticationMaxRetries(): Int = authenticationMaxRetries

    override fun userInteractionTimeoutInSeconds(): Long = userInteractionTimeoutInSeconds

    override fun facetId(): Optional<String> = Optional.ofNullable(facetId)
}

fun Configuration.toDto(): ConfigurationImpl {
    return ConfigurationImpl(
        baseUrl().toString(),
        registrationRequestPath(),
        registrationResponsePath(),
        authenticationRequestPath(),
        authenticationResponsePath(),
        dispatchTargetResourcePath(),
        deregistrationRequestPath(),
        networkTimeoutInSeconds(),
        authenticationRetryIntervalInSeconds(),
        authenticationMaxRetries(),
        userInteractionTimeoutInSeconds(),
        facetId().orElse(null)
    )
}
