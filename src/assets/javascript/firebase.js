import firebase from 'firebase'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyABdYjglOA82p-8mkFHcew_K5k3e1ZzTCo",
  authDomain: "homeschool-b052c.firebaseapp.com",
  databaseURL: "https://homeschool-b052c.firebaseio.com",
  projectId: "homeschool-b052c",
  storageBucket: "homeschool-b052c.appspot.com",
  messagingSenderId: "55422486971"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
var fb = firebase
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const chapitresCollection = db.collection('chapitres')
const classesCollection = db.collection('classes')
const copiesCollection = db.collection('copies')
const devoirsCollection = db.collection('devoirs')
const utilisateursCollection = db.collection('utilisateurs')
const questionsCollection = db.collection('questions')
const sectionsCollection = db.collection('sections')

export {
    db,
    auth,
    fb,
    providerFacebook,
    currentUser,
    chapitresCollection,
    classesCollection,
    copiesCollection,
    devoirsCollection,
    utilisateursCollection,
    questionsCollection,
    sectionsCollection
}