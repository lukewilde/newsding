require([
  '/js/lib/jquery.tmpl.min.js',
  '/js/lib/jquery-jfeed.js',
  '/js/newsding/newsding.js'
],
function(jQuery, JFeed, NewsDing) {
    NewsDing.init();
});