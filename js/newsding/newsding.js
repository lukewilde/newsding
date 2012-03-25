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
    renderAllArticles(articles);

    // downloadAllarticles();
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

  function renderAllArticles(categories) {

    $.each(categories, function() {
      var feeds = this.feeds;
        renderFeeds(feeds);
    });
  }

  function renderFeeds(feeds) {
    $.each(feeds, function() {
      var feed = this;

      $("body").append("<h2>" + feed.title + "<h2>");

      $.each(feed.items, function() {
        renderArticle(this);
      });
    });
  }

  function renderArticle(article) {
    $("body").append("<h3>" + article.title + "<h3>");
    $("body").append($(article.image));
    // $("body").append("<span>" + article.description + "<span>");
  }

  function downloadAllarticles () {
    $(options.categories).each(function() {
      downloadFeedsForCategory(this);
    });
  }

  function downloadFeedsForCategory () {
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
          // renderArticles(news);
        }
      });
    });
  }

  /*
   * NOTE: if space is needed, the category name is saved in each feed.
   */
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

      var description = $(this).find("description").text();

      newsItems.push({
        title: $(this).find("title").text(),
        description: description,
        image: $("<span>" + description + "</span>").find("img").prop('outerHTML'),
        pubdate: $(this).find("pubDate").text()
      });
    });
    return newsItems;
  }

  return {
    init: init
  };

});