var helper = {

  titleName:"我的图书",

  //统计购物车数量
  cartCount: function (that, allDatas){

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

  }

}

module.exports = helper;