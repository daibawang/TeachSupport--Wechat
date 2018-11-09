// pages/organizaiton/organization.js
var app = getApp();
var GetOneOrganization_url = app.appServlet.servlet +'GetOneOrganizationServlet';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    prcontact:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      oid: options.oid
    })
    wx.request({
      url: GetOneOrganization_url,
      data: {
        oid:that.data.oid
      },
      header: {
        'Content-Type': 'json'
      },
      method: 'GET',
      success: function(res) {
        var data = res.data;
        console.log(data);
        that.setData({
          prcontact: res.data['0'],
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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