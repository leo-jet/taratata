import CountUp from 'countup'
export default {
  props: ['title', 'total', 'backgroundColor', 'iconName'],
  mounted() {
    this.countUp.start()
  },
  computed: {
    countUp() {
      return new CountUp(this.$refs.number, 0, this.total, 0, 2.5, this.options)
    }
  },
  watch: {
    total() {
      this.countUp.start()
    }
  },
  data() {
    return {
      options: {
        separator: '.'
      }
    }
  }
}
