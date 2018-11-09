// pages/name/name.js
var app = getApp();
var userInfoEdit_url = app.appServlet.servlet +'userInfoEditServlet1';
Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    userid:'',
    nam:'',
    phone:'',
    email:'',
    sex:['男','女'],
    sexIndex:'男',
    nationIndex:'汉',
    nation:['汉','其他'],
    //年月
    date:'',
    endtime:'',
    //城市
    region: '',
    //照片
    files:[],
    file:"",
    //身份证号
    idnum:''
  },
  bindchangesex(e){
    this.setData({
      sexIndex:e.detail.value,
    })
  },
  bindchangenation: function (e) {
    this.setData({
      nationIndex: e.detail.value,
    })
  },
  changeMultiPicker(e) {
    this.setData({ date: e.detail.value })
  },
  Idnumchage(e){
    this.setData({ idnum: e.detail.value });
  },
  phonechage(e) {
    this.setData({ phone: e.detail.value });
  },
  emailchage(e) {
    this.setData({ email: e.detail.value });
  },
  citychange(e) {
    this.setData({ region: e.detail.value });
  },
  namechange(e) {
    this.setData({ nam: e.detail.value });
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          //files: that.data.files.concat(res.tempFilePaths)
          files: res.tempFilePaths
        });
      }
    })
  },
  submit: function (e) {
    var that = this
    console.log(that.data.phone)
    //上传图片
    function upload(page, path) {
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
        wx.uploadFile({
          url: userInfoEdit_url,
          filePath: path[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          formData: {
            //和服务器约定的token, 一般也可以放在header中 
            'userid': that.data.userid,
            'name': that.data.nam,
            'borndate': that.data.date,
            'area': that.data.region,
            'nation': that.data.nationIndex,
            'sex': that.data.sexIndex,
            'phonenumber': that.data.phone,
            'email': that.data.email,
            'idnumber': that.data.idnum
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
            if(res.data=='[true]'){
              wx.showModal({
                title: '提示',
                content: '操作成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  } 
                }
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '操作失败',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/index/index'
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
    if(that.data.files[0]==null)
    {
      wx.showModal({
        title: '提示',
        content: '请添加图片！！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }else
    upload(that, that.data.files)
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();//年
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1); //月 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();//日 
    var h = date.getHours(); //时
    var m = date.getMinutes();//分
    var s = date.getSeconds();//秒 
    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
    var vtime = Y + "-" + M + "-" + D;


   let testname = JSON.parse(options.extra);
    this.setData({
      userid:testname.userid,
      nam: testname.name,
      phone: testname.phonenumber, 
      email: testname.email,
      sexIndex:testname.sex,
      nationIndex:testname.nation,
      region:testname.area,
      date:testname.borndate,
      idnum:testname.idnumber,
      endtime:vtime
     // file:testname.lifephoto
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