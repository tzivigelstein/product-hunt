import app from "firebase/app"
import firebaseConfig from "./config"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig)
    }

    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()
  }

  //Registro de usuario
  async signup(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )

    return await newUser.user.updateProfile({
      displayName: name,
    })
  }

  //Inicio de sesion
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  //Cerrar sesion
  async signout() {
    await this.auth.signOut()
  }
}

const firebase = new Firebase()
export default firebase
