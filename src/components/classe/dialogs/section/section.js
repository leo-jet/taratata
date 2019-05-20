import axios from 'axios';
import {
  classesCollection,
  sectionsCollection
} from 'assets/javascript/firebase.js'
export default {
  props: ["modalSection", "chapnumero"],
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
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    classeRef() {
      return classesCollection.doc(this.$route.params.idClasse)
    }
  },
  methods: {
    fermer() {
      this.$emit("update:modalSection", false)
    },
    renderContent() {
      this.$refs.myContent.textContent = this.content
    },

    renderMathJax() {
      this.renderContent()
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [
              ['$', '$'],
              ['(', ')']
            ],
            displayMath: [
              ['$$', '$$'],
              ['[', ']']
            ],
            processEscapes: true,
            processEnvironments: true
          },
          // Center justify equations in code and markdown cells. Elsewhere
          // we use CSS to left justify single line equations in code cells.
          displayAlign: 'center',
          'HTML-CSS': {
            styles: {
              '.MathJax_Display': {
                margin: 0
              }
            },
            linebreaks: {
              automatic: true
            }
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
    async enregistrer() {
      var chap = {
        titre: this.intitule,
        numero: this.numero,
        contenu: this.content
      }
      var num = this.chapnumero
      var sectionRef = await this.classeRef.collection('chapitres').doc(num.toString()).collection('sections').add(chap)
      sectionsCollection.doc(sectionRef.id).set(chap)
      this.fermer()
    }
  },
  mounted() {
    if (window.MathJax) {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ['$', '$'],
            ['(', ')']
          ],
          displayMath: [
            ['$$', '$$'],
            ['[', ']']
          ],
          processEscapes: true,
          processEnvironments: true
        },
        // Center justify equations in code and markdown cells. Elsewhere
        // we use CSS to left justify single line equations in code cells.
        displayAlign: 'center',
        'HTML-CSS': {
          styles: {
            '.MathJax_Display': {
              margin: 0
            }
          },
          linebreaks: {
            automatic: true
          }
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
    let data = {
      "classeRef": this.classeRef
    }
    this.$store.dispatch('classe/get_chapitres_with_sections', data)
  }
}
