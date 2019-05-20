import {
  utilisateursCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {},
  computed: {
    email() {
      return this.$store.state.utilisateur.utilisateur.email
    }
  },
  data() {
    return {
      etablissement: "",
      niveau: 'terminale',
      niveaux: [
        {
          label: 'Master 2',
          value: 'master2'
        },
        {
          label: 'Master 1',
          value: 'master1'
        },
        {
          label: 'Licence 3',
          value: 'licence3'
        },
        {
          label: 'Licence 2',
          value: 'licence2'
        },
        {
          label: 'Licence 1',
          value: 'licence1'
        },
        {
          label: 'Terminale',
          value: 'terminale'
        },
        {
          label: 'Première',
          value: 'premiere'
        },
        {
          label: 'Seconde',
          value: 'seconde'
        },
        {
          label: 'Troisième',
          value: 'troisieme'
        },
        {
          label: 'Quatrième',
          value: 'quatrieme'
        },
        {
          label: 'Cinquième',
          value: 'cinquieme'
        },
        {
          label: 'Sixème',
          value: 'sixieme'
        }
      ],
      concours: [
        {
          label: 'Ecole normale supérieure de Bambili',
          value: 'ensbambili'
        },
        {
          label: "Ecole Africaine de la Météorolgie et de l'Aviation Civile",
          value: 'asecna'
        },
        {
          label: "Ecole Africaine des Métiers de l’Architecture et de l’Urbanisme",
          value: 'eamau'
        },
        {
          label: 'Licence 2',
          value: 'licence2'
        },
        {
          label: 'Licence 1',
          value: 'licence1'
        },
        {
          label: 'Terminale',
          value: 'terminale'
        },
        {
          label: 'Première',
          value: 'premiere'
        },
        {
          label: 'Seconde',
          value: 'seconde'
        },
        {
          label: 'Troisième',
          value: 'troisieme'
        },
        {
          label: 'Quatrième',
          value: 'quatrieme'
        },
        {
          label: 'Cinquième',
          value: 'cinquieme'
        },
        {
          label: 'Sixème',
          value: 'sixieme'
        }
      ],
      concours1: "",
      concours2: "",
      concours3: "",
      edition: false
    }
  },
  methods: {
    close() {
      this.edition = false
    },
    editer() {
      this.edition = true
    },
    async enregistrement() {
      let formData = {
        "etablissement": this.etablissement,
        "niveau": this.niveau,
        "concours1": this.concours1
      }
      utilisateursCollection.doc(this.email).update(formData)
      this.$store.dispatch("utilisateur/get_user", {email: this.email})
    }
  },
  mounted() {
    this.etablissement = this.$store.state.utilisateur.utilisateur.etablissement
    this.niveau = this.$store.state.utilisateur.utilisateur.niveau
    this.concours1 = this.$store.state.utilisateur.utilisateur.concours1
  }
}
