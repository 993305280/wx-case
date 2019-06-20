// pages/move/move.js
import { network } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var title = "";
    wx.showLoading({
      title: '正在加载中...'
    })
    // console.log(options);
    var type = options.type;
    this.setData({
      type:type
    })
    if (type === "movie") {
      network.getMovieData({
        count:1000,
        success: function (items) {
          that.setData({
            items: items
          })
          wx.hideLoading();
        }
      })
      title = "电影"
    }else if (type === "tv") {
      network.getTvData({
        count: 1000,
        success: function (items) {
          that.setData({
            items: items
          })
          wx.hideLoading();
        }
      })
      title = "电视剧"
    }else{
      network.getShowData({
        count: 1000,
        success: function (items) {
          that.setData({
            items: items
          })
          wx.hideLoading();
        }
      })
      title = "热门综艺"
    }
  wx.setNavigationBarTitle({
    title: title,
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})