# Gitlab-CI

## Set up a project runner for a project

For our React Native needs, the Runner needs to be executed in an environment hosting Android SDKs, Xcode and Node.

1. Install gitlab-runner: [https://docs.gitlab.com/runner/install/osx.html](https://docs.gitlab.com/runner/install/osx.html)

   Example:

   ```powershell
    # Download the binary for your system
    sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64

    # Give it permission to execute
    sudo chmod +x /usr/local/bin/gitlab-runner

    # The rest of the commands execute as the user who will run the runner
    # Register the runner (steps below), then run
    cd ~
    gitlab-runner install
    gitlab-runner start
   ```

2. Go to Project -> Setting -> CI/CD -> Runners

   ```powershell
    gitlab-runner register --url https://git.rabiloo.net/ --registration-token $REGISTRATION_TOKEN
   ```

3. When Runner is registed, you will see:\
   ![runner](/runner.png 'runner')

## Create a .gitlab-ci.yml

Working example: [.gitlab-ci](.gitlab-ci.yml)

## Secret variables

In real project, we have to config some secret variables for authentication or deploying
We can go to `project’s Settings` > `CI/CD` and expand the Variables section\
Example: To authen [codepush_login](./android/fastlane/Fastfile) action we will set APP_CENTER_LOGIN_TOKEN in CI/CD's Variables section
![Variables section](/APP_CENTER_LOGIN_TOKEN.png 'Variables section')
