import { useEffect } from "react";
import nookies from "nookies";
import app from "../firebase";

export const useAuthTokenCookies = async () => {
  useEffect(() => {
    return app.auth().onIdTokenChanged((user) => {
      if (!user) return nookies.set(null, "token", "", {});
      user.getIdToken().then((token) => nookies.set(null, "token", token, {}));
    });
  }, []);
};
