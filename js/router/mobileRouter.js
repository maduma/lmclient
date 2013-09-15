define(["jquery", "backbone"], function($, Backbone) {
  var router = Backbone.Router.extend({
    initialize: function() {
      Backbone.history.start();
    },
    routes: {
      "": "home"
    },
    home: function() {
      $.mobile.changePage("#home" ,{reverse: false, changeHash: false});
    }
  });
  return router;
});
