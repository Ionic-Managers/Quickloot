import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDy2zV4JEZ-dy7kUqMFqkD9zphF8wGAryo",
  authDomain: "lotteryapp-70d69.firebaseapp.com",
  databaseURL: "https://lotteryapp-70d69-default-rtdb.firebaseio.com",
  projectId: "lotteryapp-70d69",
  storageBucket: "lotteryapp-70d69.appspot.com",
  messagingSenderId: "844463272072",
  appId: "1:844463272072:web:7cd8c6edf8c5bd211f6f3d",
  measurementId: "G-3QY24EV9DP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
