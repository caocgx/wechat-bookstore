//app.js
App({
  onLaunch: function() {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;

    // 登录
    wx.login({
      success: res => {
        
        //用户code
        let code = res.code;
  
        //发送res.code 但后台换取openid,sessionkey,unionid
        wx.request({
          url: this.globalData.remoteDomainApi + 'getopenid.php',
          data: {
            code: code,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // console.log(res.data)
            let openid = res.data.openid;

            //把openID存入全局APP的属性中，便于后续业务展开
            that.globalData.openID = openid;

            wx.setStorageSync('openID',openid)
          }
        })
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    remoteDomain: 'https://www.fuhushi.com',
    remoteDomainApi: 'https://www.fuhushi.com/web10/cgx_bookstore/api/',
    romoteDomainMy:'https://www.fuhushi.com/web10/cgx_bookstore/'
  }
})