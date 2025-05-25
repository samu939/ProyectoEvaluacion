import { Module, Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path'

const firestoreFactory: Provider = {
  provide: "FIRESTORE",
  useFactory: () => {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(path.resolve(__dirname, '../../evaluacionsistemas-9d777-firebase-adminsdk-fbsvc-4ff35ff95f.json')),
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
      });
      console.log('Firebase Admin SDK initialized.');
    } else {
      console.log('Firebase Admin SDK already initialized.');
    }

    return admin.firestore();
  },
};

@Module({
  providers: [firestoreFactory],
  exports: ["FIRESTORE"], // Export the token so other modules can inject it
})
export class FirebaseModule {}
