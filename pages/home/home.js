//获取全局APP
var app = getApp();

var helper = require('../../utils/helper.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['../../static/ico/loading.gif'],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isLoading: true,
    newsInfo: ['啊哈', '你可真gian啊', '一二三四五'],
    host: app.globalData.remoteDomain,
    myhost: app.globalData.romoteDomainMy,
    booktop3: [],
    newANDfree: [],
    fivestarBook: '',
    fivestarMusic: '',
    fivestarMovie: '',
    musicTop6: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //this指向
    var that = this;

    //网络请求,给轮播图提供数据
    wx.request({

      url: app.globalData.remoteDomainApi + 'swiper.php',

      success: function(res) {
        //拿到网络数据，渲染模板
        that.setData({
          isLoading: false,
          indicatorDots: true,
          imgUrls: res.data
        }, function() {

        })
      }
    })

  },

  onShow: function() {

    var that = this;

    //获取openID
    let openID = wx.getStorageSync('openID');

    //获取购买产品的所有数据
    let storageData = wx.getStorageSync(openID);

    if (storageData) {

      //获取购买总数量
      let cartCounts = helper.cartCount(this, storageData);

      //设置tabbar数量
      wx.setTabBarBadge({
        index: 2,
        text: cartCounts.toString(),
      })

    }

    //畅销书top3
    wx.request({
      url: app.globalData.remoteDomainApi + 'bookSaleTop3.php',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)

        if (res.data.length > 0)
          // 给模板提供数据
          that.setData({
            booktop3: res.data
          })
      }
    })

    //新书上架
    wx.request({
      url: app.globalData.remoteDomainApi + 'newANDfree.php',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)

        if (res.data.length > 0)
          // 给模板提供数据
          that.setData({
            newANDfree: res.data
          })
      }
    })

    //五星榜
    wx.request({
      url: app.globalData.remoteDomainApi + 'fivestar.php',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)

        if (res.data)
          // 给模板提供数据
          that.setData({
            fivestarBook: res.data.book,
            fivestarMusic: res.data.music,
            fivestarMovie: res.data.movie
          })
      }
    })

    //音乐Top6
    wx.request({
      url: app.globalData.remoteDomainApi + 'musicTop6.php',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)

        if (res.data)
          // 给模板提供数据
          that.setData({
            musicTop6: res.data
          })
      }
    })

  },


  //轮播图跳转
  goUrl: function(e) {

    //获取标签参数
    let url = e.currentTarget.dataset.url;

    let res_home = url.indexOf('home');
    let res_scan = url.indexOf('scan');
    let res_cart = url.indexOf('cart');
    let res_my = url.indexOf('my');

    //页面跳转
    if (res_home > -1 || res_scan > -1 || res_cart > -1 || res_home > -1) {

      //跳转到tab页面
      wx.switchTab({
        url: '../' + url,
      })

    } else {

      //执行跳转
      wx.navigateTo({
        url: '../' + url,
      })

    }
  },


  //分类跳转

  //图书列表
  gobookList: function(e) {

    //获取标签参数
    let tap = e.currentTarget.dataset.tap

    //页面跳转
    wx.navigateTo({
      url: '../bookList/bookList?tap=' + tap,
    })
  },

  gobookDetial: function(e) {

    //获取标签参数
    let id = e.currentTarget.dataset.id

    // console.log(e);

    //页面跳转
    wx.navigateTo({
      url: '../bookDetial/bookDetial?id=' + id,
    })

  },

  //音乐列表
  gomusicList: function(e) {

    //页面跳转
    wx.navigateTo({
      url: '../musicList/musicList'
    })
  },

  //电影列表
  gomovieList: function(e) {

    //页面跳转
    wx.navigateTo({
      url: '../movieList/movieList'
    })
  },


  //畅销书排行榜
  showMoreBookTop: function() {

    //页面跳转
    wx.navigateTo({
      url: '../bookList/bookList?tap=bookmoretop',
    })


  }
})