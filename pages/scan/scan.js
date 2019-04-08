var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    host: app.globalData.remoteDomain

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  //扫码
  scancode: function() {

    wx.scanCode({
      success(res) {
        console.log(res)

        //条形码号
        let code = res.result;

        wx.request({
          url: app.globalData.remoteDomainApi + 'scan.php',
          data: {

            code: code

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {

            //分类
            let catagory = res.data.catagory;

            //ID
            let pid = res.data.pid;

            if (!catagory || !pid) {

              wx.showToast({
                title: '抱歉，未查询到该商品',
                icon: 'success',
                duration: 2000,
              })

            } else {
              if (catagory == 'book') {
                wx.navigateTo({
                  url: '../bookDetial/bookDetial?id=' + pid,
                })
              } else if (catagory == 'music') {
                wx.navigateTo({
                  url: '../musicDetial/musicDetial?id=' + pid,
                })
              } else {
                wx.navigateTo({
                  url: '../movieDetial/movieDetial?id=' + pid,
                })
              }

            }
          }
        })
      }
    })


  }
})