import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";
import {getFirestore} from 'firebase/firestore';



export let app: FirebaseApp;


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_auth_Domain,
  projectId: process.env.REACT_APP_project_ID,
  storageBucket: process.env.REACT_APP_storage_Bucket,
  messagingSenderId: process.env.REACT_APP_messaging_Sender_ID,
  appId: process.env.REACT_APP_ID,
};

//초기화된 앱 가져오고 그개 아니면 초기화
try{
  app = getApp("app")
}catch (e){
  app = initializeApp(firebaseConfig,"app")
}


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

//firestore
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export default firebase;