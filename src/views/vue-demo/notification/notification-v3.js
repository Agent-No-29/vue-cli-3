import Vue from 'vue';
import Component  from './notification-v2'

const notificationConstructor = Vue.extend(Component);

const instances = [];
let seed = 1;

const removeInstance = (instance) => {
  if(!instance) return;
  const len = instances.length;
  const index = instances.findIndex(inst => instance.id === inst.id);

  instances.splice(index, 1);

  if (len <= 1) return;
  const removeHeight = instance.vm.height;
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = instances[i].verticalOffset - removeHeight - 16;
  }
}

const notify = (options) => {
  //更服务端渲染有关的
  // if (Vue.prototype.$isServer) return
  const {autoClose, ...rest} = options;
  const instance = new notificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose ? autoClose : 3000
    }
  })
  const id = `notification_${ seed++ }`;
  instance.id = id;
  // 虽然没有传挂载到哪  但是dom节点已经生成
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);

  // console.log(instance)



  instance.vm.visible = true;

  let verticalOffset = 0;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  })

  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance)


  instance.vm.$on('closed', () => {
    removeInstance(instance);
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
  })
  instance.$on('close', () => {
    instance.vm.visible = false;
  })

  
  return instance.vm;

}

export default notify
















