define(["jquery", "backbone", "underscore", "model/playerModel"], function( $, Backbone, _, Player) {
    var WorkoutView = Backbone.View.extend({
        initialize: function() {
            if(this.collection) {
                this.collection.on( "added", this.render, this );
            }
        },
        setCollection: function(collection) {
            this.collection = collection;
            this.collection.on( "added", this.render, this );
        },
        render: function() {
            var levelName = 'level' + this.collection.at(0).get("op");
            this.template = _.template( $( "script#workoutItems" ).html(), {"collection": this.collection, "level": Player.get(levelName)});
            this.$el.html(this.template);
            return this;
        }
    });
    return WorkoutView;
});