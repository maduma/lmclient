define(["jquery", "backbone"], function( $, Backbone) {
    var view = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:countdown", this.render);
            this.render();
        },
        render: function() {
            var countdown = this.model.get("countdown");
            $("span#clock").html(countdown);
        }
    });
    return view;
});