define(["jquery", "backbone", "model/playerModel",
    "view/mainView", "view/workoutView", "collection/workoutCollection",
    "model/gameModel", "view/gameView", "view/reportView", "collection/reportCollection"],
    function($, Backbone, PlayerModel,
        MainView, WorkoutView, WorkoutCollection,
        GameModel, GameView, ReportView, Reports) {
  
  var router = Backbone.Router.extend({
    initialize: function() {
        this.wks = null;
        this.player = PlayerModel;
        this.mainView = new MainView({el: $("span#player-uid"), model: this.player});
        this.workoutView = new WorkoutView({el: $("div#workout-list")});
        this.game = GameModel;
        this.gameView = new GameView({model: this.game});
        //this.numpad.setDelay(7);
        Backbone.history.start();
    },
    routes: {
      "": "loading",
      "registerUid": "registerUid",
      "main": "main",
      "selectOp": "selectOp",
      "op?:type": "op",
      "play?:wkLabel": "play",
      "reports": "reports"
    },
    loading: function() {
        $.mobile.changePage("#loading");
        var self = this;
        this.player.fetch({
            error: function() {
                setTimeout(function() {
                    $.mobile.changePage("#registerForm");
                }, 500);
            },
            success: function() {
                if (self.player.get("uid") === "maduma" ||
                    self.player.get("uid") === "toto") {
                    self.player.set("leveladd", 55);
                    self.player.save();
                }
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
        wk.fetch();
        wk.initExe();
        this.game.setWk(wk);
        $.mobile.changePage("#play");
    },
    reports: function() {
        console.log("toto");
        this.reportView = new ReportView({el: $("ul#reportList"), collection: Reports});
        Reports.fetch();
        console.log("Reports", Reports);
        $.mobile.changePage("#reports");
        $('ul#reportList').listview( "refresh" );
    }
  });
  return router;

});
