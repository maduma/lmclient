define([ "jquery", "backbone", "model/exeModel", "underscore", "util/prop"], function( $, Backbone, ExeModel, _, Prop ) {
    var collection = Backbone.Collection.extend({
        model: ExeModel,
        sync: function( method, model, options ) {
            if (method == "read") {
                this.each(function(exe) {
                    exe.fetch();
                });
            }
        }
    });
    return collection;
});