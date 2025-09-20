import admin from 'firebase-admin';

import serviceAccount from '../configs/serviceAccount.json';
import { Initialize } from 'fireorm';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

// Get Firestore instance
const firestore: FirebaseFirestore.Firestore = admin.firestore();

// Initialize FireORM
Initialize(firestore);

export { admin, firestore };
export default firestore;
