// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  WEB_NAME: 'MPA Hub Console',

  API_BASE_URL: 'http://127.0.0.1:5000/',
  API_OAUTH: 'oauth/',
  API_USER: 'v1/user/',
  API_CONSOLE: 'console/',
  API_CONSOLE_ADMINISTRATOR: 'chino/',

  CONSOLE_URL: 'http://localhost:4200/',

  GOOGLE_RECAPTCHA_PUBLIC_KEY: '6LfAjaAeAAAAACPr7rpb3nQtLJP5uXHk6TzFKjfn',

  ROUTE_BASE_URL: '/whatsittoya',

  FRONTEND_URL: 'https://myponyasia.com/',

  OAUTH_URL: 'http://localhost:8080/',

  APP_VERSION: '1.0-dev',

  // Cookies
  COOKIE_SID: 'SID-MYPONYASIA',
  COOKIE_SIDR: 'SIDR-MYPONYASIA',
  COOKIE_DOMAIN: 'localhost',
  COOKIE_SECURE: false,
  COOKIE_HTTP_ONLY: false,

  // Pagination Config
  PAGINATION_PAGE_SIZE: 10,
  PAGINATION_PAGE_LIST: [10, 25],

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
