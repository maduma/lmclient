define(["jquery", "backbone", "../model/playerModel", "../util/global"],
    function($, Backbone, PlayerModel, Global) {
  
  var router = Backbone.Router.extend({
    initialize: function() {
      Backbone.history.start();
    },
    routes: {
      "": "loading",
      "registerUid": "registerUid"
    },
    loading: function() {
        $.mobile.changePage("#loading");
        var player = Global.player;
        player.fetch({
            error: function() {
                setTimeout(function() {
                    $.mobile.changePage("#registerForm");
                }, 2000);
            },
            success: function() {
                setTimeout(function() {
                    $.mobile.changePage("#main");
                }, 2000);
            }
        });
    },
    registerUid: function() {
        var uid = $("input#uid").val();
        var fullname = $("input#funame").val();
        console.log("uid: ", uid);
        if (uid === "") {
            $.mobile.changePage("#registerForm");
        } else {
            var player = Global.player;
            player.set("uid", uid);
            player.set("fullname", fullname);
            player.save();
            $.mobile.changePage("#main");
        }
    }
  });
  return router;

});
