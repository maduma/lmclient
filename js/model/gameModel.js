define([
    "jquery",
    "backbone",
    "util/prop",
    "underscore",
    "widget/numpad",
    "model/playerModel",
    "collection/reportCollection"
    ], function($, Backbone, Prop, _, Numpad, Player, Reports) {

    var exeTime = 300;

    var Model = Backbone.Model.extend({
        numpad: null,
        initialize: function() {
            this.numpad = new Numpad();
            $("input#start").click(this, this.start);
            $("input#stop").click(this, this.stop);
        },
        start: function(event) {
            if (Player.get("uid") == "maduma") {
                exeTime = 5;
            }
            console.log(event.data);
            var self = event.data;
            self.set("countdown", exeTime) // 5 min
            self.intervalID = window.setInterval(function(){
                console.log(self.get("countdown"));
                if(self.get("countdown") === 0) {
                    clearInterval(self.intervalID);
                    self.finished = true;
                    self.stop({data: self}); 
                } else {
                    self.set("countdown", self.get("countdown") - 1);
                }
            }, 1000);
            $('input#start').button( "disable" );
            $('a#play-back').addClass("ui-disabled");
            $('input#stop').button( "enable" );
            self.numpad.start();
            console.log('Game:start');
        },
        stop: function(event) {
            var self = event.data;
            clearInterval(self.intervalID);
            $('input#stop').button( "disable" );
            $('input#start').button( "enable" );
            $('a#play-back').removeClass("ui-disabled");
            self.numpad.stop();
            console.log('Game:stop');
            var total = self.wk.get("correct") + self.wk.get("wrong");
            var percent = Math.round((total - self.wk.get("wrong")) / total * 100);
            var cssClass;
            var levelName = 'level' + self.wk.get("op");
            if (self.finished) {
                if (percent >= 95) {
                    Player.inc("goldMedal");
                    Player.inc(levelName,4);
                    self.wk.inc("gold");
                    cssClass = "goldImage";
                } else if (percent >= 90) {
                    Player.inc("silverMedal");
                    Player.inc(levelName,2);
                    self.wk.inc("silver");
                    cssClass = "silverImage";
                } else if (percent >= 85) {
                    Player.inc("bronzeMedal");
                    Player.inc(levelName);
                    self.wk.inc("bronze");
                    cssClass = "bronzeImage";
                } else {
                    Player.inc(levelName,-4);
                    self.wk.inc("miss");
                    cssClass = "missImage";
                }
                Player.inc(levelName,-1);
                Player.save();
                $("#medalImage").removeClass("goldImage silverImage bronzeImage missImage");
                $("#medalImage").addClass(cssClass);
                $.mobile.changePage("#medal");
            } else {
                console.log('Game:abort');
                self.wk.inc("abort");
                Player.inc(levelName,-1);
                Player.save();
            }
            Reports.fetch();
            console.log("reports", Reports);
            console.log("attr", self.wk.get("correct"));
            console.log("attr1", self.wk.attributes);
            //Reports.add(self.wk.attributes);
            Reports.save();
            self.wk.set("correct", 0);
            self.wk.set("wrong", 0);
            self.wk.save();
        },
        setWk : function(wk) {
            this.numpad.setWk(wk);
            this.wk = wk;
            this.set("countdown", exeTime);
            $("span#scoreCorrect").html(wk.get("correct"));
            $("span#scoreWrong").html(wk.get("wrong"));
            $("span#scorePercent").html(100);
            
            this.listenTo(wk, "change:correct change:wrong", function(event) {
                $("span#scoreCorrect").html(wk.get("correct"));
                $("span#scoreWrong").html(wk.get("wrong"));
                var total = wk.get("correct") + wk.get("wrong");
                var percent = Math.round((total - wk.get("wrong")) / total * 100);
                $("span#scorePercent").html(percent);
            });
			this.wk.set("correct", 0);
			this.wk.set("wrong", 0);
			this.wk.save();
        }
    });

    //singleton
    return new Model({
        "question" : 0,
        "correct" : 0,
        "wrong": 0,
        "countdown": 300
    });
});
