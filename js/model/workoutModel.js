define(["jquery", "backbone", "../util/prop"], function( $, Backbone, Prop ) {
    var Model = Backbone.Model.extend({
        idAttribute: "label",
        defaults: {
            "label": "",
            "op": "",
            "name": "",
            "bank": 0.0, //euro
            "initialBank": 0.0,
            "time": 0,
            "timeout": 0,
            "minAnswer": 0,
            "goldPrice": 0.0,
            "silverPrice": 0.0,
            "bronzePrice": 0.0,
            // stat
            "gain": 0.0,
            "win": 0,
            "late": 0,
            "abort": 0,
            "gold": 0,
            "silver": 0,
            "bronze": 0,
            // internal
            "localStorage": 1
        }
    });
    return Model;
});