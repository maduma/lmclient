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
            $('span#level').html(this.model.get("level"));
            $('span#levelAdd').html(this.model.get("leveladd"));
            $('span#levelSub').html(this.model.get("levelsub"));
            $('span#levelMul').html(this.model.get("levelmul"));
            $('span#levelDiv').html(this.model.get("leveldiv"));
        }
    });
    return MainView;
});