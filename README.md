# Nevis Mobile Authentication Client SDK for React Native

[![NPM package](https://img.shields.io/npm/v/@nevis-security/nevis-mobile-authentication-sdk-react?style=flat-square
)](https://npmjs.org/package/@nevis-security/nevis-mobile-authentication-sdk-react)

The _Nevis Mobile Authentication Client SDK for React Native_ is a plugin which is part of the Nevis Mobile Authentication solution which enables secure, seamless and passwordless authentication by letting users verify their account using their mobile device.

This React Native plugin enables applications to leverage [FIDO UAF 1.1 authentication capabilities](https://fidoalliance.org/specs/fido-uaf-complete-specifications.zip) as implemented in the Nevis Identity Suite, Authentication Cloud or Identity Cloud backend. The SDK can be embedded in React Native applications to provide an implementation of mobile authentication scenarios such as registration, web- and out-of-app authentication, in-app authentication, transaction confirmation and deregistration.

For more details please consult [our Documentation Portal](https://docs.nevis.net).

## Getting Started

### Requirements

Your development setup has to meet the following prerequisites:

* iOS 12.4 or later
* Xcode 14.x, including Swift 5.7
* Android 6 or later, with API level 23
* Android 10 or later, with API level 29, for the biometric authenticator to work
* Android 11 or later, with API level 30, for the device passcode authenticator to work
* Gradle 7.4 or later
* Android Gradle Plugin `com.android.tools.build:gradle` 7.4.2 or later
* Kotlin Gradle Plugin `org.jetbrains.kotlin:kotlin-gradle-plugin` 1.8.21 or later
* React Native 0.72.x

### Installation

To add Nevis Mobile Authentication Client SDK to your React Native application read the installation instructions below.
Below are the **required** instructions for Nevis Mobile Authentication SDK to work correctly.

<details>
<summary>React Native</summary>

**React Native Application dependencies**

Add the `nevis-mobile-authentication-sdk-react` package to your React Native application.

```shell
yarn add @nevis-security/nevis-mobile-authentication-sdk-react@3.5.0
```
</details>

<details>
<summary>Android</summary>

**Gradle Configuration**

Add the following to your `android/gradle.properties` file:

```groovy
android.useAndroidX=true
android.enableJetifier=true
android.enableDexingArtifactTransform=false
```

**Repository Configuration**

The Nevis Mobile Authentication Client SDK for Android is published as a GitHub package. You have to specify the repository in your `android/build.gradle` file:

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
        maven {
            url "https://maven.pkg.github.com/nevissecurity/nevis-mobile-authentication-sdk-android-package"
            credentials {
                username = < GITHUB_USERNAME >
                password = < GITHUB_PERSONAL_ACCESS_TOKEN >
            }
        }
    }
}
```

> **Warning**
> Accessing GitHub packages requires you to have a GitHub account. You must provide a Personal Access Token, as described [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry#using-a-published-package).

**Dependency Configuration**

Declare the Nevis Mobile Authentication Client SDK as a dependency in your `android/app/build.gradle` file:

```groovy
dependencies {
    //noinspection GradleDynamicVersion
    debugImplementation 'ch.nevis:nevis-mobile-authentication-sdk-android-debug:3.5.+'
}
```

> **Warning**
> The package repository only exposes the `debug` flavor. To use the `release` flavor contact us on [sales@nevis.net](mailto:sales@nevis.net).
>

</details>

<details>
<summary>iOS</summary>

**Dependency Configuration**

To integrate Nevis Mobile Authentication Client SDK into your React Native application using CocoaPods, specify it in your Podfile:

```ruby
pod 'NevisMobileAuthentication', :configurations => ['Release']
pod 'NevisMobileAuthentication-Debug', :configurations => ['Debug']
```

**Bitcode Support**

As the native iOS SDK does not provide Bitcode support, the following post install step needs to be
added to the Podfile:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['ENABLE_BITCODE'] = 'NO' # NMA SDK does not support Bitcode
    end
  end
end
```
**Enable FaceID for iOS**

Modify your applications `Info.plist` file to add a description for the `NSFaceIDUsageDescription` key in order to use the FaceID authenticator. Ideally, this value should be localised.

```xml
<key>NSFaceIDUsageDescription</key>
<string>Enabling Face ID allows you to use the Face Recognition authenticator.</string>
```

</details>

## License

Nevis Mobile Authentication Client SDK for React Native is released under a commercial license. See [LICENSE](LICENSE) for details.

© 2023 made with ❤ by Nevis
