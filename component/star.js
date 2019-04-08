// component/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    starnums: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  ready() {

    //获取父组件传递的星星数量
    let stars = this.properties.starnums

    var tempArr = [];

    //创建星星
    let totalStars = 5;

    for (let i = 1; i < totalStars + 1; i++) {

      //一颗红心
      let redStar = '../static/ico/star.png';
      //一个灰心
      let grayStar = '../static/ico/star-gray.png';

      if(i>stars){
        //存入灰心
        tempArr.push(grayStar);
      }else{
        //存入红心
        tempArr.push(redStar);
      }
    }

    this.setData({
      list: tempArr
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})