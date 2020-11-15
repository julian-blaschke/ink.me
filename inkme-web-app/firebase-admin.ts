import * as firebaseAdmin from "firebase-admin";
import { private_key, client_email, project_id } from "./service-account.json";

export const admin = !firebaseAdmin.apps.length
  ? firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: private_key,
        clientEmail: client_email,
        projectId: project_id,
      }),
    })
  : firebaseAdmin.app();
