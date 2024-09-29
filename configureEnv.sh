# exit if anything fails
set -e

# this picks the right google-services.json depending on environment
function select_env () {
  echo -e "Copying env_$1.json to env..."
  rm -f .env
  rm -f android/app/google-services.json
  rm -f ios/GoogleService-Info.plist
  cd android/ && ./gradlew clean && cd ..
  cd ios/ && xcodebuild clean && cd ..
  [ "$1" == "dev" ] && cp .env-dev .env && cp firebase/android/google-services-dev.json android/app/google-services.json && cp firebase/ios/GoogleService-Info-dev.plist ios/GoogleService-Info.plist
  [ "$1" == "prod" ] && cp .env-prod .env && cp firebase/android/google-services-prd.json android/app/google-services.json && cp firebase/ios/GoogleService-Info-prd.plist ios/GoogleService-Info.plist
  cd ..
  echo -e "Done copying"
}

select_env $1
