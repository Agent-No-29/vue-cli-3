<template>
  <div style="height: 100%" @click="bodyClick">
    <div class="app-content">
      <!--顶部导航-->
      <div class="app-topbar">
        <div class="app-logo">吃饭睡觉打豆豆</div>
        <div class="app-config" v-on:click.stop="stopDivPropagation">
          <el-menu theme="light" class="app-user" mode="horizontal" menu-trigger="click" ref="appUserMenu">
            <el-submenu index="1" :popper-append-to-body="false">
              <template slot="title">
                <div class="app-username app-username-girl">
                  <span class="user-icon"></span>大菜头
                </div>
              </template>
              <div class="app-loginout-pwd">
                <div>
                  <div class="avatar"></div>
                  <div class="info">
                    <div class="user-name">{{user ? user.userName : ''}}</div>
                    <div v-if="user?user.userInfo:''"><i></i>{{user ? user.userInfo.name : ''}}</div>
                  </div>
                </div>
                <div><span v-on:click.stop="logout">退出</span></div>
              </div>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="app-router-view">
        <div v-loading="rightContentLoading">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {doLoginOut} from '../server/system'

  export default {
    data() {
      return {
        appName: 'APP_NAME',
        routerPath: '/',
        rightContentLoading: false,
      };
    },
    computed: {
      ...mapGetters(['user', 'menus'])
    },
    mounted() {
      this.getUserInfo();
      this.menuSelect('0');
    },
    watch: {
      '$route'(to, from) {
        if (to.path == '/') {
          this.$router.push(this.routerPath);
        } else {
          this.$nextTick(() => {
            this.rightContentLoading = false;
          })
        }
      },
      menus: {
        immediate: true,
        handler(newVal, oldVal) {
          if (newVal.length) {
            this.menuSelect('0');
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(['getUserInfo', 'clearUserInfo']),
      logout() {
        this.$confirm('确认要注销当前登录账号吗?', '注销', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login');
          this.clearUserInfo();
          sessionStorage.clear()
        });
      },
      stopDivPropagation(){

      },
      /*初始化菜单*/
      menuSelect: function (index) {
        console.log(this.menus);
        this.$router.push(this.menus[index].menuUrl);
      },
      bodyClick() {
        if (this.$refs['appUserMenu']) {
          this.$refs['appUserMenu'].close('1');
        }
      }
    }

  }
</script>
<style>
  .app-content .ps {
    overflow: inherit !important;
  }

  .horizontal-collapse-transition,
  .app-content .el-menu {
    transition: unset !important;
    animation: unset !important;
  }

  .horizontal-collapse-transition .el-submenu__title .el-submenu__icon-arrow {
    transition: unset !important;
    opacity: 1 !important;
  }

  .app-content .single-menu-item {
    background-color: #424c5c;
  }

  .app-topbar .app-username {
    padding-left: 36px;
  }

  .app-topbar .app-username-girl {
    background: #3c4043 url('../assets/image/login-boy.jpg') no-repeat left center;
    background-size: 32px 32px;
  }

  .app-content .attr-container-comment-style.small-left {
    padding-left: 50px !important;
  }

  .app-leftbar .el-icon-arrow-right:before {
    content: "";
  }

  .el-submenu__title {
    background-color: #424c5c;
  }

  .el-submenu-two .el-submenu__title {
    background-color: #333a45;
  }

  .app-content .el-menu {
    background-color: #424c5c;
    padding: 0;
  }

  .el-submenu-one .el-submenu__title .el-submenu__icon-arrow,
  .el-submenu-one .el-submenu__title .el-icon-arrow-down {
    width: 5px;
    height: 7px;
    left: 165px;
    background: url("../assets/image/left-menu-arrow.png") no-repeat;
  }

  .el-submenu-two .el-submenu__title .el-submenu__icon-arrow,
  .el-submenu-two .el-submenu__title .el-icon-arrow-down {
    background: url("../assets/image/left-menu-arrow.png") no-repeat;
  }

  .el-icon-arrow-down:before {
    content: '';
  }


  .el-menu-item > i,
  .el-submenu__title > i,
  .el-submenu__title > span,
  .el-menu-item > span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 14px;
  }
  .app-content .el-submenu-two .el-submenu__title {
    color: #fff;
  }

  .app-content .el-submenu-one .el-menu-item,
  .app-content .el-submenu-two .el-menu-item {
    color: #b6bbce;
    min-width: initial;
  }

  .el-menu-item > i {
    left: 20px;
  }

  .collapse .el-submenu__title > i {
    left: 20px;
  }

  .el-submenu__title > span,
  .el-menu-item > span {
    left: 40px;
  }

  .app-content .menu-toggle-icon {
    width: 10px;
    height: 10px;
    display: inline-block;
    background: url("../assets/image/menu-toggle-icon.png") no-repeat center;
  }

  .app-content .menu-toggle-icon:hover {
    background: url("../assets/image/menu-toggle-icon-hover.png") no-repeat center;
  }

  .app-content .el-menu--collapse .menu-toggle-icon {
    background: url("../assets/image/menu-toggle-icon-simple.png") no-repeat center;
  }

  .app-content .el-menu--collapse .menu-toggle-icon:hover {
    background: url("../assets/image/menu-toggle-icon-simple-hover.png") no-repeat center;
  }

  .app-content {
    height: 100%;
    position: relative;
  }

  .app-content .left-nav {
    width: 184px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .app-content .left-nav.small-nav {
    width: 50px;
  }

  .app-content .el-menu .menu-toggle i {
    color: #aeb8bf;
    font-size: 9px;
    font-style: normal;
    cursor: pointer;
  }

  .app-content .el-menu-item i {
    display: inline-block;
    width: 8px;
    height: 12px;
  }

  .app-content .el-menu-item .el-tooltip {
    text-align: center;
  }

  .app-content .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 184px;
  }

  .app-content .el-menu-vertical-demo:not(.el-menu--collapse), .el-menu--collapse {
    height: 100%;
    border: 0;
    box-sizing: border-box;
  }

  .app-content .menu-toggle {
    height: 30px;
    position: absolute;
    background-color: #4b5462;
    top: 42px;
    width: 100%;
    z-index: 999;
    cursor: pointer;
  }

  .el-menu--collapse li .el-submenu__title .fa,
  .app-content .menu-toggle i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .app-content .right-content {
    width: 100%;
    height: 100%;
  }

  .app-content .right-content-left-big {
    padding-left: 184px;
    box-sizing: border-box;
    padding-top: 42px;
    background: #fff;
  }

  .app-content .right-content-left-small {
    padding-left: 50px;
    box-sizing: border-box;
    padding-top: 42px;
  }

  .app-content .right-content-left-none {
    padding-left: 0;
  }

  .app-content .el-menu-item,
  .app-content .el-submenu__title {
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    color: #e7e9f1;
  }

  .app-content .el-submenu-two .el-menu-item {
    height: 32px;
    line-height: 32px;
  }

  .app-content .el-menu-item {
    padding-left: 52px !important;
  }

  .el-menu-item:hover {
    background-color: #495a75;
  }

  .app-content .menu-icon-collapse {
    display: inline-block;
    height: 100%;
    width: 20px;
    background: url("../assets/image/character-icon.png") no-repeat center;
  }

  .app-topbar .app-loginout-pwd {
    width: 248px;
    height: 136px;
    box-sizing: border-box;
  }

  .app-topbar .app-loginout-pwd > div:first-child {
    background-color: #333;
    font-size: 12px;
    color: #f5bd82;
    overflow: hidden;
  }

  .app-topbar .app-loginout-pwd > div:first-child .avatar {
    height: 63px;
    width: 63px;
    float: left;
    background: url("../assets/image/login-boy.jpg") no-repeat center;
    background-size: 100% 100%;
    margin: 12px 16px 26px 12px;
  }

  .app-topbar .app-loginout-pwd > div:first-child .avatar-boy {
    background: url("../assets/image/login-boy.jpg") no-repeat center;
  }

  .app-topbar .app-loginout-pwd > div:first-child .avatar-girl {
    background: url("../assets/image/login-boy.jpg") no-repeat center;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info {
    float: left;
    width: 150px;
    height: 100%;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info div {
    line-height: normal;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info div {
    margin-bottom: 10px;
    padding-left: 25px;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info div {
    background: url("../assets/image/character-icon.png") no-repeat 0px 2px;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info div:nth-child(2) {
    background: url("../assets/image/department-icon.png") no-repeat 0px 2px;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info div.user-name {
    background: none;
    padding-left: 0;
  }

  .app-topbar .app-loginout-pwd > div:first-child .info .user-name {
    font-size: 14px;
    color: #fff;
    margin: 10px auto 13px;
  }

  .app-topbar .app-loginout-pwd > div:last-child {
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 12px;
    color: #616161;
    background: #252525;
  }

  .app-topbar .app-loginout-pwd > div:last-child span {
    cursor: pointer;
  }

  .app-topbar .app-loginout-pwd > div:last-child:hover {
    color: #d1d1d1;
  }

  .user-icon {
    height: 14px;
    width: 1px;
    display: inline-block;
    margin-right: 10px;
  }

  .app-topbar {
    width: 100%;
    height: 42px;
    background-color: #3c4043;
    position: absolute;
    top: 0;
    z-index: 9999;
    min-width: 1280px;
  }

  .el-menu {
    background-color: #333;
  }

  .app-topbar .app-logo {
    width: 169px;
    float: left;
    margin-left: 8px;
    background: url("../assets/image/login-boy.jpg") no-repeat left center;
    padding-left: 38px;
    font-size: 17px;
    height: 100%;
    line-height: 42px;
    color: #ffffff;
    background-size: 28px 28px;
  }

  .app-topbar .app-nav {
    float: left;
    height: 42px;
    overflow: hidden;
  }

  .app-topbar .app-menu .el-menu-item {
    height: 42px;
    line-height: 42px;
    overflow: hidden;
  }

  .el-menu-item,
  .el-submenu__title {
    color: #e7e7e7;
    padding: 0 14px;
  }

  .el-submenu__title {
    padding: 0 !important;
  }

  .el-menu--horizontal .el-submenu.is-opened .el-submenu__icon-arrow {
    margin-top: 0;
  }

  .el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
    color: #e7e7e7;
    margin-top: 10px;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: url("../assets/image/select-arrow.png") no-repeat;
  }

  .el-menu--horizontal > .el-menu-item:hover, .el-menu--horizontal > .el-submenu.is-active .el-submenu__title, .el-menu--horizontal > .el-submenu:hover .el-submenu__title, .el-menu--horizontal .el-menu-item {
    border: none;
  }

  .el-menu--horizontal .el-submenu .el-submenu__title:hover,
  .el-submenu .el-submenu__title:hover,
  .el-submenu .el-menu-item:hover {
    background-color: #495a75;
  }

  .app-topbar .app-menu .el-menu-item.is-active, .app-topbar .app-menu .el-menu-item.is-active:hover {
    background: #292929;
    color: #ffffff;
    font-weight: normal;
    border-bottom: 3px solid #f29500;
  }

  .app-topbar .app-menu .el-menu-item {
    font-size: 14px;
    border-left: 1px solid #2a2a2a;
    border-bottom-width: 2px;
  }

  .app-topbar .app-menu .el-menu-item:hover {
    border-bottom-width: 2px;
    color: #fff;
  }

  .app-topbar .app-config {
    float: right;
  }

  .app-topbar .app-user, .app-topbar .el-submenu__title {
    height: 42px !important;
    line-height: 42px !important;
    box-sizing: border-box;
  }

  .app-topbar .app-user.el-menu--horizontal .el-submenu > .el-menu {
    top: 42px !important;
    left: auto !important;
    right: 0;
    box-shadow: none;
    background: #eef1f6;
    padding: 0;
    border: none;
    border-top: 1px solid #333;
    z-index: 99999;
  }

  .app-topbar .app-user .el-submenu__title {
    border: none !important;
  }

  .app-topbar .app-user .el-submenu__title:hover, .app-user .el-submenu:hover .el-submenu__title {
    border: none !important;
    background-color: #3c4043;
    color: #fff;
  }

  .app-topbar .app-user .el-submenu > .el-menu .el-menu-item {
    background: none;
    color: #5f5f5f;
    height: 42px;
    line-height: 42px;
    margin: 0px 2px 0px 2px;
  }

  .app-topbar .app-user .el-submenu > .el-menu .el-menu-item:hover, .app-user .el-submenu > .el-menu .el-menu-item.is-active:hover {
    color: darkorange;
    background: none;
  }

  .app-topbar .app-user .el-submenu > .el-menu .el-menu-item.is-active {
    color: darkorange;
  }

  .app-topbar .app-username {
    font-size: 14px;
    float: left;
  }

  .app-topbar .app-changepwd {
    background: url("../assets/image/changepwd.png") no-repeat left center;
    padding-left: 26px;
    font-size: 12px;
  }

  .app-topbar .app-changepwd:hover {
    background: url("../assets/image/changepwd-active.png") no-repeat left center;
  }

  .app-topbar .app-logout {
    background: url("../assets/image/logout.png") no-repeat left center;
    padding-left: 26px;
    font-size: 12px;
  }

  .app-topbar .app-logout:hover {
    background: url("../assets/image/logout-active.png") no-repeat left center;
  }

  .app-submenu {
    height: 100%;
    border-radius: 0px !important;
  }

  .is-opened > .el-submenu__title > .el-icon-arrow-down {
    margin-top: -4px;
  }

  .app-content {
    float: right;
    width: 100%;
    height: 100%;
  }

  .app-router-view {
    height: 100%;
    box-sizing: border-box;
    background-color: #f3f2f2;
    overflow: hidden;
    padding-top: 42px;
  }

  .app-router-view > div {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .small-left-meau-style .app-router-view {
    padding-left: 50px;
  }

  .el-menu--collapse .el-menu .el-submenu {
    min-width: inherit;
  }

  .app-content .collapse .el-menu-item {
    padding: 0 15px !important;
  }

  .collapse .el-submenu-two .el-submenu__title {
    padding: 0 15px !important;
  }

  .collapse .el-submenu-two .el-submenu__title .el-submenu__icon-arrow,
  .collapse .el-submenu-two .el-submenu__title .el-icon-arrow-down {
    left: auto;
    right: 4px;
    position: absolute;
    transform: translateY(-50%) !important;
  }

  .app-leftbar {
    height: 100%;
    padding-top: 72px;
    width: 184px;
    position: absolute;
    z-index: 998;
    box-sizing: border-box;
  }

  .app-leftbar .menu-list {
    height: 100%;
    width: 100%;
    background-color: #424c5c;
    position: relative;
  }

  .app-leftbar.collapse {
    width: 50px;
  }

  .el-menu--collapse {
    width: 50px;
  }

  .el-form-item__content .el-form-item__error {
    padding-left: 0%;
  }

  .el-pagination {
    margin-top: 10px;
    float: right;
  }

  .app-topbar .app-user .el-submenu__title {
    background: #3c4043;
    color: #f0f0f0;
  }

  .app-topbar .el-icon-caret-bottom:before {
    content: '';
    display: inline-block;
    width: 13px;
    height: 12px;
    background: url("../assets/image/login-arrow-icon.png") no-repeat center;
  }

  .el-menu--horizontal .el-submenu:focus > .el-submenu__title {
    color: #f0f0f0;
  }

  .el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
    margin-left: 20px;
    margin-right: 12px;
  }

</style>
