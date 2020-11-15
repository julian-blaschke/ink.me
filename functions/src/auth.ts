//firebase functions:config:get > .runtimeconfig.json
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as request from "request";
const serviceAccount = require("./service-account.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

//https://medium.com/@vshelestovskyi/instagram-authentication-with-node-js-and-mongodb-edfb7b6065ad
async function getInstagramUser(code: string) {
  return new Promise((resolve, reject) => {
    request(
      {
        url: "https://api.instagram.com/oauth/access_token",
        method: "POST",
        form: {
          client_id: functions.config().instagram.client_id,
          client_secret: functions.config().instagram.client_secret,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "https://localhost:3000/auth/sign-up/",
        },
      },
      (err, response, body) => {
        if (response.statusCode != 200) return reject(err || response.toJSON());
        return resolve(JSON.parse(body));
      }
    );
  });
}

export const createUser = functions.https.onCall(async (user, context) => {
  try {
    if (!(user.username && user.password)) {
      throw new Error(
        "please include all valid fields (username, password) in your request body!"
      );
    }
    //user linked instagram account
    if (user.code) {
      const instagramResponse = await getInstagramUser(user.code);
      user = { ...user, ...Object.assign({}, instagramResponse) };
    }
    console.log(`attempting to create user ${user.username}...`);
    delete user.code;
    const firestoreTask = admin
      .firestore()
      .collection("users")
      .doc(user.username)
      .set({ ...user });
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
