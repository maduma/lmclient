define(["jquery", "backbone"], function( $, Backbone) {
    var MainView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            this.$el.html(this.model.get("uid"));
            $('a#play-back').attr('href', '#op?' + this.model.get("type"));
            $('span#gold').html(this.model.get("goldMedal"));
            $('span#silver').html(this.model.get("silverMedal"));
            $('span#bronze').html(this.model.get("bronzeMedal"));
        }
    });
    return MainView;
});