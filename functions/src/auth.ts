import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const serviceAccount = require("./service-account.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

/**
 * Creates a configured simple-oauth2 client for Instagram.
 */
function instagramOAuth2Client() {
  // Instagram OAuth 2 setup
  const credentials = {
    client: {
      id: functions.config().instagram.client_id,
      secret: functions.config().instagram.client_secret,
    },
    auth: {
      tokenHost: "https://api.instagram.com",
      tokenPath: "/oauth/access_token",
    },
  };
  return require("simple-oauth2").create(credentials);
}

export const createUser = functions.https.onCall(async (user, context) => {
  try {
    const oauth2 = instagramOAuth2Client();
    if (!(user.username && user.password)) {
      throw new Error(
        "please include all valid fields (username, password) in your request body!"
      );
    }
    //user linked instagram account
    if (user.code) {
      const results = await oauth2.authorizationCode.getToken({
        code: user.code,
        redirect_uri: "https://localhost:3000/auth/sign-up/",
      });
      console.log("RECIEVED FROM INSTAGRAM:", results);
    }
    console.log(`attempting to create user ${user.username}...`);
    const firestoreTask = admin
      .firestore()
      .collection("users")
      .doc(user.username)
      .set({ user });
    const authTask = admin.auth().createUser({ ...user });

    await Promise.all([firestoreTask, authTask]);
    const token = await admin.auth().createCustomToken(user.username);
    console.log(`created user with uid ${user.username}, token: ${token}`);
    return { token };
  } catch (error) {
    console.error("user creation failed: ", error?.toString());
    return { error };
  }
});
