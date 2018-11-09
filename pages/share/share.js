// pages/share/share.js
var app = getApp();
var GetmyRecruitNum_url = app.appServlet.servlet +'GetmyRecruitNumServlet';

var context = wx.createCanvasContext('firstCanvas')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
      shareImgSrc: '',
      windowWidth: '',
      windowHeight: '',
      pixelRatio:'',
      platform:'',
      //0-5的随机数
      randnum:2,
      // num:'12'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this;
    that.data.randnum = Math.round(Math.random() * 2)
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
        that.setData({
          num: data,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
   
  },
  //分享图片
  share: function () {
    var that = this;
    // canvas画布转成图片
    wx.canvasToTempFilePath({
      x: (that.data.windowWidth / 750) * 45,
      y: (that.data.windowHeight / 1206) * 25,
      width: (that.data.windowWidth / 750) * 660,
      height: (that.data.windowHeight / 1206) * 990,
      //原图大小
      destWidth: (that.data.windowWidth / 750) * 3545,
      destHeight: (that.data.windowHeight / 1206) * 5315,
      canvasId: 'firstCanvas', 
      success: function (res) {
        console.log(res.tempFilePath);
        // that.setData({
        //   shareImgSrc: res.tempFilePath
        // })
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，去发圈噻~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                }
                that.hideShareImg()
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
      //当用户点击分享到朋友圈时，将图片保存到相册
      
  },
  // 更换背景
  changeback: function(){
    var that=this
    that.data.randnum = Math.round(Math.random() * 2)
    
    wx.showLoading({
      title: '加载中',
    })
    //下载图片
    wx.downloadFile({
      url: app.appServlet.servlet + 'post/' + that.data.randnum + '.jpg',
      success: function (sres) {
        console.log(sres);
        that.data.shareImgSrc = sres.tempFilePath
        //设置阴影
        context.setShadow(5, 5, 7, '#c2c2c2')
        context.drawImage(sres.tempFilePath, 0, 0, 3545, 5315, (that.data.windowWidth / 750) * 45, (that.data.windowHeight / 1206) * 25, (that.data.windowWidth / 750) * 660, (that.data.windowHeight / 1206) * 990)
        //中间字体
        context.setFillStyle("#fff")
        context.setTextAlign('center')
        context.setFontSize(30)
        context.fillText(app.appuserinfo.num, (that.data.windowWidth / 750) * 410, (that.data.windowHeight / 1206) * 280)
        setTimeout(function () {
          context.draw()
          wx.hideLoading()
        }, 500)
      }, fail: function (fres) {

      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    //获取屏幕高度和宽度
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.windowWidth/750*660)
        console.log(res.windowHeight/1206*990)
        that.data.windowWidth = res.windowWidth;
        that.data.windowHeight = res.windowHeight;
        that.data.pixelRatio=res.pixelRatio;
        that.data.platform = res.platform;
      }
    })

    wx.showLoading({
      title: '加载中',
    })
    //下载图片
    wx.downloadFile({
      url: app.appServlet.servlet + 'post/' + that.data.randnum + '.jpg',
      success: function (sres) {
        console.log(sres);
        that.data.shareImgSrc = sres.tempFilePath
        //设置阴影
        context.setShadow(5, 5, 7, '#c2c2c2')
          context.drawImage(sres.tempFilePath, (that.data.windowWidth / 750) * 45, (that.data.windowHeight / 1206) * 25, (that.data.windowWidth / 750) * 660, (that.data.windowHeight / 1206) * 990)
        
        //中间字体
        context.setFillStyle("#fff")
        context.setTextAlign('center')
        context.setFontSize(30)
        context.fillText(app.appuserinfo.num, (that.data.windowWidth / 750) * 410, (that.data.windowHeight / 1206) * 280)
        setTimeout(function () {
          context.draw()
          wx.hideLoading()
        }, 500)
      }, fail: function (fres) {

      }
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