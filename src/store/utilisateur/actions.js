import axios from 'axios';
export const enregistrement = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/connexion/enregistrement/" : process.env.API + "/connexion/enregistrement/"
  return new Promise((resolve, reject) => {
    try {
      axios.post(url, data.formData).then((response) => {
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


export const confirmation = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/connexion/confirmation/" : process.env.API + "/connexion/confirmation/"
  return new Promise((resolve, reject) => {
    try {
      axios.post(url, data.formData).then((response) => {
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

export const editer_information = ({
  commit
}, data) => {
  axios.defaults.headers.common['Authorization'] = "JWT " + data.token
  let url = (data.self.$q.platform.is.mobile && process.env.DEV) ? "http://10.0.2.2:8000/eleve/" + data.id + "/" : process.env.API + "/eleve/" + data.id + "/"
  return new Promise((resolve, reject) => {
    try {
      axios.put(url, data.formData).then((response) => {
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
