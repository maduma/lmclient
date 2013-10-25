define(["jquery", "backbone", "../util/prop", "underscore"], function( $, Backbone, Prop, _ ) {
    var Model = Backbone.Model.extend({
        exeList: [],
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
            this.exeList = [];
            if (type == 'add') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push({
                            solution: (i + j).toString(),
                            question: i + ' + ' + j,
                            correct : 0,
                            wrong: 0
                        });
                    }
                }
            }
            if (type == 'sub') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        if (i-j > 0) {
                            this.exeList.push({
                                solution: (i - j).toString(),
                                question: i + ' - ' + j,
                                correct : 0,
                                wrong: 0
                            });
                        }
                    }
                }
            }
            if (type == 'mul') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push({
                            solution: (i * j).toString(),
                            question: i + ' * ' + j,
                            correct : 0,
                            wrong: 0
                        });
                    }
                }
            }
            if (type == 'div') {
                for (i=startDigit; i<=stopDigit; i++) {
                    for (j=startDigit; j<=stopDigit; j++) {
                        this.exeList.push({
                            solution: i.toString(),
                            question: i * j + ' : ' + j,
                            correct : 0,
                            wrong: 0
                        });
                    }
                }
            }
            console.log(this.get('label'));
            console.log(this.exeList);
        },
        nextExe: function() {
            var exe = _.shuffle(this.exeList).pop();
            return exe;
        }
    });
    return Model;
});