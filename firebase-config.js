// Isi dengan konfigurasi dari Firebase Console:
// Project settings > General > Your apps > Web app > SDK setup and configuration > "Config".
// Nilai ini memang publik; keamanan data dijaga oleh Security Rules (firestore.rules) dan login.
// Biarkan "ISI_..." jika belum diisi: aplikasi tetap jalan lokal tanpa cloud.
window.REKAPOS_FB = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_PROJECT_ID.firebaseapp.com",
  projectId: "ISI_PROJECT_ID",
  storageBucket: "ISI_PROJECT_ID.appspot.com",
  messagingSenderId: "ISI_SENDER_ID",
  appId: "ISI_APP_ID"
};
