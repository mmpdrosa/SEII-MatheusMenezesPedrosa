import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyChDIBWS57_Ywk4atSQubj-lhFYd1ogAYM",
  authDomain: "esp32-smart-home-d9c63.firebaseapp.com",
  databaseURL: "https://esp32-smart-home-d9c63-default-rtdb.firebaseio.com",
  projectId: "esp32-smart-home-d9c63",
  storageBucket: "esp32-smart-home-d9c63.appspot.com",
  messagingSenderId: "621575515217",
  appId: "1:621575515217:web:0837a3d7d9b653f2ed5c70"
}

export const app = initializeApp(firebaseConfig)