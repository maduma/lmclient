define([ "jquery", "backbone", "model/workoutModel", "underscore", "model/playerModel" ], function( $, Backbone, WorkoutModel, _, Player ) {
    var Collection = Backbone.Collection.extend( {
        model: WorkoutModel,
        url: '/workout',
        jsonArray: [
            { "label": "add:1:5", "op": "add"},
            { "label": "add:1:6", "op": "add"},
            { "label": "add:2:7", "op": "add"},
            { "label": "add:2:8", "op": "add"},
            { "label": "add:2:9", "op": "add"},
            { "label": "add:2:10", "op": "add"},
            { "label": "sub:1:5", "op": "sub"},
            { "label": "sub:1:6", "op": "sub"},
            { "label": "sub:1:7", "op": "sub"},
            { "label": "sub:2:8", "op": "sub"},
            { "label": "sub:2:9", "op": "sub"},
            { "label": "sub:2:10", "op": "sub"},
            { "label": "sub:2:11", "op": "sub"},
            { "label": "sub:2:12", "op": "sub"},
            { "label": "sub:2:13", "op": "sub"},
            { "label": "sub:2:14", "op": "sub"},
            { "label": "sub:2:15", "op": "sub"},
            { "label": "sub:2:16", "op": "sub"},
            { "label": "sub:2:17", "op": "sub"},
            { "label": "sub:2:18", "op": "sub"},
            { "label": "sub:2:19", "op": "sub"},
            { "label": "sub:2:20", "op": "sub"},
            { "label": "mul:1:4", "op": "mul"},
            { "label": "mul:1:5", "op": "mul"},
            { "label": "mul:2:6", "op": "mul"},
            { "label": "mul:2:7", "op": "mul"},
            { "label": "mul:2:8", "op": "mul"},
            { "label": "mul:2:9", "op": "mul"},
            { "label": "mul:2:10", "op": "mul"},
            { "label": "div:1:4", "op": "div"},
            { "label": "div:1:5", "op": "div"},
            { "label": "div:2:6", "op": "div"},
            { "label": "div:2:7", "op": "div"},
            { "label": "div:2:8", "op": "div"},
            { "label": "div:2:9", "op": "div"},
            { "label": "div:2:10", "op": "div"}
        ],
        disabledArray: {
            "maduma": ["add:1:5", "add:1:6", "add:2:7", "add:2:8"],
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
                    wk.fetch();
                    self.listenTo(wk, "change", function(){
                        self.trigger("added");
                    });
                    var disabledWks = self.disabledArray[Player.get("uid")];
                    console.log("disabledWks", disabledWks);
                    _.each(disabledWks, function(e) {
                       if(wk.id == e) {
                           wk.set("bank", 16);
                           wk.save();
                       } 
                    });
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
