var app = getApp();
var GetAllNews_url = app.appServlet.servlet+'GetALLNewsServlet'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area:"北京",
    array:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取所有新闻
    wx.request({
      url: GetAllNews_url,
      method: 'GET',
      data: {
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          array: res.data,
        })
      },
    })
  },
  v4_1: function(){
    var lx = "长期支教"
    wx.navigateTo({
      url: "../program/program?&lx=" +lx
    })
  },
  v4_2: function () {
    var lx = "短期支教"
    wx.navigateTo({
      url: "../program/program?&lx=" + lx
    })
  },
  v4_3: function () {
    wx.navigateTo({
      url: '../program2/program2',
    })
  },
  v4_4: function () {
    wx.navigateTo({
      url: '../more/more',
    })
  },
  v6_1: function (e) {
    var $data = e.currentTarget.dataset;
    console.log($data.id)
    wx.navigateTo({
      url: '../news/news?nid='+$data.id,
    })
  },
  v3_2:function(){
    var lx = this.data.area
    wx.navigateTo({
      url: '../switchcity/switchcity?lx=' + lx
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({
      key: 'city',
      success: function (res) {
        console.log(res.data)
        that.setData({
          area: res.data
        })
      }
    })

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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    //获取所有新闻
    wx.request({
      url: GetAllNews_url,
      method: 'GET',
      data: {
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          array: res.data,
        })
      },complete:function(){
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
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