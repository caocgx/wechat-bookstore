var app = getApp();

var helper = require('../../utils/helper.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: {
      coverurl: 'images/loading.gif'
    },
    myhost: app.globalData.romoteDomainMy,
    isplay: false,
    dt: "00.00",
    cartCounts:0,
    pid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



    var that = this;

    //音乐ID
    let id = options.id;

    //网络请求,详情
    wx.request({

      url: app.globalData.remoteDomainApi + 'musicdetial.php',

      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function(res) {

        // console.log(res.data);
        //拿到网络数据，渲染模板
        that.setData({
          datas: res.data,
          pid:id
        }, function() {

          //创建音频对象
          that.InnerAudioContext = wx.createInnerAudioContext()

          //资源地址
          that.InnerAudioContext.src = that.data.myhost + res.data.musicurl

          console.log(that.InnerAudioContext.src)

          //自动播放
          that.InnerAudioContext.autoplay = false;
        })
      }
    })

    //更新购物车数量
    this.resetCartCount();
  },

   /**
   * 更新购物车数量
   */
  resetCartCount:function(){

    //获取OPENID
    let openid = wx.getStorageSync('openID');

    //通过小助手获取购物车数量
    let cartDatas = wx.getStorageSync(openid);

    if (cartDatas){
 //通过小助手获取购物数量
    let counts = helper.cartCount(this,cartDatas);

    console.log(counts);

    //渲染
    this.setData({
      cartCounts:counts
    })
    }

  },


  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
    this.InnerAudioContext.destroy()
  },

  //播放音乐
  play: function() {

    this.InnerAudioContext.play();

    //改变图标
    this.setData({
      isplay: true
    })

    var that = this;

    //计算播放的时长
    this.clock = setInterval(function() {

      //总时长（秒）
      var totalSeconds = parseInt(that.InnerAudioContext.duration);

      //当前播放得秒数
      var currentTime = parseInt(that.InnerAudioContext.currentTime);

      //剩余秒数
      var leftTime = totalSeconds - currentTime;

      let minuts = "";
      let seconds = "";

      //把秒数转换成分钟：秒数
      if (leftTime < 60) {
        minuts = "00";
        seconds = Math.floor(leftTime);
      } else {
        minuts = Math.floor(leftTime / 60);
        seconds = leftTime % 60;

        if (minuts < 10) {
          minuts = "0" + minuts;
        }
      }

      if (parseInt(seconds) < 10) {
        seconds = "0" + seconds;
      }

      let result = minuts + ':' + seconds;

      //渲染的模板
      that.setData({
        dt: result
      })

    }, 1000)
  },
  //暂停音乐
  pause: function() {

    this.InnerAudioContext.pause();

    //改变图标
    this.setData({
      isplay: false
    })

    clearInterval(this.clock);
  },

  cart: function () {

    var that = this;

    //1.显示购物状态
    wx.showToast({
      title: '成功加入购物车!',
      icon: 'success',
      duration: 2000
    })

    //2.把产品写入到storage中（购买）

    //2.1 在Storage中是否存在该openID

    //获取本地存储
    wx.getStorage({

      key: app.globalData.openID,

      success(res) { //2.2 如果在Storage存在该openID

        console.log(res.data)

        //当前Storage中该OPENID的所有数据
        var allDatas = res.data;

        var allDatas_music = allDatas.music

        //2.2.1查看图书book中是否数据
        if (allDatas_music.length < 1) { //图书中没有任何数据

          let data = [{ pid: that.data.pid, count: 1, pdatas: that.data.datas }]

          let lastData = { book: allDatas.book, music: data, movie: allDatas.movie }

          //存入storage
          wx.setStorage({
            key: app.globalData.openID,

            data: lastData,

            success: function () { //每次在成功设置Storage时，重新统计购买数量

              //第一次创建Storage时，数量总是1
              //let count = 1;

              //计算总数
              let totalCounts = helper.cartCount(that,lastData)

              //更新模板数据
              that.setData({
                cartCounts: totalCounts
              })

            }
          })


        } else { //图书中有数据


          //定义一个临时新数组，用于存放最新的改变了数量的 数据
          var tempArr = [];

          //定义一个状态（当前产品是否在已经购买的数组中）
          var isExist = false;

          //2.2.1 它的book项中是否存在当前的产品
          for (let i = 0; i < allDatas_music.length; i++) {

            //当前遍历的产品ID是否 等于当前页面加载的产品ID
            if (allDatas_music[i].pid == that.data.pid) { //如果等于（表明该产品已经购买过了，只需要数量+1）

              // 当前变量的项目
              let currentItem = allDatas_music[i];
              currentItem.count++;

              //存入新数组
              tempArr.push(currentItem)

              //改变是否存在该产品的状态
              isExist = true;


            } else { //如果不等

              tempArr.push(allDatas_music[i])

            }

          }

          if (!isExist) { //表明当前的已购买的图书的数组中，没有当前的图书
            //当前图书信息
            let data = { pid: that.data.pid, count: 1, pdatas: that.data.datas }

            //存入到当前已经购买的图书的数组中
            tempArr.push(data)

          }


          //最终数据
          let lastData = { book: allDatas.book, music: tempArr, movie: allDatas.movie }

          //更改Storage的值
          wx.setStorage({
            key: app.globalData.openID,
            data: lastData,
            success: function () {

              //显示购物车数量
              helper.cartCount(that, allDatas);

            }
          })

        }

      },

      fail: function () {//2.3 如果在Storage不存在该openID,创建Storage,并且存入当前的产品信息（pid,count）

        wx.setStorage({
          key: app.globalData.openID,

          data: { book: [], music: [{ pid: that.data.pid, count: 1, pdatas: that.data.datas }], movie: [] },

          success: function () { //每次在成功设置Storage时，重新统计购买数量

            //第一次创建Storage时，数量总是1
            let count = 1;

            //更新模板数据
            that.setData({
              cartCounts: count
            })

          }
        })
      }
    })
  },
})