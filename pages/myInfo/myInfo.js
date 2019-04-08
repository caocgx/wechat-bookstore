var app = getApp();
// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    tempFilePaths: "",
    myname:'',
    mytel:'',
    mypostcode:'',
    myheader:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    //网络请求 列表/类型/国家
    wx.request({
      url: app.globalData.remoteDomainApi + 'getmyinfo.php',
      data: {
        openID: app.globalData.openID,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        if(res.data != null){

          that.setData({
            myname: res.data.uname,
            mytel: res.data.tel,
            mypostcode: res.data.postcode,
            address: res.data.address,
            myheader: app.globalData.romoteDomainMy + res.data.header
          })

        }
      }
    })

  },

  //定位
  getLocation: function() {

    var that = this;

    wx.chooseLocation({
      success: function(res) {

        //地址
        let address = res.address;

        //渲染到模板
        that.setData({
          address: address
        })
      }
    })

  },

  //获取头像
  getphoto: function() {

    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        that.setData({
          tempFilePaths: tempFilePaths[0]
        })
      }
    })

  },

  //提交表单
  formSubmit: function(e) {

    //获取表单数据

    let uname = e.detail.value.uname;
    let tel = e.detail.value.tel;
    let postcode = e.detail.value.postcode;
    let address = e.detail.value.address;
    let tempFilePaths = this.data.tempFilePaths;

    if (tempFilePaths.length>0){

      wx.uploadFile({
        url: app.globalData.remoteDomainApi + 'upload.php',
        filePath: tempFilePaths,
        name: 'file',
        formData: {
          uname: uname,
          tel: tel,
          address: address,
          postcode: postcode,
          openID: app.globalData.openID
        },
        success(res) {
          const data = res.data

          console.log(data);

          if (data == 'success') {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                //返回上一个界面
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: '抱歉！保存失败',
              icon: 'none',
              duration: 2000,
              success: function () {
                //返回上一个界面
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 2000)
              }
            })
          }
        }
      })

    }else{//不选择头像
      
      //网络请求
      wx.request({
        url: app.globalData.remoteDomainApi + 'upload.php',
        data: {
          uname: uname,
          tel: tel,
          address: address,
          postcode: postcode,
          openID: app.globalData.openID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          const data = res.data
          console.log(data);

          if (data == 'success') {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                //返回上一个界面
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: '抱歉！保存失败',
              icon: 'none',
              duration: 2000,
              success: function () {
                //返回上一个界面
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 2000)
              }
            })
          }
        }
      })
    }
  }
})