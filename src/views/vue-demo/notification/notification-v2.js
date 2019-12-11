import Notification from './notification.vue'

export default {
  extends: Notification,
  name: 'notification-v2',
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 0,
      height: 0,
      visible: true
    }
  },
  mounted () {
    this.createTimer();
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false;
        }, this.autoClose);
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight;
    }
  },
  beforeDestory () {
    this.clearTimer();
  }
}
