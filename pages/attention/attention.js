// pages/attention/attention.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      id: 1,
      attation: 0,//是否关注 0/1
      count: 12,//点赞
      fans: 5//次数
    }, {
      id: 2,
      attation: 0,
      count: 12,
      fans: 5
    },
    {
      id: 3,
      attation: 0,
      count: 12,
      fans: 5
    },],
    actionSheetHidden: true,
    actionSheetItems: ['确定', '取消'],
    indexx: null

  },
  //弹出和删除
  actionSheetTap: function (e) {
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个数组
    this.data.indexx = Index

    console.log(this.data.indexx)
    this.setData({
      actionSheetHidden: false,

    });

  },
  actionSheetChange: function (e) {
    var dataset = e.target.dataset;
    var Index1 = dataset.index;
    if (Index1 == 0) {
      this.data.array.splice(this.data.indexx, 1);

    }
    console.log("ss" + this.data.indexx)
    this.setData({
      actionSheetHidden: true,
      array: this.data.array
    });
    console.log("zz" + this.data.indexx)
  },
  //遮罩消除
  actionSheetChange1: function (e) {
    this.setData({
      actionSheetHidden: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    // this.data.lth = this.data.program.length * 142,
    // console.log(this.data.lth)
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