import {
  classesCollection
} from 'assets/javascript/firebase.js'
export default {
  components: {},
  name: 'information_classe',
  computed: {
    classe() {
      return this.$store.state.classe.classe
    },
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
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
    input_tags(newVal) {
      this.updateClasse({
        "tags": newVal
      })
    },
    input_dateFinInscription(newVal) {
      this.updateClasse({
        "dateFinInscription": newVal.replace(/\//g, '-')
      })
    },
    input_matiere(newVal) {
      this.updateClasse({
        "matiere": newVal
      })
    },
    input_niveau(newVal) {
      this.updateClasse({
        "niveau": newVal
      })
    },
    input_description(newVal) {
      this.updateClasse({
        "description": newVal
      })
    },
    updateClasse(dict) {
      this.classeRef.update(dict)
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  },
  mounted() {
    var self = this
    this.classeRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var docInf = doc.data()
        self.tags = docInf.tags
        self.dateFinInscription = docInf.dateFinInscription
        self.matiere = docInf.matiere
        self.niveau = docInf.niveau
        self.description = docInf.description
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
}
