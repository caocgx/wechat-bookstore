var helper = {

  titleName: "我的图书",

  //统计购物车数量
  cartCount: function(that, allDatas) {

    //获取当前购物车中的所购买的产品的总数量

    var totalCounts = 0;

    //购买的图书的总数量
    if (allDatas.book.length > 0) {

      for (let i = 0; i < allDatas.book.length; i++) {

        totalCounts += parseInt(allDatas.book[i].count)

      }

    }

    //购买的音乐的总数量
    if (allDatas.music.length > 0) {

      for (let i = 0; i < allDatas.music.length; i++) {

        totalCounts += parseInt(allDatas.music[i].count)

      }

    }


    //购买的电影的总数量
    if (allDatas.movie.length > 0) {

      for (let i = 0; i < allDatas.movie.length; i++) {

        totalCounts += parseInt(allDatas.movie[i].count)

      }

    }

    //显示购物车数量
    that.setData({
      cartCounts: totalCounts
    })

    return totalCounts;

  },

  //购物车加/减/删除
  addsub: function(e, openID, that_, action) {

    var this_ = this;

    //当前商品分类
    let item = e.currentTarget.dataset.item;

    //当前商品ID
    let pid = e.currentTarget.dataset.pid;

    //点击时：1.更新storage 2.重新渲染数据
    //获取本地数据
    var storageDatas = wx.getStorageSync(openID);

    //更新本地数据
    var bookData = storageDatas.book;
    var musicData = storageDatas.music;
    var movieData = storageDatas.movie;

    if (item == 'book') {

      for (let i = 0; i < bookData.length; i++) {
        if (bookData[i].pid == pid) {

          if (action == 'add') {
            bookData[i].count++
          } else if (action == 'sub') {
            if (bookData[i].count == 1) {
              //删除提示
              wx.showModal({
                title: '提示',
                content: '确定要删除吗',
                success(res) {
                  if (res.confirm) {
                    this_.addsub(e, openID, that_, 'del')
                  } else if (res.cancel) {

                  }
                }
              })

            } else {
              bookData[i].count--
            }
          } else {
            bookData.splice(i, 1);
          }

        }
      }

    } else if (item == 'music') {

      for (let i = 0; i < musicData.length; i++) {
        if (musicData[i].pid == pid) {

          if (action == 'add') {
            musicData[i].count++
          } else if (action == 'sub') {
            if (musicData[i].count == 1) {
              //删除提示
              wx.showModal({
                title: '提示',
                content: '确定要删除吗',
                success(res) {
                  if (res.confirm) {
                    this_.addsub(e, openID, that_, 'del')
                  } else if (res.cancel) {

                  }
                }
              })
            } else {
              musicData[i].count--
            }
          } else {
            musicData.splice(i, 1);
          }
        }
      }

    } else {

      for (let i = 0; i < movieData.length; i++) {
        if (movieData[i].pid == pid) {

          if (action == 'add') {
            movieData[i].count++
          } else if (action == 'sub') {
            if (movieData[i].count == 1) {
              //删除提示
              wx.showModal({
                title: '提示',
                content: '确定要删除吗',
                success(res) {
                  if (res.confirm) {
                    this_.addsub(e, openID, that_, 'del')
                  } else if (res.cancel) {

                  }
                }
              })
            } else {
              movieData[i].count--
            }
          } else {
            movieData.splice(i, 1);
          }

        }
      }

    }

    //更新storage
    wx.setStorageSync(openID, storageDatas)

    //重新渲染数据
    that_.setData({
      bookDatas: storageDatas.book,
      musicDatas: storageDatas.music,
      movieDatas: storageDatas.movie
    })

    //更新购物车显示数量
    let cartCounts = this.cartCount(that_, storageDatas);

    //设置tabbar数量
    wx.setTabBarBadge({
      index: 2,
      text: cartCounts.toString(),
    })

    //统计总价
    let totalPrice = this.countPrice(storageDatas);

    //渲染到模板
    that_.setData({
      totalPrice: totalPrice
    })
  },

  //统计购物车总金额
  countPrice: function(allDatas) {

    let totalPrice = 0;

    //图书总价
    for (let i = 0; i < allDatas.book.length; i++) {
      //数量
      let counts = allDatas.book[i].count;
      //单价
      let price = allDatas.book[i].pdatas.price;
      //总价
      totalPrice += counts * price;
    }
    //音乐总价
    for (let i = 0; i < allDatas.music.length; i++) {
      //数量
      let counts = allDatas.music[i].count;
      //单价
      let price = allDatas.music[i].pdatas.price;
      //总价
      totalPrice += counts * price;
    }
    //电影总价
    for (let i = 0; i < allDatas.movie.length; i++) {
      //数量
      let counts = allDatas.movie[i].count;
      //单价
      let price = allDatas.movie[i].pdatas.price;
      //总价
      totalPrice += counts * price;
    }
    return totalPrice;
  }

}

module.exports = helper;