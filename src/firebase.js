import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCJBdy94VgX9JqexeAvcg2JLi2y2Mvw2eU",
    authDomain: "todo-app-cp-35de9.firebaseapp.com",
    projectId: "todo-app-cp-35de9",
    storageBucket: "todo-app-cp-35de9.appspot.com",
    messagingSenderId: "231494182257",
    appId: "1:231494182257:web:ce346764dde136186442d0",
    measurementId: "G-68J0TPFV1J"
});
// the firebaseApp which we initialized above, using that we can use it get firestore which will have all the data
// we are storing it in a variable called db and we are exporting it

const db=firebaseApp.firestore();
export default db;