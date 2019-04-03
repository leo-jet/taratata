import axios from 'axios';
export default {
  components: {},
  name: 'information_classe',
  computed: {
    classe() {
      return this.$store.state.classe.classe
    }
  },
  data() {
    return {
      tags: [],
      description: "",
      niveau: "",
      niveaux: [{
        label: 'Terminale C',
        value: 'Terminale C'
      }, {
        label: 'Terminale D',
        value: 'Terminale D'
      }, {
        label: 'Terminale A',
        value: 'Terminale A'
      }, {
        label: 'Première C',
        value: 'Première C'
      }, {
        label: 'Première D',
        value: 'Première D'
      }, {
        label: 'Première A',
        value: 'Première A'
      }, {
        label: 'Seconde C',
        value: 'Seconde C'
      }, {
        label: 'Seconde A',
        value: 'Seconde A'
      }, {
        label: 'Troisième',
        value: 'Troisième'
      }, {
        label: 'Quatrième',
        value: 'Quatrième'
      }, {
        label: 'Cinquième',
        value: 'Cinquième'
      }, {
        label: 'Sixième',
        value: 'Sixième'
      }],
      matiere: "",
      matieres: [{
        label: 'PHYSIQUES',
        value: 'PHYSIQUES'
      }, {
        label: 'INFORMATIQUE',
        value: 'INFORMATIQUE'
      }, {
        label: 'CHIMIE',
        value: 'CHIMIE'
      }, {
        label: 'BIOLOGIE',
        value: 'BIOLOGIE'
      }, {
        label: 'FRANCAIS',
        value: 'FRANCAIS'
      }, {
        label: 'CULTURE GENERALE',
        value: 'CULTURE GENERALE'
      }, {
        label: 'CULTURE MEDICALE',
        value: 'CULTURE MEDICALE'
      }, {
        label: 'ANCIENNES EPREUVES',
        value: 'ANCIENNES EPREUVES'
      }, {
        label: 'MATHEMATIQUES',
        value: 'MATHEMATIQUES'
      }, {
        label: 'ANGLAIS',
        value: 'ANGLAIS'
      }],
      dateFinInscription: "",
    }
  },
  methods: {
    editclasse(data) {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
      axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
      axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
      axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      let url = process.env.API + "/classe/" + this.classe.idClass + '/'
      axios.put(url, data).then((response) => {
          this.$store.commit("classe/init_classe", response.data)
          let message = "Classe bien modifiée!"
          let next = '/classe/' + response.data.idClass
          this.$router.push(next)
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
        .catch((error) => {
          let message = "Identifiant ou mot de pass incorrect!" + error
          this.$q.notify({
            type: "positive",
            message: message,
          })
        })
    },
    input_tags(newVal) {
      let data = new FormData()
      data.append("tags", JSON.stringify(newVal))
      this.editclasse(data)
    },
    input_dateFinInscription(newVal) {
      let data = new FormData()
      data.append("dateFinInscription", newVal.replace(/\//g, '-'))
      this.editclasse(data)
    },
    input_matiere(newVal) {
      let data = new FormData()
      data.append("matiere", newVal)
      this.editclasse(data)
    },
    input_niveau(newVal) {
      let data = new FormData()
      data.append("niveau", newVal)
      this.editclasse(data)
    },
    input_description(newVal) {
      let data = new FormData()
      data.append("description", newVal)
      this.editclasse(data)
    }
  },
  mounted() {
    this.tags = JSON.parse(this.classe.tags)
    this.dateFinInscription = this.classe.dateFinInscription
    this.matiere = this.classe.matiere
    this.niveau = this.classe.niveau
    this.description = this.classe.description
  }
}
