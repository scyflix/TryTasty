import { auth, app } from "./firebase.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const db = getFirestore(app);

export async function saveUserProfile(data) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  await setDoc(doc(db, "users", user.uid), {
    ...data,
    uid: user.uid,
    updatedAt: Date.now(),
  });
}
