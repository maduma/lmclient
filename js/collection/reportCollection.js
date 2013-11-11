define([ "jquery", "backbone", "underscore", "util/prop", "model/reportModel", "model/playerModel"], function( $, Backbone, _, Prop , ReportModel, Player) {
    var Collection = Backbone.Collection.extend({
        sync: function( method, model, options ) {
            var self = this;
            var uid = Player.get("uid");
            if (method == "read") {
                var deferred = $.Deferred();
                var savedReports = JSON.parse(localStorage.getItem(Prop.tag + uid + ':reports'));
                if (!savedReports) {
                    console.log("[reportCollection:read] reports not found in localStorage.");
                    options.error("[reportCollection:read] reports not found in localStorage.");
                } else {
                    options.success(savedReports);
                }
                deferred.resolve();
                return deferred;
            } else if (method == "update") {
                localStorage.setItem(Prop.tag + uid + ':reports', JSON.stringify(this.models));
            }
        },
        save : function() {
            var uid = Player.get("uid");
            localStorage.setItem(Prop.tag + uid + ':reports', JSON.stringify(this.models));
        },
        addReport: function(attr) {
          var report = new ReportModel(attr);
          this.add(report);
        }
    });
    return new Collection();
});