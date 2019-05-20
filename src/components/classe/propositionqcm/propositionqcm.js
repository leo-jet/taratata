import axios from 'axios';
import propositionqcm from "components/classe/propositionqcm/propositionqcm.vue";
export default {
  props: ["addQuestion"],
  components: {
    propositionqcm
  },
  name: 'classe_dialog_question',
  computed: {
    propositions() {
      return this.$store.state.question.propositions
    }
  },
  data() {
    return {
      newProposition: false,
      enonce: "",
      editorOptionHideToolbar: {
        theme: "snow",
        modules: {
          toolbar: false
        }
      },
      solution: false,
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
      }
    }
  },
  methods: {
    fermer() {
      this.$emit("update:addQuestion", false)
    },
    deleteProposition(index){
      this.$store.commit('question/DELETE_PROPOSITION', index)
    },
    creerProposition() {
      let data = {
        "enonce": this.enonce,
        "solution": this.solution,
        "checked": false,
      }
      this.$store.commit('question/ADD_PROPOSITION', data)
      this.newProposition = false
      this.$nextstick()
    }
  },
  mounted() {},
  destroyed() {}
}
