import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "chat-app-65a67.firebaseapp.com",
  projectId: "chat-app-65a67",
  storageBucket: "chat-app-65a67.appspot.com",
  messagingSenderId: "1019555305023",
  appId: "1:1019555305023:web:3efd4c7599ff949ecc8a8a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage();
export const db = getFirestore()


export const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then(  
      async (res) => {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});
    })
}