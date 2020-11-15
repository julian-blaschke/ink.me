import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import { firebaseConfig } from "./firebase.config";

export const firebase = !app.apps.length
  ? app.initializeApp(firebaseConfig)
  : app.app();

export default app;
