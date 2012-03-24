$(function(){

  $.fn.newsding = function() {
    var
      base = this,
      categores = null,
      options = {
        numRows: localStorage.numrows,
        categories: $.parseJSON(localStorage.sources).categories
      };

    // init();
    downloadCategories();

    function init() {

      $.parseJSON(localStorage.categories);

      $(categories).each(function() {
        renderSource(this);
      });
    }

    function renderSource(source) {

      source.each(function() {
        var title = $(this).find("title").text();
        var description = $(this).find("description").text();
        var image = $(description).find("img");

        $("body").append("<h3>" + title + "<h3>");
        $("body").append(image);
      });
    }

    function downloadCategories () {
      $(options.categories).each(function() {

        var category = this;
        var sources = {};

        $(this.items).each(function() {
          $.ajax({
            url: this.url,
            settings : {
              dataType : "xml"
            },
            success: function(feed) {

              if (typeof localStorage.categories == "undefined") {
                localStorage.categories = {};
              }

              $feed = $(feed).find("item");

              // Persistance in localStorage
              localStorage.categories[this.url] = $feed.text();
              console.log(localStorage.categories);
              // Persistance in memory
              categories[this.url] = $feed;

              // console.log(this.url);

              // Update view.
              renderSource($feed);
            }
          });
        });
      });
    }

  };
});