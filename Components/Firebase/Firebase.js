import app from  'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
     apiKey: "AIzaSyCAkBseuraiJUfMBpfX-iIatEZkcmXPmSs",
    authDomain: "myseriechecker.firebaseapp.com",
    projectId: "myseriechecker",
    storageBucket: "myseriechecker.appspot.com",
    messagingSenderId: "105895664442",
    appId: "1:105895664442:web:f188d6a119fec136d38e03",
    measurementId: "G-SFS4HYVB85"
  };

class Firebase{
    constructor(){
app.initializeApp(firebaseConfig)
this.auth=app.auth
this.db=app.firestore

    }
    //Connexion
    loginuser=(email,mdp)=>
 this.auth().signInWithEmailAndPassword(email,mdp)

 //Inscription
   signupuser=(email,password)=>
      this.auth().createUserWithEmailAndPassword(email,password)
///User
     user=(iduser)=>
    this.db().doc(`users/${iduser}`)
 
 
    
   
    
}


export default Firebase