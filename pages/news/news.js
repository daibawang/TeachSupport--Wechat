// pages/news/news.js
var app = getApp();
var GetOneNew_url = app.appServlet.servlet +'GetOneNewServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var $data = options.nid;

    //获取一个新闻
    wx.request({
      url: GetOneNew_url,
      method: 'GET',
      data: {
        nid: $data
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          news: res.data['0'],
        })
      },
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
  
  }
})