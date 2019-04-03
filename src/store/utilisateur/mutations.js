export function connexion (state, data) {
    state.nom = data.user.nom
    state.prenom = data.user.prenom
    state.groupes = data.groupes
    state.connecte = true
    state.token = data.token
    state.dateNaissance = data.user.dateNaissance
    state.username = data.user.username
    state.lieuNaissance = data.user.lieuNaissance
    state.telephone = data.user.telephone
    state.email = data.user.email
    state.specialite = data.user.specialite
    state.situation = data.user.situation
    state.sexe = data.user.sexe
    state.quartier = data.user.quartier
    state.ville = data.user.ville
    state.id = data.user.idEleve
    let classes = []
    for(var i in data.user.classes){
        classes.push(data.user.classes[i].idClasse)
    }
    state.classes = classes
}

export function deconnexion (state) {
    state.nom = "data.user.nom"
    state.prenom = "data.user.prenom"
    state.groupes = "data.groupes"
    state.connecte = false
    state.token = "data.token"
    state.dateNaissance = "data.user.dateNaissance"
    state.username = "data.user.username"
    state.lieuNaissance = "data.user.lieuNaissance"
    state.telephone = "data.user.telephone"
    state.email = "data.user.email"
    state.specialite = "data.user.specialite"
    state.situation = "data.user.situation"
    state.sexe = "data.user.sexe"
    state.quartier = "data.user.quartier"
    state.ville = "data.user.ville"
    state.id = "data.user.idEleve"
}