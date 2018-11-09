// pages/release/release.js
var app = getApp();
var datetime = require('../../utils/datetime.js');  
var InsetStory_url = app.appServlet.servlet + 'InsetStoryServlet'//地址
//获取地址
var GetLocation_url = app.appServlet.servlet + 'GetLocationServlet'//地址

Page({

    /**
     * 页面的初始数据
     */
    data: {
        btinput: null,
        nrinput: null,
        files: "",
        texts: "至少5个字",
        min: 5,
        max: 1000,//字数限制
        address: "",
    },
    //字数限制    
    inputs: function (e) {
        // 获取输入框的内容  
        var value = e.detail.value;
        // 获取输入框内容的长度  
        var len = parseInt(value.length);
        //最多字数限制  
        if (len > this.data.max) return;
        // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行  
        this.setData({
            MaxdNumber: len //当前字数    
        });
    },
    //照片上传
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res.tempFilePaths)
                that.setData({
                    //files: that.data.files.concat(res.tempFilePaths)
                  files: res.tempFilePaths
                });
            }
        })
    },
    previewImage: function (e) {
        wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
        })
    },

    formsubmit: function (e) {
        var that = this
        //上传图片
        function upload(page, path) {
          wx.showToast({
            icon: "loading",
            title: "正在上传"
          }),
            wx.uploadFile({
            url: InsetStory_url,
              filePath: path[0],
              name: 'file',
              header: { "Content-Type": "multipart/form-data" },
              formData: {
                //和服务器约定的token, 一般也可以放在header中 
                aid: app.appuserinfo.aid,
                s_time: datetime.formatTime(new Date()),
                s_title: e.detail.value.btinput,
                s_content: e.detail.value.nrinput,
                s_place: that.data.address
              },
              success: function (res) {
                console.log(res);
                if (res.statusCode != 200) {
                  wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                  })
                  return;
                }
                if (res.data == '[true]') {
                  wx.showModal({
                    title: '提示',
                    content: '操作成功',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.redirectTo({
                          url: '../myindex/myindex'
                        })
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '操作失败',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.redirectTo({
                          url: '../myindex/myindex'
                        })
                      }
                    }
                  })
                }
              },
              fail: function (e) {
                console.log(e);
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
              },
              complete: function () {
                wx.hideToast();
                //隐藏Toast 
              }
            })
        }

        upload(that,that.data.files)

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            console.log(res)
            var latitude = res.latitude
            var longitude= res.longitude
             wx.request({
               url: GetLocation_url,
               method: 'GET',
               data: {
                 latitude: latitude,
                 longitude: longitude
               },
               header: {
                 'Content-Type': 'json'
               },
               success: function (res) {
                 var data = res.data;
                 console.log(data);
                  that.setData({
                    address: res.data.result.address_component.province + "  " + res.data.result.address_component.district,
                  })
               },
             })
          }
        })
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      var that=this;
    
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