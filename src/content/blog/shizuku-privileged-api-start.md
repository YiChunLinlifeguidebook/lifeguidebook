---
title: "Understanding moe.shizuku.privileged.api.START"
description: "A comprehensive guide to using the Shizuku privileged API START action for Android development"
pubDate: "Feb 17 2026"
heroImage: "/blog-placeholder-3.jpg"
---

# Understanding moe.shizuku.privileged.api.START

## Introduction

Shizuku is a powerful Android system that allows applications to use system APIs directly with elevated privileges through ADB or root access. One of the fundamental actions in the Shizuku API is the `moe.shizuku.privileged.api.START` action, which is essential for establishing communication between your application and the Shizuku service.

## What is moe.shizuku.privileged.api.START?

The `moe.shizuku.privileged.api.START` is a broadcast action that initiates the Shizuku privileged API service. This action is crucial for:

- Starting the Shizuku service when needed
- Establishing a connection between your app and Shizuku
- Preparing the environment for privileged operations
- Ensuring the service is available for subsequent API calls

## How It Works

When you send an intent with the `moe.shizuku.privileged.api.START` action, the Android system:

1. **Locates the Shizuku service** - Finds the installed Shizuku manager app
2. **Initiates the service** - Starts the privileged API service if not already running
3. **Establishes IPC** - Sets up Inter-Process Communication channels
4. **Returns control** - Allows your app to proceed with privileged operations

## Implementation

### Basic Usage

Here's how to send the START action in your Android application:

```java
Intent intent = new Intent("moe.shizuku.privileged.api.START");
intent.setPackage("moe.shizuku.privileged.api");
context.sendBroadcast(intent);
```

### With Permission Check

It's recommended to check if Shizuku is installed and has the necessary permissions before sending the START action:

```java
private void startShizukuService() {
    try {
        // Check if Shizuku is installed
        PackageManager pm = getPackageManager();
        pm.getPackageInfo("moe.shizuku.privileged.api", 0);

        // Send START action
        Intent intent = new Intent("moe.shizuku.privileged.api.START");
        intent.setPackage("moe.shizuku.privileged.api");
        sendBroadcast(intent);

        Log.d("Shizuku", "START action sent successfully");
    } catch (PackageManager.NameNotFoundException e) {
        Log.e("Shizuku", "Shizuku is not installed");
    }
}
```

### With Kotlin

For Kotlin developers, here's the equivalent implementation:

```kotlin
private fun startShizukuService() {
    try {
        // Verify Shizuku installation
        packageManager.getPackageInfo("moe.shizuku.privileged.api", 0)

        // Send START broadcast
        val intent = Intent("moe.shizuku.privileged.api.START").apply {
            setPackage("moe.shizuku.privileged.api")
        }
        sendBroadcast(intent)

        Log.d("Shizuku", "START action sent successfully")
    } catch (e: PackageManager.NameNotFoundException) {
        Log.e("Shizuku", "Shizuku is not installed", e)
    }
}
```

## Manifest Configuration

To use the Shizuku API, your app needs to declare the appropriate permissions in `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.yourapp">

    <!-- Shizuku permission -->
    <uses-permission android:name="moe.shizuku.manager.permission.API_V23" />

    <!-- Optional: If you need to detect Shizuku installation -->
    <queries>
        <package android:name="moe.shizuku.privileged.api" />
    </queries>

    <application>
        <!-- Your application components -->
    </application>
</manifest>
```

## Best Practices

### 1. Check Availability First

Always verify that Shizuku is installed and authorized before attempting to use the API:

```java
public boolean isShizukuAvailable() {
    try {
        if (Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED) {
            return Shizuku.pingBinder();
        }
    } catch (Exception e) {
        Log.e("Shizuku", "Error checking availability", e);
    }
    return false;
}
```

### 2. Handle Permission Requests

Request Shizuku permissions when needed:

```java
private static final int REQUEST_CODE_SHIZUKU = 1000;

private void requestShizukuPermission() {
    if (Shizuku.checkSelfPermission() == PackageManager.PERMISSION_DENIED) {
        if (Shizuku.shouldShowRequestPermissionRationale()) {
            // Show explanation to user
            showPermissionRationale();
        }
        Shizuku.requestPermission(REQUEST_CODE_SHIZUKU);
    }
}
```

### 3. Graceful Error Handling

Always implement proper error handling:

```java
try {
    startShizukuService();
    // Proceed with privileged operations
} catch (SecurityException e) {
    // Handle permission denied
    Log.e("Shizuku", "Permission denied", e);
    showPermissionDialog();
} catch (RemoteException e) {
    // Handle service connection issues
    Log.e("Shizuku", "Service connection failed", e);
    showErrorDialog("Cannot connect to Shizuku service");
}
```

## Common Use Cases

### 1. System Package Management

```java
// After starting Shizuku service
IPackageManager pm = IPackageManager.Stub.asInterface(
    new ShizukuBinderWrapper(SystemServiceHelper.getSystemService("package"))
);
pm.installPackage(packageUri, observer, flags, installerPackageName);
```

### 2. System Settings Modification

```java
// Modify secure settings with elevated privileges
Settings.Secure.putString(
    context.getContentResolver(),
    Settings.Secure.SETTING_NAME,
    "value"
);
```

### 3. File System Operations

```java
// Access protected file system locations
File systemFile = new File("/system/app/SomeApp");
if (systemFile.exists()) {
    // Perform operations
}
```

## Troubleshooting

### Service Not Starting

**Problem:** The START action doesn't initiate the service.

**Solutions:**
- Ensure Shizuku manager app is installed
- Verify the device has ADB enabled or is rooted
- Check that Shizuku service is authorized in the manager app
- Restart Shizuku service from the manager app

### Permission Denied

**Problem:** Operations fail with `SecurityException`.

**Solutions:**
- Request runtime permissions using `Shizuku.requestPermission()`
- Check manifest declarations for Shizuku permissions
- Verify user has granted permissions in Shizuku manager

### Connection Timeout

**Problem:** Service takes too long to respond.

**Solutions:**
- Wait for service to fully initialize before making calls
- Implement retry logic with exponential backoff
- Check device performance and resource availability

## Additional Resources

- **Shizuku GitHub Repository:** [https://github.com/RikkaApps/Shizuku](https://github.com/RikkaApps/Shizuku)
- **API Documentation:** [https://github.com/RikkaApps/Shizuku-API](https://github.com/RikkaApps/Shizuku-API)
- **Sample Applications:** Check the Shizuku repository for example implementations
- **Community Support:** XDA Developers forum and GitHub Issues

## Conclusion

The `moe.shizuku.privileged.api.START` action is the gateway to utilizing Shizuku's powerful privileged API system. By properly implementing this action and following best practices, developers can create sophisticated Android applications that leverage system-level capabilities while maintaining a clean and safe architecture.

Remember to always respect user privacy, handle permissions transparently, and implement proper error handling for a robust user experience. The Shizuku API opens up numerous possibilities for advanced Android development, from custom system modifications to enhanced app management features.

## Security Considerations

When using privileged APIs:

1. **User Consent:** Always inform users about what privileged operations your app performs
2. **Minimal Permissions:** Request only the permissions your app actually needs
3. **Secure Communication:** Ensure all IPC with Shizuku service is secure
4. **Audit Trail:** Log privileged operations for debugging and transparency
5. **Regular Updates:** Keep Shizuku and your app updated to address security vulnerabilities

By following these guidelines, you can safely and effectively leverage the `moe.shizuku.privileged.api.START` action in your Android applications.
