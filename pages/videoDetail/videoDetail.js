// pages/videoDetail/videoDetail.js
import { network } from "../../utils/network.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    var that = this
    var id = options.id;
    var type = options.type;
    that.setData({
      id:id,
      type:type
    })
    network.getVideoDetailData({
      id:id,
      type:type,
      success:function (detailData) {
        // console.log(detailData)
        var durations = detailData.durations[0]
        var genres = detailData.genres;
        var fe = genres.join("/");
        // console.log(detailData)
        var author = durations + "/" + fe;
        detailData.author = author;
        that.setData({
          detailData: detailData
        })
      } 
    })
    network.getVideoTag({
      id:id,
      type:type,
      success:function (res) {
        var tagsData = res.data.tags
        // console.log(res.data.tags)
        that.setData({
          tagsData: tagsData
        })
      }
    })
    network.getShortComment({
      id:id,
      type:type,
      success:function (res) {
        var commentData = res.data.interests;
        var commentPeople = res.data.total;
        // console.log(res.data.interests)
        that.setData({
          commentData: commentData,
          commentPeople: commentPeople
        })
      }
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
    wx.pageScrollTo({
      scrollTop: 0,
    })
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