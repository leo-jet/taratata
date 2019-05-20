
export function SET_UTILISATEUR(state, data) {
  state.utilisateur = data
  localStorage.setItem('utilisateur',JSON.stringify(data));
}


export function SET_CONNECTED(state, payload) {
  state.connecte = payload
}



export function DECONNEXION(state) {
  state.utilisateur = null
  localStorage.removeItem('utilisateur');
}
