define(["jquery", "backbone", "../util/prop", "underscore" ], function( $, Backbone, Prop, _ ) {
    var Model = Backbone.Model.extend({
        idAttribute: "question",
        sync: function( method, model, options ) {
            if (method == "read") {
                var deferred = $.Deferred();
                var savedExe = JSON.parse(localStorage.getItem(Prop.tag + 'exe:' + this.id));
                if (!savedExe) {
                    localStorage.setItem(Prop.tag + 'exe:' + this.id, JSON.stringify(this));
                    savedExe = JSON.parse(JSON.stringify(this));
                }
                console.log(savedExe.question + " " + savedExe.correct + ':' + savedExe.wrong)
                options.success(savedExe);
                deferred.resolve();
            } else if (method == "update") {
                console.log("savind " + this);
                localStorage.setItem(Prop.tag + 'exe:' + this.id, JSON.stringify(this));
            }
        }
    });
    return Model;
});