/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.CookieListSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.JwtSerializer
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider.CookieAuthorizationProvider
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider.EmptyAuthorizationProvider
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider.JwtAuthorizationProvider
import ch.nevis.mobile.sdk.api.authorization.Cookie
import ch.nevis.mobile.sdk.api.authorization.Jwt
import kotlinx.serialization.Serializable

enum class AuthorizationProviderType(val type: String) {
    EMPTY(EmptyAuthorizationProvider::class.java.simpleName),
    COOKIE(CookieAuthorizationProvider::class.java.simpleName),
    JWT(JwtAuthorizationProvider::class.java.simpleName)
}

@Serializable
class EmptyAuthorizationProviderImpl : EmptyAuthorizationProvider

@Suppress("unused")
fun EmptyAuthorizationProvider.toDto(): EmptyAuthorizationProviderImpl {
    return EmptyAuthorizationProviderImpl()
}

@Serializable
data class CookieAuthorizationProviderImpl(
    @Serializable(with = CookieListSerializer::class)
    val cookies: List<Cookie>
) : CookieAuthorizationProvider {
    override fun cookies(): List<Cookie> = cookies
}

fun CookieAuthorizationProvider.toDto(): CookieAuthorizationProviderImpl {
    return CookieAuthorizationProviderImpl(cookies())
}

@Serializable
data class JwtAuthorizationProviderImpl(
    @Serializable(with = JwtSerializer::class)
    val jwt: Jwt
) : JwtAuthorizationProvider {
    override fun jwt(): Jwt = jwt
}

fun JwtAuthorizationProvider.toDto(): JwtAuthorizationProviderImpl {
    return JwtAuthorizationProviderImpl(jwt())
}

