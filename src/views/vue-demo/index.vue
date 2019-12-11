<template>
  <div>
    <!-- 默认组件 -->
    <Notification 
      :content="content1"
      @close="close"
      @closed="closed">
    </Notification>

    <!-- 继承组件 -->
    <NotificationV2 
      :content="content2"
      @close="close"
      @closed="closed">
    </NotificationV2>
    
    <!-- 通过继承组件封装为方法 -->
    <div class="open-message" @click="openMessage">通知触发</div>
  </div>
</template>

<script>
  import Notification from './notification/notification.vue';
  import NotificationV2 from './notification/notification-v2.js';
  import NotificationV3 from './notification/notification-v3.js';
  // 组件、继承组件封装均可挂载全局，具体请看index.js，这里仅做示例。
  export default {
    name: 'vue-demo',
    components: {
      Notification,
      NotificationV2
    },
    data() {
      return {
        content1: '通知v1',
        content2: '通知v2',
        content3: '通知v3',
      }
    },
    methods: {
      close() {
        console.log(1)
      },
      closed() {
        console.log(2)
      },
      openMessage() {
        NotificationV3({
          autoClose: 3000,
          content: this.content3
        })
      }
    },
    mounted() {}
  }
</script>
<style>
  .open-message {
    display: inline-block;
    margin-top: 300px;
    cursor: pointer;
    color:#fff;
    background-color: #409eff;
    border-radius: 4px;
    font-size: 12px;
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
</style>