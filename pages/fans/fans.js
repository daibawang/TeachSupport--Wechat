// pages/attention/attention.js
var app = getApp()
var GetAllFans_url = app.appServlet.servlet + 'GetAllFansServlet'
//取消关注
var DeleteFriends_url = app.appServlet.servlet + 'DeleteFriends'
//关注
var InsertFollow_url = app.appServlet.servlet + 'InsertFollowServlet';
Page({
  data: {
    friends: null
  },
  //修改
  edit: function (e) {
    var that=this;
    console.log(e)
    var aaid=e.currentTarget.dataset.aaid; 
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个数组
    

    this.setData({
      friends: this.data.friends
    });
    if (this.data.friends[Index].flag){
      //取消关注
      wx.request({
        url: DeleteFriends_url,
        method: 'GET',
        data: {
          aid: app.appuserinfo.aid,
          aaid: aaid
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
        },
      })
    }else{
      //关注
      wx.request({
        url: InsertFollow_url,
        method: 'GET',
        data: {
          aid: app.appuserinfo.aid,
          aaid: aaid
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log(data);
          if (data == '[false]') {
            wx.showModal({
              title: '提示',
              content: '关注失败！',
              showCancel: false
            })
          } else if (data == 'again') {
            wx.showModal({
              title: '提示',
              content: '以关注该用户！',
              showCancel: false
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '关注成功！',
              showCancel: false
            })
          }
        },
      })
    }

    this.data.friends[Index].flag = 1;

        wx.request({
          url: GetAllFans_url,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**  
     * 获取系统信息  
     */
    wx.request({
      url: GetAllFans_url,
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