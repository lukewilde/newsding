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
    var articles = loadSavedArticles();
    renderArticles(articles);

    // downloadArticles();
  }

  function loadSavedArticles() {
    // Load old data.
    if (typeof localStorage.categories !== 'undefined') {
      return $.parseJSON(localStorage.categories);
    } else {
    // Or create fresh object.
      return {};
    }
  }

  function renderArticles(categories) {



      // console.log(categories);
    $.each(categories, function() {

      var feeds = this.feeds;

      $.each(feeds, function() {

        var articles = this;

        $("body").append("<h2>" + articles.title + "<h2>");

        $.each(articles.items, function() {

          $("body").append("<h3>" + this.title + "<h3>");
          $("body").append(this.image);
          // $("body").append("<span>" + this.description + "<span>");
        });
      });
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

  function persistNews(newsSource) {

    var
      savedArticles = loadSavedArticles();
      categoryKey = md5(newsSource.category),
      articleKey = md5(newsSource.title);

      if (typeof savedArticles[categoryKey] == 'undefined') {
        savedArticles[categoryKey] = {};
        savedArticles[categoryKey].title = newsSource.category;
        savedArticles[categoryKey].feeds = {};
      }

    savedArticles[categoryKey].feeds[articleKey] = newsSource;

    // console.log(savedArticles);
    localStorage.categories = JSON.stringify(savedArticles);
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

    return newsItems;
  }

  return {
    init: init
  };

});