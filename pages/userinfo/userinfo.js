// pages/userinfo/userinfo.js
var  app=getApp();
var openid_url = app.appServlet.servlet +"OpenIdServlet";
var register_url = app.appServlet.servlet + "RegisterServlet";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            //获取openid接口  
            url: openid_url,
            header: {
              "Content-Type": "json"
            },
            data: {
              js_code: res.code,
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              // OPEN_ID = res.data.openid;//获取到的openid  
              // SESSION_KEY = res.data.session_key;//获取到session_key  
              app.appuserinfo.username = res.data.openid;
              wx.setStorage({
                key: "openid",
                data: app.appuserinfo.username
              })
              console.log(app.appuserinfo.username)
            }
          })
        } else { console.log('获取用户登录态失败！' + res.errMsg) }
      }
    })


    setTimeout(function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //帐号管理
              wx.request({
                url: register_url,
                data: {
                  openid: app.appuserinfo.username,
                  headimg: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName
                },
                method: 'GET',
                header: {
                  'Content-Type': 'json'
                },
                success: function (res) {
                  var data = res.data;
                  console.log(res.data);
                  app.appuserinfo.aid = res.data['0'].aid
                  //  console.log(self.appuserinfo.aid);
                },
                fail: function (e) {
                  wx.showModal({
                    title: '提示',
                    content: '连接服务器失败，请稍后再试！',
                  })
                },
              })
              //用户已经授权过
              wx.switchTab({
                url: '../index/index'
              })
            }
          })
        }
      }
    })
    }, 1000)
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
          //帐号管理
          wx.request({
            url: register_url,
            data: {
              openid: app.appuserinfo.username,
              headimg: e.detail.userInfo.avatarUrl,
              nickname: e.detail.userInfo.nickName
            },
            method: 'GET',
            header: {
              'Content-Type': 'json'
            },
            success: function (res) {
              var data = res.data;
              console.log(res.data);
              app.appuserinfo.aid = res.data['0'].aid
              //  console.log(self.appuserinfo.aid);

            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '连接服务器失败，请稍后再试！',
              })
            },
          })
          //用户已经授权过
          wx.switchTab({
            url: '../index/index'
          })
    } else {
      //用户按了拒绝按钮
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})