var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    catagory: [],
    myhost: app.globalData.romoteDomainMy
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    //网络请求,列表
    wx.request({

      url: app.globalData.remoteDomainApi + 'musiclist.php',

      success: function(res) {

        console.log(res.data)
        //拿到网络数据，渲染模板
        that.setData({
          list: res.data
        })
      }
    })

    //网络请求,分类
    wx.request({

      url: app.globalData.remoteDomainApi + 'musicclass.php',

      success: function(res) {

        //拿到网络数据，渲染模板
        that.setData({
          catagory: res.data
        })
      }
    })

  },

  /**
   * 分类浏览
   */
  classitem: function(e) {

    var that = this;

    //获取当前两类ID
    let id = e.currentTarget.dataset.id;

    //获取全部分类
    var catagory = that.data.catagory

    var tempArr = [];

    //添加分类项目class
    for (let i = 0; i < catagory.length; i++) {

      let item = catagory[i];

      if (item.id == id) {
        var newObject = {
          id: item.id,
          class: 'active',
          cname: item.cname
        }
      } else {
        var newObject = {
          id: item.id,
          class: '',
          cname: item.cname
        }
      }

      tempArr.push(newObject)
    }

    that.setData({
      catagory: tempArr
    })

    //网络请求,分类列表
    wx.request({

      url: app.globalData.remoteDomainApi + 'musiclist.php',

      data: {
        ccid: id
      },

      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function(res) {
        //拿到网络数据，渲染模板
        that.setData({
          list: res.data
        })
      }
    })

  },

  /**
   * 音乐详情
   */
  gomusicDetial:function(e){
      
     console.log(e);
     let id = e.currentTarget.dataset.id;

     //跳转到音乐详情页
     wx.navigateTo({
       url: '../musicDetial/musicDetial?id='+id,
     })
  }
})