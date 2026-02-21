# Android Setup for Bluetooth Printing

To enable Bluetooth printing on Android (especially Android 12+), you need to configure permissions correctly.

## 1. Install Required Plugins

Run the following commands in your project root to install the necessary Cordova plugins for Capacitor:

```bash
npm install cordova-plugin-bluetooth-serial
npm install cordova-plugin-android-permissions
npx cap sync
```

## 2. Update Android Manifest

You need to add specific permissions to your `AndroidManifest.xml` file.

**File Location:** `android/app/src/main/AndroidManifest.xml`

Paste the following `<uses-permission>` tags inside the `<manifest>` tag, before the `<application>` tag:

```xml
<!-- Bluetooth Permissions -->
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

<!-- Location Permission (Required for Bluetooth scanning on Android 6-11) -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Android 12+ (API 31+) Permissions -->
<!-- 'neverForLocation' indicates we only use Bluetooth for connecting, not tracking location -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
```

## 3. Build and Run

After updating the manifest, rebuild your Android app:

```bash
npx cap open android
```

Then run the app from Android Studio.
