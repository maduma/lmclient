define(["jquery", "backbone", "util/prop", "underscore", "model/exeModel", "collection/exeCollection",
        "model/playerModel"], function( $, Backbone, Prop, _, ExeModel, ExeCollection, PlayerModel ) {
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
            "miss": 0,
            // internal
            "localStorage": 1,
            "wrong": 0,
            "correct": 0
        },
        initExe: function() {
            var tmp = this.get('label').split(':');
            var type = tmp[0];
            var startDigit = parseInt(tmp[1]);
            var stopDigit = parseInt(tmp[2]);
            var i,j = 0;
            this.exeList = new ExeCollection();
            if (type == 'add') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push(new ExeModel({
                            solution: (i + j).toString(),
                            question: i + ' + ' + j
                        }));
                    }
                }
            }
            if (type == 'sub') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        if (i-j > 0) {
                            this.exeList.push(new ExeModel({
                                solution: (i - j).toString(),
                                question: i + ' - ' + j
                            }));
                        }
                    }
                }
            }
            if (type == 'mul') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push(new ExeModel({
                            solution: (i * j).toString(),
                            question: i + ' * ' + j
                        }));
                    }
                }
            }
            if (type == 'div') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push(new ExeModel({
                            solution: i.toString(),
                            question: i * j + ' : ' + j
                        }));
                    }
                }
            }
            this.exeList.fetch();
            console.log(this.get('label'));
            console.log(this.exeList);
        },
        nextExe: function() {
            var minTotal = _.min(this.exeList.pluck("total"));
            var totalList = this.exeList.filter(function(exe) {
                return exe.get("total") === minTotal;
            });
            var maxWrong = _.max(_.map(totalList, function(exe) {
                return exe.get("wrong");
            }));
            var finalList = _.filter(totalList, function(exe) {
                return exe.get("wrong") === maxWrong;
            });
            var exe = _.shuffle(finalList).pop();
            console.log(exe);
            return exe;
        },
        inc: function(attr)  {
            this.set(attr, this.get(attr) + 1);
        },
        sync: function( method, model, options ) {
            var player = PlayerModel;
            var playerTag = player.get('uid') + ':'; 
            if (method == "read") {
                var deferred = $.Deferred();
                var savedWk = JSON.parse(localStorage.getItem(Prop.tag + playerTag + 'wk:' + this.id));
                if (!savedWk) {
                    localStorage.setItem(Prop.tag  + playerTag + 'wk:' + this.id, JSON.stringify(this));
                    savedWk = JSON.parse(JSON.stringify(this));
                }
                options.success(savedWk);
                console.log("WorkoutModel:fetch", savedWk)
                deferred.resolve();
            } else if (method == "update") {
                console.log("WorkoutModel:update", this)
                localStorage.setItem(Prop.tag + playerTag + 'wk:' + this.id, JSON.stringify(this));
            }
        }
    });
    return Model;
});