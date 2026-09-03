importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// This file cannot read process.env (it's served as a static asset, not built by webpack),
// so the Firebase web config is duplicated here from .env / src/modules/firebase/firebase.ts.
// Keep these two in sync manually whenever the Firebase project config changes.
firebase.initializeApp({
  apiKey: 'AIzaSyDIe2vik91oPgeI1_OpW-Qql8PldDSIEEM',
  authDomain: 'nihontechhub.firebaseapp.com',
  projectId: 'nihontechhub',
  storageBucket: 'nihontechhub.firebasestorage.app',
  messagingSenderId: '387337916612',
  appId: '1:387337916612:web:e285a503206ff605437991',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title, {
    body,
    icon: '/logo.png',
    badge: '/logo.png',
  });
});
