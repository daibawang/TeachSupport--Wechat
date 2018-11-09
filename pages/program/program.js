var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var city = require('../../utils/city.js');
var app = getApp();
var GetAllRecruitFromCon_url = app.appServlet.servlet +'GetAllRecruitFromConServlet';
var GetAllorganization_url = app.appServlet.servlet +'GetAllorganizationServlet';

var app = getApp()
Page({
  data: {
    lx: '',
    organization:null,
    num: 2,
    typee: ['长期支教', '短期支教', '其他支教'],
    oid:'',

    actionSheetHidden: false,
    tabs: ["支教地点", "支教类型", "支教组织"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "上海市",
    radioCheckVal: 0 ,
    array:null,
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },


  radioCheckedChange: function (e) {
    var that=this
    this.setData({
      radioCheckVal: e.detail.value,
       actionSheetHidden: !this.data.actionSheetHidden
    })
    this.setData({ lx: this.data.typee[e.detail.value-1] });
    console.log(this.data.lx)
    wx.request({
      url: GetAllRecruitFromCon_url,
      method: 'GET',
      data: {
        condition: "re_type",
        convalue: that.data.lx
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
  v6_1: function (e) {
    var $data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?rid=' + $data.id+'&oid='+$data.oid,
    })
  },
  onLoad: function (options) {
    console.log(options);
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    var that = this;
    this.setData({
    lx: options.lx
    })
    wx.request({
      url: GetAllorganization_url,
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
          organization: res.data,
        })
      },
    })
    //获取所有组织信息
    wx.request({
      url: GetAllRecruitFromCon_url,
      method: 'GET',
      data: {
        condition: "re_type",
        convalue: that.data.lx
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

    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })
    
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    var that=this
    console.log("bindCity")
    this.setData({ 
      city: e.currentTarget.dataset.city,
      actionSheetHidden: !this.data.actionSheetHidden
     })
    wx.request({
      url: GetAllRecruitFromCon_url,
      method: 'GET',
      data: {
        condition: "re_serviceplace",
        convalue: that.data.city
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
  goback:function(e){
    var that=this
    this.setData({
      oid:e.currentTarget.dataset.oid,
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.request({
      url: GetAllRecruitFromCon_url,
      method: 'GET',
      data: {
        condition: "oid",
        convalue: that.data.oid
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
  }

});
