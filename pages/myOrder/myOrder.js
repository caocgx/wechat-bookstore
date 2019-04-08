var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    list:[],
    myhost: app.globalData.romoteDomainMy

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    //网络请求 列表/类型/国家
    wx.request({
      url: app.globalData.remoteDomainApi + 'getorderinfo.php',
      data: {
        openID: app.globalData.openID,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          list:res.data
        })
      }
    })

  },

  //编辑评论
  editComment:function(e){

    //分类名
    let catagory = e.currentTarget.dataset.catagory;

    //产品ID
    let pid = e.currentTarget.dataset.pid;

    //星级
    let stars = e.currentTarget.dataset.stars;

    //评论内容
    let content = e.currentTarget.dataset.notes;

    //操作
    let action = e.currentTarget.dataset.action;


    wx.navigateTo({
      url: '../publishComment/publishComment?catagory=' + catagory + '&pid=' + pid + '&stars=' + stars + '&content=' + content
            +'&action='+action,
    })


  },

  //发表评论
  goComment:function(e){

    //分类名
    let catagory = e.currentTarget.dataset.catagory;

    //产品ID
    let pid = e.currentTarget.dataset.pid;


    wx.navigateTo({
      url: '../publishComment/publishComment?catagory=' + catagory +'&pid='+pid,
    })

  }
})