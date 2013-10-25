define(["jquery", "backbone", "../model/playerModel",
    "../view/mainView", "../view/workoutView", "../collection/workoutCollection",
    "../widget/numpad"],
    function($, Backbone, PlayerModel,
        MainView, WorkoutView, WorkoutCollection,
        Numpad) {
  
  var router = Backbone.Router.extend({
    initialize: function() {
        this.wks = null;
        this.player = new PlayerModel();
        this.mainView = new MainView({el: $("span#player-uid"), model: this.player});
        this.workoutView = new WorkoutView({el: $("div#workout-list")});
        this.numpad = new Numpad();
        //this.numpad.setDelay(7);
        Backbone.history.start();
    },
    routes: {
      "": "loading",
      "registerUid": "registerUid",
      "main": "main",
      "selectOp": "selectOp",
      "op?:type": "op",
      "play?:wkLabel": "play"
    },
    loading: function() {
        $.mobile.changePage("#loading");
        this.player.fetch({
            error: function() {
                setTimeout(function() {
                    $.mobile.changePage("#registerForm");
                }, 500);
            },
            success: function() {
                setTimeout(function() {
                    $.mobile.changePage("#main");
                }, 500);
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
            this.player.set("uid", uid);
            this.player.set("fullname", fullname);
            this.player.save();
            $.mobile.changePage("#main");
        }
    },
    main: function() {
        $.mobile.changePage("#main");
    },
    selectOp: function() {
        $.mobile.changePage("#selectOp");
    },
    op: function(type) {
        this.player.set("type", type);
        $.mobile.loading( "show" );
        this.wks = new WorkoutCollection([], {type: type});
        this.workoutView.setCollection(this.wks);
        var self = this;
        this.wks.fetch().done(function() {
            self.workoutView.$el.find('a').button();
            $.mobile.changePage("#selectWorkout");
        });
    },
    play: function(wkLabel) {
        this.player.set("wkLabel", wkLabel);
        var wk = this.wks.get(wkLabel);
        wk.initExe();
        this.numpad.setWk(wk);
        $.mobile.changePage("#play");
    }
  });
  return router;

});
