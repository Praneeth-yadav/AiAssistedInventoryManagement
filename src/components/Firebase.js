import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARiYjVx2Tx5t_Paom4Ask9X2fIiCZ_yys",
  authDomain: "aiassistedinventorymanag-a2550.firebaseapp.com",
  projectId: "aiassistedinventorymanag-a2550",
  storageBucket: "aiassistedinventorymanag-a2550.firebasestorage.app",
  messagingSenderId: "343596643270",
  appId: "1:343596643270:web:4de18aeba4303ffd6078c7",
  measurementId: "G-KWJGWS9F0S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
