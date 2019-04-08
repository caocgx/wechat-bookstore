var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    host: app.globalData.remoteDomain,
    myhost: app.globalData.romoteDomainMy,
    header: '',
    uname: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    //去除tabbar计数
    let storageDatas = wx.getStorageSync(app.globalData.openID);

    if (storageDatas.book.length < 1 && storageDatas.music.length < 1 && storageDatas.movie.length < 1) {
      wx.removeTabBarBadge({
        index: 2,
      })
    }

    //获取用户头像和姓名
    wx.request({
      url: app.globalData.remoteDomainApi + 'getuserinfo.php',
      data: {
        openID: app.globalData.openID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        // 给模板提供数据
        that.setData({
          header: that.data.myhost + res.data.header,
          uname: res.data.uname
        })

        console.log(res.data)
      }
    })


  },

  //完善资料
  myInfo: function() {
    wx.navigateTo({
      url: '../myInfo/myInfo',
    })
  },

  //订单信息
  myOrder: function() {
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  }
})