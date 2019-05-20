export function SET_CLASSES(state, classes) {
  state.classes = classes
}

export function SET_CLASSE(state, classe) {
  state.classe = classe
}

export function SET_CHAPITRES(state, chapitres) {
  state.chapitres = chapitres
}

export function SET_CHAPITRE(state, chapitre) {
  state.chapitre = chapitre
}

export function SET_SECTIONS(state, sections) {
  state.sections = sections
}

export function SET_SECTION(state, section) {
  state.section = section
}

export function SET_TYPE(state, type) {
  state.type = type
}

export function SET_ENONCE(state, enonce) {
  state.enonce = enonce
}

export function SET_NUMERO(state, numero) {
  state.numero = numero
}

export function SET_QUESTION(state, question) {
  state.question = question
}

export function SET_QUESTIONS(state, questions) {
  state.questions = questions
}

export function ADD_PROPOSITION(state, proposition) {
  state.propositions.push(proposition)
}

export function DELETE_PROPOSITION(state, index) {
  state.propositions.splice(index, 1)
}

export function INIT_QUESTION(state) {
  state.question = null
}