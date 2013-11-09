define(["jquery", "backbone", "util/prop"], function( $, Backbone, Prop ) {
    var Model = Backbone.Model.extend({
        idAttribute: "uid",
        defaults: {
            "uid": "",
            "fullname": "",
            "wallet": 0.0, //Euro
            "goldMedal": 0,
            "silverMedal": 0,
            "bronzeMedal": 0,
            // stats
            "playingTime": 0, //second
            "succeded": 0,
            "failed": 0,
            "timedout": 0,
            "aborted": 0,
            // internal
            "localStorage": 1,
            "type": ""
        },
        completed: function() {
            return this.get("succeded") + this.get("failed") +
                this.get("timedout");
        },
        sync: function(method, model, options) {
            console.log("[playerModel:sync] method: ", method);
            console.log("[playerModel:sync] model: ", model);
            console.log("[playerModel:sync] options", options);
            if (this.get("localStorage")) {
                if (method == "read") {
                    var deferred = $.Deferred();
                    var savedPlayer = JSON.parse(localStorage.getItem(Prop.tag + 'player'));
                    if (!savedPlayer) {
                        options.error("[playerModel:sync] Player not found in localStorage.");
                        deferred.resolve();
                    } else {
                        console.log("[playerModel:sync] player found in localStrorage: " + savedPlayer.uid);
                        options.success(savedPlayer);
                        deferred.resolve();
                    }
                    return deferred;
                } else if (method == "update") {
                    localStorage.setItem(Prop.tag + 'player', JSON.stringify(this));
                }
            } else {
                return Backbone.Model.prototype.sync.apply(this, arguments);
            }
        },
        inc: function(attr)  {
            this.set(attr, this.get(attr) + 1);
        }
    });
    // singleton
    return new Model();
});