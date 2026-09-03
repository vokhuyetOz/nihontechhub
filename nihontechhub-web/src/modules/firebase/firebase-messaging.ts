import { getMessaging, isSupported, Messaging } from 'firebase/messaging';

import { firebaseApp } from './firebase';

export const initMessaging = async (): Promise<Messaging | null> => {
  const supported = await isSupported();

  if (!supported) {
    console.warn('This browser does not support Firebase Messaging.');
    return null;
  }

  try {
    const messaging = getMessaging(firebaseApp);
    return messaging;
  } catch (error) {
    console.error('Failed to initialize messaging:', error);
    return null;
  }
};
