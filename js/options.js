$(function(){
  $.fn.options = function() {

    var $base = $(this),
    $inputs = $('#form :input');

    setupInterface();
    setupControls();

    function setupInterface() {
      $("input#numrows").bind("change", function() {
        $('#current-numrows').text($("input#numrows").val());
      });
    }

    function setupControls() {
      $base.find(".submit").bind("click", function(event) {
        event.preventDefault();
      });
    }

    function notifyUserDataIsSaved() {

      // Update status to let user know options were saved.
      var status = $("#status");
      status.text("Options Saved.");

      setTimeout(function() {
        status.text("");
      }, 750);
    }
  };
}(jQuery));