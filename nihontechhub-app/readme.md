# Readme

## Code-push manually (need to be update when clone new app)

iOS

```powershell
npx @recodepush/cli@latest create_bundle -t <TargetVersion> -n nihontechhub_ios -d Production
```

Android

```powershell
npx @recodepush/cli@latest create_bundle -t <TargetVersion> -n nihontechhub_android -d Production
```

## Check list to clone new app

1. [ ] Change app name, packageId(android), bundleId(ios) to project information

   ```powershell
   npx react-native-rename@latest "new_name" -b "bundle_identifier"
   ```

   checkout more here [react-native-rename](https://github.com/junedomingo/react-native-rename)

2. [ ] Set up code-push in [https://appcenter.ms/](https://appcenter.ms/), update code-push key (Staging, production) in [system.ts](/src/utils/resource/system.ts)

3. [ ] Create new app in Firebase console, update google-service.json (android) and GoogleService-Info.plist (ios)

4. [ ] Update fastlane information (Appfile, Fastfile) in [/ios/fastlane/](/ios/fastlane/) and [/android/fastlane/](/android/fastlane/)

5. [ ] Update code-signing\
        Need to be run only once

   ```powershell
   bundle exec fastlane match
   ```

   [ ] Disable automatically manage siging and choose right provision which created by fastlane match action

6. [ ] Set up Gitlab-CI, set up private appcenter login key
