/*
export function someAction (context) {
}
*/

export function set_cours_actuel (context, cours) {
    context.commit("SET_COURS_ACTUEL", cours)
}

export function set_chapitres (context, chapitres) {
    context.commit("SET_CHAPITRES", chapitres)
}

export function set_sections (context, sections) {
    context.commit("SET_SECTIONS", sections)
}

export function set_indice_section_courante (context, indice) {
    context.commit("SET_INDICE_SECTION_COURANTE", indice)
}