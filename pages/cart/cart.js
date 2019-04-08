var app = getApp();

var helper = require('../../utils/helper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    bookDatas: [],
    musicDatas: [],
    movieDatas: [],
    result: '',
    totalPrice:0,
    myhost: app.globalData.romoteDomainMy
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {

    //获取本地数据
    let openID = wx.getStorageSync('openID');

    let storageDatas = wx.getStorageSync(openID);

    if (storageDatas) {

      //清空结果状态
      this.setData({
        result: ''
      })

      //图书
      var bookArr = storageDatas.book;

      //音乐
      var musicArr = storageDatas.music;

      //电影
      var movieArr = storageDatas.movie;

      //统计总价
      let totalPrice = helper.countPrice(storageDatas);

      //渲染到模板
      this.setData({
        bookDatas: bookArr,
        musicDatas: musicArr,
        movieDatas: movieArr,
        totalPrice: totalPrice
      })

    } else {
      this.setData({
        result: '购物车还是空的哦'
      })
    }


  },

  /**
   * 数量
   */
  add: function(e) {
      
    helper.addsub(e, app.globalData.openID,this,'add')
    
  },
  sub: function (e) {

    helper.addsub(e, app.globalData.openID, this, 'sub')

  },
  del:function(e){
    
    var that_ = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success(res) {
        if (res.confirm) {
          helper.addsub(e, app.globalData.openID, that_, 'del')
        } else if (res.cancel) {
        }
      }
    })
  },

  //结算
  gopay:function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  }

})