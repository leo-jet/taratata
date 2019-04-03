import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

export function SET_CLASSES(state, data) {
  state.classes = data
}

export function init_classe(state, classe) {
  state.classe = classe
}

export const GET_CLASSE = (state, payload) => {
  state.classe = payload
}

export const GET_CHAPITRES_CLASSE = (state, payload) => {
  state.chapitres = payload
}


export function set_info_classe(state, info) {
  state.classe.nom = info.nom
  state.classe.dateDebut = info.dateDebut
  state.classe.dateFin = info.dateFin
  state.classe.prix = info.prix
}
