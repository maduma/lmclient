define(["jquery", "backbone"], function( $, Backbone) {
    var MainView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            this.$el.html(this.model.get("uid"));
            $('a#play-back').attr('href', '#op?' + this.model.get("type"));
        }
    });
    return MainView;
});