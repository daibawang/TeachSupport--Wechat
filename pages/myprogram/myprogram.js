var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
var GetUserVoRecruitAllStates_url = app.appServlet.servlet +'GetUserVoRecruitAllStatesServlet';
var GetmyRecruitNum_url = app.appServlet.servlet +'GetmyRecruitNumServlet';

Page({
  data: {
    tabs: ["支教地点", "支教类型", "支教组织"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    array: null
  },
  onLoad: function () {
    var that = this;
    //获取列表
    wx.request({
      url: GetUserVoRecruitAllStates_url,
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
          array: res.data,
        })
      },
    })
    //获取申请的活动数目
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
        // that.setData({
        //   num: data,
        // })
        app.appuserinfo.num = data
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindshare: function () {
    wx.navigateTo({
      url: '../share/share?extra=' + JSON.stringify(this.data.array),
    })
  }, onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    wx.request({
      url: GetUserVoRecruit_url,
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
          array: res.data,
        })
      }, complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  
});