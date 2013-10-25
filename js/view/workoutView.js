define(["jquery", "backbone", "underscore"], function( $, Backbone, _) {
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
            this.template = _.template( $( "script#workoutItems" ).html(), {"collection": this.collection});
            this.$el.html(this.template);
            return this;
        }
    });
    return WorkoutView;
});