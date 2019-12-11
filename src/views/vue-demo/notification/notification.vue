<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div 
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClick" @mousedown="sadfasd">{{btn}}</a>
      <p v-if="p">p标签</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Notification',
    props: {
      content: {
        type: String,
        required: true
      },
      btn: {
        type: String,
        default: '关闭'
      }
    },
    data () {
      return {
        visible: true,
        p: false
      }
    },
    computed: {
      style () {
        return {}
      }
    },
    methods: {
      sadfasd() {},
      handleClick (e) {
        e.preventDefault();
        this.$emit('close');
      },
      afterLeave () {
        this.$emit('closed')
      },
      afterEnter () {},
      createTimer () {},
      clearTimer () {}
    }
  }
</script>
<style scoped>
  .fade-enter-active, 
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .notification {
    display: flex;
    background-color: #f0f9eb;
    color: rgba(255, 255, 255, 1);
    color: #67c23a;
    align-items: center;
    padding: 20px;
    position: fixed;
    min-width: 280px;
    box-shadow: 0px 3px 5px -1px #67c23a, 0px 6px 10px 0px #fff;
    flex-wrap: wrap;
    transition: all .3s;
    z-index: 100;
    border-radius: 5px;
  }
  .content {
    padding: 0;
  }
  .btn {
    color: #e6a23c;
    padding-left: 24px;
    margin-left: auto;
    cursor: pointer;
  }
</style>

