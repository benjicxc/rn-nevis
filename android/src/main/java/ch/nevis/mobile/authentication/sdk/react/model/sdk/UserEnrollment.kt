/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.Account
import ch.nevis.mobile.sdk.api.localdata.UserEnrollment.OsUserEnrollment
import ch.nevis.mobile.sdk.api.localdata.UserEnrollment.SdkUserEnrollment
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

enum class UserEnrollmentType(val type: String) {
    OS(OsUserEnrollment::class.java.simpleName),
    SDK(SdkUserEnrollment::class.java.simpleName),
}

@Serializable
data class OsUserEnrollmentImpl(
    @SerialName("isEnrolled")
    val enrolled: Boolean,
    @SerialName("isEnrolledWithClass2OrClass3Sensor")
    val enrolledWithClass2OrClass3Sensor: Boolean,
) : OsUserEnrollment {
    override fun isEnrolled(): Boolean = enrolled
    override fun isEnrolledWithClass2OrClass3Sensor(): Boolean = enrolledWithClass2OrClass3Sensor
}

fun OsUserEnrollment.toDto(): OsUserEnrollmentImpl {
    return OsUserEnrollmentImpl(isEnrolled, isEnrolledWithClass2OrClass3Sensor)
}

@Serializable
data class SdkUserEnrollmentImpl(
    val enrolledAccounts: Set<AccountImpl>,
) : SdkUserEnrollment {
    override fun isEnrolled(username: String?): Boolean {
        username?.let { checkedUsername: String ->
            return enrolledAccounts.any { checkedUsername == it.username() }
        }
        return false
    }

    override fun enrolledAccounts(): Set<Account> = enrolledAccounts
}

fun SdkUserEnrollment.toDto(): SdkUserEnrollmentImpl {
    return SdkUserEnrollmentImpl(enrolledAccounts().toDto())
}