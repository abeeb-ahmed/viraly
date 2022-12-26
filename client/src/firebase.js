import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4EuJn1Ot4QUqtRA5eXlPqSsKixMIQ5TE",
  authDomain: "viraly-38543.firebaseapp.com",
  projectId: "viraly-38543",
  storageBucket: "viraly-38543.appspot.com",
  messagingSenderId: "13154519826",
  appId: "1:13154519826:web:bf7c5555cd7b02563b41cb",
  measurementId: "G-P52XC6XQ58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
