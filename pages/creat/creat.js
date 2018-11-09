// pages/creat/creat.js
var app = getApp()
var userinfo_url = app.appServlet.servlet +'userinfoServlet';
var eduexp_url = app.appServlet.servlet +'EduExpServlet';
var getOneTeaex_url = app.appServlet.servlet +'getOneTeaexServlet';

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    age: '',
    name :{
      id: 1, name: "未填写", sex: "未填写", area: "未填写", nation: "未填写", phonenumber: "未填写", email: "未填写", idnumber: '未填写', workaddress: "未填写", homeaddress: "未填写", emergancyrelationship:"未填写",emergancycontact:"未填写"},
    teach: { userid: 4, schoolname: "未填写", degree: "未填写", major:"未填写"},
    work:null
  },
  changeToname:function(){
    wx.navigateTo({
     url: '../name/name?extra='+JSON.stringify(this.data.name),
    })
  },
  changeTocontact:function(){
    wx.navigateTo({
      url: '../contact/contact?extra=' + JSON.stringify(this.data.name),
    })
  },
  changeTowork:function(){
    wx.navigateTo({
      url: '../work/work',
    })
  },
  changeToteach: function () {
    wx.navigateTo({
      url: '../teach/teach?extra=' + JSON.stringify(this.data.teach),
    })
  },
  changeTocontact2: function () {
    wx.navigateTo({
      url: '../work/work?extra=' + JSON.stringify(this.data.work),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: userinfo_url,
      method: 'GET',
      data: {
        openid: app.appuserinfo.username
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        //当前时间
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;

        var n = timestamp * 1000;
        var date = new Date(n);
        var Y = date.getFullYear();//年

        var day = 24 * 60 * 60 * 1000; 
        var eDate = new Date(Date.parse(res.data['0'].borndate.replace(/-/g, "/")));
        var eY = eDate.getFullYear();

        that.setData({
          name:res.data['0'],
          age:Y-eY
        })
      },
    }),
      wx.request({
      url: eduexp_url,
        method: 'GET',
        data: {
          username: app.appuserinfo.username
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log(data);
          that.setData({
            teach: res.data['0'],
          })
        },
      }),
      wx.request({
      url: getOneTeaex_url,
        method: 'GET',
        data: {
          openid: app.appuserinfo.username
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log(data);
          that.setData({
            work: res.data['0'],
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
    var that = this;
    wx.request({
      url: userinfo_url,
      method: 'GET',
      data: {
        openid: app.appuserinfo.username
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        //当前时间
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;

        var n = timestamp * 1000;
        var date = new Date(n);
        var Y = date.getFullYear();//年

        var day = 24 * 60 * 60 * 1000;
        var eDate = new Date(Date.parse(res.data['0'].borndate.replace(/-/g, "/")));
        var eY = eDate.getFullYear();

        that.setData({
          name: res.data['0'],
          age: Y - eY
        })
      },
    }),
      wx.request({
        url: eduexp_url,
        method: 'GET',
        data: {
          username: app.appuserinfo.username
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log(data);
          that.setData({
            teach: res.data['0'],
          })
        },
      }),
      wx.request({
        url: getOneTeaex_url,
        method: 'GET',
        data: {
          openid: app.appuserinfo.username
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log(data);
          that.setData({
            work: res.data['0'],
          })
        },
      })
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