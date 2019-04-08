var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderUser:'无',
    orderTel: '无',
    orderAddress: '无',
    postImages: [],
    totalPrice: 0,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var catagory = options.catagory;

    var coverurl = options.coverurl;

    var pid = options.pid;

    var price = options.price;


    wx.request({
      url: app.globalData.remoteDomainApi + 'createorderone.php',
      data: {
        catagory: catagory,
        pid: pid,
        openID:app.globalData.openID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
        
        })
      }
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