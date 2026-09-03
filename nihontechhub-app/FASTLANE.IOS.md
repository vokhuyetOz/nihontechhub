# Set up and run fastlane for iOS

## Installing fastlane

[Prepare for fastlane, must read it first (almost steps have been set up in base code)](FASTLANE.PRE.md)

## Set up fastlane for iOS

* ```powershell
    cd ios
    ```

* ```powershell
    bundle exec fastlane init
    ```

  Note that if you want to create your first app on your App Store Connect account, you need to set the developer name (company_name) with PRODUCE_COMPANY_NAME environment variable:

  ```powershell
  PRODUCE_COMPANY_NAME="YOUR COMPANY NAME" fastlane init
  ```

That's it! fastlane will automatically generate a configuration for you based on the information provided.

You can see the newly created ./fastlane directory, with the following files:

1. Appfile which defines configuration information that is global to your app
2. Fastfile which defines the "lanes" that drive the behavior of fastlane

## Set up environment variables

Fastlane requires some environment variables set up to run correctly. In particular, having your locale not set to a UTF-8 locale will cause issues with building and uploading your build. In your shell profile add the following lines:

```powershell
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

You can find your shell profile at ~/.bashrc, ~/.bash_profile, ~/.profile or `~/.zshrc` (default on mac) depending on your system.

## Set up Match

Match is used to manage provisions and certificates across team

* ```powershell
    cd ios
    ```

* ```powershell
    bundle exec fastlane match init
    ```

  1. choose `git` as storage container.
  2. paste common `private git repo`. Usually it is [https://git.rabiloo.net/mobile/fastlane_app_distribution](https://git.rabiloo.net/mobile/fastlane_app_distribution)
  
* ```powershell
  bundle exec fastlane match
  ```

1. Enter the passphrase (`MATCH_PASSWORD` in `ios/fastlane/.env.default`) that should be used to encrypt/decrypt your certificates. This passphrase is specific per repository and will be stored in your local keychain
2. Make sure to remember the password, as you'll need it when you run match (`bundle exec fastlane match`) on a different machine to sync exactly created profile and certificate.

Make sure your git account is granted access to private git repo

**You can choose Firebase App Distribution or [Testflight](#set-up-beta-testing-services-testflight)**

## Set up beta testing services Firebase App Distribution (similiar to Testflight)

Install the Firebase App Distribution plugin:

* ```powershell
    cd ios
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
  * fist step, [add firebase to your project](https://firebase.google.com/docs/iOS/setup#console)

  * Go to `(Project_name)/Release & Monitor/App Distribution` to create Tester and Groups. Groups's name will be also updated in Fastfile(both iOS and ios).
* Update `app` and `firebase_cli_token` in ios/fastlane/Fastfile

## Set up beta testing services Testflight

* Generate Application-specific passwords

  1. Visit [appleid.apple.com/account/manage](appleid.apple.com/account/manage)
  2. Generate a new application specific password
  3. Provide the application specific password using the environment variable `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD` in `ios/fastlane/.env.default`
* Create new app in appstoreconnect.
  * You can automate it by use `bundle exec fastlane produce`. Check it in [http://docs.fastlane.tools/actions/produce/#produce](http://docs.fastlane.tools/actions/produce/#produce).
  * Need to run it once.

## Run fastlane

* [Optional] Change version when need to build native code
* No need to change build number, it will be increased automatically.
* `cd ios`
* Run `bundle exec fastlane upload_testflight` to upload new build to Testflight

* Run `bundle exec fastlane firebase_distribution` to upload new build to Firebase App Distribution
