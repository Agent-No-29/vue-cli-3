<template>
  <div style="height: 100%" @click="bodyClick">
    <div class="app-content">
      <!--顶部导航-->
      <div class="app-topbar">
        <div class="app-logo">吃饭睡觉打豆豆</div>
        <div class="app-config" v-on:click.stop>
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
      <div class="app-left">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item
              v-for="(item,index) in menus"
              :key="index"
              :index="item.menuId"
              @click="routerChange(item.menuUrl)">
            <i class="el-icon-setting"></i>
            <span>{{item.menuName}}</span>
          </el-menu-item>
        </el-menu>
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
      this.$router.push(this.menus[0].menuUrl);
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
      stopDivPropagation() {

      },
      /*路由改变*/
      routerChange(path) {
        if (this.$route.path == path.split('?')[0]) {
          this.rightContentLoading = true;
          this.routerPath = path;
          this.$router.push('/');
          return;
        }
        this.$router.push(path);
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
  .app-left {
    width: 210px;
    float: left;
    margin-top: 42px;
    overflow: hidden;
  }

  .app-router-view {
    padding-left: 200px;
    box-sizing: border-box;
  }

  .app-topbar .app-username {
    padding-left: 36px;
  }

  .app-topbar .app-username-girl {
    background: #3c4043 url('../assets/image/login-boy.jpg') no-repeat left center;
    background-size: 32px 32px;
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

  .app-topbar {
    width: 100%;
    height: 42px;
    background-color: #3c4043;
    position: absolute;
    top: 0;
    z-index: 9999;
    min-width: 1280px;
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

</style>
