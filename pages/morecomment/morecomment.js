// pages/morecomment/morecomment.js
import {network} from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:1,
    btnShow:true,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData(options)
    var id = options.id;
    var type = options.type;
    var start = 1;
    this.setData({
      start: start
    })
    // console.log(id)
    network.getShortComment({
      id: id,
      type: type,
      start: start,
      count: 20,
      success: function (res) {
        // console.log(res)
        var total = res.data.total
        var commentTotal = res.data.interests
        // console.log(commentTotal)
        that.setData({
          commentTotal: commentTotal,
          total: total
        })
      }
    })
    
  },
  onBack:function () {
    wx.navigateBack({});
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(2)
    var that = this
    var id = this.options.id;
    var type = this.options.type;
    var start = this.data.start
    var start = start + 20
    this.setData({
      start: start,
      btnShow:false
    })
    // console.log(id)
    network.getShortComment({
      id: id,
      type: type,
      start: start,
      count: 20,
      success: function (res) {
        
        var commentTotal = that.data.commentTotal
        var newCommentTotal = res.data.interests
        // console.log(newCommentTotal)
        commentTotal = commentTotal.concat(newCommentTotal)
        // console.log(commentTotal)
        var total = that.data.total;
        that.setData({
          commentTotal: commentTotal,
          btnShow:true
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})