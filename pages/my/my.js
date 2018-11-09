// var GetAllNews_url = app.appServlet.servlet + ''//地址
const app = getApp()
//获取被赞数量
var GetByFollow_url = app.appServlet.servlet+"GetByFollowServlet"
//获取关注数
var getFollow_url = app.appServlet.servlet + "getFollowServlet"
//点赞数
var GetFollowSum_url = app.appServlet.servlet + "GetFollowSumServlet"
//参加支教活动次数
var GetmyRecruitNum_url = app.appServlet.servlet + 'GetmyRecruitNumServlet';
//index.js
//获取应用实例


Page({
  data: {
    adr:"北京",
    dznum:0,//点赞数
    gznum:0,//关注数
    fsnum:0,//粉丝数
    hdcs:0,

    userInfo: {},
    hasUserInfo: false,
  },
  //申报活动
  changetohd: function () {
    wx.navigateTo({
      url: '../myprogram/myprogram',
    })
  },
  //我的简历
  changetojl:function(){
    wx.navigateTo({
      url: '../creat/creat',
    })
  },
  top_2_1:function(){
   wx.navigateTo({
     url: '../look/look',
   })
  },
  adr1:function(){
   wx.navigateTo({
     url: '../share/share',
   })
  },
  changetomyindex:function(){
      wx.navigateTo({
          url: '../myindex/myindex',
      })
  },
  changetoqu:function(){
    wx.navigateTo({
      url: '../question/question',
    })
  },
  changetoFriend:function(){
    wx.navigateTo({
      url: '../friends/friends',
    })
  },
  changetoActivity:function(){
    wx.navigateTo({
      url: '../myactivity/myactivity',
    })
  },
  changetoFans:function(){
    wx.navigateTo({
      url: '../fans/fans',
    })
  },
  changetoAttention:function(){
    wx.navigateTo({
      url: '../attention/attention',
    })
  },
  changetoZan: function () {
    wx.navigateTo({
      url: '../myzan/myzan',
    })
  },
  onLoad: function () {
    var that=this;
       
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var that=this;
    wx.request({
      url: GetByFollow_url,
      method: 'GET',
      data: {
        aaid: app.appuserinfo.aid
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          fsnum: data
        })
      },
    })
    wx.request({
      url: getFollow_url,
      method: 'GET',
      data: {
        aid: app.appuserinfo.aid
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          gznum: data
        })
      },
    })
    wx.request({
      url: GetFollowSum_url,
      method: 'GET',
      data: {
        aid: app.appuserinfo.aid
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          dznum: data
        })
      },
    })
    wx.request({
      url: GetmyRecruitNum_url,
      data: {
        aid: app.appuserinfo.aid
      },
      header: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          hdcs: data,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })


  },


})
