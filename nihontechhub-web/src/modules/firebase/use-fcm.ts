import { getToken, Messaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

import { initMessaging } from './firebase-messaging';

function showNotification(title: string, body: string) {
  new Notification(title, {
    body: body,
    icon: '/logo.png',
    badge: '/logo.png',
  });
}

export const useFCM = (): void => {
  useEffect(() => {
    const setupFCM = async () => {
      const messaging: Messaging | null = await initMessaging();

      if (!messaging) return;

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Permission for notifications denied.');
        return;
      }

      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        console.log('xxx::fcmToken', token);

        onMessage(messaging, (payload) => {
          showNotification(payload.notification!.title!, payload.notification!.body!);
        });
      } catch (err) {
        console.error('An error occurred while retrieving token. ', err);
      }
    };
    if (typeof window !== 'undefined') {
      setupFCM();
    }
  }, []);
};
