/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.CookieListSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.JwtSerializer
import ch.nevis.mobile.sdk.api.authorization.Cookie
import ch.nevis.mobile.sdk.api.authorization.Jwt
import ch.nevis.mobile.sdk.api.authorization.SessionProvider.CookieSessionProvider
import ch.nevis.mobile.sdk.api.authorization.SessionProvider.EmptySessionProvider
import ch.nevis.mobile.sdk.api.authorization.SessionProvider.JwtSessionProvider
import kotlinx.serialization.Serializable

enum class SessionProviderType(val type: String) {
    EMPTY(EmptySessionProvider::class.java.simpleName),
    COOKIE(CookieSessionProvider::class.java.simpleName),
    JWT(JwtSessionProvider::class.java.simpleName)
}

@Serializable
class EmptySessionProviderImpl : EmptySessionProvider

@Suppress("unused")
fun EmptySessionProvider.toDto(): EmptySessionProviderImpl {
    return EmptySessionProviderImpl()
}

@Serializable
data class CookieSessionProviderImpl(
    @Serializable(with = CookieListSerializer::class)
    val cookies: List<Cookie>
) : CookieSessionProvider {

    override fun cookies(): List<Cookie> = cookies
}

fun CookieSessionProvider.toDto(): CookieSessionProviderImpl {
    return CookieSessionProviderImpl(cookies())
}

@Serializable
data class JwtSessionProviderImpl(
    @Serializable(with = JwtSerializer::class)
    val jwt: Jwt
) : JwtSessionProvider {
    override fun jwt(): Jwt = jwt
}

fun JwtSessionProvider.toDto(): JwtSessionProviderImpl {
    return JwtSessionProviderImpl(jwt())
}
