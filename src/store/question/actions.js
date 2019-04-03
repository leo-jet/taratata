import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

export const get_classe_select = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/classe/list_select/"
  return axios.get(url).then((response) => {
    commit('SET_CLASSES', response.data)
  })
}

export const creer_question = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/question/"
  let fdata = new FormData()
  let keys = Object.keys(data)
  for (var i in keys) {
    if (keys[i] != 'token') {
      fdata.append(keys[i], data[keys[i]])
    }
  }
  return axios.post(url, fdata).then((response) => {
    commit('SET_QUESTION', response.data)
  })
}

export const creer_proposition = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = data.url
  return axios.post(url, data).then((response) => {
    commit('ADD_PROPOSITION', response.data)
  })
}

export const get_chapitres_classe_select = async ({
  commit
}, data) => {
  let token = data.token
  let query = new FormData()
  query.append("idClass", data.idClass)
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/chapitre/list_classe_select/"
  return axios.get(url, {
    params: {
      idClass: data.idClass
    }
  }).then((response) => {
    commit('SET_CHAPITRES', response.data)
  })
}

export const get_chapitre_sections_select = async ({
  commit
}, data) => {
  let token = data.token
  let query = new FormData()
  query.append("idChapitre", data.idChapitre)
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/section/list_chapitre_select/"
  return axios.get(url, {
    params: {
      idChapitre: data.idChapitre
    }
  }).then((response) => {
    commit('SET_SECTIONS', response.data)
  })
}

export const get_questions_with_selection = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/question/list_by_selection/"
  return axios.get(url, {
    params: {
      selections: JSON.stringify(data.selections)
    }
  }).then((response) => {
    commit('SET_QUESTIONS', response.data)
  })
}
