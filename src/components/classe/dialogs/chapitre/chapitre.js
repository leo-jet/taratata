import axios from 'axios';
import {
  classesCollection
} from 'assets/javascript/firebase.js'
export default {
  props: ["modalChapitre"],
  components: {},
  name: 'classe_dialog_chapitre',
  data() {
    return {
      enseignant: null,
      dateDebut: "",
      dateFin: "",
      titre: "",
      contenuFichier: "",
      contenuVideo: "",
      description: "",
      numero: 1,
    }
  },
  computed: {
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalChapitre", false)
    },
    enregistrer() {
      let debut = this.dateDebut.split(' ')[0]
      let fin = this.dateFin.split(' ')[0]
      var chap = {
        titre: this.titre,
        numero: this.numero,
        dateDebut: debut.replace(/\//g, '-'),
        dateFin: fin.replace(/\//g, '-'),
        description: this.description
      }
      var num = this.numero
      this.classeRef.collection('chapitres').doc(num.toString()).set(chap)
      this.fermer()
    }
  },
  mounted() {},
  destroyed() {}
}
