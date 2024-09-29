declare module 'react-native-config' {
  interface Env {
    API_DOMAIN: 'string';
    GOOGLE_WEB_CLIENT_ID: 'string';
    GOOGLE_IOS_CLIENT_ID: 'string';
    WS_ID: 'string';
    WS_AUTH_URL: 'string';
    WS_HOST: 'string';
  }

  const BuildConfig: Env;

  export default BuildConfig;
}
