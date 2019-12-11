import Notification from './notification.vue';
import Notify from './function';
import Notify2 from './func-notification';
export default (Vue) => {
  Vue.component(Notification.name, Notification);
  Vue.component(Notify2.name, Notify2);
  Vue.prototype.$notify = Notify;
}