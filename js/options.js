$(function(){
  $.fn.options = function() {

    var $base = $(this),
    $inputs = $('#form :input');

    restoreOptions();
    setupControls();
    setupListeners();

    // Restores form state from localStorage.
    function restoreOptions() {

      $inputs.each(function() {

        var name = $(this).attr('name');

        if (localStorage[name]) {
          $(this).val(localStorage[name]);
          console.log("loading: " + name + " as " + $(this).val());
        } else {
          console.log("No saved value for: " + name);
        }
      });
    }

    function setupControls() {
      $("input#numrows").bind("change", function() {
        $('#current-numrows').text($("input#numrows").val());
      });
    }

    function setupListeners() {
      $("input.submit").bind("click", saveOptions);
    }

    function saveOptions() {
      $inputs.each(function() {
        var name = $(this).attr('name');
        console.log($(this), name);
        localStorage[name] = $(this).val();
      });
      localStorage["sources"] = $('textarea sources').text();
      notifyUserDataIsSaved();
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