```
---
"title": "Using @datadog/mobile-react-native-babel-plugin Package",
"description": "A markdown tutorial on how to use the @datadog/mobile-react-native-babel-plugin package for integrating Datadog with React Native applications.",
"created_at": "August 4, 2021",
"published": true
---

# Using @datadog/mobile-react-native-babel-plugin Package

The @datadog/mobile-react-native-babel-plugin package is used for integrating Datadog with React Native applications by performing necessary transformations. Follow the steps below to install and enable the plugin in your project.

## Installing the Package

You can install the @datadog/mobile-react-native-babel-plugin package using npm or yarn.

#### with npm

```
npm i @datadog/mobile-react-native-babel-plugin --save
```

#### with yarn

```
yarn add @datadog/mobile-react-native-babel-plugin
```

## Enabling the Plugin

To enable the @datadog/mobile-react-native-babel-plugin, you need to update your babel configuration file (babel.config.js) as shown below.

### `babel.config.js` Example

```JavaScript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['@datadog/mobile-react-native-babel-plugin'],
};
```

By following these steps, you can successfully integrate Datadog with your React Native application using the @datadog/mobile-react-native-babel-plugin package.
```