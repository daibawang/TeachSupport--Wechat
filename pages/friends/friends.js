// var GetAllNews_url = app.appServlet.servlet + ''//地址
// pages/friends/friends.js
var app = getApp()
var GetAllFriends_url = app.appServlet.servlet + 'GetAllFriends'
var DeleteFriends_url = app.appServlet.servlet + 'DeleteFriends'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends:null,
    actionSheetHidden: true,
    actionSheetItems: ['确定', '取消'],
    aaid: null
   
  },
  //弹出和删除
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: false,
      aaid:e.currentTarget.dataset.id
    });

  },
  actionSheetChange: function (e) {
    var that=this;
    if(e.currentTarget.dataset.index==0){
      wx.request({
        url: DeleteFriends_url,
        method: 'GET',
        data: {
          aid: app.appuserinfo.aid,
          aaid: that.data.aaid
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log(data);
          if (data == true) {
            wx.showModal({
              title: '提示',
              content: '删除成功！',
              showCancel: false
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '删除失败！',
              showCancel: false
            })
          }
          wx.request({
            url: GetAllFriends_url,
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
                friends: data
              })
            },
          })
        },
      })
    } 
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
      wx.request({
        url: GetAllFriends_url,
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
                   friends:data
                  })
              },
          })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  
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