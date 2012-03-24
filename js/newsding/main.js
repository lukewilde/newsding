require([
  '/js/lib/jquery-1.7.1.min.js',
  '/js/lib/jquery.tmpl.min.js',
  '/js/lib/jquery-jfeed.js',
  '/js/newsding/newsding.js'
],
function($) {
  jQuery(function($){
    $('body').newsding();
  });
});