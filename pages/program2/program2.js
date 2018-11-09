var app = getApp();
var GetAllorganization_url = app.appServlet.servlet +'GetAllorganizationServlet';
Page({
  data: {
    array:null
  },
  onLoad: function () {
    var that = this;

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
          array: res.data,
        })
      },
    })
  },
  bindor: function (e) {
    var $data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../organization/organization?oid='+$data.oid,
    })
  }
});