import axios from 'axios';
export default {
  props: ["modalSection", "idChapitre"],
  components: {},
  name: 'classe_dialog_section',
  data() {
    return {
      enseignant: null,
      intitule: "",
      contenuFichier: "",
      contenuVideo: "",
      numero: 1,
      content: '<p>example content $x^p$</p>',
      editorOption: {
        theme: 'snow',
        placeholder: 'Your questing here... $s^r$',
        modules: {
          'formula': true,
          'toolbar': [
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
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalSection", false)
    },
    renderContent () {
      this.$refs.myContent.textContent = this.content
    },

    renderMathJax () {
      this.renderContent()
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$', '$'], ['(', ')']],
            displayMath: [['$$', '$$'], ['[', ']']],
            processEscapes: true,
            processEnvironments: true
          },
          // Center justify equations in code and markdown cells. Elsewhere
          // we use CSS to left justify single line equations in code cells.
          displayAlign: 'center',
          'HTML-CSS': {
            styles: { '.MathJax_Display': { margin: 0 } },
            linebreaks: { automatic: true }
          }
        })
        
        window.MathJax.Hub.Queue([
          'Typeset',
          window.MathJax.Hub,
          this.$refs.myContent
        ])
      }
    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({
      quill,
      html,
      text
    }) {
      console.log('editor change!', html, text)
      this.content = html
      this.renderMathJax()
    },
    enregistrer() {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
      axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
      axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
      axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      console.log("token", this.$store.state.utilisateur.token)
      let url = process.env.API + "/section/"
      let data = new FormData()
      data.append("intitule", this.intitule)
      data.append("numero", this.numero)
      data.append("idChapitre", this.idChapitre)
      data.append("contenu", this.content)
      if(this.$refs.fichier.files[0]){
        data.append("contenuFichier", this.$refs.fichier.files[0])
      }
      if(this.$refs.video.files[0]){
        data.append("contenuVideo", this.$refs.video.files[0])
      }
      axios.post(url, data).then((response) => {
          let message = "La section a été bien créée"
          this.fermer()
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
    }
  },
  mounted() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    axios.defaults.headers.common['Authorization'] = "JWT " + this.$store.state.utilisateur.token
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    if (window.MathJax) {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$', '$'], ['(', ')']],
          displayMath: [['$$', '$$'], ['[', ']']],
          processEscapes: true,
          processEnvironments: true
        },
        // Center justify equations in code and markdown cells. Elsewhere
        // we use CSS to left justify single line equations in code cells.
        displayAlign: 'center',
        'HTML-CSS': {
          styles: { '.MathJax_Display': { margin: 0 } },
          linebreaks: { automatic: true }
        }
      })
      
      window.MathJax.Hub.Queue([
        'Typeset',
        window.MathJax.Hub,
        this.$refs.myContent
      ])
    }
  },
  destroyed() {
    let url = process.env.API + "/classe/" + this.$route.params.idClasse + "/"
    axios.get(url).then((response) => {
        this.$store.commit("classe/init_classe", response.data)
      })
      .catch((error) => {
        let message = "Identifiant ou mot de pass incorrect!" + error
        this.$q.notify({
          type: "positive",
          message: message,
        })
      })
  }
}
