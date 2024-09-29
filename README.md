# :rocket: Bitcoin Addition

## Env variables

- API_URL - backend api path

#### _Before you run the application you must create env files_

#### How to run project

- Run command `npm i`

#### Run on ios

- Run command `npx pod-install`
- Run command `npm run ios`

#### Run on android

- Run command `npm run android`

# Project structure

- src/assets - folder for saving data like images, icons, fonts
- src/components - shared UI components for mobile platforms
- src/screens -folder with screens
- src/utils - extra function

# Generating the development build APK

- Run commands:

`npx run create-env:dev`

`cd android`

`./gradlew assembleDebug`

The generated APK can be found under android/app/build/outputs/apk/debug/app-debug.apk

# Generating the release(prod) AAB to Google Play

_At first, you need to increase the version or build of app_

- Run commands:

`npx run create-env:prod`

`cd android`

`./gradlew bundleRelease`

The generated AAB can be found under android/app/build/outputs/bundle/release/app-release.aab, and is ready to be uploaded to Google Play.

# Generating the debug(dev) AAB to Google Play

_At first, you need to increase the version or build of app_

- Run commands:

`npx run create-env:dev`

`cd android`

`./gradlew bundleDebug`

The generated AAB can be found under android/app/build/outputs/bundle/debug/app-debug.aab, and is ready to be uploaded to Google Play for testing team.
