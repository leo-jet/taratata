import axios from 'axios';
import propositionqcm from "components/classe/propositionqcm/propositionqcm.vue";
import propositionrelationelle from "components/classe/propositionrelationelle/propositionrelationelle.vue";
import propositionschema from "components/classe/propositionschema/propositionschema.vue";
import {
  classesCollection,
  questionsCollection,
  sectionsCollection
} from 'assets/javascript/firebase.js'
export default {
  props: ["modalQuestion"],
  components: {
    propositionqcm,
    propositionrelationelle,
    propositionschema
  },
  name: 'classe_dialog_question',
  computed: {
    classes() {
      return [this.$store.state.classe.classe]
    },
    chapitres() {
      return this.$store.state.classe.chapitres
    },
    sections() {
      return this.$store.state.question.sections
    },
    question() {
      return this.$store.state.question.question
    },
    propositions() {
      return this.$store.state.question.propositions
    },
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
    }
  },
  data() {
    return {
      classe: null,
      stepper: "",
      chapitre: null,
      chap: null,
      section: null,
      editorOptionHideToolbar: {
        theme: "snow",
        modules: {
          toolbar: false
        }
      },
      editorOption: {
        theme: 'snow',
        placeholder: 'Your questing here... $s^r$',
        modules: {
          'toolbar': [
            ['link', 'image', 'video', 'formula'],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{
              'header': 1
            }, {
              'header': 2
            }], // custom button values
            [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }],
            [{
              'script': 'sub'
            }, {
              'script': 'super'
            }], // superscript/subscript
            [{
              'indent': '-1'
            }, {
              'indent': '+1'
            }], // outdent/indent
            [{
              'direction': 'rtl'
            }], // text direction

            [{
              'size': ['small', false, 'large', 'huge']
            }], // custom dropdown
            [{
              'header': [1, 2, 3, 4, 5, 6, false]
            }],

            [{
              'color': []
            }, {
              'background': []
            }], // dropdown with defaults from theme
            [{
              'font': []
            }],
            [{
              'align': []
            }],
            ['formula']
          ]
        },
      },
      types: [{
          value: "qcm",
          label: "Question à choix multiples"
        },
        {
          value: "qcr",
          label: "Question à complément relationnel"
        },
        {
          value: "qroc",
          label: "Question à réponse ouverte et courte"
        },
        {
          value: "qr",
          label: "Question relationnelle"
        },
        {
          value: "ci",
          label: "Choix de l'intrus"
        },
        {
          value: "qru",
          label: "Question à réponse unique"
        },
        {
          value: "schema",
          label: "Annotation de schéma"
        }
      ],
      type: null,
      numero: 1,
      image: "",
      enonce: "",
      explication: "",
      addQuestion: false,
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalQuestion", false)
    },
    addFiles(files) {
      this.image = files[0]
    },
    classeChange(idClass) {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idClass": idClass
      }
      this.$store.dispatch('question/get_chapitres_classe_select', data)
    },
    chapitreChange(chapitre) {
      console.log(chapitre)
      this.chap = chapitre
      this.$store.commit('question/SET_SECTIONS', chapitre.sections)
    },
    sectionChange(idSection) {
      let data = {
        "token": this.$store.state.utilisateur.token,
        "idSection": idSection
      }
      this.$store.dispatch('question/get_chapitres_classe_select', data)
    },
    async creerQuestion() {
      let data = {
        "section": this.section,
        "enonce": this.enonce,
        "explication": this.explication,
        "numero": this.numero,
        "type": this.type,
        "chapitre": this.chap.numero,
        "propositions": this.$store.state.question.propositions
      }
      var questionDoc = await this.classeRef.collection("chapitres").doc( this.chap.numero.toString()).collection("sections").doc(this.section.toString()).collection("questions").add(data)
      questionsCollection.doc(questionDoc.id).set(data)
      sectionsCollection.doc(this.section.toString()).collection("questions").doc(questionDoc.id).set(data)
      this.fermer()
    },
    clickAddQuestion() {
      this.addQuestion = true
    }
  },
  mounted() {},
  destroyed() {
    this.$store.commit('question/INIT_QUESTION')
  }
}
