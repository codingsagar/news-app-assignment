import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase_app from "../firebase-config";
import { toast } from "sonner";

const auth = getAuth(firebase_app);

export default async function passwordReset(email: string) {
  let result = null,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
    toast.success("Password reset link sent !");
  } catch (e) {
    error = e;
    toast.error(`${error}`);
  }

  return { result, error };
}
