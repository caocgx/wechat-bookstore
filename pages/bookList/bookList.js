var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    myhost: app.globalData.romoteDomainMy,
    activeHealth: '',
    activeYoungth: '',
    activeScience: '',
    activePeople: '',
    activeChild: '',
    activeHotsell: '',
    activeFreepost: '',
    activeNewbook: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showLoading({
      title: '加载中',
    })

    var that = this;

    //是搜索还是查询分类
    if (options.tap) {

      //获取Tap
      let tap = options.tap;

      //初始化变量
      let res = '';

      //处理分类样式
      switch (tap) {
        case 'youngth':
          this.setData({
            activeYoungth: 'active'
          })
          break;
        case 'health':
          this.setData({
            activeHealth: 'active'
          })
          break;
        case 'people':
          this.setData({
            activePeople: 'active'
          })
          break;
        case 'child':
          this.setData({
            activeChild: 'active'
          })
          break;
        case 'science':
          this.setData({
            activeScience: 'active'
          })
          break;
        case 'bookmoretop':
          this.setData({
            activeHotsell: 'active'
          })
          break;
        case 'freepost':
          this.setData({
            activeFreepost: 'active'
          })
          break;
        case 'newbook':
          this.setData({
            activeNewbook: 'active'
          })
          break;
      }

      //根据tap值,从服务器请求对应数据
      wx.request({
        url: app.globalData.remoteDomainApi + 'booklist.php',
        data: {
          tap: tap
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {


          //取消loading...
          wx.hideLoading();

          // 给模板提供数据
          that.setData({
            list: res.data
          })

          console.log(res.data)
        }
      })

    } else if (options.keywords) {

      //搜索词
      let searchKeyWords = options.keywords;

      //查询的字段
      let comlumn = options.action;

      //后端查询
      //根据options,从服务器拿对应的数据
      wx.request({
        url: app.globalData.remoteDomainApi + 'booklist.php',
        data: {
          searchKeyWords: searchKeyWords,
          comlumn: comlumn
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {


          //取消loading...
          wx.hideLoading();

          // 给模板提供数据
          that.setData({
            list: res.data
          })

          // console.log(res.data)
        }
      })

    }



  },

  /**
   * 详情页
   */
  gobookdetail: function(e) {

    //获取ID
    let id = e.currentTarget.dataset.id;
    // console.log(id);

    //页面跳转
    wx.navigateTo({
      url: '../bookDetial/bookDetial?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // changeList: function(e) {
  //   //获取标签参数
  //   tap = e.currentTarget.dataset.tap
  // }
})