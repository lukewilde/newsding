$(function(){
  $.fn.newsding = function() {
    var options = {
      numRows: localStorage.numrows,
      sources: $.parseJSON(localStorage.sources)
    };

    console.log(localStorage.sources);
  };
}(jQuery));