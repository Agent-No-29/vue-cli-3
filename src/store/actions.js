import types from './types'

const actions = {
  async getUserInfo({commit, state}) {
    if (state.user) {
      commit(types.GETUSERINFO, state.user)
    } else {
      let user = {
        "userInfo": {
          "name": "风暴中心",
        },
        "userName": "碧波淼淼",
        "menus": {
          "menus": [
            {
              "menuName": "一",
              "menuUrl": "/a",
              "menuIcon": "fa fa-id-badge",
              "id": "1",
              "menuId": "1",
            },
            {
              "menuName": "二",
              "menuUrl": "/page-one",
              "menuIcon": "fa fa-id-badge",
              "id": "2",
              "menuId": "2",
            },
            {
              "menuName": "三",
              "menuUrl": "/c",
              "menuIcon": "fa fa-twitch",
              "id": "3",
              "menuId": "3",
            }
          ]
        },
      };
      commit(types.GETUSERINFO, user);
    }
  },
  clearUserInfo({commit, state}) {
    commit(types.CLEARUSERINFO)
  }
}

export default actions
