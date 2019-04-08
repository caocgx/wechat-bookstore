var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderUser: '无',
    orderTel: '无',
    orderAddress: '无',
    postImages: [],
    totalPrice: 0,
    myhost: app.globalData.romoteDomainMy

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //获取收货人信息
    this.getUserInfo();

    //购买的产品信息
    this.carContent();

  },

  //用户信息
  getUserInfo: function() {

    var that = this;

    //网络请求 地址信息
    wx.request({

      url: app.globalData.remoteDomainApi + 'getuserinfo.php',

      data: {
        openID: app.globalData.openID
      },

      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function(res) {
        if (res.data == null) { //用过资料为空

          wx.showModal({

            title: '提示',
            content: '请完善个人资料',

            success(res) {

              if (res.confirm) {
                wx.navigateTo({ //跳转到个人信息页
                  url: '../myInfo/myInfo',
                })
              } else if (res.cancel) {

              }
            }
          })
        } else {
          that.setData({
            orderUser: res.data.uname,
            orderTel: res.data.tel,
            orderAddress: res.data.address
          })
        }
      }
    })
  },

  //购买产品
  carContent: function() {

    var that = this;

    //定义临时变量
    let postArr = [];
    let price = 0;

    //从storage中读取
    const products = wx.getStorageSync(app.globalData.openID)

    for (let i = 0; i < products.book.length; i++) {

      //读取封面
      postArr.push(products.book[i].pdatas.cover[0].coverurl);
      //计算总价
      price += products.book[i].pdatas.price * products.book[i].count

    }
    for (let i = 0; i < products.music.length; i++) {

      postArr.push(products.music[i].pdatas.coverurl);
      price += products.music[i].pdatas.price * products.music[i].count

    }
    for (let i = 0; i < products.movie.length; i++) {

      postArr.push(products.movie[i].pdatas.coverurl);
      price += products.movie[i].pdatas.price * products.movie[i].count

    }

    //渲染到模板
    that.setData({
      postImages: postArr,
      totalPrice: price
    })


  },

  //提交订单
  submitOrder: function() {

    //校验收货人
    this.getUserInfo();

    //执行提交
    if (this.data.orderTel != '无' && this.data.totalPrice > 0) {

      wx.request({

        url: app.globalData.remoteDomainApi + 'createorder.php',

        data: {
          openID: app.globalData.openID,
          datas: JSON.stringify(wx.getStorageSync(app.globalData.openID))
        },
    
        method:'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },

        success(res) {
          console.log(res.data);
          
          if(res.data == 'success'){

            //清空storage
            wx.setStorageSync(app.globalData.openID, {book:[],music:[],movie:[]})

            //去除tabbar基数
            wx.removeTabBarBadge({
              index: 2
            })

            //跳转到my页面
            wx.reLaunch({
              url: '../my/my',
            })
          }else{
            console.log('订单提交失败');
          }
  
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var that = this;

    //网络请求 地址信息
    wx.request({

      url: app.globalData.remoteDomainApi + 'getuserinfo.php',

      data: {
        openID: app.globalData.openID
      },

      header: {
        'content-type': 'application/json' // 默认值
      },

      success(res) {
        if (res.data != null) {
          that.setData({
            orderUser: res.data.uname,
            orderTel: res.data.tel,
            orderAddress: res.data.address
          })
        }
      }
    })
  },

})