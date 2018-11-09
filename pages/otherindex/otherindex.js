// var GetAllNews_url = app.appServlet.servlet + ''//地址
// pages/otherindex/otherindex.js
var app = getApp()
//获取被赞数量
var GetByFollow_url = app.appServlet.servlet + "GetByFollowServlet"
//获取关注数
var getFollow_url = app.appServlet.servlet + "getFollowServlet"
//点赞数
var GetFollowSum_url = app.appServlet.servlet + "GetFollowSumServlet"
//参加支教活动次数
var GetmyRecruitNum_url = app.appServlet.servlet + 'GetmyRecruitNumServlet';
//个人故事
var GetOneUserStory_url = app.appServlet.servlet + 'GetOneUserStoryServlet';
//个人足迹
var GetAllFfootprint_url = app.appServlet.servlet + 'GetAllFfootprintServlet';
//获取个人头像以及昵称
var GetOneAccount_url = app.appServlet.servlet + 'GetOneAccountServlet';

// var lth
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // lth: 1000,
    winWidth: 0,
    winHeight: 0,
    cznum: 0,//超赞数
    gznum: 0,//关注数
    fsnum: 0,//粉丝数
    zjnum: 0,
    radioCheckVal: 0,
    open: false,
    //program 为足迹数据
    program: null,
    //program2 为故事数据
    program2: null,
    height: null,
    //个人资料
    account:null
  },


  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,

      })
    }
  },
  radioCheckedChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value,
    })
  },
  /**
* 生命周期函数--监听页面加载
*/
  fabu: function () {

  },
  xjt: function () {
    this.setData({
      open: !this.data.open
    })
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ radioCheckVal: e.detail.current });

  },
  onLoad: function (options) {
    var that = this;
    var a_id=options.a_id;
    wx.request({
      url: GetByFollow_url,
      method: 'GET',
      data: {
        aaid: a_id
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
        aid: a_id
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
        aid: a_id
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          cznum: data
        })
      },
    })
    wx.request({
      url: GetmyRecruitNum_url,
      data: {
        aid: a_id
      },
      header: {},
      method: 'GET',
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          zjnum: data,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    //获取个人故事
    wx.request({
      url: GetOneUserStory_url,
      method: 'GET',
      data: {
        aid: a_id
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          program2: data
        })
      },
    })

    //获取个人足迹
    wx.request({
      url: GetAllFfootprint_url,
      method: 'GET',
      data: {
        aid: a_id
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          program: data
        })
      },
    })
    //获取个人信息
    wx.request({
      url: GetOneAccount_url,
      method: 'GET',
      data: {
        aid: a_id
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          account: data['0']
        })
      },
    })
    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

 
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
  changetoActivity:function(){
    wx.navigateTo({
      url: '../activity/activity',
    })
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

  },
})
