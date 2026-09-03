# Prepare for fastlane, must read it first (almost steps have been set up in base code)

## 1. Install the latest Xcode command line tools

```powershell
xcode-select --install
```

## 2. Install fastlane using RubyGems (recommended)

 > It is recommended that you use Bundler and Gemfile to define your  dependency on fastlane. This will clearly define the fastlane version to be used and its dependencies, and will also speed up fastlane execution.

* Install Bundler by running `gem install bundler`
* Create a `./Gemfile` in the root directory of your project with the content

    ```ruby
    source 'https://rubygems.org'
    # For react-native set up
    # You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
    ruby File.read(File.join(__dir__, '.ruby-version')).strip
    gem 'cocoapods', '~> 1.11', '>= 1.11.3'
    # For fastlane set up
    gem "fastlane"
    # Others gem
    # ...
    ```

* Run `bundle update` and add both the `./Gemfile` and the `./Gemfile.lock` to version control.\
Example version control:
  * github
  * gitlab
  * ...

* Every time you run fastlane, use `bundle exec fastlane [lane]`
* On your CI, add `bundle install` as your first build step
* To update fastlane, just run `bundle update fastlane`
