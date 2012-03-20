$(function(){
  $.fn.options = function() {

    restoreOptions();
    setupControls();

    // Restores select box state to saved value from localStorage.
    function restoreOptions() {
      var favorite = localStorage["favorite_colour"];
      if (!favorite) {
        return;
      }

      var select = $("#colour");
      $('select').val(favorite);
    }

    function setupControls() {
      $("button.submit").bind("click", saveOptions);
    }

    function saveOptions() {
      var colour = $('select option:selected').val();
      localStorage["favorite_colour"] = colour;
      notifyUserDataIsSaved();
    }

    function notifyUserDataIsSaved() {

      // Update status to let user know options were saved.
      var status = $("#status");
      status.text("Options Saved.");

      console.log("saved");

      setTimeout(function() {
        status.text("");
      }, 750);
    }
  };
}(jQuery));