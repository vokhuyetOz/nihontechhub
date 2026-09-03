# Set up and run fastlane for Android

## Installing fastlane

[Prepare for fastlane, must read it first (almost steps have been set up in base code)](FASTLANE.PRE.md)

## Set up fastlane for Android

* ```powershell
    cd android
    ```

* ```powershell
    bundle exec fastlane init
    ```

You'll be asked to confirm that you're ready to begin, and then for a few pieces of information. To get started quickly:

1. Provide the package name for your application when asked (e.g. io.fabric.yourapp)
2. Press enter when asked for the path to your json secret file
3. Answer `'n'` when asked if you plan on uploading info to Google Play via fastlane (we can set this up later)

That's it! fastlane will automatically generate a configuration for you based on the information provided.

You can see the newly created ./fastlane directory, with the following files:

1. Appfile which defines configuration information that is global to your app
2. Fastfile which defines the "lanes" that drive the behavior of fastlane

## Set up beta testing services Firebase App Distribution (similiar to Testflight on iOS)

Install the Firebase App Distribution plugin:

* ```powershell
    cd android
    ```

* ```powershell
    bundle exec fastlane add_plugin firebase_app_distribution
    ```

If the command prompts you with an option, select Option 3: RubyGems.org

* Authenticate with Firebase

    ```powershell
    firebase login
    ```

    or

    ```powershell
    firebase login:ci
    ```

    to get token for deploying in CI environment

* Create an project in [Firebase console](https://console.firebase.google.com)
  * fist step, [add firebase to your project](https://firebase.google.com/docs/android/setup#console)

  * Go to `(Project_name)/Release & Monitor/App Distribution` to create Tester and Groups. Groups's name will be also updated in Fastfile(both android and ios).
* Update `app` and `firebase_cli_token` in android/fastlane/Fastfile

## Run fastlane

* [Optional] Change versionName in android/app/build.grade when need to build native code
* No need to change versionCode, it will be increased automatically.
* `cd android`
* Run `bundle exec fastlane firebase_distribution`
