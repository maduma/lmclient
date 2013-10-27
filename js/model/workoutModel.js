define(["jquery", "backbone", "util/prop", "underscore", "model/exeModel", "collection/exeCollection"], function( $, Backbone, Prop, _, ExeModel, ExeCollection ) {
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
                            question: i + ' + ' + j,
                            correct : 0,
                            wrong: 0
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
                                question: i + ' - ' + j,
                                correct : 0,
                                wrong: 0
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
                            question: i + ' * ' + j,
                            correct : 0,
                            wrong: 0
                        }));
                    }
                }
            }
            if (type == 'div') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push(new ExeModel({
                            solution: i.toString(),
                            question: i * j + ' : ' + j,
                            correct : 0,
                            wrong: 0
                        }));
                    }
                }
            }
            this.exeList.fetch();
            console.log(this.get('label'));
            console.log(this.exeList);
        },
        nextExe: function() {
            var minCorrect = _.min(this.exeList.pluck("correct"));
            var correctList = this.exeList.filter(function(exe) {
                return exe.get("correct") === minCorrect;
            });
            var maxWrong = _.max(_.map(correctList, function(exe) {
                return exe.get("wrong");
            }));
            var finalList = _.filter(correctList, function(exe) {
                return exe.get("wrong") === maxWrong;
            });
            var exe = _.shuffle(finalList).pop();
            console.log(exe);
            return exe;
        }
    });
    return Model;
});