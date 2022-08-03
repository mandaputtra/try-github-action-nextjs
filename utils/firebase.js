// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'

import {
  getFirestore,
  query,
  getDocs,
  doc,
  collection,
  where,
  setDoc,
  updateDoc,
  getDoc,
  orderBy,
  limit
} from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBW-oMAPtlzuk5tztwv6VCFnxliZxRbhYM',
  authDomain: 'binarfsw20.firebaseapp.com',
  projectId: 'binarfsw20',
  storageBucket: 'binarfsw20.appspot.com',
  messagingSenderId: '1021840674395',
  appId: '1:1021840674395:web:94d715337e3e6b239df97e',
  measurementId: 'G-DJYMLKJ307'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

const googleProvider = new GoogleAuthProvider()

async function signInWithGoogle () {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email
      })
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function logInWithEmailAndPassword (email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function registerWithEmailAndPassword (name, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email
    })
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function sendPasswordReset (email) {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function getUser(uid) {
  const dc = doc(db, 'users', uid)
  const docs = await getDoc(dc)
  return docs.data()
   
}

async function updatePhotoProfile (uid, downloadUrl) {
  // Cari data dari collection users yang mempunyai dokument sama dgn uid
  // update dengan profile url-nya
  await updateDoc(doc(db, 'users', uid), {
    profileUrl: downloadUrl
  })
}

function logout () {
  signOut(auth)
}

async function getLeaderBoards() {
  const ref = collection(db, 'users_leaderboard')
  const q = query(ref, orderBy('score', 'desc'), limit(5))
  const d = await getDocs(q)
  return d.docs.map(d => d.data())
}

async function updateLeaderboardDb(user, result) {
  const d = doc(db, 'users_leaderboard', user.uid)
  const docs = await getDoc(d)

  const data = docs.data()

  const asignScore = result === 'WIN' ? 2 : result === 'LOSE' ? -1 : 0
  const compare = (prms, prms2) => prms === prms2 ? 1 : 0

  const win =  compare(result, 'WIN')
  const lose = compare(result, 'LOSE')
  const draw = compare(result, 'DRAW')


  if (data) {
    const score = (data.draw * 0) + (data.lose * -1) + (data.win * 2)
    await updateDoc(d, {
      win: data.win + win,
      lose: data.lose + lose,
      draw: data.draw + draw,
      score: score + asignScore
    })
  } else {
    await setDoc(d, {
      name: user.name,
      win,
      lose,
      draw,
      score: asignScore
    })
  }
}

export {
  auth,
  db,
  logout,
  sendPasswordReset,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
  storage,
  updatePhotoProfile,
  getUser,
  updateLeaderboardDb as updateLeaderboard,
  getLeaderBoards
}
