/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.RetryPolicy
import kotlinx.serialization.Serializable

enum class RetryPolicyType(val type: String) {
    NO_RETRY(RetryPolicy.NoRetry::class.java.simpleName),
    CONSTANT(RetryPolicy.Constant::class.java.simpleName),
    EXPONENTIAL(RetryPolicy.Exponential::class.java.simpleName)
}

@Serializable
class NoRetryPolicyImpl: RetryPolicy.NoRetry

@Suppress("unused")
fun RetryPolicy.NoRetry.toDto(): NoRetryPolicyImpl {
    return NoRetryPolicyImpl()
}

@Serializable
data class ConstantRetryPolicyImpl(
    val maxRetries: Int,
    val delayInSeconds: Long
): RetryPolicy.Constant {
    override fun maxRetries(): Int = maxRetries

    override fun delayInSeconds(): Long = delayInSeconds
}

fun RetryPolicy.Constant.toDto(): ConstantRetryPolicyImpl {
    return ConstantRetryPolicyImpl(
        maxRetries(),
        delayInSeconds()
    )
}

@Serializable
data class ExponentialRetryPolicyImpl(
    val maxRetries: Int,
    val initialDelayInSeconds: Long,
    val multiplier: Double,
    val maximumDelayInSeconds: Long
): RetryPolicy.Exponential {
    override fun maxRetries(): Int = maxRetries

    override fun initialDelayInSeconds(): Long = initialDelayInSeconds

    override fun multiplier(): Double = multiplier

    override fun maximumDelayInSeconds(): Long = maximumDelayInSeconds
}

fun RetryPolicy.Exponential.toDto(): ExponentialRetryPolicyImpl {
    return ExponentialRetryPolicyImpl(
        maxRetries(),
        initialDelayInSeconds(),
        multiplier(),
        maximumDelayInSeconds()
    )
}

