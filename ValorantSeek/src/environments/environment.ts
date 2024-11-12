// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7jXl4fndrsjP-MTalW0zQH8FR3Jezmr0",
  authDomain: "valorantseek.firebaseapp.com",
  projectId: "valorantseek",
  storageBucket: "valorantseek.firebasestorage.app",
  messagingSenderId: "235090386463",
  appId: "1:235090386463:web:2484d826bcea5a3cdc3f2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
