import { videoDataUrls } from "urls.js"

const network = {
  getMovieData: function (params) {
    params.type = "movie"
    this.getItemsData(params)
  },
  getTvData: function (params) {
    params.type = "tv"
    this.getItemsData(params)
  },
  getShowData: function (params) {
    params.type = "show"
    this.getItemsData(params)
  },
  getItemsData:function (params) {
    var count = params.count ? params.count : 7;
    var url = "";
    if (params.type === "movie") {
      url = videoDataUrls.getMovieUrl
    } else if (params.type === "tv") {
      url = videoDataUrls.getTvUrl
    } else {
      url = videoDataUrls.getShowUrl
    }
    wx.request({
      url: url,
      data: {
        count: count
      },
      success: function (res) {
        var items = res.data.subject_collection_items;
        // 解决最后一列图片空白
        if (items.length % 3 === 2) {
          items.push(null)
        }
        if (params && params.success) {
          params.success(items);
        }
      }
    })

  },
  getVideoDetailData:function (params) {
    var id = params.id;
    var type = params.type;
    let url = "";
    if (type === "movie") {
      url = videoDataUrls.movieDetail + id;
    }else if (type === "tv") {
      url = videoDataUrls.tvDetail + id;
    } else {
      url = videoDataUrl.showDetail + id;
    }
    wx.request({
      url: url,
      success:function (res) {
        var detailData = res.data
        if ( params&&params.success) {
          params.success(detailData)
        }
      }
    })
  },
  getVideoTag:function (params) {
    var id = params.id;
    var type = params.type;
    var url = ""
    if (params.success) {
      if(type === "movie") {
        url = videoDataUrls.movieTags(id)
      } else if (type === "tv") {
        url = videoDataUrls.tvTags(id)
      }else {
        url = videoDataUrls.showTags(id)
      }
    }
    wx.request({
      url: url,
      success:function (res) {
        params.success(res)
      }
    })
  },
  getShortComment:function (params) {
    var id = params.id;
    var type = params.type;
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 3;
    var url ="";
    if (type === "movie") {
      url = videoDataUrls.movieComments(id, start, count);
    } else if (type === "tv") {
      url = videoDataUrls.tvComments(id, start, count);
    } else {
      url = videoDataUrls.showComments(id, start, count)
    }
    wx.request({
      url: url,
      success:function(res) {
        if (!params.success) return;
        params.success(res)
      }
    })
  },
  getSearchData:function (params) {
    var searchValue = params.searchValue;
    var url = videoDataUrls.searchDataUrls(searchValue);
    wx.request({
      url: url,
      success:function (res) {
        if (!params.success) return;
        params.success(res)
      }
    })
  }
}

export { network }