// var GetAllNews_url = app.appServlet.servlet + ''//地址
var time = require('../../utils/datetime.js');  
var app = getApp()
var GetOneUserCollection_url = app.appServlet.servlet + 'GetOneUserCollectionServlet'; 
var GetAllStory_url = app.appServlet.servlet + 'GetAllStoryServlet'; 
//关注
var InsertFollow_url = app.appServlet.servlet +'InsertFollowServlet';
//点赞
var InsertCollection_url = app.appServlet.servlet + 'InsertCollectionServlet';

Page({
  data: {
    /**  
        * 页面配置  
        */
        change:1,
    attention: '关注',
    winWidth: 0,//系统宽高
    winHeight: 0,//系统宽高
    // tab切换    
    currentTab: 0,
    userInfo: {},
    hasUserInfo: false,
    flag: false,
    array:null,
    array1:null,
    isalike:1,
    index: null
  },
  //点击前往story页面
  changetoStory: function (e) {
    var $data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../story/story?s_id='+$data.s_id,
    })
  },
  //点击前往otherindex页面
  headimage: function (e) {
    var a_id = e.currentTarget.dataset.a_id;
    wx.navigateTo({
      url: '../otherindex/otherindex?a_id='+a_id,
    })
  },
  //点赞的点击事件
  top_2: function (e) {
    var that = this;
    var aaid = e.currentTarget.dataset.aid;
    var s_id = e.currentTarget.dataset.s_id;
    if(that.data.flag1==1){
         that.data.flag=2;
    }
    if (aaid == app.appuserinfo.aid) {
      wx.showModal({
        title: '提示',
        content: '不能赞自己！',
        showCancel: false
      })
    }
    else {
      wx.request({
        url: InsertCollection_url,
        method: 'GET',
        data: {
          aid: app.appuserinfo.aid,
          s_id:s_id
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
              content: '点赞失败！',
              showCancel: false
            })
          } else if (data == 'again') {
            wx.showModal({
              title: '提示',
              content: '已点赞该用户！',
              showCancel: false
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '点赞成功！',
              showCancel: false
            })
            
            wx.request({

              url: GetAllStory_url,
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
                  array1: res.data,
                })
              },
            })
          }
        },
      })
    }

  },
  onLoad: function () {
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
    //  flag: (options.flag == "true" ? true : false)
  },
  /**  
     * 滑动切换tab  
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**  
   * 点击tab切换  
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      wx.request({
        url: GetOneUserCollection_url,
        method: 'GET',
        data: {
          aid: app.appuserinfo.aid
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var data = res.data;
          console.log("zz")
          console.log(data);
          that.setData({
            array: res.data,
          })
        },
      })

      wx.request({

        url: GetAllStory_url,
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
            array1: res.data,
          })
        },
      })
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /** 
   * 点击分享 
   */
  onShareAppMessage: function () {
    return {
    }
  },
  guanzhu: function (event) {
    var that = this;
    var aaid = event.currentTarget.dataset.aaid;
    if (aaid == app.appuserinfo.aid)
    {
      wx.showModal({
        title: '提示',
        content: '不能关注自己！',
        showCancel: false
      })
    }
    else{
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
          if(data=='[false]')
          {
            wx.showModal({
              title: '提示',
              content: '关注失败！',
              showCancel: false
            })
          }else if(data=='again'){
            wx.showModal({
              title: '提示',
              content: '已关注该用户！',
              showCancel: false
            })
          }
          else{
            wx.showModal({
              title: '提示',
              content: '关注成功！',
              showCancel: false
            })
          }
        },  
      })
    }
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: GetOneUserCollection_url,
      method: 'GET',
      data: {
        aid: app.appuserinfo.aid
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log("zz")
        console.log(data);
        that.setData({
          array: res.data,
        })
      },
    })

    wx.request({
     
      url: GetAllStory_url,
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
          array1: res.data,
        })
      },
    })
  },
    
  
})    