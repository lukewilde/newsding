$(function(){

  $.fn.newsding = function() {
    var
      base = this,
      options = {
        numRows: localStorage.numrows,
        categories: $.parseJSON(localStorage.sources).categories
      };

    $(options.categories).each(function() {
      $(this.items).each(function() {

        // $.ajax({
        //   url: this.url,
        //   success: function(feed) {
        //     console.log(this, feed);
        //   }
        // });
      });
    });
  };
}(jQuery));