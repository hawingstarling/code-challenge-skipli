import admin from 'firebase-admin';

import serviceAccount from '../configs/serviceAccount.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

export const db: FirebaseFirestore.Firestore = admin.firestore();
export { admin };
