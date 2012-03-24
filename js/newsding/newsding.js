require([
  '/js/lib/jquery-1.7.1.min.js',
  '../lib/md5'
],
  function(jQuery, Md5) {
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

                console.log(feed);

                var news = buildArticles(category.title, newsSource.title, feed);
                // console.log($(newsItems).serialize());

                // persistArticles(news);
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

      function persistArticles (newsSource) {

        var feeds;
        console.log("persisting", newsSource);

        if (typeof localStorage.feeds !== 'undefined') {
          console.log('loading');
          feeds = $.parseJSON(localStorage.feeds);

        } else {
          console.log('starting');
          feeds = [];
        }

        feeds.push(newsSource);
        console.log(feeds);
        localStorage["feeds"] = JSON.stringify(feeds);
      }

      function buildArticles(categoryTitle, newsSourceTitle, feed) {

        var $feedItems = $(feed).find("item"),
          newsSource = {
            title: newsSourceTitle,
            category: categoryTitle,
            items: extractArticles($feedItems)
          };

        console.log("building", newsSource);

        return newsSource;
      }

      function extractArticles($feedItems) {

        var newsItems = [];

        $feedItems.each(function() {

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
  }
);