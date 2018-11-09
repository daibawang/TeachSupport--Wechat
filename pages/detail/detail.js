var sliderWidth = 70; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
var GetOneRecruit_url = app.appServlet.servlet +'GetOneRecruitServlet';
var GetOneOrganization_url = app.appServlet.servlet +'GetOneOrganizationServlet';
var VolunteerSetUp_url = app.appServlet.servlet +'VolunteerSetUpServlet';

Page({
  data: {
    actionSheetHidden: true,
    tabs: ["支教详情", "组织详情"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    prname: null,
    prcontact:null,
    radioCheckVal:0,
    rid:'',
    oid:''
  },//弹出
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
tj:function(){
  var that=this
  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden
  })
  wx.showModal({
    title: '确认提交',
    content: '您确定申请报名么？',
    showCancel: true,
    confirmText: '确定',
    confirmColor: '#72B9C3',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        wx.request({
          url: VolunteerSetUp_url,
          data: {
            rid:that.data.rid,
            aid:app.appuserinfo.aid
          },
          header: {
            'Content-Type': 'json'
          },
          method: 'GET',
          success: function(res) {
            var data = res.data;
            console.log(data);
            if (data == 'again') {
              wx.showModal({
                title: '提示',
                content: '请勿重复提交！',
              })
            }
            if (data == true) {
              wx.showModal({
                title: '提示',
                content: '报名成功！',
              })
            }
            if (data == false) {
              wx.showModal({
                title: '提示',
                content: '报名失败！',
              })
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
     
    }
  })
},
xg: function () {
  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden
  }),
    wx.navigateTo({
    url: '../resume/resume',
  })
  console.log(1)
},
onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })
    this.setData({
      rid: options.rid,
      oid:options.oid
    })
    //招募信息
    wx.request({
      url: GetOneRecruit_url,
      method: 'GET',
      data: {
        rid:that.data.rid
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          prname: res.data['0']
        })
      },
    })
    //组织信息
    wx.request({
      url: GetOneOrganization_url,
      method: 'GET',
      data: {
        oid:that.data.oid
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          prcontact: res.data['0']
        })
      },
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});