```markdown
---
"title": "Tutorial on Using rn-pagseguro-plugin Package",
"description": "A step-by-step guide on how to utilize the rn-pagseguro-plugin package in your React Native project.",
"created_at": "2022-02-25",
"published": true
---

## Getting Started

To begin using the `rn-pagseguro-plugin` package, you need to first install it in your React Native project. Use the following command:

```sh
npm install react-native-plug-pag-service --save
```

### Automatic Installation

For automatic linking, you can use the following command:

```sh
react-native link react-native-plug-pag-service
```

### Manual Setup

1. Open `android/app/src/main/java/[...]/MainApplication.java`
    - Add `import com.reactlibrary.PlugPagServicePackage;` to the imports section.
    - Include `new PlugPagServicePackage()` in the list returned by the `getPackages()` method.

2. Update `android/settings.gradle`:

    ```
    include ':react-native-plug-pag-service'
    project(':react-native-plug-pag-service').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-plug-pag-service/android')
    ```

3. Inside `android/app/build.gradle`, add the following inside the dependencies block:

    ```
    compile project(':react-native-plug-pag-service')
    ```

4. In your `AndroidManifest.xml`, add the permission required for the library:

    ```xml
    <uses-permission android:name="br.com.uol.pagseguro.permission.MANAGE_PAYMENTS"/>
    ```

5. Add an Intent-filter to your main Android Activity:

    ```xml
    <intent-filter>
        <action android:name="br.com.uol.pagseguro.PAYMENT"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
    ```

## Usage

Import the necessary components from the package in your JavaScript file:

```javascript
import PlugPagService, { PlugPag, PlugPagPaymentData, PlugPagActivationData } from 'rn-pagseguro-plugin';
```

Feel free to explore the different functionality and features provided by the `rn-pagseguro-plugin` in your React Native application.
```