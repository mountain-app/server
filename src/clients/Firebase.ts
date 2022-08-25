import * as admin from 'firebase-admin';
import { credential } from 'firebase-admin';
import { App, applicationDefault } from 'firebase-admin/app';

class Firebase {
  private static instance: App;

  private constructor() {}

  static initialize(): App {
    if (!Firebase.instance) {
      if (admin.apps.length > 0) {
        Firebase.instance = admin.apps[0]!;
      }

      Firebase.instance = admin.initializeApp({
        credential:
          process.env.NODE_ENV === 'production'
            ? credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
                  /\\n/g,
                  '\n'
                ),
              })
            : applicationDefault(),
      });
    }

    return Firebase.instance;
  }
}

export default Firebase;
