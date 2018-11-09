// pages/myindex/myindex.js
var app = getApp()
// var lth
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // lth: 1000,
        winWidth: 0,
        winHeight: 0,
        cznum: 32,//超赞数
        gznum: 12,//关注数
        fsnum: 532,//粉丝数
        zjnum: 15,
        radioCheckVal: 0,
        zjdate: '09',//足迹日期
        zjmothe: '5',//足迹月份
        hd: "参加了1次支教活动",
        tatle: "西部阳光2018春季招募",
        adder: "甘肃省陇南市康县，白银市会宁县",
        picture: '../images/shili.png',
        time: 1,//多少小时前
        imageurl: '../images/tupian.png',
        gshdm: '“温馨小包，爱暖山村”公益活动',
        gsadder: "北京·东城区",
        open: false,
        //program 为足迹数据
        program: [
            {
                hd: "参加了1次支教活动",//足迹活动标题
                tatle: "西部阳光2018春季招募",//足迹支教名称
                adder: "甘肃省陇南市康县，白银市会宁县",//足迹支教地点
                picture: '../images/shili.png',//足迹支教缩略图
                zjdate: '09',//足迹日期
                zjmothe: '5',//足迹月份
            },
            {
                hd: "参加了1次支教活动",//足迹活动标题
                tatle: "西部阳光2018春季招募",//足迹支教名称
                adder: "甘肃省陇南市康县，白银市会宁县",//足迹支教地点
                picture: '../images/shili.png',//足迹支教缩略图
                zjdate: '09',//足迹日期
                zjmothe: '5',//足迹月份
            },
            {
                hd: "参加了1次支教活动",
                tatle: "西部阳光2018春季招募",
                adder: "甘肃省陇南市康县，白银市会宁县",
                picture: '../images/shili.png',
                zjdate: '09',//足迹日期
                zjmothe: '5',//足迹月份
            },
            {
                hd: "参加了1次支教活动",
                tatle: "西部阳光2018春季招募",
                adder: "甘肃省陇南市康县，白银市会宁县",
                picture: '../images/shili.png',
                zjdate: '09',//足迹日期
                zjmothe: '5',//足迹月份
            },
            {
                hd: "参加了1次支教活动",
                tatle: "西部阳光2018春季招募",
                adder: "甘肃省陇南市康县，白银市会宁县",
                picture: '../images/shili.png',
                zjdate: '09',//足迹日期
                zjmothe: '5',//足迹月份
            },
        ],
        //program2 为故事数据
        program2: [
            {
                time: 1,
                imageurl: '../images/tupian.png',
                gshdm: '“温馨小包，爱暖山村”公益活动',
                gsadder: "北京·东城区",
            },
            {
                time: 1,
                imageurl: '../images/tupian.png',
                gshdm: '“温馨小包，爱暖山村”公益活动',
                gsadder: "北京·东城区",
            },
            {
                time: 1,
                imageurl: '../images/tupian.png',
                gshdm: '“温馨小包，爱暖山村”公益活动',
                gsadder: "北京·东城区",
            },
            {
                time: 1,
                imageurl: '../images/tupian.png',
                gshdm: '“温馨小包，爱暖山村”公益活动',
                gsadder: "北京·东城区",
            },
        ],

        height: null
    },


    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current,

            })
        }
    },
    radioCheckedChange: function (e) {
        this.setData({
            radioCheckVal: e.detail.value,
        })
        console.log(this.data.index)
    },
    /**
 * 生命周期函数--监听页面加载
 */
    fabu:function(){

    },
    xjt: function () {
        this.setData({
            open: !this.data.open
        })
    },
    bindChange: function (e) {

        var that = this;
        that.setData({ radioCheckVal: e.detail.current });

    },
    onLoad: function (options) {
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
        // this.data.lth = this.data.program.length * 142,
        // console.log(this.data.lth)
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
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

    },
})