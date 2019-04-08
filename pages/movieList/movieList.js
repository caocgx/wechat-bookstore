var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    movieclass: [],
    myhost: app.globalData.romoteDomainMy,
    current_country: 'allcountry',
    current_style: 'allstyle'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    let sname = this.data.current_style
    let cname = this.data.current_country

    //网络请求 列表/类型/国家
    wx.request({
      url: app.globalData.remoteDomainApi + 'movielist.php',
      data: {
        sname: sname,
        cname: cname
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data.list,
          movieclass: res.data.movieclass
        })
      }
    })
  },

  //跳转详情页
  gomovieDetial: function(e) {

    //获取参数ID
    let id = e.currentTarget.dataset.id;

    //跳转到音乐详情页
    wx.navigateTo({
      url: '../movieDetial/movieDetial?id=' + id,
    })
  },

  //类型事件
  changeStyleList: function(e) {

    //接收参数ID
    let sname = e.currentTarget.dataset.sname;

    var that = this;

    //改变当前分类状态
    this.setData({
      current_style: sname
    })

    let cname = this.data.current_country

    // 网络请求 分类
    wx.request({
      url: app.globalData.remoteDomainApi + 'movielist.php',
      data: {
        sname: sname,
        cname: cname
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data.list,
          movieclass: res.data.movieclass
        })
      }
    })
  },

  //国家事件
  changeCountryList: function(e) {

    //接收参数ID
    let cname = e.currentTarget.dataset.cname;

    var that = this;

    //改变当前分类状态
    this.setData({
      current_country: cname
    })

    let sname = this.data.current_style

    // 网络请求 国家
    wx.request({
      url: app.globalData.remoteDomainApi + 'movielist.php',
      data: {
        sname: sname,
        cname: cname
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data.list,
          movieclass: res.data.movieclass
        })
      }
    })

  }
})