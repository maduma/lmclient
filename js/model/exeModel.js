define(["jquery", "backbone", "util/prop", "underscore", "model/playerModel"], function( $, Backbone, Prop, _, PlayerModel ) {
    var Model = Backbone.Model.extend({
        idAttribute: "question",
        defaults: {
            correct: 0,
            wrong: 0,
            total: 0,
            consCorrect: 0
        },
        initialize: function() {
            this.on("change:correct", this.incrementTotalCorrect);
            this.on("change:wrong", this.incrementTotalWrong);
        },
        sync: function( method, model, options ) {
            var player = PlayerModel;
            var playerTag = player.get('uid') + ':'; 
            if (method == "read") {
                var deferred = $.Deferred();
                var savedExe = JSON.parse(localStorage.getItem(Prop.tag + playerTag + 'exe:' + this.id));
                if (!savedExe) {
                    localStorage.setItem(Prop.tag  + playerTag + 'exe:' + this.id, JSON.stringify(this));
                    savedExe = JSON.parse(JSON.stringify(this));
                }
                console.log(savedExe.question + " " + savedExe.correct + ':' + savedExe.wrong)
                options.success(savedExe);
                deferred.resolve();
            } else if (method == "update") {
                console.log("savind " + this);
                localStorage.setItem(Prop.tag + playerTag + 'exe:' + this.id, JSON.stringify(this));
            }
        },
        incrementTotalCorrect: function() {
            this.set("consCorrect", this.get("consCorrect") + 1);
            if (this.get("consCorrect") == 2) {
                this.set("total", this.get("total") + 4);
            } else if (this.get("consCorrect") == 3) {
                this.set("total", this.get("total") + 6);
                this.set("consCorrect", 0);
            } else {
                this.set("total", this.get("total") + 2);
            }
        },
        incrementTotalWrong: function() {
            this.set("consCorrect", 0);
            this.set("total", this.get("total") + 1);
        }
    });
    return Model;
});