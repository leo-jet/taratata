import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

export const creer_devoir = async ({
  commit
}, data) => {
  let token = data.token
  axios.defaults.headers.common['Authorization'] = "JWT " + token
  let url = process.env.API + "/devoir/"
  return axios.post(url, data).then((response) => {
    commit('SET_DEVOIR', response.data)
  })
}

export function set_quiz (context, quiz) {
  context.commit("SET_QUIZ", quiz)
}

export function set_questions (context, questions) {
  context.commit("SET_QUESTIONS", questions)
}

export function set_quizs (context, quizs) {
  context.commit("SET_QUIZS", quizs)
}