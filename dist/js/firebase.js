// FIREBASE APP
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// FIRESTORE
import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// STORAGE
import { getStorage } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// CONFIG

const firebaseConfig = {
  apiKey: "AIzaSyBoPw-ci1tz2F0eR9bFqkv7squyI3z0v2Q",
  authDomain: "portfolio-lookman.firebaseapp.com",
  projectId: "portfolio-lookman",
  storageBucket: "portfolio-lookman.firebasestorage.app",
  messagingSenderId: "296496840304",
  appId: "1:296496840304:web:7cfe715d75059de0847eb5"
};
// INIT

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };