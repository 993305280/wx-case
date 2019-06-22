// pages/search/search.js
import {
  network
} from "../../utils/network.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'historyVideo',
      success: function(res) {
        // console.log(res.data)
        var data = res.data;
        that.setData({
          historyArray: data
        })
      },
    })

  },
  onsearchListData: function(event) {
    var that = this
    // console.log(event.detail.value)
    var userSearchInput = event.detail.value;
    if (!userSearchInput || userSearchInput === "") {
      that.setData({
        searchTotailData: null
      });
      return;
    }
    // that.setData({
    //   userSearchInput: userSearchInput
    // })
    network.getSearchData({
      searchValue: userSearchInput,
      success: function(res) {
        // console.log(res.data.subjects)
        var searchTotailData = res.data.subjects
        that.setData({
          searchTotailData: searchTotailData
        })
      }
    })
  },
  onSearchDetailPage: function(event) {
    var that = this
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var historyArray = that.data.historyArray;
   
    var isEixted = false;
    if (historyArray) {
      for (var index=0; index<historyArray.length; index++) {
        var movies = historyArray[index];
        console.log(movies)
        // console.log(id)
        if(movies.id == id) {
          console.log(2)
          isEixted = true;
          break;
        }
      }
      // console.log(2)
    }
    if (!isEixted) {
      if (!historyArray) {
        historyArray = [];
      }
      historyArray.push({
        id: id,
        title: title
      });
      wx.setStorage({
        key: 'historyVideo',
        data: historyArray,
        success:function() {
          console.log("保存成功")
        }
      })
    }
    // console.log(id)
    // console.log(event)
    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail?type=movie&id=' + id,
    })
  },
  onClearHistory: function() {
    var that = this
    wx.removeStorage({
      key: 'historyVideo',
      success: function(res) {
        console.log("删除成功")
      },
    })
    that.setData({
      historyArray: null
    })
  }
 
 

})