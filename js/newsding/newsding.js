define([
  '../lib/jquery-1.7.1.min.js',
  '../lib/phpjs.js'
],
function(jQuery) {

  var
    base = this,
    categores = null,
    options = {
      numRows: localStorage.numrows,
      categories: $.parseJSON(localStorage.sources).categories
    };

  function init() {
    // loadSavedArticles();
    downloadArticles();
  }

  function loadSavedArticles() {
    // Load old data.
    if (typeof localStorage.feeds !== 'undefined') {
      return $.parseJSON(localStorage.feeds);
    } else {
    // Or create fresh object.
      return {};
    }
  }

  function renderArticles(category, $newsItems) {

    // UDPATE NAD MOVE
    categories = $.parseJSON(localStorage.feeds);

    $(categories).each(function() {
      renderArticles(this);
    });

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

            var news = buildArticles(category.title, newsSource.title, feed);
            persistNews(news);

            // Persistance in memory
            // categories[category.url] = $feed;

            // Update view.
            // renderArticles(news);
          }
        });
      });
    });
  }

  function persistNews (newsSource) {

    var feeds = loadSavedArticles();

    var key = md5(newsSource.title);
    feeds[key] = newsSource;
    localStorage["feeds"] = JSON.stringify(feeds);
  }

  function buildArticles(categoryTitle, newsSourceTitle, feed) {

    var $feedItems = $(feed).find("item"),
      newsSource = {
        title: newsSourceTitle,
        category: categoryTitle,
        items: extractArticles($feedItems)
      };

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
  }

  return {
    init: init
  };

});