import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
import {
  fb,
  classesCollection
} from 'assets/javascript/firebase.js'

export const get_classe = async ({
  commit
}, data) => {
  let token = data.token
  let idClass = data.idClass
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/classe/" + idClass + "/" : process.env.API + "/classe/" + idClass + "/"
  return axios.get(url).then((response) => {
    commit('GET_CLASSE', response.data)
  })
}

export const get_classes = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/classe/list_filtered/"
  return axios.get(url).then((response) => {
    commit('SET_CLASSES', response.data)
  })
}

export const get_all_classes = async ({
  commit
}, data) => {
  var classesQuery = await classesCollection.get()
  var classes = []
  for(var classe of classesQuery.docs){
    var cls = classe.data()
    cls.id = classe.id
    classes.push(cls)
  }
  commit('SET_CLASSES', classes)
}



export const get_classes_avec_eleves = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/classe/list_select_with_eleve/"
  return axios.get(url).then((response) => {
    commit('SET_CLASSES', response.data)
  })
}

/**
 * 
 * @param {*} param0 
 * @param {*} data 
 *  Use in dialog quiz to display tree
 */
export const get_classe_for_tree = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/classe/list_small_detail/"
  return axios.get(url).then((response) => {
    commit('SET_CLASSES', response.data)
  })
}

export const get_chapitres_classe = async ({
  commit
}, data) => {
  let token = data.token
  let idClass = data.idClass
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/chapitre/list/?classe__idClass=" + idClass : process.env.API + "/chapitre/list/?classe__idClass=" + idClass
  return axios.get(url).then((response) => {
    commit('GET_CHAPITRES_CLASSE', response.data)
  })
}


export const inscription_classe = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/classe/inscription/" : process.env.API + "/classe/inscription/"
  return new Promise((resolve, reject) => {
    try {
      axios.post(url, data.formData).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          console.log(error.response, "hellllllloooooooooooooooooooooooo")
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}


export const chapitres_classe = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/chapitre/list_classe_select/" : process.env.API + "/chapitre/list_classe_select/"
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: data.parameters
        }).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}


export const sections_chapitre = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/section/list_chapitre_select/" : process.env.API + "/section/list_chapitre_select/"
  console.log(data)
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: data.parameters
        }).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}


export const devoirs_chapitre = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/devoir/list/" : process.env.API + "/devoir/list/"
  console.log(data)
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: data.parameters
        }).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}


export const devoirs_questions = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/question/list/" : process.env.API + "/question/list/"
  console.log(data)
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: data.parameters
        }).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}

export const get_resultat_quiz = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/reponda/list/" : process.env.API + "/reponda/list/"
  console.log(data)
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: data.parameters
        }).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}

export const envoi_feuille = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/reponda/" : process.env.API + "/reponda/"
  return new Promise((resolve, reject) => {
    try {
      axios.post(url, data.formData).then((response) => {
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          console.log(error.response, "hellllllloooooooooooooooooooooooo")
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}


export const detail_classe = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000" : process.env.API
  url = url + data.classeUrl
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, {
          params: data.parameters
        }).then((response) => {
          commit('GET_CLASSE', response.data)
          resolve({
            status: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            status: false,
            data: error.response
          })
        })
    } catch (e) {
      console.log(e);
    }
  });
}

export const get_chapitres_with_sections = async ({
  commit
}, data) => {
  try {
    var n = null
    var chapitresSnap = await data.classeRef.collection('chapitres').orderBy('numero').get()
    var chapitres = []
    var chap = null
    for (var chapitre of chapitresSnap.docs) {
      chap = chapitre.data()
      chap.label = chap.titre
      chap.id = chapitre.id
      chap.sections = []
      let sectionssRef = await data.classeRef.collection('chapitres').doc(chapitre.id).collection('sections').orderBy('numero').get();
      for (var sections of sectionssRef.docs) {
        var section = sections.data()
        section.label = section.titre
        section.value = sections.id
        chap.sections.push(section)
      }
      chap.value = chap

      chapitres.push(chap)
    }
    commit('GET_CHAPITRES_CLASSE', chapitres)
  } catch (e) {
    console.log(e);
  }
}
