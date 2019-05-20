import {
  classesCollection
} from 'assets/javascript/firebase.js'

export const creer_devoir = async ({
  commit
}, data) => {

  classesCollection.doc(data.idClasse).collection("chapitres").doc(data.idChapitre).collection("sections").doc(data.idSection).collection("devoirs").add(data)
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