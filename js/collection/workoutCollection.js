define([ "jquery", "backbone", "../model/workoutModel", "underscore" ], function( $, Backbone, WorkoutModel, _ ) {
    var Collection = Backbone.Collection.extend( {
        model: WorkoutModel,
        url: '/workout',
        jsonArray: [
            { "label": "add:1:5", "op": "add"},
            { "label": "add:1:6", "op": "add"},
            { "label": "add:1:7", "op": "add"},
            { "label": "add:1:8", "op": "add"},
            { "label": "add:1:9", "op": "add"},
            { "label": "add:1:10", "op": "add"},
            { "label": "sub:1:5", "op": "sub"},
            { "label": "sub:1:6", "op": "sub"},
            { "label": "sub:1:7", "op": "sub"},
            { "label": "sub:1:8", "op": "sub"},
            { "label": "sub:1:9", "op": "sub"},
            { "label": "sub:1:10", "op": "sub"},
            { "label": "sub:1:11", "op": "sub"},
            { "label": "sub:1:12", "op": "sub"},
            { "label": "sub:1:13", "op": "sub"},
            { "label": "sub:1:14", "op": "sub"},
            { "label": "sub:1:15", "op": "sub"},
            { "label": "sub:1:16", "op": "sub"},
            { "label": "sub:1:17", "op": "sub"},
            { "label": "sub:1:18", "op": "sub"},
            { "label": "sub:1:19", "op": "sub"},
            { "label": "sub:1:20", "op": "sub"},
            { "label": "mul:1:4", "op": "mul"},
            { "label": "mul:1:5", "op": "mul"},
            { "label": "mul:1:6", "op": "mul"},
            { "label": "mul:1:7", "op": "mul"},
            { "label": "mul:1:8", "op": "mul"},
            { "label": "mul:1:9", "op": "mul"},
            { "label": "mul:1:10", "op": "mul"},
            { "label": "div:1:4", "op": "div"},
            { "label": "div:1:5", "op": "div"},
            { "label": "div:1:6", "op": "div"},
            { "label": "div:1:7", "op": "div"},
            { "label": "div:1:8", "op": "div"},
            { "label": "div:1:9", "op": "div"},
            { "label": "div:1:10", "op": "div"}
        ],
        initialize: function(models, options) {
            this.type = options.type;
        },
        sync: function( method, model, options ) {
            var self = this;
            var deferred = $.Deferred();
            setTimeout( function() {
                options.success(_.where(self.jsonArray, {'op': self.type}));
                self.trigger("added");
                deferred.resolve();
            }, 100);
            return deferred;
        }
    });
    return Collection;
});