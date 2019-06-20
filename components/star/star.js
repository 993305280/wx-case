// components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate:{
      type:Number,
      value:0,
      observer: function (newVal, oldVal, changedPath) {
        this.upGradeData();
      }
    },
    starSize:{
      type:String,
      value: 20
    },
    starShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lightArray:[],
    halfsArray:[],
    grayArray:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    upGradeData:function () {
      var that = this
      var videoRate = that.properties.rate
      var videoGrade = parseInt(videoRate);
      var lightStar = parseInt(videoGrade / 2);
      var halfsStar = videoGrade % 2;
      var grayStar = 5 - lightStar - halfsStar;
      var lightArray = [];
      var halfsArray = [];
      var grayArray = [];

      for (var index = 1; index <= lightStar; index++) {
        lightArray.push(index)
      }
      for (var index = 1; index <= halfsStar; index++) {
        halfsArray.push(index)
      }
      for (var index = 1; index <= grayStar; index++) {
        grayArray.push(index)
      }
      var gradeText = videoRate && videoRate > 0 ? videoRate.toFixed(1) : "未评分";
      that.setData({
        lightArray: lightArray,
        halfsArray: halfsArray,
        grayArray: grayArray,
        gradeText: gradeText
      })
    }
  },
  lifetimes:{
    attached:function () {
      this.upGradeData();
    }
  }
})
