requirejs.config({
  paths: {
    "jquery": "lib/jquery",
    "jquerymobile": "lib/jquerymobile",
    "underscore": "lib/underscore",
    "backbone": "lib/backbone"
  },
  shim: {
    "backbone": {
      "deps" : ["underscore", "jquery"],
      "exports": "Backbone"
    },
    "underscore": {
      "exports" : "_"
    }
  }
});

// Main
require(["jquery", "underscore", "backbone", "router/mobileRouter",
    "model/playerModel"],
    function($, _, Backbone, Mobile, PlayerModel) {
        
  // Version
  //console.log("jquery " + $.fn.jquery);
  //console.log("backbone " + Backbone.VERSION);
  //console.log("underscore " + _.VERSION);

  // Set up the "mobileinit" handler before requiring jQuery Mobile's module
  $(document).on("mobileinit", function() {
    // Prevents all anchor click handling
    // including the addition of active button state and alternate link bluring.
    $.mobile.linkBindingEnabled = false;
    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
  });
  
  require( [ "jquerymobile" ], function() {
    // now that jquery is loaded, display body
    $("body").css("display", "block");
    // Instantiates a new Backbone.js Mobile Router
    this.lmclientRouter = new Mobile();
    // export global for debuging;
  });
  
});