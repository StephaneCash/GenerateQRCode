import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY7yKJgXxKkHBSVQRcQ8sKZq_qNilKNbY",
  authDomain: "gerenaretecodeqr.firebaseapp.com",
  projectId: "gerenaretecodeqr",
  storageBucket: "gerenaretecodeqr.appspot.com",
  messagingSenderId: "454240991473",
  appId: "1:454240991473:web:92a9516ea89f943a365150"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);