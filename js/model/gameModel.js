define([
    "jquery",
    "backbone",
    "util/prop",
    "underscore",
    "widget/numpad",
    ], function($, Backbone, Prop, _, Numpad) {

    var Model = Backbone.Model.extend({
        numpad: null,
        initialize: function() {
            this.numpad = new Numpad();
            $("input#start").click(this, this.start);
            $("input#stop").click(this, this.stop);
        },
        start: function(event) {
            console.log(event.data);
            var self = event.data;
            self.set("countdown", 300) // 5 min
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
            self.wk.save();
        },
        setWk : function(wk) {
            this.numpad.setWk(wk);
            this.wk = wk;
            this.set("countdown", 300);
            $("span#scoreCorrect").html(wk.get("correct"));
            $("span#scoreWrong").html(wk.get("wrong"));
            $("span#scorePercent").html(100);
            
            this.listenTo(wk, "change:correct change:wrong", function(event) {
                $("span#scoreCorrect").html(wk.get("correct"));
                $("span#scoreWrong").html(wk.get("wrong"));
                var total = wk.get("correct") + wk.get("wrong");
                var percent = Math.floor((total - wk.get("wrong")) / total * 100);
                $("span#scorePercent").html(percent);
            });
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