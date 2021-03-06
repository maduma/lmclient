define([ "jquery"], function( $ ) {
    
    // check if stop can be run anytime
    
    var startCountdown = function(that) {
        that.countdown = that.delay;
        that.intervalID = window.setInterval(function() {
            if (that.countdown === 0) {
                window.clearInterval(that.intervalID);
                wrongAnswer(that)
            }
            //console.log(that.countdown);
            that.countdown--;
        }, 1000);
    }
    
    var nextExe = function(that) {
        that.exe = that.wk.nextExe();
        that.answer = '';
        $('span#question').html(that.exe.get("question"));
        $('span#answer').html(that.answer);
    }
    
    var wrongAnswer = function(that) {
        that.wk.inc("wrong");
        that.enabled = false;
        that.exe.set("wrong", that.exe.get("wrong") + 1);
        that.exe.save();
        $('span#answer').
        fadeOut(function() { $(this).html(that.exe.get("solution")).css('color', 'red'); }).
        fadeIn().delay(500).fadeOut(function() { 
            $(this).css('color', 'black');
            //that.handler('wrong');
            console.log('wrong');
            if (!that.stoped) {
                console.log("game stopped");
                nextExe(that);
                startCountdown(that);
                that.enabled = true;
            }
        }).fadeIn(100);
    }
    
    function Numpad() {
        this.answer = '';
        this.handler;
        this.enabled = false;
        this.exe;
        this.delay = 10;
        this.countdown = 0;
        this.intervalID;
        this.wk;
        this.stoped = false;
  
        var that = this;
        
        $('div#numpad button').click(function() {
            if (!that.enabled) { return; }
            that.enabled = false;
            var digit = $(this).attr('id').substring(1);
            that.answer = that.answer + digit;
            $('span#answer').html(that.answer);
            if (that.exe.get("solution") == that.answer) {
                that.wk.inc("correct");
                window.clearInterval(that.intervalID);
                that.exe.set("correct", that.exe.get("correct") + 1);
                that.exe.save();
                $('span#answer').delay(500).fadeOut(function() {
                    //that.handler('correct');
                    console.log('correct');
                    if (!that.stoped) {
                        console.log("game stopped");
                        nextExe(that);
                        startCountdown(that);
                        that.enabled = true;
                    }
                }).fadeIn(100);
            } else if (that.exe.get("solution").search(that.answer) === 0) {
                that.enabled = true;
                return;
            } else {
                window.clearInterval(that.intervalID);
                wrongAnswer(that);
            }
        });
    }
    Numpad.prototype.setWk = function(wk) {
        this.wk = wk;
        nextExe(this);
    }
    Numpad.prototype.start = function() {
        this.enabled = true;
        this.stoped = false;
        startCountdown(this);
    }
    Numpad.prototype.stop = function() {
        this.stoped = true;
        this.enabled = false;
        window.clearInterval(this.intervalID);
    }
    Numpad.prototype.setDelay = function(delay) {
        this.delay = delay;
    }
    return Numpad;
});