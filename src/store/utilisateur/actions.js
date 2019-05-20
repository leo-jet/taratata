import {
  fb,
  utilisateursCollection
} from 'assets/javascript/firebase.js'

export const get_user = async ({
  commit
}, data) => {
  try {
    var usersDoc = await utilisateursCollection.doc(data.email).get()
    var userData = usersDoc.data()
    var classesQuery = await usersDoc.ref.collection("classes").get()
    userData.classes = []
    if (classesQuery.empty == false) {
      for (var classeDoc of classesQuery.docs) {
        userData.classes.push(classeDoc.id)
      }
    }
    userData.connecte = true
    commit("SET_UTILISATEUR", userData)
  } catch (e) {
    console.log(e);
  }
}
