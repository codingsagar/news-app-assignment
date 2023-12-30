import { getAuth, signOut } from "firebase/auth";
import { toast } from "sonner";
import firebase_app from "../firebase-config";

const auth = getAuth(firebase_app);


export default async function logOut() {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
        toast.success("Logged out successfully !");
    } catch (e) {
        toast.error("Something went wrong ! Try again.");
    }

    return { result, error };
}