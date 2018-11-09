//app.js
var openid_url = "https://www.bcuvote.top/TeacherSupport/OpenIdServlet";
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this;
    // 登录
   

  },
  globalData: {
    userInfo: null
  },
  appuserinfo:{
    username:null,
    aid:null,
    num:''
  }
  ,
  appServlet: {
    //  servlet: 'http://localhost:8080/TeacherSupport/'
      servlet:'https://www.bcuvote.top/TeacherSupport/'
  }
})