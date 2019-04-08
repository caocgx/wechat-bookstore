var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    pname: '',
    stars: [],
    catagory: "",
    pid: '',
    starNum: 5,
    content:'',
    action:'add'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    console.log(options)

    //分类
    let catagory = options.catagory;
    //产品id
    let pid = options.pid;
    //星级
    let stars = options.stars;
    //评论内容
    let content = options.content;

    //网络请求 
    wx.request({
      url: app.globalData.remoteDomainApi + 'getpname.php',
      data: {
        catagory: catagory,
        pid: pid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          pname: res.data.pname,
          catagory: catagory,
          pid: pid
        })
      }
    })

    //星级
    var tempArr = [];

    for (let i = 1; i < 6; i++) {

      if (!stars) {

        let starUrl = '../../static/ico/star.png';
        tempArr.push({
          id: i,
          starUrl: starUrl
        })

      } else {

        //红星
        let redStar = '../../static/ico/star.png';

        //灰心
        let grayStar = '../../static/ico/star-gray.png'

        if (i > stars) {
          tempArr.push({
            id: i,
            starUrl: grayStar
          })
        } else {
          tempArr.push({
            id: i,
            starUrl: redStar
          })
        }

      }

    }

    //渲染到模板
    that.setData({
      stars: tempArr,
      content: content
    })

    //如果能接收到action
    if(options.action){
      this.setData({
        action:options.action
      })
    }

  },

  selectStar: function(e) {

    let starNum = e.currentTarget.dataset.id;

    var tempArr = [];

    //重置stars的内容
    for (let i = 1; i < 6; i++) {

      //红星
      let redStar = '../../static/ico/star.png';

      //灰心
      let grayStar = '../../static/ico/star-gray.png'

      if (i > starNum) {
        tempArr.push({
          id: i,
          starUrl: grayStar
        })
      } else {
        tempArr.push({
          id: i,
          starUrl: redStar
        })
      }
    }

    //渲染到模板
    this.setData({
      stars: tempArr,
      starNum: starNum
    })
  },

  //提交评论
  formSubmit: function(e) {

    var that = this;

    //分类
    let catagory = this.data.catagory;
    //产品ID
    let pid = this.data.pid;
    //openID
    let openID = app.globalData.openID;
    //星级
    let starNum = this.data.starNum;
    //评论内容
    let content = e.detail.value.notes;
    console.log(catagory + pid)


    //网络请求 
    wx.request({
      url: app.globalData.remoteDomainApi + 'comment.php',
      data: {
        action: that.data.action,
        catagory: catagory,
        pid: pid,
        openID: app.globalData.openID,
        starNum: starNum,
        content: content
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data == 'success') {
          wx.showToast({
            title: '发表成功',
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
            title: '发表失败',
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
})