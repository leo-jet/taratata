import axios from 'axios';
export default {
  props: ["modalDevoir"],
  components: {},
  name: 'classe_dialog_devoir',
  data() {
    return {
      enseignant: null,
      dateDebut: "",
      dateFin: "",
      titre: "",
      consigne: "",
      nombreEssai: 1,
      section: "",
      classe: "",
      chapitre: "",
      correction: false, 
    }
  },
  computed: {
    classes() {
      return this.$store.state.question.classes
    },
    sections() {
      return this.$store.state.question.sections
    },
    chapitres() {
      return this.$store.state.classe.chapitres
    },
  },
  methods: {
    /*classeChange(idClass) {
      console.log(idClass)
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idClass": idClass
      }
      this.$store.dispatch('question/get_chapitres_classe_select', data)
    },*/
    creerDevoir() {
      let debut = this.dateDebut.split(' ')[0]
      let fin = this.dateFin.split(' ')[0]
      let questions = this.$store.state.quiz.questions
      let data = {
        "idSection": this.section,
        "idClasse": this.$store.state.classe.classe.id,
        "idChapitre": this.chapitre.id,
        "consignes": this.consigne,
        "titre": this.titre,
        "correction": this.correction,
        "dateFin": fin.replace(/\//g, '-'),
        "dateDebut": debut.replace(/\//g, '-'),
        "questions": questions,
        "nombreEssai": this.nombreEssai,
      }
      console.log(data)
      this.$store.dispatch('quiz/creer_devoir', data)
      this.fermer()
    },
    chapitreChange(chapitre) {
      console.log(chapitre.value.sections)
      this.chap = chapitre
      this.$store.commit('question/SET_SECTIONS', chapitre.value.sections)
    },
    fermer() {
      this.$emit("update:modalDevoir", false)
    },
  },
  mounted() {
    let data = {
      "token": this.$store.state.utilisateur.token,
    }
    this.$store.dispatch('question/get_classe_select', data)
  }
}
