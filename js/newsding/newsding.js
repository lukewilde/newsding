$(function(){
  $.fn.newsding = function() {

    var
      base = this,
      categores = null,
      options = {
        numRows: localStorage.numrows,
        categories: $.parseJSON(localStorage.sources).categories
      };

    // loadSavedArticles();
    downloadArticles();

    function loadSavedArticles() {

      categories = $.parseJSON(localStorage.feeds);

      $(categories).each(function() {
        renderArticles(this);
      });
    }

    function renderArticles(category, $newsItems) {

      $newsItems.each(function(item) {
        $("body").append("<h3>" + item.title + "<h3>");
        $("body").append(item.image);
        $("body").append(item.pubdate);
      });
    }

    function downloadArticles () {
      $(options.categories).each(function() {

        var category = this;

        $(category.items).each(function() {

          var newsSource = this;

          $.ajax({
            url: newsSource.url,
            settings : {
              dataType : "xml"
            },
            success: function(feed) {

              var newsItems = buildArticles(category.title, newsSource.title, feed);
              console.log(newsItems);
              persistArticles(newsItems);
              // renderArticles(category, newsSource.title, newsItems);

              // console.log($feed.text());
              // Persistance in memory
              // categories[category.url] = $feed;

              // Update view.
            }
          });
        });
      });
    }

    function persistArticles (category, key, newsItems) {
      if (typeof localStorage.categories == "undefined") {
        console.log("Creating local article storage");
        localStorage["categories"] = [];
      }

      localStorage.categories[category] = "{ding}";
      console.log(localStorage.categories[category]);
      // localStorage.categories[category][key] = $(newsItems).serialize();
    }

    function buildArticles(categoryTitle, newsSourceTitle, feed) {

      var $feed = $(feed).find("item"),
      newsSource = {
        title: newsSourceTitle,
        category: categoryTitle,
        items: extractArticles($feed)
      };

      return newsSource;
    }

    function extractArticles($feed) {

      var newsItems = [];

      $feed.each(function() {

        newsItems.push({
          title: $(this).find("title").text(),
          description: $(this).find("description").text(),
          image: $(this.description).find("img"),
          pubdate: $(this.description).find("pubdate")
        });
      });

      return newsItems;
    }

  };
});