import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCHfpmJoLgEPHS8Tc_dlMIswPOS40UQuSI",
  authDomain: "auratea-free-sample.firebaseapp.com",
  projectId: "auratea-free-sample",
  storageBucket: "auratea-free-sample.firebasestorage.app",
  messagingSenderId: "115039465574",
  appId: "1:115039465574:web:b53b6070ea1e0d768d3da7",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
