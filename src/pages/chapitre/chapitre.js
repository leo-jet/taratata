export default {
  name: "chapitre",
  props: [],
  mounted() {},
  computed: {
    section() {
      return this.$store.state.cours.section
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        /* toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' }
            ]
        } */
      }
    }
  }
}
