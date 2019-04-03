export function SET_DEVOIR(state, devoir) {
  state.devoir = devoir
}

export function INIT_QUESTIONS(state) {
  state.questions = []
}

export function APPEND_QUESTIONS(state, question) {
  state.questions.push(question)
}
export const updateIndiceQuestionCourante = (state, index) => {
  state.indiceQuestionCourante = index
}

export const updateTestDB = (state, result) => {
  state.testDB = result
}

export const SET_QUIZ = (state, quiz) => {
  state.quiz = quiz
}

export const SET_QUIZS = (state, quizs) => {
  state.quizs = quizs
}

export const SET_STATISTIQUE = (state, stats) => {
  state.statistique = stats
}

export const SET_QUESTIONS = (state, questions) => {
  state.questions = questions
}
