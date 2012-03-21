$(function(){

  $.fn.newsding = function() {
    var
      base = this,
      options = {
        numRows: localStorage.numrows,
        sources: $.parseJSON(localStorage.sources).data
      };

      // console.log(this.url);
    $(options.sources).each(function() {
      $.getFeed({
        url: this.url,
        success: function(feed) {
          console.log(feed);
        }
      });
    });

  };
}(jQuery));