define([ "jquery", "backbone", "model/workoutModel", "underscore", "model/playerModel" ], function( $, Backbone, WorkoutModel, _, Player ) {
    var Collection = Backbone.Collection.extend( {
        model: WorkoutModel,
        url: '/workout',
        jsonArray: [
            { "label": "add:1:4", "op": "add", "level": 0},
            { "label": "add:1:5", "op": "add", "level": 10},
            { "label": "add:1:6", "op": "add", "level": 20},
            { "label": "add:2:7", "op": "add", "level": 30},
            { "label": "add:2:8", "op": "add", "level": 40},
            { "label": "add:2:9", "op": "add", "level": 50},
            { "label": "add:2:10", "op": "add", "level": 60},
            { "label": "sub:1:5", "op": "sub", "level": 0},
            { "label": "sub:1:6", "op": "sub", "level": 10},
            { "label": "sub:1:7", "op": "sub", "level": 15},
            { "label": "sub:2:8", "op": "sub", "level": 20},
            { "label": "sub:2:9", "op": "sub", "level": 25},
            { "label": "sub:2:10", "op": "sub", "level": 30},
            { "label": "sub:2:11", "op": "sub", "level": 35},
            { "label": "sub:2:12", "op": "sub", "level": 40},
            { "label": "sub:2:13", "op": "sub", "level": 45},
            { "label": "sub:2:14", "op": "sub", "level": 50},
            { "label": "sub:2:15", "op": "sub", "level": 55},
            { "label": "sub:2:16", "op": "sub", "level": 60},
            { "label": "sub:2:17", "op": "sub", "level": 65},
            { "label": "sub:2:18", "op": "sub", "level": 70},
            { "label": "sub:2:19", "op": "sub", "level": 75},
            { "label": "sub:2:20", "op": "sub", "level": 80},
            { "label": "mul:1:2", "op": "mul", "level": 0},
            { "label": "mul:1:3", "op": "mul", "level": 10},
            { "label": "mul:1:4", "op": "mul", "level": 20},
            { "label": "mul:1:5", "op": "mul", "level": 30},
            { "label": "mul:2:6", "op": "mul", "level": 40},
            { "label": "mul:2:7", "op": "mul", "level": 50},
            { "label": "mul:2:8", "op": "mul", "level": 60},
            { "label": "mul:2:9", "op": "mul", "level": 70},
            { "label": "mul:2:10", "op": "mul", "level": 80},
            { "label": "div:1:2", "op": "div", "level": 0},
            { "label": "div:1:3", "op": "div", "level": 10},
            { "label": "div:1:4", "op": "div", "level": 20},
            { "label": "div:1:5", "op": "div", "level": 30},
            { "label": "div:2:6", "op": "div", "level": 40},
            { "label": "div:2:7", "op": "div", "level": 50},
            { "label": "div:2:8", "op": "div", "level": 60},
            { "label": "div:2:9", "op": "div", "level": 70},
            { "label": "div:2:10", "op": "div", "level": 80}
        ],
        disabledArray: {
            "Hugo": ["add:1:5", "add:1:6", "add:2:7", "add:2:8"],
            
        },
        initialize: function(models, options) {
            this.type = options.type;
        },
        sync: function( method, model, options ) {
            var self = this;
            var deferred = $.Deferred();
            setTimeout( function() {
                var wkAr = _.where(self.jsonArray, {'op': self.type});
                _.each(wkAr, function(e) {
                    var wk = new WorkoutModel(e);
                    var level = wk.get("level");
                    wk.fetch();
                    wk.set("level", level);
                    wk.save();
                    self.listenTo(wk, "change", function(){
                        self.trigger("added");
                    });
                    // var disabledWks = self.disabledArray[Player.get("uid")];
                    // console.log("disabledWks", disabledWks);
                    // _.each(disabledWks, function(e) {
                    //   if(wk.id == e) {
                    //       wk.set("bank", 16);
                    //       wk.save();
                    //   } 
                    // });
                    self.push(wk);
                });
                options.success(self.models);
                self.trigger("added");
                deferred.resolve();
            }, 100);
            return deferred;
        }
    });
    return Collection;
});
