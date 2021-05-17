import { auth, firebase } from "../services/firebase";

export const AuthenticationWithPersistance = async (email, password) => {
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw new Error(error);
  }
};
