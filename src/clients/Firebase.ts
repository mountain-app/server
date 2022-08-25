import * as admin from 'firebase-admin';
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
        credential: applicationDefault(),
      });
    }

    return Firebase.instance;
  }
}

export default Firebase;
