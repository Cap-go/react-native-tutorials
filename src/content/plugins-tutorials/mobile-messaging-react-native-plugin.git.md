---
"title": "Tutorial: Using infobip-mobile-messaging-react-native-plugin Package",
"description": "This tutorial provides a step-by-step guide on how to integrate and use the infobip-mobile-messaging-react-native-plugin package in React Native applications.",
"created_at": "2022-01-08",
"published": true
---

# Tutorial: Using infobip-mobile-messaging-react-native-plugin Package

## Introduction
The **infobip-mobile-messaging-react-native-plugin** is a powerful tool that allows you to easily integrate push notification channels into your React Native application. In this tutorial, we will walk you through the process of setting up and using this package in your project.

## Prerequisites
Before getting started, make sure you have the following prerequisites installed:

- **node**: v20.16.0 or higher
- **ruby**: 2.7.8 or higher
- **React Native**: v0.75.4

For **iOS** projects:
- **Xcode** and Command Line Tools (16.x)
- **CocoaPods**: v1.15.2
- Minimum deployment target: 13.0

For **Android** projects:
- **Android Studio**: Ladybug | 2024.2.1
- **Gradle**: v8.8
- Supported API Levels: 21 (Android 5.0) - 35 (Android 15.0)

## Getting Started
Follow these steps to start using the **infobip-mobile-messaging-react-native-plugin**:

1. **Setup Your Application at Infobip Portal**:
   Make sure you have set up your application at the [Infobip Portal](https://www.infobip.com/docs/mobile-app-messaging/getting-started#create-and-enable-a-mobile-application-profile).

2. **Install the Plugin**:
   Run the following command in your terminal to add the plugin to your project:
   ```bash
   $ npm install infobip-mobile-messaging-react-native-plugin
   ```
   TypeScript definitions are included in the npm package.

3. **Configure the Platforms**:
   - **iOS**:
     - ...

4. **Initialize the SDK**:
   Use the following code snippet to initialize the package in your React Native codebase:

   ```javascript
   import { mobileMessaging } from 'infobip-mobile-messaging-react-native-plugin';

   someMethod(): void {
       mobileMessaging.init(
           {
              applicationCode: '<your app code>',
              ios: {
                 notificationTypes: ['alert', 'badge', 'sound'],
              },
           },
           () => {
              console.log('MobileMessaging started');
           },
           error => {
              console.log('MobileMessaging error: ', error);
           },
       );
   }
   ```
   <details><summary>Expand to see TypeScript code</summary>
   <p>

   ```typescript
   import { mobileMessaging } from 'infobip-mobile-messaging-react-native-plugin';

   someMethod(): void {
       mobileMessaging.init(
           {
              applicationCode: '<your app code>',
              ios: {
                 notificationTypes: ['alert', 'badge', 'sound'],
              },
           },
           () => {
              console.log('MobileMessaging started');
           },
           (error: MobileMessagingError) => {
              console.log('MobileMessaging error: ', error);
           },
       );
   }
   ```

   </p>
   </details>

## Additional Resources
For more details on the SDK features and FAQ, you can refer to the [Wiki](https://github.com/infobip/mobile-messaging-react-native-plugin/wiki).

**NEXT STEPS:** [Users and Installations](https://github.com/infobip/mobile-messaging-react-native-plugin/wiki/Users-and-installations)

If you have any questions or suggestions, feel free to send an email to support@infobip.com or create an [issue](https://github.com/infobip/mobile-messaging-react-native-plugin/issues).