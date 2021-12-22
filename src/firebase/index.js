import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6ngTKpEaiLxFZQO5MtmXNQ0YF4GT8Cgg",
  authDomain: "instagram-eead6.firebaseapp.com",
  projectId: "instagram-eead6",
  storageBucket: "instagram-eead6.appspot.com",
  messagingSenderId: "1014057622448",
  appId: "1:1014057622448:web:4adac1aa1ab7cf40e5d475",
  measurementId: "G-W14BHE973H",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
