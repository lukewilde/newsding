$(function(){

  $.fn.newsding = function() {
    var
      base = this,
      options = {
        numRows: localStorage.numrows,
        sources: $.parseJSON(localStorage.sources).data
      };

      // console.log(this.url);
      $.getFeed({
        url: options.sources[0].url,
        success: function(feed) {
          console.log(feed);
        }
      });
    // $(options.sources).each(function() {
    // });

  };
}(jQuery));